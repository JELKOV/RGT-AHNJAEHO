"use client"

import React from "react";
import { useRouter } from "next/navigation";

// 책 데이터 타입 정의
type Book = {
  id: string;
  title: string;
  author: string;
};

// 책 목록 테이블 형태로 랜더링 및 수정 삭제 기능
const BookList = ({
  books, // 책 데이터 배열
  onDelete, // 삭제 하는 콜백 함수
}: {
  books: Book[];
  onDelete: (id: string) => void;
}) => {
  const router = useRouter();

  // 수정페이지로 이동
  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`); // App Router에 적합한 push
  };

  return (
    <table>
      <thead>
        <tr>
          <th>책 제목</th> 
          <th>저자</th> 
          <th>기능</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
              <button onClick={() => handleEdit(book.id)}>수정</button> 
              <button onClick={() => onDelete(book.id)}>삭제</button> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
