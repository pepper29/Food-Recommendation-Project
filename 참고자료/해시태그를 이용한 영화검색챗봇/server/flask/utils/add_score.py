import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from pymongo import MongoClient
import pymysql
pymysql.install_as_MySQLdb()

from sqlalchemy import desc
from models.movie import Movie

from app import ranking_col, hashtag_col, review_col
from config import SQLALCHEMY_DATABASE_URI
from pprint import pprint

engine = create_engine(SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

N = len(session.query(Movie).all())

projection = {"_id": False}
for i in range(1, N+1):
    
    score_dict = {
        'total' : [],
        'naver' : [],
        'daum' : [],
        'watchapedia' : [],
        'cine21' : [],
    }
    cur = review_col.find({'movie_id': i}, projection)
    
    for review in cur:
        
        source_site = review["source_site"]
        score = review["score"]
        print(source_site, score)
        
        try: # 간혹 score에 숫자가 아닌 값이 들어가서 예외 처리
            score_dict['total'].append(float(score))
            score_dict[source_site].append(float(score))
        except:
            pass
            

    movie = session.query(Movie).filter(Movie.id==i).first()
    print(movie.id)
    # zero division error 방지
    n_total = max(len(score_dict["total"]), 1)
    n_naver = max(len(score_dict["naver"]), 1)
    n_daum = max(len(score_dict["daum"]), 1)
    n_watchpedia = max(len(score_dict["watchapedia"]), 1)
    n_cine21 = max(len(score_dict["cine21"]), 1)
    
    total_score = sum(score_dict["total"]) / n_total
    naver_score = sum(score_dict["naver"]) / n_naver
    daum_score = sum(score_dict["daum"]) / n_daum
    watcha_score = sum(score_dict["watchapedia"]) / n_watchpedia
    cine21_score = sum(score_dict["cine21"]) / n_cine21
    
    movie.score = total_score
    movie.naver = naver_score
    movie.daum = daum_score
    movie.watcha = watcha_score/2
    movie.cine21 = cine21_score


session.commit()
session.close()