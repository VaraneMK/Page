from datetime import datetime
from typing import Annotated

from fastapi import Form
from pydantic import BaseModel, ConfigDict

from ..db.enums import UserRole, UserStatus


class Token(BaseModel):
    sub: str
    role: UserRole
    status: UserStatus
    exp: datetime


class OAuthForm:
    def __init__(
        self,
        *,
        username: Annotated[str, Form()],
        password: Annotated[str, Form()],
    ):
        self.username = username
        self.password = password


class UserCreate(BaseModel):
    login: str
    password: str
    role: UserRole = UserRole.DEFAULT
    status: UserStatus = UserStatus.OK


class UserPatch(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    login: str | None = None
    password: str | None = None
    role: UserRole | None = None
    status: UserStatus | None = None


class UserGet(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    login: str
    role: UserRole
    status: UserStatus
    created_at: datetime
    updated_at: datetime | None = None
    last_login: datetime | None = None


class UserGetList(BaseModel):
    users: list[UserGet]
    count: int


class PasswordPatch(BaseModel):
    password: str
