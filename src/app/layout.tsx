import "./styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", backgroundColor: "#f4f4f4" }}>
          <h1>제호의 온라인 서점</h1>
          <nav>
            <a href="/" style={{ marginRight: "1rem" }}>홈</a>
            <a href="/add">책 추가</a>
          </nav>
        </header>
        <main style={{ padding: "1rem" }}>{children}</main>
        <footer style={{ padding: "1rem", backgroundColor: "#f4f4f4" }}>
          <p>© 2024 제호의 온라인 서점. 모든 권리 보유.</p>
        </footer>
      </body>
    </html>
  );
}
