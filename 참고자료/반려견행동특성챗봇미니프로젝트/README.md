# 반려견 행동특성 챗봇 미니프로젝트

#### text data 추출 시 유의사항.
Html code 불러 올시 정적 HTML element 와 동적 HTML element로 구분됨. 
<br> 정적HTML은 오픈된 URL로 모든 코드를 볼 수 있음
<br> 반면 동적 HTML은 개발자 코드를 따로 봐야 해서 frame을 찾아 특정한 URL을 추출 해야함.
<br> data 폴더 내 npy 파일은 전체 활용한 데이터이며, np.load('model/'이름'.npy', allow_pickle=True) 형식으로 불러오면 됨.

### 1. Data Collection
1. Web crawling
<br> 웹크롤링을 위한 HTML element 크롬 단축키: Ctrl + shift + c

### 2. 딕셔너리 생성
1. crawling한 data 품사 분류
2. 명사 길이별로 출력
3. 딕셔너리 작성


### 3. 용언 원형 분석기
1. 형용사, 동사를 출력 후 원형 복원

### 4. tf-idf
1. 주요 키워드 추출
2. 토큰 별 가중치 확인
3. 검색 키워드 토큰화
4. Q에서 해당 단어가 없는 불필요한 data제거
5. 가중치가 높은 keyword가 포함된 문장들만 한 문장으로 합치기

### 5. Word embedding
1. word2index사용하여 voca사전 제작

### 6. Seq2Seq
1. GRU, attention 사용
