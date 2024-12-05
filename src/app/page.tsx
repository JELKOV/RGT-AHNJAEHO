"use client";

import React, { useState, useEffect } from "react";
import { fetchBooks, deleteBook } from "@/app/utils/api";
import BookList from "@/app/components/BookList";

const HomePage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    page: 1,
    limit: 10,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  // API 호출로 책 데이터 가져오기
  const loadBooks = async () => {
    try {
      setIsLoading(true);
      const data = await fetchBooks(filters);
      setBooks(data.books);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error("책 데이터를 불러오는 데 실패했습니다:", err);
      setError("책 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 필터 및 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    loadBooks();
  }, [filters]);

  // 삭제 기능 구현
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      setError(null);
    } catch (err) {
      console.error(`책 ID ${id} 삭제 중 오류 발생:`, err);
      setError("책을 삭제하는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 수량 증가
  const handleIncreaseQuantity = (id: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, quantity: book.quantity + 1 } : book
      )
    );
  };

  // 수량 감소
  const handleDecreaseQuantity = (id: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id && book.quantity > 0
          ? { ...book, quantity: book.quantity - 1 }
          : book
      )
    );
  };

  // 필터 값 변경 핸들러
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: 1,
    }));
  };

  // 필터 초기화 핸들러
  const handleResetFilters = () => {
    setFilters({
      title: "",
      author: "",
      page: 1,
      limit: 10,
    });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2>책 목록 관리</h2>
      {/* 필터 입력 */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          name="title"
          placeholder="제목 검색"
          value={filters.title}
          onChange={handleFilterChange}
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          name="author"
          placeholder="저자 검색"
          value={filters.author}
          onChange={handleFilterChange}
          style={{ padding: "0.5rem" }}
        />
        <button
          onClick={handleResetFilters}
          style={{ padding: "0.5rem", backgroundColor: "#ccc" }}
        >
          필터 초기화
        </button>
      </div>
      {isLoading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && books.length === 0 && <p>등록된 책이 없습니다.</p>}
      {!isLoading && !error && (
        <>
          <BookList
            books={books}
            onDelete={handleDelete}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
          {/* 페이지네이션 */}
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1 || isLoading}
              style={{
                padding: "0.5rem",
                backgroundColor: filters.page === 1 ? "#ccc" : "#007bff",
                color: "#fff",
              }}
            >
              이전
            </button>
            <span>
              페이지 {filters.page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === totalPages || isLoading}
              style={{
                padding: "0.5rem",
                backgroundColor:
                  filters.page === totalPages ? "#ccc" : "#007bff",
                color: "#fff",
              }}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
