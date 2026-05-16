import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "FixHop | Service Request Board",
  description: "Post and browse home service requests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-indigo-700 tracking-tight">
              FixHop
            </Link>
            <Link
              href="/jobs/new"
              className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              + Post a Request
            </Link>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="text-center text-gray-400 text-sm py-8">
          FixHop Mini Service Request Board
        </footer>
      </body>
    </html>
  );
}
