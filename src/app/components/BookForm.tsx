import React, { useState } from "react";

// BookForm 컴포넌트의 Props 타입 정의
// 부모 컴포넌트에서 onSubmit으로 데이터를 전달받고, initialValues로 초기 데이터를 설정할 수 있음
interface BookFormProps {
  onSubmit: (data: {
    title: string; // 책 제목
    author: string; // 저자명
    quantity: number; // 책 수량
    description?: string; // 책 설명 (선택적 필드)
  }) => void;
  initialValues?: {
    title: string; // 초기 책 제목
    author: string; // 초기 저자명
    quantity: number; // 초기 책 수량
    description?: string; // 초기 책 설명
  };
}

// BookForm 컴포넌트 정의
const BookForm: React.FC<BookFormProps> = ({
  onSubmit,
  initialValues = { title: "", author: "", quantity: 0, description: "" }, // 기본 초기값 설정
}) => {
  // 상태 관리 - 입력 필드와 연결된 상태
  const [title, setTitle] = useState(initialValues.title); // 책 제목
  const [author, setAuthor] = useState(initialValues.author); // 저자명
  const [quantity, setQuantity] = useState(initialValues.quantity); // 책 수량
  const [description, setDescription] = useState(initialValues.description); // 책 설명

  // 유효성 검사 에러 메시지를 관리하는 상태
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 유효성 검사 - 각 필드에 대해 조건 검사
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "책 제목은 필수 입력 항목입니다.";
    if (!author.trim()) newErrors.author = "저자명은 필수 입력 항목입니다.";
    if (quantity < 0) newErrors.quantity = "수량은 0 이상이어야 합니다.";

    // 에러가 있으면 상태를 업데이트하고 제출 중단
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 에러가 없을 경우 부모 컴포넌트로 데이터 전달
    onSubmit({ title, author, quantity, description: description || undefined });
  };

  return (
    <form
      onSubmit={handleSubmit} // 폼 제출 이벤트 핸들러 연결
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* 책 제목 입력 필드 */}
      <div>
        <label htmlFor="title">책 제목:</label>
        <input
          id="title"
          type="text"
          value={title} // 상태와 연결된 값
          onChange={(e) => setTitle(e.target.value)} // 입력값 변경 시 상태 업데이트
          placeholder="책 제목을 입력하세요"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {/* 유효성 검사 에러 메시지 출력 */}
        {errors.title && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.title}</p>}
      </div>

      {/* 저자명 입력 필드 */}
      <div>
        <label htmlFor="author">저자명:</label>
        <input
          id="author"
          type="text"
          value={author} // 상태와 연결된 값
          onChange={(e) => setAuthor(e.target.value)} // 입력값 변경 시 상태 업데이트
          placeholder="저자명을 입력하세요"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {/* 유효성 검사 에러 메시지 출력 */}
        {errors.author && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.author}</p>}
      </div>

      {/* 수량 입력 필드 */}
      <div>
        <label htmlFor="quantity">수량:</label>
        <input
          id="quantity"
          type="number"
          value={quantity} // 상태와 연결된 값
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} // 입력값 변경 시 상태 업데이트
          placeholder="책 수량을 입력하세요"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {/* 유효성 검사 에러 메시지 출력 */}
        {errors.quantity && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.quantity}</p>}
      </div>

      {/* 설명 입력 필드 */}
      <div>
        <label htmlFor="description">설명:</label>
        <textarea
          id="description"
          value={description} // 상태와 연결된 값
          onChange={(e) => setDescription(e.target.value)} // 입력값 변경 시 상태 업데이트
          placeholder="책에 대한 설명을 입력하세요 (선택 사항)"
          style={{ width: "100%", padding: "0.5rem", minHeight: "80px" }}
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        style={{
          padding: "0.75rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        저장
      </button>
    </form>
  );
};

export default BookForm;
