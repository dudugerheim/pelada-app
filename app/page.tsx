"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Bem-vindo à Pelada!</h1>
      <p className="text-center mb-8">
        Organize seus jogos, monte times automaticamente e marque gols.
      </p>
      <button
        onClick={() => router.push("/gerar-times")}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
      >
        Gerar Times
      </button>
    </div>
  );
}