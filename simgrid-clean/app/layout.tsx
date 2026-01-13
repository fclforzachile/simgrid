import "./globals.css";

export const metadata = {
  title: "SimGrid",
  description: "Race. Win. Rise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
