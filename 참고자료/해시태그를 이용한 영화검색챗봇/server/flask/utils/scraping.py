from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import datetime
import time
import os

DAY = 1       # 데이터의 간격
DURATION = 20  # 데이터를 가져올 기간(단위: 일)
path = "c:/temp/chromedriver_240/chromedriver.exe" # chromedriver 경로

def create_url(date):
    year = str(date.year)
    month = str(date.month).zfill(2)
    day = str(date.day).zfill(2)

    url = f"https://flixpatrol.com/top10/streaming/world/{year}-{month}-{day}/"

    return [url, year, month, day]

def get_df(body):
    results = []
    rows = body.find_all('tr')
    for row in rows:
        data = row.find_all('td')
        
        rank = int(data[0].get_text().strip().replace('.',''))
        diff = data[1].get_text().strip().replace('–','0')
        title = data[2].get_text().strip()
        points = int(data[3].get_text().strip())
        change = int(data[4].get_text().replace('–','0').replace('%','').strip())
        countries = int(data[5].get_text().strip())
        per_country = int(data[6].get_text().strip())
        days = int(data[7].get_text().strip())
        per_day = int(data[8].get_text().strip().replace(',',''))
        total = int(data[9].get_text().strip().replace(',',''))
        results.append([
            rank, 
            diff,
            title,
            points,
            change,
            countries,
            per_country,
            days,per_day,
            total
        ])
    df = pd.DataFrame(results, columns=['#','UP/DOWN','TITLE','POINTS','CHANGE','COUNTRIES','\/COUNTRY','DAYS','\/DAY','TOTAL'])
    return df

today = datetime.date.today()
delta = datetime.timedelta(days=DAY)
start_date = today - delta*DURATION

urls = []
cur = start_date
for i in range(DURATION):
    url = create_url(cur)
    urls.append(url)
    cur -= delta

try:
    os.mkdir('source')
except:
    pass

driver = webdriver.Chrome(path)

for url in urls:
    
    driver.get(url[0])
    time.sleep(1.5)
    driver.find_element_by_link_text('Full Details').click()

    text = driver.page_source
    soup = BeautifulSoup(text, 'html.parser')

    netflix_movie = soup.find('div', id='netflix-1').find('tbody')
    netrflix_tv_show = soup.find('div', id='netflix-2').find('tbody')



    movie = get_df(netflix_movie)
    tv_show = get_df(netrflix_tv_show)

    movie.to_csv(f'./source/{url[1]}{url[2]}{url[3]}_movie.csv', index=False)
    tv_show.to_csv(f'./source/{url[1]}{url[2]}{url[3]}_tv_show.csv',index=False)