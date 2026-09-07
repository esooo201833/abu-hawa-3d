import { Header } from "@/components/layout/Header";
import { ImmersiveExperience } from "@/components/experience/ImmersiveExperience";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <Header />
      <ImmersiveExperience />
    </main>
  );
}