import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/curso-avancado")({
  head: () => ({
    meta: [
      { title: "Curso Avançado — FabLibras" },
      { name: "description", content: "Aprofunde seu domínio da Língua Brasileira de Sinais com cursos avançados parceiros." },
      { property: "og:title", content: "Curso Avançado — FabLibras" },
      { property: "og:description", content: "Você já deu o primeiro passo. Avance para o próximo nível." },
    ],
  }),
  component: CursoAvancadoPage,
});

const cursos = [
  {
    titulo: "Método Fluente em Libras [Parcelamento Especial 12x]",
    descricao: "O Método Fluente em Libras® é o passo a passo para você sair do zero (ou do nível em que está) e se tornar fluente em Libras, poder se comunicar e entender os surdos com clareza. Absorva a Libras de forma natural, SEM ter que decorar sinais.",
    link: "https://chk.eduzz.com/252550",
    badge: "Fluente em Libras",
  },
  {
    titulo: "APRENDA LIBRAS — Vídeos + Aulas ao vivo com Instrutor agendado",
    descricao: "Aprenda LIBRAS de um modo muito fácil. Ao final do curso, o aluno será capaz de realizar seu primeiro contato com o surdo, desenvolvendo cumprimentos e saudações iniciais em um diálogo — seja online ou na sua comunidade.",
    link: "https://chk.eduzz.com/319802?a=37374832",
    badge: "Aulas ao vivo",
  },
  {
    titulo: "Libras — Curso completo",
    descricao: "A Língua Brasileira de Sinais é a língua de sinais usada por surdos dos centros urbanos brasileiros e legalmente reconhecida como meio de comunicação e expressão.",
    link: "https://chk.eduzz.com/2137442?a=37374832",
    badge: "Libras",
  },
];

function CursoAvancadoPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <h1 className="text-4xl leading-tight text-white md:text-5xl">
            Expanda seus horizontes e aprofunde seu domínio da Língua Brasileira de Sinais
          </h1>
          <div className="mx-auto mt-8 inline-block rounded-md bg-black/30 px-6 py-4">
            <p className="text-lg font-bold text-purple-300 md:text-xl">
              Você já deu o primeiro passo. Agora, avance para um nível mais avançado e aprofunde mais seus conhecimentos em Libras.
            </p>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="mx-auto max-w-5xl space-y-6 px-6 py-20">
          {cursos.map((c) => (
            <div key={c.titulo} className="grid gap-6 rounded-2xl border border-white/10 bg-card p-6 md:grid-cols-[260px_1fr] md:p-8">
              <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-brand-purple/30 p-6 md:aspect-auto">
                <div className="text-center">
                  <div className="text-5xl">✋</div>
                  <p className="mt-2 text-sm font-bold uppercase tracking-wider text-white">{c.badge}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white md:text-2xl">{c.titulo}</h3>
                <p className="mt-3 text-muted-foreground">{c.descricao}</p>
                <div className="mt-5">
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="btn-cta">
                    ☆ Acesse Aqui
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
