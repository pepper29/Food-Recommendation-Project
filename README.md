# 리뷰데이터(비정형)를 활용한 음식추천 서비스 모델

### 1.Skills
colab
Jupyter
Python
Pandas
Numpy
selenium
Matplotlib
Seaborn
Mecab
Kobert
transformer
pytorch

### 2.프로젝트 개요
음식에 대한 수요의 종류가 다양해지면서 다양한 음식을 공급해주는 맛집이 늘어났다. \
하지만 음식을 선택할 수 있는 폭이 많아져서 지금 본인이 어떤 음식을 원하는지 고민해야 한다는 문제점이 생겼다.


### 3.프로젝트 목표
이용자의 취향이나 필요한 것을 키워드로 표현하면 그 키워드와 가장 연관성이 높은 음식군을 추천해준다. \
그 키워드는 맛을 표현한 것일 수도 있지만, 감정을 비롯한 다양한 범주의 단어를 포함할 수 있다. \
키워드와 가장 연관있는 음식들을 추천하고 이용자가 후보를 고르면 \
그 음식을 제공하는 맛집이 어디에 있는지 알려주어 이용자가 소비할 수 있는 선택지를 제공한다.


### 4.흐름도
![image](https://user-images.githubusercontent.com/116697723/235591253-d6b42792-915e-44b7-8f93-361cfd359ebe.png)

### 5. 자료구성
0. Crawlinig.ipynb : 비정형 데이터를 수집하기 위한 크롤링 코드 (수집사이트:망고플레이트)
1. Preprocessing.ipynb : 비정형데이터를 전처리과정코드
2. EDA.ipynb : 전처리된 데이터를 파악하기 위한 분석코드
3. Mecab.ipynb : 형태소분석을 사용하기 위해 Mecab을 사용(환경:colab(Ubuntu))
4. Add_preprocessing.ipynb : 미흡했던 전처리 과정을 보완하기 위한 코드
5. Transformer_model.ipynb : 모델을 학습시키기 위한 코드로 Transformer를 사용(1안: 채택안됨)
6. Kobert_model.ipynb : 모델을 학습시키기 위한 코드로 Kobert 사용(2안: 채택)
7. streamlit.ipynb : 웹 구현을 위한 코드

### 6. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 홍세영 | 팀장 |
| 진세용 | 백엔드(크롤링,전처리)& Deep Learning|
| 김소연 | 프론트엔드 |
| 이준석 | 백엔드(형태소분석) |

### 7. 팀 내 담당업무
- 크롤링: 홈페이지에 페이지와 스크롤을 통해 한 페이지당 가게 상호에 따른 그 안에 존재하는 리뷰데이터를 존재하는 만큼 크롤링하는 반복문 작성
- 전처리: 라벨링과 데이터에 결측치, 불필요한 문자 등을 제거
- 딥러닝: 1) Transformer: 초기에 사용한 학습모델이었지만, 정확도가 개선되지 않는 문제로 인하여 중도 모델변경
- 딥러닝: 2) Kobert: 한국어에 특화된 Kobert모델을 사용하여 test_accuracy:0.76기록


### 8. 발표자료
https://pepper29.notion.site/Kobert-8843f7c9fb9349c296fe966653ea36db
