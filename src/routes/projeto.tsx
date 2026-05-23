import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import qrAjuda from "@/assets/qr-ajuda.jpeg";

export const Route = createFileRoute("/projeto")({
  head: () => ({
    meta: [
      { title: "Projeto — FabLibras & ODS 11" },
      { name: "description", content: "FabLibras é alinhado à Meta 11 da ONU, promovendo cidades e comunidades inclusivas através do ensino gratuito de Libras." },
      { property: "og:title", content: "FabLibras & ODS 11" },
      { property: "og:description", content: "Tecnologia + inclusão para cidades mais sustentáveis." },
    ],
  }),
  component: ProjetoPage,
});

function ProjetoPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <h1 className="text-4xl leading-tight text-white md:text-6xl">FabLibras &amp; ODS 11</h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/80">
            Desenvolvido por alunos de Análise e Desenvolvimento de Sistemas da UNIFACENS, nosso objetivo é usar a tecnologia para tornar cidades e comunidades mais inclusivas através do ensino gratuito de Libras.
          </p>
        </div>
      </section>

      <section className="section-dark">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl text-white md:text-4xl">Destaques</h2>
            <p className="mt-3 text-muted-foreground">Informações adicionais:</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/90 text-2xl">🌱</div>
              <h3 className="mt-4 text-xl font-bold text-white">Objetivo Social</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Alinhamento com a Meta 11 da ONU para promover a inclusão social e acessibilidade em áreas urbanas.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-400 text-2xl">🖥️</div>
              <h3 className="mt-4 text-xl font-bold text-white">Desenvolvimento (ADS)</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Projeto construído com foco em escalabilidade e experiência do usuário (UX), utilizando boas práticas de programação.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[oklch(0.18_0.04_270)]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl text-white md:text-4xl">Perguntas Frequentes</h2>
            <p className="mt-3 text-muted-foreground">Tire suas dúvidas sobre nosso site.</p>
          </div>
          <div className="mt-10 space-y-4">
            {[
              { q: "O curso realmente é gratuito?", a: "Sim. O FabLibras é uma iniciativa sem fins lucrativos focada em educação acessível." },
              { q: "Como o projeto ajuda na ODS 11?", a: "Facilitando a comunicação entre surdos e ouvintes, tornando o convívio em cidades e espaços públicos mais democrático." },
            ].map((f) => (
              <details key={f.q} className="group rounded-xl border border-white/10 bg-card p-6">
                <summary className="flex cursor-pointer items-center justify-between text-lg font-bold text-white">
                  {f.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-4 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
