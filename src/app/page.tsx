"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchBooks, deleteBook, changeBookQuantity } from "@/app/utils/api";
import BookList from "@/app/components/BookList";
import Pagination from "@/app/components/Pagination";

// Book 타입 정의
type Book = {
  id: string;
  title: string;
  author: string;
  quantity: number;
  description: string;
};

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
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
  const loadBooks = useCallback(async () => {
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
  }, [filters]); // filters 상태가 변경될 때만 호출

  // 필터 및 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // 삭제 기능 구현
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

    // 페이지네이션 처리: 만약 현재 페이지에 책이 1개 미만이면 이전 페이지로 이동
    if (books.length <= 1 && filters.page > 1) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: prevFilters.page - 1,
      }));
    }

      setError(null);
    } catch (err) {
      console.error(`책 ID ${id} 삭제 중 오류 발생:`, err);
      setError("책을 삭제하는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 수량 증가
  const handleIncreaseQuantity = async (id: string) => {
    // 로컬 상태 업데이트
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, quantity: book.quantity + 1 } : book
      )
    );

    // 서버에 수량 변경 요청
    try {
      await changeBookQuantity(id, 1); // 수량 증가 요청 (quantityChange = 1)
    } catch (err) {
      console.error("수량 업데이트 실패:", err);
      setError("수량 업데이트에 실패했습니다.");
    }
  };

  // 수량 감소
  const handleDecreaseQuantity = async (id: string) => {
    // 로컬 상태 업데이트
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id && book.quantity > 0
          ? { ...book, quantity: book.quantity - 1 }
          : book
      )
    );

    // 서버에 수량 변경 요청
    try {
      await changeBookQuantity(id, -1); // 수량 감소 요청 (quantityChange = -1)
    } catch (err) {
      console.error("수량 업데이트 실패:", err);
      setError("수량 업데이트에 실패했습니다.");
    }
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
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page, // 새로운 페이지 번호 설정
      }));
    }
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
          {/* 페이지네이션 컴포넌트 */}
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
