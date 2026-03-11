"use client";

import { useEffect, useState } from "react";

type Jogador = {
  id: string;
  nome: string;
  overall: number;
  gols: number;
  assistencias: number;
};

type Time = {
  jogadores: Jogador[];
  forca: number;
  cor: string;
};

export default function PeladaPage() {
  const [segundos, setSegundos] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [times, setTimes] = useState<Time[]>([]);

  // Cronômetro
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rodando) {
      timer = setInterval(() => setSegundos((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [rodando]);

  // Carregar times do localStorage
  useEffect(() => {
    const data = localStorage.getItem("timesPelada");
    if (data) {
      const timesSalvos: Time[] = JSON.parse(data);
      // inicializa gols e assistencias
      timesSalvos.forEach((t) =>
        t.jogadores.forEach((j) => {
          j.gols = 0;
          j.assistencias = 0;
        })
      );
      setTimes(timesSalvos);
    }
  }, []);

  // Formatar tempo
  const formatar = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Marcar gol
  const marcarGol = (timeIndex: number, jogadorIndex: number) => {
    const novaLista = [...times];
    novaLista[timeIndex].jogadores[jogadorIndex].gols += 1;
    setTimes(novaLista);
    salvarLocalStorage(novaLista);
  };

  // Marcar assistência
  const marcarAssistencia = (timeIndex: number, jogadorIndex: number) => {
    const novaLista = [...times];
    novaLista[timeIndex].jogadores[jogadorIndex].assistencias += 1;
    setTimes(novaLista);
    salvarLocalStorage(novaLista);
  };

  // Salvar no localStorage
  const salvarLocalStorage = (lista: Time[]) => {
    localStorage.setItem("peladaAtual", JSON.stringify(lista));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pelada</h1>

      <div className="text-5xl font-mono mb-6">{formatar(segundos)}</div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setRodando(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Iniciar
        </button>
        <button
          onClick={() => setRodando(false)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Pausar
        </button>
        <button
          onClick={() => setSegundos(0)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Zerar
        </button>
      </div>

      {times.map((time, tIndex) => (
        <div key={tIndex} className="mb-6 p-4 rounded" style={{ backgroundColor: time.cor }}>
          <h2 className="text-xl font-bold mb-2">Time {tIndex + 1}</h2>
          <ul>
            {time.jogadores.map((jogador, jIndex) => (
              <li key={jogador.id} className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span>
                    {jogador.nome} — Gols: {jogador.gols} | Assistências: {jogador.assistencias}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => marcarGol(tIndex, jIndex)}
                      className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800"
                    >
                      +Gol
                    </button>
                    <button
                      onClick={() => marcarAssistencia(tIndex, jIndex)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      +Assist
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}