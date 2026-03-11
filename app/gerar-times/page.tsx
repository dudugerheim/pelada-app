"use client";

import { useEffect, useState } from "react";

export default function GerarTimesPage() {
  const [jogadores, setJogadores] = useState<any[]>([]);
  const [times, setTimes] = useState<any[]>([]);
  const [numeroTimes, setNumeroTimes] = useState(3);

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1fn6kJoYe9_oZaQPHhoX16QTshXBwH3XJDiq4IfqsZOY/jogadores"
    )
      .then((res) => res.json())
      .then((data) => setJogadores(data));
  }, []);

  function embaralhar(array: any[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function gerarTimes() {
    const listaTimes = Array.from({ length: numeroTimes }, () => ({
      jogadores: [],
      forca: 0,
    }));

    const embaralhados = embaralhar(jogadores);

    embaralhados.forEach((jogador) => {
      const timeMaisFraco = listaTimes.sort((a, b) => a.forca - b.forca)[0];

      timeMaisFraco.jogadores.push(jogador);
      timeMaisFraco.forca += Number(jogador.overall);
    });

    setTimes([...listaTimes]);

    // salva os times para a página da pelada
    localStorage.setItem("timesPelada", JSON.stringify(listaTimes));
  }

  function iniciarPelada() {
    window.location.href = "/pelada";
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Gerar Times</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Número de times: </label>

        <select
          value={numeroTimes}
          onChange={(e) => setNumeroTimes(Number(e.target.value))}
        >
          <option value={3}>3 times</option>
          <option value={4}>4 times</option>
        </select>
      </div>

      <button onClick={gerarTimes} style={{ padding: "10px 20px" }}>
        Gerar Times
      </button>

      <div style={{ marginTop: "40px" }}>
        {times.map((time, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <h2>Time {index + 1}</h2>
            <div>Força total: {time.forca}</div>

            <ul>
              {time.jogadores.map((jogador: any) => (
                <li key={jogador.id}>
                  {jogador.nome} ({jogador.overall})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {times.length > 0 && (
        <button
          onClick={iniciarPelada}
          style={{ marginTop: "20px", padding: "12px 24px", fontSize: "16px" }}
        >
          Iniciar Pelada
        </button>
      )}
    </div>
  );
}