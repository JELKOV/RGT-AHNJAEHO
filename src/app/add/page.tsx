"use client";

import React from "react";
import BookForm from "@/app/components/BookForm";
import { addBook } from "@/app/utils/api";
import { useRouter } from "next/navigation";

const AddBookPage = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await addBook(data);
    alert("새로운 책이 추가 되었습니다!");
    router.push("/");
  };

  return (
    <div>
      <h1>제호의 서점 책 추가</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBookPage;
