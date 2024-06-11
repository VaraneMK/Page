import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError

from . import exceptions
from .config import FILES_FOLDER
from .db import engine
from .db.models import Base
from .routes import auth, file, user

app = FastAPI()


@app.on_event("startup")
async def on_startup():
    Base.metadata.create_all(bind=engine)
    if not os.path.exists(FILES_FOLDER):
        os.makedirs(FILES_FOLDER)


origins = ["http://localhost", "https://localhost", "http://localhost:3000", "https://localhost:3000", "http://localhost:8000", "https://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth")
app.include_router(user.router, prefix="/user")
app.include_router(file.router, prefix="/file")


@app.exception_handler(exceptions.NotAuthorized)
async def not_authorized_handler(
    req: Request, exc: exceptions.NotAuthorized
) -> JSONResponse:
    return JSONResponse({"msg": "user not authorized"}, status_code=401)


@app.exception_handler(exceptions.AccessDenied)
async def access_denied_handler(
    req: Request, exc: exceptions.AccessDenied
) -> JSONResponse:
    return JSONResponse({"msg": "access denied"}, status_code=403)


@app.exception_handler(exceptions.UserNotFound)
async def user_not_found_handler(
    req: Request, exc: exceptions.UserNotFound
) -> JSONResponse:
    return JSONResponse({"msg": "user not found"}, status_code=404)


@app.exception_handler(exceptions.FileNotFound)
async def file_not_found_handler(
    req: Request, exc: exceptions.FileNotFound
) -> JSONResponse:
    return JSONResponse({"msg": "file not found"}, status_code=404)


@app.exception_handler(IntegrityError)
async def not_uniqie_user(req: Request, exc: IntegrityError) -> JSONResponse:
    return JSONResponse({"msg": "not unique login"}, status_code=400)


@app.exception_handler(exceptions.MemoryLimit)
async def memory_limit(req: Request, exc: exceptions.MemoryLimit) -> JSONResponse:
    return JSONResponse(
        {"msg": "file size must be more than 0 and less than 500MB"}, status_code=400
    )
