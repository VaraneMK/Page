FROM python:3.10-alpine

COPY . .

RUN pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 8000

CMD [ "uvicorn", "src:app" , "--host", "0.0.0.0", "--port", "8000", "--env-file", "dev.env"]
