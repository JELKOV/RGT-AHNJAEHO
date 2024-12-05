import React from "react";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  // 페이지 번호 범위 설정 
  const rangeSize = 5;
  const startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
  const endPage = Math.min(startPage + rangeSize - 1, totalPages);

  // 페이지 번호 생성
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: "0.5rem",
          backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
          color: "#fff",
        }}
      >
        이전
      </button>

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
          style={{
            padding: "0.5rem",
            backgroundColor: pageNumber === currentPage ? "#007bff" : "#fff",
            color: pageNumber === currentPage ? "#fff" : "#007bff",
            border: "1px solid #007bff",
          }}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "0.5rem",
          backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
          color: "#fff",
        }}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
