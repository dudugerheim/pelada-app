"use client";

import { useEffect, useState } from "react";

type Jogador = {
  id: string;
  nome: string;
  ataque: number;
  defesa: number;
  passe: number;
  velocidade: number;
  folego: number;
  habilidade: number;
  overall: number;
};

type Time = {
  jogadores: Jogador[];
  forca: number;
  cor: string;
};

export default function GerarTimesPage() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [numeroTimes, setNumeroTimes] = useState(3);

  const cores = ["#f87171", "#60a5fa", "#34d399", "#fbbf24"]; // cores para até 4 times

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1fn6kJoYe9_oZaQPHhoX16QTshXBwH3XJDiq4IfqsZOY/jogadores"
    )
      .then((res) => res.json())
      .then((data) => setJogadores(data));
  }, []);

  function embaralhar(array: Jogador[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function gerarTimes() {
    const listaTimes: Time[] = Array.from({ length: numeroTimes }, (_, i) => ({
      jogadores: [],
      forca: 0,
      cor: cores[i],
    }));

    const embaralhados = embaralhar(jogadores);

    embaralhados.forEach((jogador) => {
      const timeMaisFraco = listaTimes.sort((a, b) => a.forca - b.forca)[0];
      timeMaisFraco.jogadores.push(jogador);
      timeMaisFraco.forca += Number(jogador.overall);
    });

    setTimes([...listaTimes]);
    localStorage.setItem("timesPelada", JSON.stringify(listaTimes));
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Gerar Times</h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Número de times:</label>
        <select
          value={numeroTimes}
          onChange={(e) => setNumeroTimes(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value={3}>3 times</option>
          <option value={4}>4 times</option>
        </select>
      </div>

      <button
        onClick={gerarTimes}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
      >
        Gerar Times
      </button>

      {times.map((time, index) => (
        <div key={index} className="mb-6 p-4 rounded" style={{ backgroundColor: time.cor }}>
          <h2 className="text-xl font-bold mb-2">Time {index + 1}</h2>
          <div className="mb-2">Força total: {time.forca}</div>
          <ul>
            {time.jogadores.map((jogador) => (
              <li key={jogador.id}>
                {jogador.nome} ({jogador.overall})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}