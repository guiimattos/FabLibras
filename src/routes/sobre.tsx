import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import ingridImg from "@/assets/ingrid.jpeg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — FabLibras" },
      { name: "description", content: "Conheça a missão, visão e valores da FabLibras e a equipe por trás da plataforma." },
      { property: "og:title", content: "Sobre a FabLibras" },
      { property: "og:description", content: "Onde o silêncio ganha voz e a conexão acontece." },
    ],
  }),
  component: SobrePage,
});

const valores = [
  { titulo: "Inclusão", texto: "Toda pessoa merece aprender e se comunicar sem barreiras, independentemente de ser surda ou ouvinte." },
  { titulo: "Acessibilidade", texto: "Conteúdo projetado para ser acessível em qualquer dispositivo, plataforma e nível de conhecimento." },
  { titulo: "Qualidade", texto: "Curso desenvolvido por especialista certificada em Libras com metodologia pedagógica." },
  { titulo: "Comunidade", texto: "Acreditamos no poder da comunidade surda e na força coletiva de construir um Brasil mais inclusivo." },
];

const equipe = [
  { nome: "Ingrid Vieira", papel: "Intérprete de Libras" },
  { nome: "Fernando Cunha", papel: "Desenvolvedor FrontEnd" },
  { nome: "Guilherme Mattos", papel: "UX/UI Designer" },
  { nome: "Laura Cosmos", papel: "Planejamento das gravações" },
  { nome: "Lívia Suniga", papel: "Gestora de Projetos" },
  { nome: "Pedro Henrique", papel: "Suporte Geral" },
  { nome: "Pedro Luiz", papel: "Desenvolvedor FrontEnd" },
];

function Avatar({ nome }: { nome: string }) {
  const initials = nome.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-brand-purple text-2xl font-bold text-white">
      {initials}
    </div>
  );
}

function SobrePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
          <div>
            <h1 className="text-4xl leading-tight text-white md:text-5xl">
              Uma plataforma feita com foco em propósito
            </h1>
            <p className="mt-6 text-lg text-white/80">Onde o silêncio ganha voz e a conexão acontece.</p>
            <p className="mt-6 text-white/70">
              Em 2026, a FabLibras redefine o que significa ser inclusivo. Mais do que uma plataforma de ensino, somos o ponto de encontro entre a tecnologia de ponta e a sensibilidade humana.
            </p>
            <p className="mt-4 text-white/70">
              Criamos um ecossistema 100% digital para que a Língua Brasileira de Sinais não seja apenas um aprendizado, mas uma ferramenta de transformação no seu dia a dia. A inclusão não pode esperar.
            </p>
            <p className="mt-6 font-bold text-white">Comece sua jornada agora.</p>
          </div>
          <div className="w-full max-w-md justify-self-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 to-brand-purple/30 shadow-2xl ring-1 ring-white/10">
            <img
              src={ingridImg}
              alt="Ilustração da Ingrid Vieira, intérprete de Libras da FabLibras"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Missão/Visão/Propósito */}
      <section className="section-dark">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl text-white md:text-4xl">Comunicação que transforma vidas</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A FabLibras nasceu do sonho de tornar a comunicação em Língua Brasileira de Sinais acessível a todos — surdos, ouvintes, educadores e famílias, por meio de uma educação digital de qualidade.
            </p>
          </div>

          <div className="mt-14 text-center">
            <h3 className="text-2xl text-white md:text-3xl">O que nos move todos os dias</h3>
            <p className="mt-3 text-muted-foreground">
              Nossa missão é clara: construir pontes entre o mundo surdo e o mundo ouvinte por meio da educação em Libras.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { titulo: "Missão", texto: "Democratizar o acesso ao ensino de Libras por meio de uma plataforma digital acessível, inclusiva e de alta qualidade, alcançando surdos, ouvintes, educadores e famílias em todo o Brasil." },
              { titulo: "Visão", texto: "Ser a maior e mais completa referência em educação em Libras da América Latina, contribuindo para uma sociedade verdadeiramente inclusiva onde a comunicação não tem barreiras." },
              { titulo: "Propósito", texto: "Empoderar pessoas surdas e suas comunidades, garantindo que a Libras seja reconhecida, valorizada e ensinada com o respeito e o rigor que merece como língua oficial do Brasil." },
            ].map((c) => (
              <div key={c.titulo} className="rounded-xl border border-white/10 bg-card p-6">
                <h4 className="text-xl font-bold text-white">{c.titulo}</h4>
                <p className="mt-3 text-sm text-muted-foreground">{c.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-[oklch(0.18_0.04_270)]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl text-white md:text-4xl">O que nos define</h2>
            <p className="mt-3 text-muted-foreground">Cada decisão que tomamos é guiada pelos valores que fundamentam a nossa plataforma.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valores.map((v) => (
              <div key={v.titulo} className="rounded-xl border border-white/10 bg-card p-6">
                <h4 className="text-lg font-bold text-white">{v.titulo}</h4>
                <p className="mt-3 text-sm text-muted-foreground">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="section-dark">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl text-white md:text-4xl">Nossa Equipe</h2>
            <p className="mt-3 text-muted-foreground">Pessoas apaixonadas por inclusão, tecnologia e educação — unidas por um propósito comum.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {equipe.map((p) => (
              <div key={p.nome} className="flex flex-col items-center text-center">
                <Avatar nome={p.nome} />
                <p className="mt-4 font-bold text-white">{p.nome}</p>
                <p className="text-sm text-muted-foreground">{p.papel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="bg-[oklch(0.18_0.04_270)]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl text-white md:text-4xl">Parceiros e Apoiadores</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Organizações e instituições que acreditam e apoiam nossa missão de inclusão por meio da educação em Libras.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-card p-6">
              <h4 className="text-lg font-bold text-white">Centro Universitário UNIFACENS</h4>
              <p className="mt-2 text-sm text-muted-foreground">Apoio pedagógico e instruções dos professores.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-card p-6">
              <h4 className="text-lg font-bold text-white">Ingrid Vieira — Especialista em Cachos</h4>
              <p className="mt-2 text-sm text-muted-foreground">Apoio sendo intérprete do curso de Libras e disponibilizando espaço para as gravações.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
