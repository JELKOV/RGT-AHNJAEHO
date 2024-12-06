"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { fetchBookByOne } from "@/app/utils/api"; // 책 상세 정보 API 호출

// Book 타입 정의
type Book = {
  id: string;
  title: string;
  author: string;
  quantity: number;
  description: string;
};

const BookDetailPage = () => {
  const params = useParams(); // URL의 동적 매개변수 가져오기
  const { id } = params as { id: string }; // 타입 단언

  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 책 정보를 로딩하는 함수
  const loadBookDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchBookByOne(id); // API 호출
      setBook(data); // 책 정보 저장
      setError(null);
    } catch (err) {
      console.error("책 상세 정보를 불러오는 데 실패했습니다:", err);
      setError("책 상세 정보를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [id]); // id가 변경될 때만 재호출

  // 컴포넌트가 마운트되거나 ID가 변경될 때 호출
  useEffect(() => {
    if (id) {
      loadBookDetail();
    }
  }, [id, loadBookDetail]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>책 상세 페이지</h2>
      {book ? (
        <div>
          <h3>{book.title}</h3>
          <p>
            <strong>저자:</strong> {book.author}
          </p>
          <p>
            <strong>수량:</strong> {book.quantity}
          </p>
          <p>
            <strong>설명:</strong> {book.description || "설명이 없습니다."}
          </p>
        </div>
      ) : (
        <div>책을 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default BookDetailPage;
