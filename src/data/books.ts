// 더미 데이터 공유 모듈
export let books = [
  { id: "1", title: "개발자", author: "안제호", quantity: 10, description: "개발자가 되는 여정" },
  { id: "2", title: "소년이 온다", author: "한강", quantity: 5, description: "한국 현대사의 비극" },
  { id: "3", title: "작별하지 않는다", author: "한강", quantity: 12, description: "이별의 고통과 치유" },
  { id: "4", title: "바람이 분다", author: "한강", quantity: 7, description: "바람처럼 살아가는 삶" },
  { id: "5", title: "노랑무늬영원", author: "한강", quantity: 15, description: "황금빛 영원의 이야기" },
  { id: "6", title: "아파트", author: "로제", quantity: 3, description: "도시 속 인간의 삶" },
  { id: "7", title: "채식주의자", author: "한강", quantity: 8, description: "채식주의자의 선택" },
  { id: "8", title: "SOLO", author: "제니", quantity: 4, description: "혼자서도 빛나는 삶" },
  { id: "9", title: "늑대의유혹", author: "강동원", quantity: 11, description: "늑대처럼 강렬한 사랑" },
  { id: "10", title: "트렌드코리아2030", author: "김난도", quantity: 6, description: "미래를 읽는 방법" },
  { id: "11", title: "흰", author: "한강", quantity: 9, description: "하얀색에 담긴 의미" },
  { id: "12", title: "내 이름은 태양꽃", author: "한강", quantity: 13, description: "태양처럼 강한 존재" },
  { id: "13", title: "눈물 상자", author: "한강", quantity: 2, description: "눈물에 담긴 이야기" },
  { id: "14", title: "검은 사슴", author: "한강", quantity: 1, description: "어둠 속의 사슴 이야기" },
  { id: "15", title: "회복하는 인간", author: "한강", quantity: 20, description: "회복과 치유의 여정" },
];


// 데이터를 수정하는 함수
export const updateBooks = (updatedBooks: typeof books) => {
  books = updatedBooks;
};

// 특정 책의 수량을 업데이트하는 함수
export const updateBookQuantity = (id: string, quantityChange: number) => {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex].quantity += quantityChange;

    // 수량이 0보다 작아지지 않도록 방지
    if (books[bookIndex].quantity < 0) {
      books[bookIndex].quantity = 0;
    }
  }
};
