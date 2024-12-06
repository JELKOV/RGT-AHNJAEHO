"use client";

import React, { useEffect, useState } from "react";
import { fetchBookByOne, updateBook } from "@/app/utils/api"; // 책 데이터를 가져오고 업데이트하는 API 함수
import { useParams, useRouter } from "next/navigation"; // URL 파라미터 및 라우터를 위한 훅
import BookForm from "@/app/components/BookForm"; // 책 수정 폼 컴포넌트

// Book 타입 정의 - 책 데이터의 구조를 명확히 하기 위해 사용
type Book = {
  id: string;
  title: string;
  author: string;
  quantity: number;
  description: string;
};

const EditPage = () => {
  const params = useParams(); // URL의 동적 경로 파라미터를 가져옴
  const router = useRouter(); // 라우터를 사용하여 페이지 이동 처리

  // URL에서 책 ID를 추출, 배열일 경우 첫 번째 요소 선택
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // 책 데이터를 저장하는 상태
  const [book, setBook] = useState<Book | null>(null);

  // 에러 메시지를 저장하는 상태
  const [error, setError] = useState<string | null>(null);

  // 로딩 상태를 저장하는 상태
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 컴포넌트가 렌더링될 때 책 데이터를 로드
  useEffect(() => {
    const loadBook = async () => {
      if (!id) {
        // 책 ID가 없을 경우 에러 상태 업데이트 및 로딩 중지
        setError("유효한 책 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        // API 호출을 통해 책 데이터 가져오기
        const data = await fetchBookByOne(id);
        setBook(data); // 가져온 책 데이터를 상태로 설정
        setError(null); // 에러 초기화
      } catch (err) {
        console.error(`[EditPage] 책 데이터를 불러오는 데 실패했습니다:`, err);
        setError("책 데이터를 불러오는 데 실패했습니다."); // 에러 메시지 업데이트
      } finally {
        setIsLoading(false); // 로딩 중지
      }
    };

    loadBook(); // 책 데이터 로드 함수 실행
  }, [id]); // id가 변경될 때마다 함수 재실행

  // 책 데이터를 수정하여 저장하는 함수
  const handleSubmit = async (updatedData: {
    title: string;
    author: string;
    quantity: number;
    description?: string;
  }) => {
    if (!id) {
      // ID가 없을 경우 경고 메시지 출력 후 함수 종료
      alert("유효한 책 ID가 없습니다.");
      return;
    }

    try {
      setIsLoading(true); // 로딩 상태 활성화
      // 업데이트된 데이터를 Book 타입에 맞게 변환 (description 기본값 설정)
      const updatedBook: Book = {
        id, // URL에서 추출한 책 ID
        title: updatedData.title, // 수정된 책 제목
        author: updatedData.author, // 수정된 저자
        quantity: updatedData.quantity, // 수정된 수량
        description: updatedData.description || "", // 수정된 설명, 없을 경우 빈 문자열로 처리
      };

      // API 호출로 데이터 업데이트
      await updateBook(id, updatedBook);

      alert("책 수정이 완료되었습니다!"); // 성공 메시지 출력
      router.push("/"); // 수정 후 홈 페이지로 이동
    } catch (err) {
      console.error(`[EditPage] 책 데이터를 수정하는 데 실패했습니다:`, err);
      alert("책 수정에 실패했습니다."); // 실패 메시지 출력
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>제호의 온라인 서점 책 수정</h1>
      {/* 에러 메시지 표시 */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* 로딩 중일 때 메시지 표시 */}
      {isLoading ? (
        <p>책 데이터를 불러오는 중...</p>
      ) : book ? (
        // 책 데이터를 BookForm 컴포넌트에 전달
        <BookForm
          onSubmit={handleSubmit} // 데이터 저장 함수 전달
          initialValues={{
            title: book.title, // 초기 값으로 책 제목 전달
            author: book.author, // 초기 값으로 저자 전달
            quantity: book.quantity, // 초기 값으로 수량 전달
            description: book.description, // 초기 값으로 설명 전달
          }}
        />
      ) : (
        <p>해당 책을 찾을 수 없습니다.</p> // 책 데이터가 없을 경우 메시지 표시
      )}
    </div>
  );
};

export default EditPage;
