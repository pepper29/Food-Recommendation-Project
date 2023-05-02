FROM python:3.8-buster
COPY . /flask
WORKDIR /flask
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
ENTRYPOINT ["flask", "run"]
# ENTRYPOINT python3 app.py