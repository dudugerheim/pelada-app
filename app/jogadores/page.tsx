async function getJogadores() {
  const res = await fetch(
    "https://opensheet.elk.sh/1fn6kJoYe9_oZaQPHhoX16QTshXBwH3XJDiq4IfqsZOY/jogadores"
  );

  return res.json();
}

export default async function JogadoresPage() {
  const jogadores = await getJogadores();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Jogadores</h1>

      {jogadores.map((jogador: any) => (
        <div key={jogador.id} style={{ marginBottom: "15px" }}>
          <strong>{jogador.nome}</strong>
          <div>Ataque: {jogador.ataque}</div>
          <div>Defesa: {jogador.defesa}</div>
          <div>Passe: {jogador.passe}</div>
          <div>Velocidade: {jogador.velocidade}</div>
          <div>Fôlego: {jogador.folego}</div>
          <div>Habilidade: {jogador.habilidade}</div>
          <div>Overall: {jogador.overall}</div>
        </div>
      ))}
    </div>
  );
}