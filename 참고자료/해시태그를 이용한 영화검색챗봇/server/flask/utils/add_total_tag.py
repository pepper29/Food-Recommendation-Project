import sys
from os import path
sys.path.append(path.dirname( path.dirname( path.abspath(__file__) ) ))

import pandas as pd
from app import review_col, hashtag_col, client

naver = pd.read_csv("./data/review/Okt_keyword50.csv")
daum = pd.read_csv("./data/review/Okt_keyword_50daum.csv")

naver = naver['noun']
daum = daum['noun']

insert_data = {}
index = 0
for noun in naver:
    insert_data[str(index)] = noun
    index = index + 1

for noun in daum:
    insert_data[str(index)] = noun
    index = index + 1

hashtag_col.insert({"total_tag": "true", "content": insert_data})