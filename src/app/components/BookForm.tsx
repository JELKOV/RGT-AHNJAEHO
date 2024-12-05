import React, { useState } from "react";

// BookForm 컴포넌트의 Props 타입 정의
interface BookFormProps {
  onSubmit: (data: { title: string; author: string; quantity: number; description?: string }) => void;
  initialValues?: { title: string; author: string; quantity: number; description?: string };
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialValues }) => {
  // 상태 관리
  const [title, setTitle] = useState(initialValues?.title || ""); // 책 제목
  const [author, setAuthor] = useState(initialValues?.author || ""); // 책 저자
  const [quantity, setQuantity] = useState(initialValues?.quantity || 0); // 책 수량
  const [description, setDescription] = useState(initialValues?.description || ""); // 책 설명

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // 유효성 검사 에러 메시지 상태

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "책 제목은 필수 입력 항목입니다.";
    if (!author.trim()) newErrors.author = "저자명은 필수 입력 항목입니다.";
    if (quantity < 0) newErrors.quantity = "수량은 0 이상이어야 합니다.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // 에러 메시지 업데이트
      return;
    }

    // 부모 컴포넌트로 데이터 전달
    onSubmit({ title, author, quantity, description });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* 책 제목 입력 필드 */}
      <div>
        <label htmlFor="title">책 제목:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="책 제목을 입력하세요"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.title && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.title}</p>}
      </div>

      {/* 저자명 입력 필드 */}
      <div>
        <label htmlFor="author">저자명:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="저자명을 입력하세요"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.author && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.author}</p>}
      </div>

      {/* 수량 입력 필드 */}
      <div>
        <label htmlFor="quantity">수량:</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          placeholder="책 수량을 입력하세요"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {errors.quantity && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.quantity}</p>}
      </div>

      {/* 설명 입력 필드 */}
      <div>
        <label htmlFor="description">설명:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="책에 대한 설명을 입력하세요 (선택 사항)"
          style={{ width: "100%", padding: "0.5rem", minHeight: "80px" }}
        />
      </div>

      {/* 제출 버튼 */}
      <button type="submit" style={{ padding: "0.75rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        저장
      </button>
    </form>
  );
};

export default BookForm;
