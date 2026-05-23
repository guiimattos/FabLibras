import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[oklch(0.13_0.04_270)]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-extrabold text-white">FabLibras</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Plataforma educacional dedicada ao ensino de Libras e à promoção da inclusão digital para surdos e ouvintes.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-white">Início</Link></li>
              <li><Link to="/curso" className="hover:text-white">Curso</Link></li>
              <li><Link to="/sobre" className="hover:text-white">Sobre</Link></li>
              <li><Link to="/projeto" className="hover:text-white">Projeto</Link></li>
              <li><Link to="/curso-avancado" className="hover:text-white">Curso Avançado</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contato</h4>
            <p className="mt-3 text-sm text-muted-foreground">projetofablibras@gmail.com</p>
            <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-white">Acessibilidade</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Site Acessível</li>
              <li>Conteúdo em Libras</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">ODS</h4>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded bg-[#fd9d24] text-2xl font-bold text-white">11</div>
              <p className="text-sm text-muted-foreground">Cidades e Comunidades Sustentáveis</p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-muted-foreground">
          © 2026 FabLibras. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
