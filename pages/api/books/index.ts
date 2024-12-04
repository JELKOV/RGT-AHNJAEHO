import { NextApiRequest, NextApiResponse } from "next";
import { books, updateBooks } from "@/data/books"; // 책 데이터와 업데이트 함수 가져오기

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // [GET] 요청 처리: 모든 책 데이터 반환
  if (req.method === "GET") {
    res.status(200).json(books); // 현재 저장된 모든 책 데이터를 반환
  } 
  
  // [POST] 요청 처리: 새로운 책 데이터 추가
  else if (req.method === "POST") {
    const newBook = req.body; // 요청 본문에서 새로운 책 데이터를 가져옴
    const newId = `${books.length + 1}`; // 새로운 책에 고유 ID 부여
    const updatedBooks = [...books, { ...newBook, id: newId }]; // 기존 데이터에 새 책 데이터 추가
    updateBooks(updatedBooks); // 업데이트된 데이터 저장
    res.status(201).json({ ...newBook, id: newId }); // 추가된 책 데이터를 반환
  } 
  
  // 허용되지 않은 HTTP 메서드 처리
  else {
    res.setHeader("Allow", ["GET", "POST"]); // 허용된 메서드 목록 설정
    res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`); // 405 상태와 함께 메서드 정보 반환
  }
}
