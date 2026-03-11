"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial" }}>
      <h1>⚽ Pelada Manager</h1>

      <div style={{ display: "grid", gap: "15px", marginTop: "30px" }}>
        <Link href="/presenca"><button style={botao}>Nova Pelada</button></Link>
        <Link href="/ranking"><button style={botao}>Ranking</button></Link>
        <Link href="/gerar-times"><button style={botao}>Gerar Times</button></Link>
        <Link href="/pelada"><button style={botao}>Tela da Pelada</button></Link>
      </div>
    </div>
  );
}

const botao = {
  padding: "18px",
  fontSize: "18px",
  borderRadius: "10px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer"
};