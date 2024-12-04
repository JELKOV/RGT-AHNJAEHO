import { NextApiRequest, NextApiResponse } from "next";
import { books, updateBooks } from "@/data/books"; // 책 데이터와 업데이트 함수 가져오기

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // 요청 URL에서 ID를 가져옴

  // ID에 해당하는 책 데이터의 인덱스를 찾음
  const bookIndex = books.findIndex((book) => book.id === id);

  // [GET] 요청 처리: 특정 ID의 책 데이터 조회
  if (req.method === "GET") {
    if (bookIndex === -1) {
      // 책을 찾을 수 없으면 404 응답
      return res.status(404).json({ message: "책을 찾을 수 없습니다." });
    } else {
      // 책을 찾으면 해당 데이터를 반환
      return res.status(200).json(books[bookIndex]);
    }
  } 
  
  // [PUT] 요청 처리: 특정 ID의 책 데이터 수정
  else if (req.method === "PUT") {
    if (bookIndex === -1) {
      // 책을 찾을 수 없으면 404 응답
      return res.status(404).json({ message: "책을 찾을 수 없습니다." });
    } else {
      // 기존 책 데이터를 새로운 데이터로 업데이트
      const updatedBook = { ...books[bookIndex], ...req.body };
      const updatedBooks = books.map((book, index) =>
        index === bookIndex ? updatedBook : book
      );
      updateBooks(updatedBooks); // 데이터 전체를 업데이트
      return res.status(200).json(updatedBook); // 수정된 데이터를 반환
    }
  } 
  
  // [DELETE] 요청 처리: 특정 ID의 책 데이터 삭제
  else if (req.method === "DELETE") {
    if (bookIndex === -1) {
      // 책을 찾을 수 없으면 404 응답
      return res.status(404).json({ message: "책을 찾을 수 없습니다." });
    } else {
      // 책 데이터를 삭제하고 나머지 데이터를 유지
      const updatedBooks = books.filter((book) => book.id !== id);
      updateBooks(updatedBooks); // 데이터 전체를 업데이트
      return res.status(204).end(); // 성공적으로 삭제된 경우 204 응답
    }
  } 
  
  // 허용되지 않은 HTTP 메서드 처리
  else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]); // 허용된 메서드 목록 설정
    return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`); // 405 응답
  }
}
