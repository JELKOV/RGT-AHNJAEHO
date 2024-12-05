import { NextRequest, NextResponse } from "next/server";
import { books, updateBooks } from "@/data/books";

// [GET] 요청 처리: 페이지네이션 및 검색 필터 적용
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // 쿼리 파라미터 추출
  const page = parseInt(searchParams.get("page") || "1", 10); // 현재 페이지
  const limit = parseInt(searchParams.get("limit") || "10", 10); // 페이지당 항목 수
  const titleFilter = searchParams.get("title") || ""; // 제목 필터
  const authorFilter = searchParams.get("author") || ""; // 저자 필터

  console.log("[GET] 쿼리 파라미터:", { page, limit, titleFilter, authorFilter }); // 로그 추가

  // 필터링된 데이터
  const filteredBooks = books.filter((book) => {
    const matchesTitle = titleFilter ? book.title.includes(titleFilter) : true;
    const matchesAuthor = authorFilter ? book.author.includes(authorFilter) : true;
    return matchesTitle && matchesAuthor;
  });

  // 페이지네이션 계산
  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / limit);
  const startIndex = (page - 1) * limit;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + limit);

  // 응답 데이터 구성
  const responseData = {
    books: paginatedBooks, // 현재 페이지의 책 목록
    totalPages, // 총 페이지 수
    currentPage: page, // 현재 페이지
  };

  console.log("[GET] 응답 데이터:", responseData); // 로그 추가
  return NextResponse.json(responseData, { status: 200 }); // 응답 반환
}

// [POST] 요청 처리: 새로운 책 데이터 추가
export async function POST(req: NextRequest) {
  const newBook = await req.json(); // 요청 본문에서 새로운 책 데이터를 가져옴
  const newId = `${books.length + 1}`; // 새로운 책에 고유 ID 부여
  const updatedBooks = [...books, { ...newBook, id: newId }]; // 기존 데이터에 새 책 데이터 추가
  updateBooks(updatedBooks); // 업데이트된 데이터 저장
  return NextResponse.json({ ...newBook, id: newId }, { status: 201 }); // 추가된 책 데이터를 반환
}
