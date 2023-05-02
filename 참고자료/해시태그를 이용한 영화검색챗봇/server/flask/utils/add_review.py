import sys
from os import path, listdir
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import pandas as pd
from datetime import date, datetime

from models.review import Review
from models.movie import Movie

from config import SQLALCHEMY_DATABASE_URI
from app import review_col

engine = create_engine(SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

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


def convert_write_date(dt, source):
    '''
    watcha는 null값이고,
    다음은 몇시간 전, 몇분 전 이런 값이 있고,
    네이버는 띄어쓰기, 구분자가 다름
    '''
    
    if dt=='none' or "전" in dt: 
        return dt
    
    if source == "naver":
        date_, time = dt.split()
        year, month, day = map(int, date_.split('.'))
        hour, minute = map(int, time.split(':'))
        
    elif source == "daum":
        year, month, day, time = dt.replace('.','').split()
        year, month, day = map(int, [year, month, day])
        hour, minute = map(int, time.split(':'))

    return datetime(year=year, month=month, day=day, hour=hour, minute=minute).isoformat()

def get_movie_id(title, date):
    '''
    title과 개봉일을 기준으로 Movie_id를 가져옴
    '''
    movie = session.query(Movie).filter(Movie.title == title and Movie.release_date == date).first()

    if movie == None:
        movie_id = -1
        print(title)
        
    else:
        movie_id = movie.id

    return movie_id

def mongo_insert(data, source):  # input == DataFrame
    
    data['release_date'] = data['release_date'].apply(convert_release_date)
    data['write_date'] = data['write_date'].fillna('none')

    data['write_date'] = data['write_date'].apply(convert_write_date, source=source)
    fordata = zip(data['title'], data['release_date'] ,data['score'], data['write_date'], data['content'], data['source_site'])

    
    for (title, release_date, score, write_date, content, source_site) in fordata:
        
        movie_id = get_movie_id(title, release_date)
        if source == 'watcha':
            try: 
                score = float(score)*2
            except:
                pass
        insert_data = Review(movie_id= movie_id, score= score, content= content, write_date= write_date, source_site= source_site)
        review_col.insert_one(insert_data.to_json())
        
    return 

dir = './data/total/'
files = listdir(dir)
print("작업 파일:\t", files)

for file in files:
    print(f'{file} 작업 시작')
    FILE_PATH = path.join(dir, file)
    df = pd.read_csv(FILE_PATH)
    
    source = file.split('_')[0].lower()
    mongo_insert(df, source)
    print(f'{file} 작업 완료')

session.close()