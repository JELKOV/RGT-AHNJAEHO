"use client";

import React, { useState, useEffect } from "react";
import { fetchBooks, deleteBook } from "@/app/utils/api";
import BookList from "@/app/components/BookList";

const HomePage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const data = await fetchBooks(); // API 호출
        setBooks(data);
        setError(null); // 에러 초기화
      } catch (err) {
        console.error("책 데이터를 불러오는 데 실패했습니다:", err);
        setError("책 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    loadBooks();
  }, []);

  // 삭제 기능 구현
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true); // 로딩 시작
      await deleteBook(id); // API 호출로 책 데이터 삭제
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id)); // 로컬 상태에서 삭제
      setError(null);
    } catch (err) {
      console.error(`책 ID ${id} 삭제 중 오류 발생:`, err);
      setError("책을 삭제하는 데 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div>
      <h2>책 목록</h2>
      {isLoading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && !error && books.length === 0 && <p>등록된 책이 없습니다.</p>}
      {!isLoading && !error && (
        <BookList books={books} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default HomePage;
