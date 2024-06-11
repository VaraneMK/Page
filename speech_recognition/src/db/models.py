from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from . import Base
from .enums import FileStatus, UserRole, UserStatus


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    login = Column(String(length=255), unique=True, nullable=False)
    password = Column(String(length=255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.DEFAULT, nullable=False)
    status = Column(Enum(UserStatus), default=UserStatus.OK, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)


class File(Base):
    __tablename__ = "file"

    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=True)
    owner_ip = Column(String, nullable=True)
    name = Column(String(length=255), nullable=False)
    size = Column(Integer, nullable=False)
    status = Column(Enum(FileStatus), default=FileStatus.NEW, nullable=False)
    translate = Column(String(length=50000), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", backref="files")
