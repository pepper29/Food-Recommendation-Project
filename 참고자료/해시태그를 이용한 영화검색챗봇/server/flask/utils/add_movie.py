from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pandas as pd
from datetime import date
import pymysql
pymysql.install_as_MySQLdb()
import time
import sys
import os

from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))
from models.movie import Movie
from config import SQLALCHEMY_DATABASE_URI

s = time.time()

dir = './data/movie/'
files = [i for i in os.listdir(dir) if i.endswith('last_of_last.csv')]
print("작업파일:\t",files)

engine = create_engine(SQLALCHEMY_DATABASE_URI)

Session = sessionmaker(bind=engine)
session = Session()
print("연결 성공")


# Movie 테이블 삭제, 생성
Movie.__table__.drop(bind=engine)
Movie.__table__.create(bind=engine)

def convert_release_date(release_date):
        '''
        '2021 .09.09 재개봉, 2020 .05.21 재개봉, 2019 .10.30 개봉'으로 써진 개봉일의
        개행문자, 한글, 특수문자를 지우고 년, 월, 일로 나눈 뒤에
        date format으로 변환시켜줌
        '''
        release_date = release_date.split(',')[-1]
        release_date = release_date.replace(" ",'').replace('개봉','').split('.')
        
        if len(release_date) == 1: # 개봉년, 월만 있는 경우
            year = int(release_date[0])
            month = 1
            day = 1

        elif len(release_date) == 2: # 개봉년, 월만 있는 경우
            year, month = map(int,release_date)
            day = 1

        else:
            year, month, day = map(int,release_date)
            
        release_date = date(year, month, day).isoformat()
        return release_date

def convert_running_time(running_time):
    '''
    xxx분 으로 써진 상영시간의 분을 떼고 INT로 변환
    '''
    return int(running_time[:-1])


for file_path in files:
    print(file_path)
    data = pd.read_csv(path.join(dir,file_path), encoding='utf-8')

    data['release_date'] = data['release_date'].apply(convert_release_date)
    data['running_time'] = data['running_time'].apply(convert_running_time)

    for i in range(len(data)):
        title = data.loc[i,"title"]
        release_date = data.loc[i,"release_date"]
        actor = data.loc[i,"actor"]
        director = data.loc[i,"director"]
        summary = data.loc[i,"summary"]
        running_time = data.loc[i,"running_time"]
        genre = data.loc[i,"genre"]
        rating = data.loc[i,"grade"]
        poster = data.loc[i,"poster"]
        nation = data.loc[i,"nation"]
        
        movie = Movie(
            title = title,
            release_date = release_date,
            actor = actor,
            director = director,
            summary = summary,
            running_time = running_time,
            poster = poster,
            genre = genre,
            rating = rating,
            nation = nation,
        )
        session.add(movie)
session.commit()
session.close()
e = time.time()
print(f'작업 완료:\t{e-s:.2f}초')
