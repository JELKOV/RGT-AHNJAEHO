"use client";

import React, { useEffect, useState } from "react";
import { fetchBookByOne, updateBook } from "@/app/utils/api"; // API 호출 유틸리티
import { useParams, useRouter } from "next/navigation"; // URL 파라미터와 라우터 네비게이션
import BookForm from "@/app/components/BookForm"; // 책 폼 컴포넌트

// Book 타입 정의
type Book = {
  id: string;
  title: string;
  author: string;
  quantity: number;
  description: string;
};

const EditPage = () => {
  const params = useParams(); // 동적 경로에서 파라미터 가져오기
  const router = useRouter(); // 네비게이션 사용

  const id = Array.isArray(params.id) ? params.id[0] : params.id; // 배열 또는 undefined 처리
  const [book, setBook] = useState<Book | null>(null); // 책 데이터 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 관리
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리

  // 책 데이터를 로드하는 함수
  useEffect(() => {
    const loadBook = async () => {
      if (!id) {
        setError("유효한 책 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchBookByOne(id); // API 호출로 책 데이터 가져오기
        setBook(data); // 상태 업데이트
        setError(null); // 에러 초기화
      } catch (err) {
        console.error(`[EditPage] 책 데이터를 불러오는 데 실패했습니다:`, err);
        setError("책 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [id]);

  // 데이터 수정 처리 함수
  const handleSubmit = async (updatedData: { title: string; author: string; quantity: number; description?: string }) => {
    if (!id) {
      alert("유효한 책 ID가 없습니다.");
      return;
    }

    try {
      setIsLoading(true);
      await updateBook(id, updatedData); // API 호출로 책 데이터 수정
      alert("책 수정이 완료되었습니다!");
      router.push("/"); // 수정 후 홈으로 이동
    } catch (err) {
      console.error(`[EditPage] 책 데이터를 수정하는 데 실패했습니다:`, err);
      alert("책 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>제호의 온라인 서점 책 수정</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* 에러 메시지 */}
      {isLoading ? (
        <p>책 데이터를 불러오는 중...</p> // 로딩 중 표시
      ) : book ? (
        <BookForm
          onSubmit={handleSubmit}
          initialValues={{
            title: book.title,
            author: book.author,
            quantity: book.quantity,
            description: book.description,
          }}
        />
      ) : (
        <p>해당 책을 찾을 수 없습니다.</p> // 데이터가 없을 때 표시
      )}
    </div>
  );
};

export default EditPage;
