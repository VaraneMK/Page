from enum import Enum


class UserRole(str, Enum):
    DEFAULT = "DEFAULT"
    ADMIN = "ADMIN"


class UserStatus(str, Enum):
    OK = "OK"
    BLOCKED = "BLOCKED"


class FileStatus(str, Enum):
    NEW = "NEW"
    RUNNING = "RUNNING"
    OK = "OK"
    ERROR = "ERROR"
