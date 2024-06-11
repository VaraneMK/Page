from datetime import datetime

from sqlalchemy.orm import Session

from . import enums, models


def create_user(
    db: Session,
    login: str,
    password: str,
    role: enums.UserRole | None = None,
    status: enums.UserStatus | None = None,
) -> models.User:
    user = models.User(login=login, password=password, role=role, status=status)
    db.add(user)
    db.commit()
    return user


def get_users_list(db: Session, limit: int = 25, offset: int = 0) -> tuple[list[models.User], int]:
    return db.query(models.User).limit(limit).offset(offset).all(), db.query(models.User).count()


def get_user_by_id(db: Session, user_id: int) -> models.User:
    return db.query(models.User).get(user_id)


def update_user_by_id(
    db: Session,
    user_id: int,
    login: str | None = None,
    password: str | None = None,
    role: enums.UserRole | None = None,
    status: enums.FileStatus | None = None,
    last_login: bool | None = None,
) -> models.User | None:
    user = db.query(models.User).get(user_id)

    if user is None:
        return None

    if login is not None:
        user.login = login

    if password is not None:
        user.password = password

    if role is not None:
        user.role = role

    if status is not None:
        user.status = status

    if last_login is not None:
        user.last_login = datetime.now()

    db.commit()
    return user


def delete_user_by_id(db: Session, user_id: int) -> None:
    db.query(models.User).filter(models.User.id == user_id).delete()
    db.commit()


def create_file(
    db: Session,
    owner_id: int | None = None,
    owner_ip: str | None = None,
    name: str | None = None,
    size: int | None = None,
    status: enums.FileStatus | None = None,
) -> models.File:
    if owner_id is None and owner_ip is None:
        return None

    file = models.File(
        owner_id=owner_id, owner_ip=owner_ip, name=name, size=size, status=status
    )
    db.add(file)
    db.commit()
    return file


def get_files_list(
    db: Session,
    limit: int = 25,
    offset: int = 0,
    user_id: int | None = None,
    is_guest: bool = False,
) -> tuple[list[models.File], int]:
    query = db.query(models.File)

    if user_id is not None and is_guest is True:
        raise Exception("you can use one of this params 'user_id' or 'is_guest'")

    if is_guest:
        query = query.filter(models.File.owner_id is None)

    if user_id is not None:
        query = query.filter(models.File.owner_id == user_id)

    return query.limit(limit).offset(offset).all(), query.count()


def get_file_by_id(db: Session, file_id: int) -> models.File:
    return db.query(models.File).get(file_id)


def update_file_by_id(
    db: Session,
    file_id: int,
    owner_id: int | None = None,
    owner_ip: str | None = None,
    name: str | None = None,
    size: int | None = None,
    status: enums.FileStatus | None = None,
) -> models.File | None:
    file = db.query(models.File).get(file_id)

    if file is None:
        return None

    if owner_id is not None:
        file.owner_id = owner_id

    if owner_ip is not None:
        file.owner_ip = owner_ip

    if name is not None:
        file.name = name

    if size is not None:
        file.size = size

    if status is not None:
        file.status = status

    db.commit()
    return file


def delete_file_by_id(db: Session, file_id: int) -> None:
    db.query(models.File).filter(models.File.id == file_id).delete()
    db.commit()


def delete_files_all(db: Session) -> list[int]:
    db.query(models.File).delete()
    db.commit()
