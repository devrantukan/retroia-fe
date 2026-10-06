import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-2xl font-bold">Sayfa Bulunamadı</h1>
      <p className="mb-6 text-gray-600">Aradığınız sayfa mevcut değil.</p>
      <Link href="/" className="text-blue-950 underline">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
