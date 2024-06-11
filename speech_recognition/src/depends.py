from datetime import datetime

from fastapi import Depends, Header
from fastapi.security import OAuth2PasswordBearer
from jose import exceptions, jwt
from sqlalchemy.orm import Session

from .config import ALGORITHM, ONLY_AUTHORITHED, SECRET_KEY
from .db import enums, get_db, models
from .exceptions import AccessDenied, NotAuthorized
from .schemas.auth import Token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)


def get_data_from_token(token: str | None = Depends(oauth2_scheme)) -> Token | None:
    if token is None:
        return None
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except (exceptions.JWTError, exceptions.JWKError):
        raise NotAuthorized
    return Token.parse_obj(data)


def get_user_info(
    db: Session = Depends(get_db),
    data: Token | None = Depends(get_data_from_token),
    http_client_ip: str = Header(default=None, convert_underscores=True),
) -> models.User | str:
    if data is None:
        if ONLY_AUTHORITHED:
            raise NotAuthorized
        return http_client_ip

    user = db.query(models.User).get(data.sub)

    if user is None:
        if ONLY_AUTHORITHED:
            raise NotAuthorized
        return http_client_ip

    user.last_login = datetime.now()
    db.commit()

    if user.status is enums.UserStatus.BLOCKED:
        raise AccessDenied

    return user


def get_admin_info(
    user: models.User | str = Depends(get_user_info),
) -> models.User:
    if isinstance(user, str) or user.role != enums.UserRole.ADMIN:
        raise AccessDenied

    return user
