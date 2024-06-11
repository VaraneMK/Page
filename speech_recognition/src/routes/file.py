import aiofiles
from fastapi import APIRouter, Depends, File, UploadFile, status
from fastapi.responses import Response
from sqlalchemy.orm import Session

from ..config import FILES_FOLDER
from ..db import enums, logic, models
from ..depends import get_admin_info, get_db, get_user_info
from ..exceptions import FileNotFound, MemoryLimit
from ..schemas import file as schemas

router = APIRouter(tags=["Файл"])


@router.get("/", response_model=schemas.FileGetList)
async def get_history(
    is_history: bool = True,
    limit: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db),
    user: models.User | str = Depends(get_user_info),
) -> schemas.FileGetList:
    if isinstance(user, str):
        files, count = logic.get_files_list(db, limit, offset, is_guest=True)
    elif user.role == enums.UserRole.ADMIN:
        if is_history is True:
            files, count = logic.get_files_list(db, limit, offset, user.id)
        else:
            files, count = logic.get_files_list(db, limit, offset)
    else:
        files, count = logic.get_files_list(db, limit, offset, user.id)
    return schemas.FileGetList(files=files, count=count)


@router.post("/", response_model=schemas.FileGet)
async def upload_file(
    db: Session = Depends(get_db),
    file: UploadFile = File(...),
    user: models.User | str = Depends(get_user_info),
) -> schemas.FileGet:

    if file.size is None or file.size > 8 * 1024 * 500:
        raise MemoryLimit

    user_id = None
    user_ip = None

    if isinstance(user, str):
        user_ip = user
    else:
        user_id = user.id

    db_file = logic.create_file(db, user_id, user_ip, file.filename, file.size)

    async with aiofiles.open(f"{FILES_FOLDER}/{db_file.id}", "wb") as saved_file:
        await saved_file.write(await file.read())

    return db_file


@router.delete("/")
async def delete_history(
    db: Session = Depends(get_db), user: models.User = Depends(get_admin_info)
) -> Response:
    logic.delete_files_all(db)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/{file_id}", response_model=schemas.FileGet)
async def get_file_by_id(
    file_id: int,
    db: Session = Depends(get_db),
    user: models.User | str = Depends(get_user_info),
) -> schemas.FileGet:
    file = logic.get_file_by_id(db, file_id)

    if isinstance(user, models.User) and user.role == enums.UserRole.ADMIN:
        return file

    if (
        file is None
        or isinstance(user, str)
        and file.owner_id is not None
        or isinstance(user, models.User)
        and file.owner_id != user.id
    ):
        raise FileNotFound

    return file


@router.get("/{file_id}/translate", response_model=schemas.FileTranslate)
async def get_translate_by_id(
    file_id: int,
    db: Session = Depends(get_db),
    user: models.User | str = Depends(get_user_info),
) -> schemas.FileTranslate:
    file = logic.get_file_by_id(db, file_id)

    if isinstance(user, models.User) and user.role == enums.UserRole.ADMIN:
        return schemas.FileTranslate(data=file.translate)

    if (
        file is None
        or isinstance(user, str)
        and file.owner_id is not None
        or isinstance(user, models.User)
        and file.owner_id != user.id
    ):
        raise FileNotFound

    return schemas.FileTranslate(data=file.translate)
