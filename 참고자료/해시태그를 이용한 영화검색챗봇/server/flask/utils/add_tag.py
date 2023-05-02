import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))
from app import review_col, hashtag_col
from config import SQLALCHEMY_DATABASE_URI
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models.movie import Movie
from models.tag import Tag

from collections import Counter, defaultdict

from konlpy.tag import Mecab
mecab = Mecab()

engine = create_engine(SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

def get_tags(text):
    morphus = mecab.pos(text)
    tags = []
    for (keyword, pos) in morphus:
        if pos in target_tags:
            tags.append(keyword)
    return tags

def counter_to_dict(counter):
    dic = {}
    for k, v in counter:
        dic[k] = v
    return dic
    

N = len(session.query(Movie).all())
target_tags = ['NNG', 'NNP','NR', 'NNB']
projection = {"_id": False}

insert_data_list = []
for i in range(1, N+1):
    
    cur = review_col.find({'movie_id': i}, projection)
    
    text_dict = {
        'total' : "",
        'naver' : "",
        'daum' : "",
        'watchapedia' : "",
        'cine21' : "",
    }
    
    for review in cur:
    
        text = review["content"]
        source_site = review["source_site"]
        
        text_dict['total'] += text
        text_dict[source_site] += text
        
    
    tag_dict=defaultdict(dict)
    
    tag_dict['total'] = counter_to_dict(Counter(get_tags(text_dict['total'])).most_common(25))
    tag_dict['naver'] = counter_to_dict(Counter(get_tags(text_dict['naver'])).most_common(25))
    tag_dict['daum'] = counter_to_dict(Counter(get_tags(text_dict['daum'])).most_common(25))
    tag_dict['watchapedia'] = counter_to_dict(Counter(get_tags(text_dict['watchapedia'])).most_common(25))
    tag_dict['cine21'] = counter_to_dict(Counter(get_tags(text_dict['cine21'])).most_common(25))
            
    insert_data = Tag(movie_id= i, 
                         total=tag_dict['total'], 
                         naver=tag_dict['naver'], 
                         daum=tag_dict['daum'], 
                         watcha=tag_dict['watchapedia'],
                         cine21=tag_dict['cine21'])
    
    insert_data_list.append(insert_data)
    
# 전체 삭제
# d = hashtag_col.delete_many({})
# print(d.deleted_count)
# 

hashtag_col.insert_many([i.to_json() for i in insert_data_list])
session.close()