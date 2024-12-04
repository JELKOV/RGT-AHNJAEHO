"use client";

import React, { useEffect, useState } from "react"; 
import { fetchBookByOne, updateBook } from "@/app/utils/api";
import { useRouter } from "next/router";
import BookForm from "@/app/components/BookForm";

const EditPage = () => {
  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  // id가 변경될시 실행
  useEffect(() => {
    console.log(`[EditPage] 라우터에서 전달된 ID: ${id}`);


    const loadBook = async () => {
      if (!id) {
        console.warn("[EditPage] ID가 없습니다. 데이터를 가져오지 않습니다.");
        return;
      }

      try {
        console.log(`[EditPage] 책 데이터를 가져오는 중... (ID: ${id})`);
        const data = await fetchBookByOne(id as string);
        console.log(`[EditPage] 책 데이터를 성공적으로 가져왔습니다:`, data);
        setBook(data);
      } catch (err) {
        console.error(`[EditPage] 책 데이터를 가져오는 데 실패했습니다. (ID: ${id})`, err);
        setError("책 데이터를 불러오는 데 실패했습니다.");
      }
    };

    loadBook();
  }, [id]);


  // 데이터 수정시 실행 함수
  const handleSubmit = async (data: any) => {
    console.log(`[EditPage] 책 데이터를 수정합니다. (ID: ${id}) 데이터:`, data);
    try {
      await updateBook(id as string, data);
      console.log(`[EditPage] 책 데이터를 성공적으로 수정했습니다. (ID: ${id})`);
      alert("책 수정이 완료되었습니다!");
      router.push("/"); // 수정 후 메인페이지로 이동
    } catch (err) {
      console.error(`[EditPage] 책 데이터를 수정하는 데 실패했습니다. (ID: ${id})`, err);
      alert("책 수정에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>제호의 온라인 서점 책 수정</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {book ? (
        <BookForm onSubmit={handleSubmit} />
      ) : (
        <p>책 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default EditPage;
