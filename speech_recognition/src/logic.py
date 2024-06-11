from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from .config import ALGORITHM, SECRET_KEY
from .db import models
from .exceptions import NotAuthorized
from .schemas.auth import Token

__pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def __verify_password(plain_password: str, hashed_password: str) -> bool:
    return __pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return __pwd_context.hash(password)


def authenticate_user(db: Session, login: str, password: str) -> models.User:
    user: models.User = (
        db.query(models.User).filter(models.User.login == login).one_or_none()
    )
    if user is None or __verify_password(password, user.password) is False:
        raise NotAuthorized
    return user


def create_token(user: models.User, expires: int) -> str:
    token_expires = datetime.utcnow() + timedelta(minutes=expires)
    data = Token(
        sub=str(user.id), role=user.role, status=user.status, exp=token_expires
    )
    return jwt.encode(data.dict(), SECRET_KEY, ALGORITHM)
