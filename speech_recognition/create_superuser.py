from argparse import ArgumentParser

from src.db import engine, enums, get_db, logic
from src.db.models import Base
from src.logic import get_password_hash


def create_superuser(login: str, password: str):
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    password = get_password_hash(password)
    user = logic.create_user(
        db, login, password, enums.UserRole.ADMIN, enums.UserStatus.OK
    )
    print(f"User {user.login} was created")


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-l", "--login", help="Login")
    parser.add_argument("-p", "--password", help="Password")
    args = parser.parse_args()

    create_superuser(args.login, args.password)
