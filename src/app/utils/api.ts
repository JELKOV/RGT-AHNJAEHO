// Fetch API를 이용하여 API 요청 로직을 캡슐화한 유틸리티 파일
// 이 파일은 다양한 컴포넌트에서 재사용될 수 있도록 설계됨

const BASE_URL = "/api/books"; // API 기본 URL 설정

type Book = {
  id: string;
  title: string;
  author: string;
  quantity: number;
  description: string;
};

type QuantityChangePayload = {
  quantityChange: number;
};

// [GET] 모든 책 데이터 가져오기
export const fetchBooks = async (filters: { title?: string; author?: string; page?: number; limit?: number }): Promise<{ books: Book[]; totalPages: number; currentPage: number }> => {
  console.log("[fetchBooks] 요청 시작:", filters);

  // 쿼리 스트링 생성
  const query = new URLSearchParams(
    Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined) acc[key] = value.toString();
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const url = `${BASE_URL}?${query}`;
  console.log(`[fetchBooks] 요청 URL: ${url}`);

  try {
    const response = await fetch(url);
    console.log(`[fetchBooks] 응답 상태 코드: ${response.status}`);

    if (!response.ok) {
      console.error("[fetchBooks] 요청 실패:", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
    }

    const data = await response.json();
    console.log("[fetchBooks] 데이터 반환 성공:", data);
    return data; // 데이터 반환 (books, totalPages 포함)
  } catch (err) {
    console.error("[fetchBooks] 데이터 가져오기 실패:", err);
    throw err;
  }
};

// [GET] 특정 ID를 가진 책 데이터 가져오기
export const fetchBookByOne = async (id: string): Promise<Book> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`); // ID를 포함한 GET 요청
    if (!response.ok) {
      throw new Error(`ID ${id}에 해당하는 책을 불러오는 데 실패했습니다.`);
    }
    const data = await response.json();
    return data; // Book 타입의 데이터 반환
  } catch (err) {
    console.error(`[fetchBookByOne] ID ${id} 책 데이터 가져오기 실패:`, err);
    throw err;
  }
};

// [POST] 새로운 책 데이터 추가하기
export const addBook = async (book: Book): Promise<Book> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST", // POST 요청
      headers: {
        "Content-Type": "application/json", // JSON 데이터 전송
      },
      body: JSON.stringify(book), // 입력 데이터를 문자열로 변환
    });
    if (!response.ok) {
      throw new Error("새로운 데이터를 추가하는 데 실패했습니다."); // 요청 실패 시 에러
    }
    return await response.json(); // JSON 데이터로 반환
  } catch (err) {
    console.error("[addBook] 데이터 추가 실패:", err); // 에러 로깅
    throw err;
  }
};

// [PUT] 기존 책 데이터 수정하기
export const updateBook = async (id: string, book: Book): Promise<Book> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT", // PUT 요청
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book), // 수정 데이터
    });
    if (!response.ok) {
      throw new Error(`ID ${id} 데이터를 수정하는 데 실패했습니다.`); // 요청 실패 시 에러
    }
    return await response.json(); // JSON 데이터로 반환
  } catch (err) {
    console.error(`[updateBook] ID ${id} 데이터 수정 실패:`, err); // 에러 로깅
    throw err;
  }
};

// [DELETE] 책 데이터 삭제하기
export const deleteBook = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE", // DELETE 요청
    });

    if (!response.ok) {
      throw new Error(`ID ${id} 데이터를 삭제하는 데 실패했습니다.`); // 요청 실패 시 에러
    }

    // 204 상태 코드 처리 (JSON 데이터 없음)
    if (response.status !== 204) {
      await response.json(); // JSON 응답이 있으면 반환
    }
  } catch (err) {
    console.error(`[deleteBook] ID ${id} 데이터 삭제 실패:`, err); // 에러 로깅
    throw err;
  }
};

// [PATCH] 책 수량 변경하기
export const changeBookQuantity = async (
  id: string,
  quantityChange: number
): Promise<Book> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantityChange } as QuantityChangePayload),
    });

    if (!response.ok) {
      throw new Error(`ID ${id}의 수량을 변경하는 데 실패했습니다.`);
    }

    return await response.json() as Book; // 서버가 반환하는 데이터가 Book이라고 가정
  } catch (err) {
    console.error(`[changeBookQuantity] ID ${id} 수량 변경 실패:`, err);
    throw err;
  }
};