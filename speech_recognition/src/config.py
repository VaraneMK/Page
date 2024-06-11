import os

DB_URI = os.getenv("DB_URI", "sqlite:///./storage.db")

ONLY_AUTHORITHED = bool(int(os.getenv("ONLY_AUTHORITHED", "0")))

SECRET_KEY = "1b221bef4b5b27f8b9f8e085847991356e6e5c3bc609cf26c8f8bb9b0ca56bd3"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

FILES_FOLDER = os.getenv("FILES_FOLDER", "./files")
