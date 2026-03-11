"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a página de gerar times
    router.push("/gerar-times");
  }, [router]);

  return <div>Redirecionando...</div>;
}