from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, computed_field

from ..db.enums import FileStatus


class FileGet(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    owner_id: int | None = Field(default=None, exclude=True)
    owner_ip: str | None = Field(default=None, exclude=True)
    name: str
    size: int
    status: FileStatus
    created_at: datetime
    updated_at: datetime | None = None

    @computed_field
    @property
    def owner(self) -> str:
        return str(self.owner_id) if self.owner_id is not None else self.owner_ip


class FileGetList(BaseModel):
    files: list[FileGet]
    count: int


class FileTranslate(BaseModel):
    data: str | None = None
