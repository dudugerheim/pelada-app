"use client";

import { useEffect, useState } from "react";

export default function RankingPage() {

  const [artilharia,setArtilharia] = useState<any[]>([]);
  const [assistencias,setAssistencias] = useState<any[]>([]);
  const [jogadores,setJogadores] = useState<any[]>([]);

  useEffect(()=>{

    const eventos = JSON.parse(localStorage.getItem("eventosPelada") || "[]");

    fetch("https://opensheet.elk.sh/1fn6kJoYe9_oZaQPHhoX16QTshXBwH3XJDiq4IfqsZOY/jogadores")
      .then(res=>res.json())
      .then(data=>{

        setJogadores(data);

        const gols:any = {};
        const assists:any = {};

        eventos.forEach((e:any)=>{

          gols[e.gol] = (gols[e.gol] || 0) + 1;

          if(e.assist){

            assists[e.assist] = (assists[e.assist] || 0) + 1;

          }

        });

        const listaArtilharia = Object.keys(gols).map(id=>{

          const jogador = data.find((j:any)=>String(j.id) === String(id));

          return {

            nome: jogador?.nome || "Jogador",
            gols: gols[id]

          };

        });

        const listaAssist = Object.keys(assists).map(id=>{

          const jogador = data.find((j:any)=>String(j.id) === String(id));

          return {

            nome: jogador?.nome || "Jogador",
            assist: assists[id]

          };

        });

        listaArtilharia.sort((a,b)=>b.gols-a.gols);
        listaAssist.sort((a,b)=>b.assist-a.assist);

        setArtilharia(listaArtilharia);
        setAssistencias(listaAssist);

      });

  },[]);

  return(

    <div style={{padding:"40px"}}>

      <h1>🏆 Ranking da Pelada</h1>

      <div style={{marginTop:"30px"}}>

        <h2>⚽ Artilharia</h2>

        <ol>

          {artilharia.map((j,index)=>(

            <li key={index}>

              {j.nome} — {j.gols} gols

            </li>

          ))}

        </ol>

      </div>

      <div style={{marginTop:"40px"}}>

        <h2>🎯 Assistências</h2>

        <ol>

          {assistencias.map((j,index)=>(

            <li key={index}>

              {j.nome} — {j.assist} assistências

            </li>

          ))}

        </ol>

      </div>

    </div>

  );

}