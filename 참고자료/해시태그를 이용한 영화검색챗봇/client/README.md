### 📁 디렉토리 구조 (Ducks 패턴 적용)

```
|── src
│   ├── assets //global 사진 (로고 등)
|   ├── stories //UI 설계
│   ├── component //공통적으로 적용되는 컴포넌트
│   ├── pages //도메인 컴포넌트
│   │   ├── Main //태그 검색 페이지
│   │   ├── SearchByTitle //제목 검색 페이지
│   │   ├── AboutUs
|   |   ├── Loading 
|   |   ├── Error 
│   ├── modules //Reducer 기능들을 구현
|   |	├── reducers.js //리듀서 합치는 곳
│   │   ├── 각 페이지의 module //액션, 액션 생성 함수
|   ├── hooks //Custom Hook
|   ├── routers //라우터 관리
|   ├── App.js //store 정의
```

### ✅ 커밋 규칙

```
feat : 새로운 기능에 대한 커밋
fix : 에러 해결에 대한 커밋
style : 코드 스타일 혹은 포맷 등에 관한 커밋
refactor : 코드 리팩토링에 대한 커밋
test : 테스트 코드 수정에 대한 커밋
build : 빌드 관련 파일 수정에 대한 커밋
ci : CI 관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋
chore : 쓸모 없는 파일 제거 등 그 외의 자잘한 커밋

(예시) Feat: 관심지역 알림 ON/OFF 기능 추가(#123)  
```

### 🛠️ 스택

react  
redux / redux-toolkit  
storybook
