import { redirect } from "next/navigation";

export default function Page() {
  redirect("/home"); // ou "/gerar-times" se quiser ir direto para a geração de times
}