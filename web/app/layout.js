export const metadata = {
  title: "백제 비밀 탐험대",
  description: "부여·공주 현장학습 탐험 앱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
