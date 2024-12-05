import Link from "next/link";
import "./styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 공통 레이아웃 */}
        <header
          style={{
            padding: "1rem",
            backgroundColor: "#0070f3",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>제호의 온라인 서점</h1>
          <nav>
            <Link href="/" style={navLinkStyle}>
              홈
            </Link>
            <Link href="/add" style={navLinkStyle}>
              책 추가
            </Link>
          </nav>
        </header>

        <main
          style={{
            padding: "1rem",
            minHeight: "calc(100vh - 200px)",
            backgroundColor: "#f9f9f9",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            padding: "1rem",
            backgroundColor: "#0070f3",
            color: "white",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>© 2024 제호의 온라인 서점. 모든 권리 보유.</p>
        </footer>
      </body>
    </html>
  );
}

// 네비게이션 링크 스타일링
const navLinkStyle: React.CSSProperties = {
  marginRight: "1rem",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};
