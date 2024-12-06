# Booklist Next.js Application

## 프로젝트 소개
**Booklist Next.js Application**은 Next.js App Router 방식을 사용하여 책 목록을 관리하고, 책 추가, 수정, 삭제 및 검색 기능을 제공하는 간단한 웹 애플리케이션입니다.

---

### 1. **next**  
- **버전**: 15.0.3  

### 2. **react & react-dom**  
- **버전**: 19.0.0-rc-66855b96-20241106  

### 3. **typescript**  
- **버전**: ^5  

### 4. **tailwindcss**  
- **버전**: ^3.4.16  

### 5. **eslint & eslint-config-next**  
- **버전**: ^8 / 15.0.3  .

### 6. **postcss & autoprefixer**  
- **버전**: ^8.4.49 / ^10.4.20  

### 7. **ts-node**  
- **버전**: ^10.9.2  

---

## 사용된 기술 스택

- **언어**: TypeScript, JavaScript
- **프레임워크**: Next.js (15.0.3)
- **스타일링**: Tailwind CSS
- **배포**: Heroku
---

## 주요 기능
1. **책 목록 관리**
   - 책 추가, 삭제, 수정, 검색 기능 제공
2. **Next.js App Router 방식**
   - 폴더 기반 라우팅
3. **API 라우트**
   - RESTful API 설계를 활용한 데이터 CRUD 기능 구현

---

## 프로젝트 구조
```text
booklist-next-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── books/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts        # 개별 책에 대한 CRUD API 처리
│   │   │   │   ├── route.ts            # 책 리스트 API (GET, POST 등)
│   │   │   ├── route.ts                # 책 관련 API 엔드포인트 (전체 책)
│   │   ├── components/
│   │   │   ├── BookForm.tsx            # 책 추가/수정 폼 컴포넌트
│   │   │   ├── BookList.tsx            # 책 목록을 표시하는 컴포넌트
│   │   ├── layout.tsx                  # 페이지 레이아웃 (헤더, 푸터 등)
│   │   ├── page.tsx                    # 메인 페이지 (책 리스트 등)
│   │   ├── add/
│   │   │   └── page.tsx                # 책 추가 페이지
│   ├── data/
│   │   └── books.ts                    # 더미 데이터 및 업데이트 함수
│   ├── public/
│   │   └── images/                     # 정적 이미지 파일 (책 커버 등)
│   ├── utils/
│   │   └── api.ts                      # API 호출 관련 유틸리티 함수
│   ├── styles/
│   │   └── globals.css                 # 전역 스타일 파일
├── .gitignore                          # Git에서 제외할 파일 목록
├── package.json                        # 프로젝트 메타 정보 및 의존성 목록
├── README.md                           # 프로젝트 설명서
├── tsconfig.json                       # TypeScript 설정 파일
├── next.config.js                      # Next.js 설정 파일
└── package-lock.json                   # 정확한 의존성 버전 관리
```
## 주요 API 엔드포인트

### 1. 책 목록 조회
- **URL**: `/api/books`
- **Method**: `GET`
- **설명**: 책 목록을 가져옵니다.

### 2. 특정 책 조회
- **URL**: `/api/books/[id]`
- **Method**: `GET`
- **설명**: 특정 ID를 가진 책 정보를 가져옵니다.

### 3. 책 추가
- **URL**: `/api/books`
- **Method**: `POST`
- **설명**: 새로운 책을 추가합니다.

### 4. 책 수정
- **URL**: `/api/books/[id]`
- **Method**: `PUT`
- **설명**: 특정 ID의 책 정보를 수정합니다.

### 5. 책 수량 변경
- **URL**: `/api/books/[id]/quantity`
- **Method**: `PATCH`
- **설명**: 특정 책의 수량을 변경합니다.

### 6. 책 삭제
- **URL**: `/api/books/[id]`
- **Method**: `DELETE`
- **설명**: 특정 ID의 책을 삭제합니다.


## 실행 방법

### 1. 프로젝트 클론
다음 Git 저장소를 클론합니다

```bash
git clone https://github.com/JELKOV/RGT-AHNJAEHO.git
```
### 2. 의존성 설치
프로젝트의 의존성을 설치합니다.

```bash
npm install
```

### 3. 개발 서버 실행
로컬 개발모드로 실행합니다
```bash
npm run dev
```
http://localhost:3000 접속 가능

## 배포 주소 (light 모드여야 합니다)
https://whispering-caverns-21582-35585d9c6c06.herokuapp.com/


