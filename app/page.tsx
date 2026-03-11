// app/page.tsx
import { redirect } from "next/navigation";

export default function Page() {
  // Redireciona automaticamente para a Home
  redirect("/home"); // se quiser, pode trocar para "/gerar-times"
}