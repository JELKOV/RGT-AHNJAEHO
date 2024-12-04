import React, { useState } from "react";

// BookForm 컴포넌트는 책 정보를 입력받고 제출하는 폼 역할을 수행
// onSubmit 함수를 통해 부모 컴포넌트로 데이터를 전달

const BookForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  // 책 제목과 저자 정보를 상태로 관리
  const [title, setTitle] = useState(""); // 책 제목 상태
  const [author, setAuthor] = useState(""); // 저자 이름 상태

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    onSubmit({ title, author }); // 입력된 데이터를 부모 컴포넌트로 전달
  };

  return (
    // 폼 요소
    <form onSubmit={handleSubmit}>
      {/* 책 제목 입력 필드 */}
      <input
        type="text" // 입력 필드 타입
        value={title} // 상태에 따라 입력 값 설정
        onChange={(e) => setTitle(e.target.value)} // 입력 값 변경 시 상태 업데이트
        placeholder="책이름" // 사용자에게 표시될 힌트 텍스트
      />
      {/* 저자명 입력 필드 */}
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="저자명"
      />
      {/* 제출 버튼 */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
