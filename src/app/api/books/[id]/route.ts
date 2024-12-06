import { NextRequest, NextResponse } from "next/server";
import { books, updateBooks } from "@/data/books"; // 책 데이터와 업데이트 함수 가져오기

// [GET] 요청 처리: 특정 ID의 책 데이터 조회
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 비동기적 params 타입 선언
) {
  try {
    const { id } = await context.params; // params를 반드시 await 처리

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
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params를 비동기로 처리
) {
  try {
    // params를 비동기적으로 처리
    const { id } = await context.params;

    // 책 데이터에서 해당 ID의 인덱스를 찾음
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      // 책이 존재하지 않을 경우
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 요청 본문 데이터를 기반으로 책 데이터 업데이트
    const updatedBook = { ...books[bookIndex], ...(await req.json()) };

    // 데이터 업데이트
    const updatedBooks = books.map((book, index) =>
      index === bookIndex ? updatedBook : book
    );
    updateBooks(updatedBooks);

    // 업데이트된 책 정보를 반환
    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("[PUT] 요청 처리 중 오류:", error);

    // 서버 오류 발생 시 500 상태 반환
    return NextResponse.json(
      { message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}


// [PATCH] 요청 처리: 특정 ID의 책 수량 변경
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params를 Promise로 처리
) {
  try {
    // params를 비동기적으로 처리
    const { id } = await context.params;

    // 책 데이터에서 해당 ID의 인덱스를 찾음
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 요청 본문 데이터 가져오기
    const { quantityChange } = await req.json();

    if (typeof quantityChange !== "number") {
      return NextResponse.json(
        { message: "수량 변경 값은 숫자여야 합니다." },
        { status: 400 }
      );
    }

    // 수량 업데이트
    books[bookIndex].quantity += quantityChange;
    if (books[bookIndex].quantity < 0) {
      books[bookIndex].quantity = 0; // 수량이 음수가 되지 않도록 처리
    }

    // 업데이트된 데이터 저장
    updateBooks(books);

    // 업데이트된 책 데이터를 반환
    return NextResponse.json(books[bookIndex], { status: 200 });
  } catch (error) {
    console.error("[PATCH] 요청 처리 중 오류:", error);

    // 서버 오류 발생 시 500 상태 반환
    return NextResponse.json(
      { message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}


// [DELETE] 요청 처리: 특정 ID의 책 데이터 삭제
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // params를 비동기로 처리할 것을 명시
) {
  try {
    // params를 await로 비동기 처리
    const { id } = await context.params;

    // 책 데이터에서 해당 ID를 찾음
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      // 책이 존재하지 않을 경우
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 책 데이터를 삭제 처리
    const updatedBooks = books.filter((book) => book.id !== id);
    updateBooks(updatedBooks);

    // 삭제 성공 시 204 상태 반환
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE] 요청 처리 중 오류:", error);

    // 서버 오류 발생 시 500 상태 반환
    return NextResponse.json(
      { message: "서버에서 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
