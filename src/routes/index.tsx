import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import comunicacaoInclusiva from "@/assets/comunicacao-inclusiva.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FabLibras — Aprenda Libras e transforme vidas" },
      { name: "description", content: "Plataforma educacional brasileira dedicada ao ensino da Língua Brasileira de Sinais para surdos, ouvintes, intérpretes e educadores." },
      { property: "og:title", content: "FabLibras — Aprenda Libras e transforme vidas" },
      { property: "og:description", content: "Aprenda Libras gratuitamente e contribua para a inclusão." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
          <h1 className="text-5xl leading-[1.05] text-white md:text-7xl">
            Aprenda Libras e transforme vidas através da inclusão
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base text-white/80 md:text-lg">
            A FabLibras é a plataforma educacional brasileira dedicada ao ensino da Língua Brasileira de Sinais. Para surdos, ouvintes, intérpretes e educadores que acreditam na comunicação inclusiva.
          </p>
          <div className="mt-10">
            <Link to="/curso" className="btn-cta">Explorar Curso</Link>
          </div>
        </div>
      </section>

      {/* Comece sua jornada */}
      <section className="section-dark">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl text-white md:text-5xl">Comece sua jornada em Libras</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Criamos o melhor curso para você dar os primeiros passos no aprendizado de Libras.
          </p>
        </div>
      </section>

      {/* COMUNICAÇÃO INCLUSIVA banner */}
      <section className="bg-[#2563eb]">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-10 md:py-14">
          <img
            src={comunicacaoInclusiva}
            alt="Comunicação Inclusiva"
            className="block h-auto w-full max-w-xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Curso card */}
      <section className="section-dark">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-2xl border border-white/10 bg-card p-8 shadow-2xl md:p-12">
            <div className="flex items-center gap-2 text-sm font-semibold text-yellow-400">
              ☆ Curso em Destaque
            </div>
            <h3 className="mt-4 text-3xl text-white md:text-4xl">Libras para Iniciantes</h3>
            <p className="mt-3 text-muted-foreground">
              Aprenda os fundamentos da Língua Brasileira de Sinais e inicie sua jornada de comunicação inclusiva.
            </p>
            <p className="mt-4 text-sm text-white/70">⏱ 1h30 de conteúdo</p>
            <div className="mt-6">
              <Link to="/curso" className="btn-cta">Acessar Curso</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
