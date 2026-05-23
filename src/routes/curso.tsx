import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/curso")({
  head: () => ({
    meta: [
      { title: "Curso — FabLibras" },
      { name: "description", content: "Curso básico de Libras: 10 módulos com 5 aulas cada. Aprenda no seu ritmo, gratuitamente." },
      { property: "og:title", content: "Curso Básico de Libras — FabLibras" },
      { property: "og:description", content: "Do alfabeto manual à conversação básica em 10 módulos." },
    ],
  }),
  component: CursoPage,
});

const modulos = [
  { icon: "📚", titulo: "Módulo 1 — Introdução à Libras", aulas: ["O que é Libras?", "História da Libras", "Alfabeto Manual", "Números em Libras", "Cumprimentos Básicos"] },
  { icon: "😊", titulo: "Módulo 2 — Expressões Faciais", aulas: ["Expressões de Emoções", "Expressões Interrogativas", "Expressões Negativas", "Expressões de Intensidade", "Prática de Expressões"] },
  { icon: "🏠", titulo: "Módulo 3 — Vocabulário Cotidiano", aulas: ["Objetos do Lar", "Alimentos e Bebidas", "Roupas e Acessórios", "Meios de Transporte", "Tecnologia e Comunicação"] },
  { icon: "👨‍👩‍👧", titulo: "Módulo 4 — Família e Pessoas", aulas: ["Membros da Família", "Profissões", "Características Físicas", "Relações Pessoais", "Pronomes"] },
  { icon: "🎨", titulo: "Módulo 5 — Cores e Adjetivos", aulas: ["Cores Básicas", "Tamanhos e Formas", "Adjetivos Positivos", "Adjetivos Negativos", "Comparações"] },
  { icon: "🍽️", titulo: "Módulo 6 — Alimentação", aulas: ["Frutas e Verduras", "Refeições do Dia", "Restaurante e Pedidos", "Sabores e Texturas", "Receitas Simples"] },
  { icon: "📍", titulo: "Módulo 7 — Lugares e Direções", aulas: ["Lugares da Cidade", "Pontos de Referência", "Como Pedir Direções", "Preposições de Lugar", "Mapa e Localização"] },
  { icon: "⏰", titulo: "Módulo 8 — Tempo e Datas", aulas: ["Dias da Semana", "Meses do Ano", "Horas e Minutos", "Estações do Ano", "Eventos e Datas Comemorativas"] },
  { icon: "🏃", titulo: "Módulo 9 — Verbos e Ações", aulas: ["Verbos do Cotidiano", "Verbos de Movimento", "Verbos de Comunicação", "Verbos de Sentimento", "Frases com Verbos"] },
  { icon: "💬", titulo: "Módulo 10 — Conversação Básica", aulas: ["Diálogos do Dia a Dia", "Situações de Emergência", "No Médico e Farmácia", "Escola e Trabalho", "Revisão Geral e Certificado"] },
];

function CursoPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <h1 className="text-4xl leading-tight text-white md:text-6xl">
            O Poder de se Comunicar com as Mãos
          </h1>
          <div className="mx-auto mt-8 inline-block rounded-md bg-black/30 px-6 py-3">
            <p className="text-xl font-bold text-purple-300 md:text-2xl">Aprenda Libras no seu ritmo</p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-white/80">
            No FabLibras, transformamos tecnologia em inclusão. Aprenda o básico de Libras de forma gratuita, intuitiva e conectada com as cidades do futuro.
          </p>
        </div>
      </section>

      <section className="section-dark">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-4xl text-white md:text-5xl">Básico de Libras</h2>
            <p className="mt-3 text-muted-foreground">Neste curso você aprende o básico de Libras.</p>
          </div>

          <div className="mt-12 space-y-4">
            {modulos.map((m) => (
              <details key={m.titulo} className="group rounded-xl border border-white/10 bg-card p-6 transition-colors hover:border-white/20">
                <summary className="flex cursor-pointer items-center justify-between text-lg font-bold text-white">
                  <span>{m.icon} {m.titulo}</span>
                  <span className="text-muted-foreground transition-transform group-open:rotate-180">▾</span>
                </summary>
                <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  {m.aulas.map((aula, i) => (
                    <li key={aula} className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">▶</span>
                      Aula {i + 1} - {aula}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
