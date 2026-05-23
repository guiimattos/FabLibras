import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Início" },
  { to: "/curso", label: "Curso" },
  { to: "/sobre", label: "Sobre" },
  { to: "/projeto", label: "Projeto" },
  { to: "/curso-avancado", label: "Curso Avançado" },
] as const;

export function Header() {
  return (
    <header className="bg-header-gradient sticky top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold tracking-tight text-white">
            Fab<span className="italic">Libras</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link"
              activeProps={{ className: "nav-link underline underline-offset-8 decoration-2" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
