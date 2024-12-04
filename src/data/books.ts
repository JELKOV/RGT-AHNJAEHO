// 더미 데이터 공유 모듈
export let books = [
    { id: "1", title: "첫 번째 책", author: "첫 번째 저자" },
    { id: "2", title: "두 번째 책", author: "두 번째 저자" },
  ];
  
  // 데이터를 수정하는 함수
  export const updateBooks = (updatedBooks: typeof books) => {
    books = updatedBooks;
  };
  