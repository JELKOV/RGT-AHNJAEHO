"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

// 책 데이터 타입 정의
interface Book {
  id: string; // 책 고유 ID
  title: string; // 책 제목
  author: string; // 책 저자
  quantity: number; // 책 수량
}

// BookList 컴포넌트 Props 타입 정의
interface BookListProps {
  books: Book[]; // 책 데이터 배열
  onDelete: (id: string) => void; // 삭제 기능 콜백 함수
  onIncreaseQuantity: (id: string) => void; // 수량 증가 콜백 함수
  onDecreaseQuantity: (id: string) => void; // 수량 감소 콜백 함수
}

// 책 목록 테이블 형태로 랜더링 및 수정/삭제/수량 조절 기능 구현
const BookList: React.FC<BookListProps> = ({
  books,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const router = useRouter(); // Next.js의 라우터 훅 사용

  // 수정 페이지로 이동하는 함수
  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`); 
  };

  return (
    <table>
      <thead>
        <tr>
          <th>책 제목</th>
          <th>저자</th>
          <th>수량</th>
          <th>기능</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>
              <Link href={`/${book.id}`}>{book.title}</Link> {/* 상세 페이지 링크 추가 */}
            </td>
            <td>{book.author || "-"}</td>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => onDecreaseQuantity(book.id)}
                  disabled={book.quantity === 0}
                  style={{
                    padding: "0.3rem",
                    marginRight: "0.5rem",
                    cursor: book.quantity === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  -
                </button>
                <span>{book.quantity}</span>
                <button
                  onClick={() => onIncreaseQuantity(book.id)}
                  style={{
                    padding: "0.3rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  +
                </button>
              </div>
            </td>
            <td>
              <button onClick={() => handleEdit(book.id)} style={{ marginRight: "0.5rem" }}>
                수정
              </button>
              <button onClick={() => onDelete(book.id)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
