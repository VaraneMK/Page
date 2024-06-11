from datetime import datetime

from fastapi import APIRouter, Depends, status
from fastapi.responses import Response
from sqlalchemy.orm import Session

from ..db import enums, logic, models
from ..depends import get_admin_info, get_db, get_user_info
from ..exceptions import AccessDenied, UserNotFound
from ..logic import get_password_hash
from ..schemas import auth as schemas

router = APIRouter(tags=["Пользователь"])


@router.get("/me", response_model=schemas.UserGet)
async def get_user_loggined(
    db: Session = Depends(get_db),
    user: models.User | str = Depends(get_user_info),
) -> schemas.UserGet:
    if isinstance(user, str):
        return schemas.UserGet(
            id=-1,
            login=f"{user}",
            role=enums.UserRole.DEFAULT,
            status=enums.UserStatus.OK,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            last_login=datetime.now(),
        )

    user = logic.get_user_by_id(db, user.id)
    if user is None:
        raise UserNotFound
    return user


@router.get("/", response_model=schemas.UserGetList)
async def get_users(
    limit: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_admin_info),
) -> schemas.UserGetList:
    users, count = logic.get_users_list(db, limit, offset)
    return schemas.UserGetList(users=users, count=count)


@router.post("/", response_model=schemas.UserGet)
async def create_user(
    data: schemas.UserCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_admin_info),
) -> schemas.UserGet:
    password = get_password_hash(data.password)
    user = logic.create_user(db, data.login, password, data.role, data.status)
    return user


@router.patch("/password", response_model=schemas.UserGet)
async def change_password(
    data: schemas.PasswordPatch,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_user_info),
) -> schemas.UserGet:
    if isinstance(user, str):
        raise AccessDenied
    password = get_password_hash(data.password)
    user = logic.update_user_by_id(db, user.id, password=password)
    return user


@router.get("/{user_id}", response_model=schemas.UserGet)
async def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_admin_info),
) -> schemas.UserGet:
    user = logic.get_user_by_id(db, user_id)
    if user is None:
        raise UserNotFound
    return user


@router.patch("/{user_id}", response_model=schemas.UserGet)
async def update_user_by_id(
    user_id: int,
    data: schemas.UserPatch,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_admin_info),
) -> schemas.UserGet:
    if data.password is not None:
        data.password = get_password_hash(data.password)
    user = logic.update_user_by_id(
        db,
        user_id,
        login=data.login,
        password=data.password,
        role=data.role,
        status=data.status,
    )

    if user is None:
        raise UserNotFound

    return user


@router.delete("/{user_id}")
async def delete_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_admin_info),
) -> Response:
    logic.delete_user_by_id(db, user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
