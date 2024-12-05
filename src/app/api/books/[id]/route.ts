import { NextRequest, NextResponse } from "next/server";
import { books, updateBooks } from "@/data/books"; // 책 데이터와 업데이트 함수 가져오기

// [GET] 요청 처리: 특정 ID의 책 데이터 조회
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // context.params를 명시적으로 await 처리
    const { id } = await context.params;

    // ID를 기반으로 책 검색
    const book = books.find((book) => book.id === id);
    if (!book) {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("[GET] 요청 처리 중 오류:", error);
    return NextResponse.json(
      { message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// [PUT] 요청 처리: 특정 ID의 책 데이터 수정
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // URL에서 ID 가져오기
  const bookIndex = books.findIndex((book) => book.id === id); // 해당 ID의 책을 찾기

  if (bookIndex === -1) {
    // 책이 없으면 404 반환
    return NextResponse.json({ message: "책을 찾을 수 없습니다." }, { status: 404 });
  }

  // 요청된 데이터를 바탕으로 책 정보 업데이트
  const updatedBook = { ...books[bookIndex], ...(await req.json()) }; // 요청 본문 데이터 가져오기
  const updatedBooks = books.map((book, index) =>
    index === bookIndex ? updatedBook : book
  );
  updateBooks(updatedBooks); // 데이터 업데이트

  // 업데이트된 책 정보를 JSON 형식으로 반환
  return NextResponse.json(updatedBook, { status: 200 });
}

// [PATCH] 요청 처리: 특정 ID의 책 수량 변경
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return NextResponse.json({ message: "책을 찾을 수 없습니다." }, { status: 404 });
  }

  const { quantityChange } = await req.json();

  if (typeof quantityChange !== "number") {
    return NextResponse.json(
      { message: "수량 변경 값은 숫자여야 합니다." },
      { status: 400 }
    );
  }

  books[bookIndex].quantity += quantityChange;

  if (books[bookIndex].quantity < 0) {
    books[bookIndex].quantity = 0; // 수량이 음수가 되지 않도록 처리
  }

  updateBooks(books);

  return NextResponse.json(books[bookIndex], { status: 200 });
}

// [DELETE] 요청 처리: 특정 ID의 책 데이터 삭제
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params; 

  if (!id) {
    return NextResponse.json({ message: "유효하지 않은 요청입니다." }, { status: 400 });
  }

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return NextResponse.json({ message: "책을 찾을 수 없습니다." }, { status: 404 });
  }

  const updatedBooks = books.filter((book) => book.id !== id);
  updateBooks(updatedBooks);

  return new NextResponse(null, { status: 204 });
}