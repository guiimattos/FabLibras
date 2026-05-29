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

type Modulo = { icon: string; titulo: string; aulas: string[]; video?: string };

const modulos: Modulo[] = [
  { icon: "📚", titulo: "Módulo 1 — Introdução à Libras", aulas: ["O que é Libras?", "História da Libras", "Alfabeto Manual", "Números em Libras", "Cumprimentos Básicos"], video: "hh_58LXC0z4" },
  { icon: "😊", titulo: "Módulo 2 — Parâmetros + Alfabeto Manual", aulas: ["Expressões de Emoções", "Expressões Interrogativas", "Expressões Negativas", "Expressões de Intensidade", "Prática de Expressões"], video: "YdXJej8AHP0" },
  { icon: "🏠", titulo: "Módulo 3 — Números, tempo comprimentos e apresentações", aulas: ["Objetos do Lar", "Alimentos e Bebidas", "Roupas e Acessórios", "Meios de Transporte", "Tecnologia e Comunicação"], video: "43hWoYGOwak" },
  { icon: "👨‍👩‍👧", titulo: "Módulo 4 — Estrutura e pronomes", aulas: ["Membros da Família", "Profissões", "Características Físicas", "Relações Pessoais", "Pronomes"], video: "e33rI-1XGH4" },
  { icon: "🎨", titulo: "Módulo 5 — Familia cores e sentimentos", aulas: ["Cores Básicas", "Tamanhos e Formas", "Adjetivos Positivos", "Adjetivos Negativos", "Comparações"], video: "ewuLFH4kh_Y" },
  { icon: "🍽️", titulo: "Módulo 6 — Natureza, Animais, Alimentos e Bebidas", aulas: ["Frutas e Verduras", "Refeições do Dia", "Restaurante e Pedidos", "Sabores e Texturas", "Receitas Simples"], video: "VyVDrDopzmo" },
  { icon: "📍", titulo: "Módulo 7 — Profissões, lugares e transportes", aulas: ["Lugares da Cidade", "Pontos de Referência", "Como Pedir Direções", "Preposições de Lugar", "Mapa e Localização"], video: "wna4IRdypPE" },
  { icon: "⏰", titulo: "Módulo 8 — Verbos, Negações e Direcionalidade", aulas: ["Dias da Semana", "Meses do Ano", "Horas e Minutos", "Estações do Ano", "Eventos e Datas Comemorativas"], video: "_40RfVlho7o" },
  { icon: "🏃", titulo: "Módulo 9 — Adjetivos e perguntas", aulas: ["Verbos do Cotidiano", "Verbos de Movimento", "Verbos de Comunicação", "Verbos de Sentimento", "Frases com Verbos"], video: "yGZDdJJpSdA" },
  { icon: "💬", titulo: "Módulo 10 — Frases práticas e conversação", aulas: ["Diálogos do Dia a Dia", "Situações de Emergência", "No Médico e Farmácia", "Escola e Trabalho", "Revisão Geral e Certificado"], video: "0drQUouwIWE" },
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
                {m.video && (
                  <div className="mt-5 aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${m.video}`}
                      title={`Vídeo do ${m.titulo}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
