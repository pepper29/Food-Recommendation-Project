'''
Naver를 이용한 데이터 크롤링(API KEY 필요)

필수 import 설치 요구
    from bs4 import BeautifulSoup   # pip install bs4
    import urllib.request           # pip install urllib.request
    import pandas as pd             # pip install pandas
    import requests                 # pip install requests

# api_key setting
    dataload.My_naver_api_ID = 'API_key_ID 값 입력(string)'           >> default="희주 API ID Key"
    dataload.My_naver_api_Secret = 'API_key_secret 값 입력(string)'   >> default="희주 API Secret Key"

# function
    dataload.api_naver_TL(*keyword,**location)    >> 검색 위치와 검색 키워드로 타이틀과 링크를 dataframe 호출
    dataload.make_bodytext(*try_url, **location)  >> URL과 검색 위치에 따라서 TEXT(string) data로 반환
    dataload.make_body(*data, **location)         >> dataload.api_naver_TL로 반환된 dataframe을 크롤링 후 Title, content 형태로 dataframe 반환
'''
from bs4 import BeautifulSoup
import urllib.request
import pandas as pd
import requests
import time

# 입력값
My_naver_api_ID='NtViEQEhhin_KXWOLExO'
My_naver_api_Secret='bNHhcXBeWr'
        
# naver api key를 이용해서 검색을 통한 키워드 추출
def api_naver_TL(keyword,location):
    '''
    api_naver_TL(*keyword,**location)
    > naver api key를 이용한 후 검색사이트 지정 및 검색키워드에 따른 Title과 Link data 수집 및 저장
    > 1000 data searching
    
    argument:
        *keyword=검색어(string)
        **location='blog', 'kin'(지식인) 등 검색 위치 입력(string)
        
    return:
        Dataframe       >> dataframe 형태로 data 추출 
    '''
    
    headers =  {   # Api key 입력
      'X-Naver-Client-Id': My_naver_api_ID,
      'X-Naver-Client-Secret': My_naver_api_Secret
    }
    dic_payload = {'query': keyword, 'display': '100'}
    data=pd.DataFrame(columns=['Title','Link'])
    for j in range(1,1000,100):
        try:
            dic_payload['start'] = j
            url = 'https://openapi.naver.com/v1/search/'+str(location)+'.json'
            res = requests.get(url, headers=headers, params=dic_payload)
            dic={}
            for i in range(len(res.json()['items'])):
                title=res.json()['items'][i]['title']
                dic[title]=res.json()['items'][i]['link']

            temp_df=pd.DataFrame(dic.items(), columns=['Title','Link'])
            data=pd.concat([data,temp_df], axis=0)  # dataframe 복사
        except:
            print(f" {keyword} ({location}) data set error")
    data.reset_index(drop=True, inplace=True) # 인덱스 정렬
    
    return data

# 동적 elements의 HTML을 가져오기 위해 URL 재설정
def final_url_blog(try_url):
    try:
        url=try_url
        html_result=requests.get(url)
        soup_temp=BeautifulSoup(html_result.text, 'html.parser')
        area_temp=soup_temp.find(id='screenFrame')   # id가 screenFrame을 찾는다.
        url_2=area_temp.get('src')                   # 이에 따른 소스를 집어 넣음
        html_result=requests.get(url_2)               
        soup_temp=BeautifulSoup(html_result.text, 'html.parser')
        area_temp=soup_temp.find(id='mainFrame')     # id가 mainFrame을 찾는다.
        url_3=area_temp.get('src')
        return url_3
    except:
        try:
            area_temp = soup_temp.find(id='mainFrame')
            url_3=area_temp.get('src')
            return url_3
        except:
            return try_url   #동적이 아니면 기본 URL 그대로 가져오기.

# 새롭게 만든 URL을 이용해서 TEXT data 추출
def make_bodytext(try_url, location):
    '''
    make_bodytext(*try_url, **location)
    > url을 가져와서 검색위치에 따라 본문의 TEXT data 반환 
    > 검색위치에 따라서 동적, 정적 elements가 나뉨
    
    argument:
        *try_url= Link값 (string)
        **location=['blog', 'kin'(지식인)] 검색 위치 입력(string)
        
    return:
        text data(string)       >> 문자열 형태로 본문 text 추출 
    '''
    key_url=final_url_blog(try_url)  # 동적, 정적 url 구분 코드
    if location=='blog' and try_url!=key_url:  #'naver blog' 에서만 적용 (동적 URL로 변동 될 경우)
        try:
            url='https://blog.naver.com'+key_url  # 동적 URL을 naver blog 주소와 합치기
            res=urllib.request.urlopen(url)
            soup=BeautifulSoup(res, 'html.parser')
            title = soup.findAll("div",{"class":'se-main-container'})     #블로그마다 동일하게 HTML 중 div에서 se-main-container의 본문을 가져옴
            if len(title)==0:
                title = soup.findAll("div",{"id":'postViewArea'})
            if len(title)==0:
                title = soup.findAll("div",{"class":'hentry '})
            if len(title)==0:
                title = soup.findAll("div",{"class":'se_component_wrap sect_dsc __se_component_area'})
            for a in title:
                text=a.get_text()    # 가져온 본문 중 text만 가져옴  
            while text.find('\n\n') != -1:   # \n가 2개이상 되어 있는 모든 문자열 제거
                text=text.replace("\n\n","\n")
            time.sleep(0.1)
            return text.replace("\u200b","")              # \n 과 \u200b 문자는 HTML 이므로 제거
        except:
            print(f" {try_url} (Naver {location}) crawling error")
    
    elif location=='blog' and try_url==key_url:  # 'blog' 중 정적 url
        try:
            url=key_url   # URL 재생성
            res=urllib.request.urlopen(url)
            soup=BeautifulSoup(res, 'html.parser')
            title = soup.findAll("div",{"id":'cContentBody'})     # HTML 중 div에서 cContentBody의 본문을 가져옴
            if len(title)==0:
                title = soup.findAll("div",{"class":'se-main-container'})
            if len(title)==0:
                title = soup.findAll("div",{"id":'body'})
            if len(title)==0:
                title = soup.findAll("div",{"class":'view-body'})
            if len(title)==0:
                title = soup.findAll("main",{"class":'main'})
            for a in title:
                text=a.get_text()    # 가져온 본문 중 text만 가져옴  
            while text.find('\n\n') != -1:   # \n가 2개이상 되어 있는 모든 문자열 제거
                text=text.replace("\n\n","\n")
            time.sleep(0.1)
            return text.replace("\xa0","")
        except:
            print(f" {try_url} ({location}) crawling error")
    
    elif location=='kin' and try_url==key_url:  # '지식인' 에서만 적용 (정적)
        try:
            url=try_url   # URL 재생성
            res=urllib.request.urlopen(url)
            soup=BeautifulSoup(res, 'html.parser')
            title = soup.findAll("div",{"class":'answer-content__list _answerList'})     #지식인 마다 동일하게 HTML 중 div에서 se-main-container의 본문을 가져옴
            for a in title:
                text=a.get_text()    # 가져온 본문 중 text만 가져옴  
            while text.find('\n\n') != -1:   # \n가 2개이상 되어 있는 모든 문자열 제거
                text=text.replace("\n\n","\n")
            time.sleep(0.1)
            return text.replace("\u200b","")
        except:
            print(f" {try_url} ({'지식 IN'}) crawling error")
    else:
        print("location is not allowed")
        return 0

def requset_text(soup_f):
    try:
        for i in soup_f:
            text=i.get_text()
        while text.find('\n') != -1:   # \n 제거
            text=text.replace("\n","")
        while text.find('\t') != -1:   # \t 제거
            text=text.replace("\t","")
        return text
    except:
        text=''
        return text

def make_body(data, location):
    if location=='kin':
        make_data=pd.DataFrame(columns=['Q_title','Q_content','A_content_1'])
        for i in range(len(data)):
            check=0
            temp_dic={}
            url=data.loc[i,'Link']   
            res=urllib.request.urlopen(url)
            soup=BeautifulSoup(res, 'html.parser')
            
            Q_title = soup.findAll("div",{"class":'title'}) 
            title_text=requset_text(Q_title)
            temp_dic['Q_title']=title_text
            
            Q_content = soup.findAll("div",{"class":'c-heading__content'})
            contents_text=requset_text(Q_content)
            temp_dic['Q_content']=contents_text
            
            A_contents = soup.findAll("div",{"class":"se-main-container"})  # 대부분 
            
            if len(A_contents)==0:    # 다른 케이스
                A_contents = soup.findAll("div",{"_endContentsText c-heading-answer__content-user"})
                check=1
            k=1
            for j in A_contents:
                if len(j.attrs['class'])>=2 and check!=1:  # 삭제 되거나 없는 경우
                    continue
                    
                text=j.get_text()
                
                while text.find('\u200b') != -1:   # \u200b 제거
                    text=text.replace("\u200b"," ")
                    
                while text.find('\n') != -1:   # \n 제거
                    text=text.replace("\n"," ")
                    
                while text.find('\xa0') != -1:   # \xa0 제거
                    text=text.replace("\xa0"," ")
                    
                name=str('A_content_')+str(k)
                temp_dic[name]=text
                k+=1
                
            make_data=make_data.append(temp_dic, ignore_index=True)
            
    return make_data
