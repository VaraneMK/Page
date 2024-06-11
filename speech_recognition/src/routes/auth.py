from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session

import src.config as config

from ..config import ACCESS_TOKEN_EXPIRE_MINUTES
from ..db import models
from ..depends import get_admin_info, get_db, get_user_info
from ..logic import authenticate_user, create_token
from ..schemas.auth import OAuthForm

router = APIRouter(tags=["Авторизация"])


@router.post("/login")
async def login(
    data: OAuthForm = Depends(),
    db: Session = Depends(get_db),
    user: models.User | None = Depends(get_user_info),
) -> dict[str, str]:
    if user is None or isinstance(user, str):
        user = authenticate_user(db, data.username, data.password)
    token = create_token(user, ACCESS_TOKEN_EXPIRE_MINUTES)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/auth_status")
async def get_auth_status() -> bool:
    return config.ONLY_AUTHORITHED


@router.post("/auth_status")
async def set_auth_status(
    new_status: bool = Body(..., embed=True),
    user: models.User = Depends(get_admin_info),
) -> bool:
    config.ONLY_AUTHORITHED = new_status
    return config.ONLY_AUTHORITHED
