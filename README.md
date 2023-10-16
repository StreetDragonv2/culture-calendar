# culture-calendar
Next.js 및 MongoDB로 제작한 문화달력 사이트

##프로젝트 소개
한양사이버대학교HYCU 2023년 1학기 소프트웨어 프로젝트 01분반 최종과제로 제출한 졸업 프로젝트 입니다. 

##개발 기간
2023.05.01 ~ 2023. 06.10

##개발 환경
- Frontend : HTML5, CSS3, Javascript, React
- Backend : NEXT.js 13
- DataBase : MongoDB
- Library : Bcrypt, NextAuth, xml-js
- API : [KOPIS OPEN API](https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074)

##주요기능

###로그인
- 로그인 시 토큰 생성(JWT)
- GITHUB 소셜 로그인
- bcrypt를 사용한 암호화
- 샘플 아이디 제공 (달력 구경 가능, CRUD 불가능)

###회원가입
- NextAuth.js를 이용한 회원가입
- ID 중복 체크

###달력
- React hook으로 구현
- 마우스 오버시 감상 미리보기

###공연정보목록
- 공연별 카테고리 분류
- 제목 검색 기능
- 상세 페이지
  
###감상기록
- 공연 선택 및 날짜 지정
- 감상을 작성하고 저장하면 달력 페이지로 이동
