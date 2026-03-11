"use client";

import { useEffect, useState } from "react";

export default function PeladaPage() {

  const [timeA,setTimeA] = useState<any>(null);
  const [timeB,setTimeB] = useState<any>(null);
  const [esperando,setEsperando] = useState<any>(null);

  const [placarA,setPlacarA] = useState(0);
  const [placarB,setPlacarB] = useState(0);

  const [partida,setPartida] = useState(1);

  const [tempo,setTempo] = useState(420);
  const [rodando,setRodando] = useState(false);

  const [modalGol,setModalGol] = useState(false);
  const [timeGol,setTimeGol] = useState<number | null>(null);

  const [jogadorGol,setJogadorGol] = useState("");
  const [assistencia,setAssistencia] = useState("");

  const [eventos,setEventos] = useState<any[]>([]);

  useEffect(()=>{

    const dados = localStorage.getItem("timesPelada");

    if(!dados) return;

    const lista = JSON.parse(dados);

    if(lista.length >=3){

      setTimeA(lista[0]);
      setTimeB(lista[1]);
      setEsperando(lista[2]);

    }

    const eventosSalvos = localStorage.getItem("eventosPelada");

    if(eventosSalvos){

      setEventos(JSON.parse(eventosSalvos));

    }

  },[]);

  useEffect(()=>{

    if(!rodando) return;

    const timer = setInterval(()=>{

      setTempo((t)=>{

        if(t <= 1){

          clearInterval(timer);

          finalizar("tempo");

          return 0;

        }

        return t - 1;

      });

    },1000);

    return ()=>clearInterval(timer);

  },[rodando]);

  function formatarTempo(seg:number){

    const min = Math.floor(seg/60);
    const sec = seg%60;

    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

  }

  function abrirModal(time:number){

    setTimeGol(time);
    setJogadorGol("");
    setAssistencia("");
    setModalGol(true);

  }

  function confirmarGol(){

    if(!jogadorGol) return;

    const novoEvento = {

      partida,
      time: timeGol,
      gol: jogadorGol,
      assist: assistencia || null

    };

    const novosEventos = [...eventos,novoEvento];

    setEventos(novosEventos);

    localStorage.setItem("eventosPelada",JSON.stringify(novosEventos));

    if(timeGol === 1){

      const novo = placarA + 1;

      setPlacarA(novo);

      if(novo >= 2){

        finalizar("A");

      }

    }else{

      const novo = placarB + 1;

      setPlacarB(novo);

      if(novo >= 2){

        finalizar("B");

      }

    }

    setModalGol(false);

  }

  function resetPlacar(){

    setPlacarA(0);
    setPlacarB(0);

  }

  function resetTempo(){

    setRodando(false);
    setTempo(420);

  }

  function finalizar(vencedor:any){

    let novoA;
    let novoB;
    let novoEsperando;

    if(vencedor === "A"){

      novoA = timeA;
      novoB = esperando;
      novoEsperando = timeB;

    }else if(vencedor === "B"){

      novoA = timeB;
      novoB = esperando;
      novoEsperando = timeA;

    }else{

      novoA = timeA;
      novoB = esperando;
      novoEsperando = timeB;

    }

    setTimeA(novoA);
    setTimeB(novoB);
    setEsperando(novoEsperando);

    resetPlacar();
    resetTempo();

    setPartida(partida + 1);

  }

  if(!timeA || !timeB){

    return <div style={{padding:"40px"}}>Carregando...</div>;

  }

  const jogadoresGol = timeGol === 1 ? timeA.jogadores : timeB.jogadores;

  return(

    <div style={{padding:"40px"}}>

      <h1>⚽ Pelada</h1>

      <h2>Partida {partida}</h2>

      <h2 style={{marginTop:"20px"}}>

        ⏱ {formatarTempo(tempo)}

      </h2>

      <div style={{marginTop:"10px"}}>

        <button onClick={()=>setRodando(true)} style={{marginRight:"10px"}}>

          ▶ Iniciar

        </button>

        <button onClick={()=>setRodando(false)} style={{marginRight:"10px"}}>

          ⏸ Pausar

        </button>

        <button onClick={resetTempo}>

          🔄 Reset

        </button>

      </div>

      <h3 style={{marginTop:"30px"}}>Time 1</h3>

      <ul>
        {timeA.jogadores.map((j:any)=>(
          <li key={j.id}>{j.nome}</li>
        ))}
      </ul>

      <h3>Time 2</h3>

      <ul>
        {timeB.jogadores.map((j:any)=>(
          <li key={j.id}>{j.nome}</li>
        ))}
      </ul>

      <h3>Esperando</h3>

      <ul>
        {esperando?.jogadores.map((j:any)=>(
          <li key={j.id}>{j.nome}</li>
        ))}
      </ul>

      <h2 style={{marginTop:"30px"}}>

        {placarA} x {placarB}

      </h2>

      <div style={{marginTop:"20px"}}>

        <button onClick={()=>abrirModal(1)} style={{marginRight:"10px"}}>

          ⚽ Gol Time 1

        </button>

        <button onClick={()=>abrirModal(2)}>

          ⚽ Gol Time 2

        </button>

      </div>

      {modalGol && (

        <div style={{marginTop:"40px",border:"1px solid #ccc",padding:"20px"}}>

          <h3>Registrar Gol</h3>

          <div>

            <label>Quem fez o gol</label>

            <select
            value={jogadorGol}
            onChange={(e)=>setJogadorGol(e.target.value)}
            >

              <option value="">Selecione</option>

              {jogadoresGol.map((j:any)=>(

                <option key={j.id} value={j.id}>

                  {j.nome}

                </option>

              ))}

            </select>

          </div>

          <div style={{marginTop:"10px"}}>

            <label>Assistência</label>

            <select
            value={assistencia}
            onChange={(e)=>setAssistencia(e.target.value)}
            >

              <option value="">Sem assistência</option>

              {jogadoresGol.map((j:any)=>(

                <option key={j.id} value={j.id}>

                  {j.nome}

                </option>

              ))}

            </select>

          </div>

          <button
          style={{marginTop:"15px"}}
          onClick={confirmarGol}
          >

            Confirmar Gol

          </button>

        </div>

      )}

    </div>

  );

}