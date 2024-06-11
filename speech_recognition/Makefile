generate_secret:
	openssl rand -hex 32

venv: venv/touchfile

venv/touchfile: requirements.txt
    virtualenv venv
    . venv/bin/activate; pip install -Ur requirements.txt
    touch venv/touchfile

run: venv
	. venv/bin/activate
	nohup uvicorn src:app --host 0.0.0.0 --port 8000 --env-file .env

run_dev:
	uvicorn src:app --host 127.0.0.1 --port 8000 --reload --env-file dev.env

format:
	black .
	isort .

check_format:
	mypy .
	flake8 .

clean_venv:
    rm -rf venv
    find -iname "*.pyc" -delete
