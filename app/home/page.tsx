"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Bem-vindo à Pelada App!</h1>
      <nav style={{ marginTop: "20px" }}>
        <ul>
          <li><Link href="/gerar-times">Gerar Times</Link></li>
          <li><Link href="/pelada">Pelada</Link></li>
          <li><Link href="/ranking">Ranking</Link></li>
          <li><Link href="/presenca">Presença</Link></li>
          <li><Link href="/jogadores">Jogadores</Link></li>
        </ul>
      </nav>
    </div>
  );
}