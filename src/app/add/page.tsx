"use client";

import React from "react";
import BookForm from "@/app/components/BookForm"; // 책 정보를 입력받는 폼 컴포넌트
import { addBook } from "@/app/utils/api"; // 책 추가 API 호출 유틸리티
import { useRouter } from "next/navigation"; // App Router에서 페이지 이동을 위한 라우터

// 새로운 책 추가 페이지
const AddBookPage = () => {
  const router = useRouter(); // App Router의 라우터 훅 사용

  // 책 추가 폼 제출 처리 함수
  const handleSubmit = async (data: { title: string; author: string; quantity: number; description?: string }) => {
    try {
      await addBook(data); // API 호출로 새로운 책 추가
      alert("새로운 책이 추가되었습니다!"); // 성공 메시지 알림
      router.push("/"); // 홈 페이지로 이동
    } catch (error) {
      console.error("책 추가 중 오류 발생:", error);
      alert("책을 추가하는 데 실패했습니다.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>제호의 서점 책 추가</h1>
      {/* 책 추가 폼 컴포넌트 */}
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBookPage;
