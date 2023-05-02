import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from pymongo import MongoClient
import pymysql
pymysql.install_as_MySQLdb()

from config import MONGO_URI
from config import SQLALCHEMY_DATABASE_URI

def ranking_cal():
    engine = create_engine(SQLALCHEMY_DATABASE_URI)
    Session = sessionmaker(bind=engine)
    session = Session()

    ranking_list = {"collection": "ranking"}
    for i in range(1, 11):
        ranking_list[str(i)] = 1

    session.close()
    return ranking_list

def ranking_input():
    client = MongoClient(MONGO_URI)
    db = client.simsimhash
    col = db.ranking

    col.delete_one({"collection": "ranking"})
    col.insert_one(ranking_cal())

    client.close()
    return "0"

ranking_input()