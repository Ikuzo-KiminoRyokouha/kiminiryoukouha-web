# 1. Commit Conversion

```
<type>(detail) <body> <footer>
```

//type 더 추가하고 싶으면 얼마든지

- ✨ feat : 새로운 기능에 대한 커밋
- 🐛 fix : 버그 수정에 대한 커밋
- 👷 build : 빌드 관련 파일 수정에 대한 커밋
- 🔨 chore : 그 외 자잘한 수정에 대한 커밋(기타 변경)
- 💚 ci : CI 관련 설정 수정에 대한 커밋
- 📝 docs : 문서 수정에 대한 커밋
- 💄 style : ui 스타일에 관한 커밋
- 🎨 refactor : 코드 리팩토링에 대한 커밋
- ✅ test : 테스트 코드 수정에 대한 커밋
- 🎉 init : 프로젝트 시작에 대한 커밋
- 🔖 release: 릴리즈에 대한 커밋
- ➕ plus : add dependency
- ➖ minus : remove dependency

// body

- 왜 커밋을 하는지 에 대해서 작성

// footer

- 해결, 관련, 참고 해야하는 것이 있다면 기록

# 2. Branch 관리

- main : 배포나 릴리즈 테스트에 쓸 브런치
- dev : 실질적으로 코딩해서 주기적으로 커밋하는 곳

# 3. Commit Flow

- 코딩시작

1. git branch feature_number/작업내용

2. git checkout feature_number/작업내용

3. git pull origin develop

4. git push origin feature_number/작업내용

- 코딩 후 커밋해야 할 때

1. git add .

2. git commit -m "`<type>(detail) <body> <footer>`"

3. git push origin feature_number/작업내용

4. develop 브런치로 merge(자기가 한 커밋은 자기가 머지할 것)

5. 본인이 작업한 브런치 삭제

- 내가 커밋하고 머지하기 전에 먼저 머지 시킨 사람이 있을떄

1. 머지 전에 git pull origin develop 으로 최신코드를 내 브런치로 가져온다

2. 그 다음 머지

- 최신 코드 상태 내려 받기

1. git pull origin "<branch 이름>"

# 4. Folder 구조

- componments : 페이지에서 쓰이는 컴포넌트
- config : 각종 설정 파일들 모아 놓는 곳
- hooks : 커스텀 훅 모아놓는 곳
- pages : 페이지로 보이는 곳
- public : 정적인 자료 담는 곳
- styles : css 파일을 담는 곳
- types : 타입들 모아놓는 곳
- utils : hook은 아니지만 유용하게 쓰이는 함수들 모아놓는 곳

# 5. env 파일

- 혹여나 본인이 환경변수가 필요한 경우 .env.example에 예시와 주석 작성할 것

# 6. fetch API

- 리퀘스트 요청필요 할 때
  // /utils/request/authRequest => 인증 정보가 필요한 요청
  // /utils/request/mainRequest => 인증정보가 필요 없는 요청
