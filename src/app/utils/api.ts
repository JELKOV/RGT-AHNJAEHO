// Fetch API를 이용하여 API 요청 로직을 캡슐화한 유틸리티 파일
// 이 파일은 다양한 컴포넌트에서 재사용될 수 있도록 설계됨

const BASE_URL = "/api/books";

// [GET] 모든 책 데이터 가져오기
export const fetchBooks = async (): Promise<any[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
    }
    return await response.json(); // JSON 데이터로 변환하여 반환
  } catch (err) {
    console.error("[fetchBooks] 데이터 가져오기 실패:", err);
    throw err;
  }
};

// [GET] 특정 ID를 가진 책 데이터 가져오기
export const fetchBookByOne = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`ID ${id}에 해당하는 데이터를 가져오는 데 실패했습니다.`);
    }
    return await response.json();
  } catch (err) {
    console.error(`[fetchBookByOne] ID ${id} 데이터 가져오기 실패:`, err);
    throw err;
  }
};

// [POST] 새로운 책 데이터 추가하기
export const addBook = async (book: any): Promise<any> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 데이터 전송
      },
      body: JSON.stringify(book), // 입력 데이터를 문자열로 변환
    });
    if (!response.ok) {
      throw new Error("새로운 데이터를 추가하는 데 실패했습니다.");
    }
    return await response.json();
  } catch (err) {
    console.error("[addBook] 데이터 추가 실패:", err);
    throw err;
  }
};

// [PUT] 기존 책 데이터 수정하기
export const updateBook = async (id: string, book: any): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error(`ID ${id} 데이터를 수정하는 데 실패했습니다.`);
    }
    return await response.json();
  } catch (err) {
    console.error(`[updateBook] ID ${id} 데이터 수정 실패:`, err);
    throw err;
  }
};

// [DELETE] 책 데이터 삭제하기
export const deleteBook = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`ID ${id} 데이터를 삭제하는 데 실패했습니다.`);
    }

    // 204 No Content일 경우 JSON 파싱을 하지 않음
    if (response.status !== 204) {
      return await response.json();
    }
  } catch (err) {
    console.error(`[deleteBook] ID ${id} 데이터 삭제 실패:`, err);
    throw err;
  }
};