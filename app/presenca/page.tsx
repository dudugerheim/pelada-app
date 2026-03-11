"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PresencaPage() {
  const [jogadores, setJogadores] = useState<any[]>([]);
  const [selecionados, setSelecionados] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1fn6kJoYe9_oZaQPHhoX16QTshXBwH3XJDiq4IfqsZOY/jogadores"
    )
      .then((res) => res.json())
      .then((data) => setJogadores(data));
  }, []);

  function toggleJogador(jogador: any) {
    if (selecionados.includes(jogador)) {
      setSelecionados(selecionados.filter((j) => j !== jogador));
    } else {
      setSelecionados([...selecionados, jogador]);
    }
  }

  function gerarTimes() {
    localStorage.setItem("jogadoresPelada", JSON.stringify(selecionados));
    router.push("/gerar-times");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Presença da Pelada</h1>

      {jogadores.map((jogador) => (
        <div key={jogador.id}>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleJogador(jogador)}
            />
            {jogador.nome}
          </label>
        </div>
      ))}

      <div style={{ marginTop: "30px" }}>
        <strong>Confirmados:</strong> {selecionados.length}
      </div>

      <button
        style={{ marginTop: "20px", padding: "10px 20px" }}
        onClick={gerarTimes}
      >
        Gerar Times
      </button>
    </div>
  );
}