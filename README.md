# Booklist Next.js Application

## 프로젝트 소개
**Booklist Next.js Application**은 Next.js App Router 방식을 사용하여 책 목록을 관리하고, 책 추가, 수정, 삭제 및 검색 기능을 제공하는 간단한 웹 애플리케이션입니다.

---

### 1. **next**  
- **버전**: 15.0.3  
- **설명**: Next.js는 React 기반의 프레임워크로, 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), API 라우트 등을 지원합니다.

### 2. **react & react-dom**  
- **버전**: 19.0.0-rc-66855b96-20241106  
- **설명**: React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. `react-dom`은 브라우저에서 React 컴포넌트를 렌더링하는 역할을 합니다.

### 3. **typescript**  
- **버전**: ^5  
- **설명**: TypeScript는 JavaScript에 정적 타입을 추가하여 코드 품질을 높여주는 프로그래밍 언어입니다.

### 4. **tailwindcss**  
- **버전**: ^3.4.16  
- **설명**: Tailwind CSS는 유틸리티 우선 CSS 프레임워크로, 빠르고 효율적으로 스타일을 작성할 수 있게 해줍니다.

### 5. **eslint & eslint-config-next**  
- **버전**: ^8 / 15.0.3  
- **설명**: ESLint는 코드 품질을 유지하고 오류를 방지하기 위한 JavaScript/TypeScript 린팅 도구입니다. `eslint-config-next`는 Next.js 프로젝트에 맞는 ESLint 설정을 제공합니다.

### 6. **postcss & autoprefixer**  
- **버전**: ^8.4.49 / ^10.4.20  
- **설명**: PostCSS는 CSS를 처리하고 최적화하는 도구입니다. `autoprefixer`는 CSS에 자동으로 브라우저 벤더 프리픽스를 추가해줍니다.

### 7. **ts-node**  
- **버전**: ^10.9.2  
- **설명**: TypeScript 코드를 Node.js 환경에서 바로 실행할 수 있게 해주는 도구입니다.

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
│   │   │   │   │   ├── route.ts  # 특정 책 조회, 수정, 삭제 API
│   │   │   │   ├── route.ts      # 책 목록 API
│   │   ├── components/
│   │   │   ├── BookForm.tsx      # 책 정보를 입력받는 공통 폼 컴포넌트
│   │   ├── add/
│   │   │   ├── page.tsx          # 책 추가 페이지
│   │   ├── edit/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx      # 책 수정 페이지
│   │   ├── page.tsx              # 책 목록 페이지
│   ├── data/
│   │   ├── books.ts              # Mock 데이터와 데이터 업데이트 함수
├── public/
├── styles/
│   ├── globals.css               # Tailwind CSS 글로벌 스타일
├── README.md                     # 프로젝트 설명 파일
├── package.json                  # 종속성 및 스크립트 설정
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


