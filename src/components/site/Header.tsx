import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/fablibras-logo-original.png";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Início" },
  { to: "/curso", label: "Curso" },
  { to: "/sobre", label: "Sobre" },
  { to: "/projeto", label: "Projeto" },
  { to: "/curso-avancado", label: "Curso Avançado" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-header-gradient sticky top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)} aria-label="FabLibras — Início">
          <img
            src={logo}
            alt="FabLibras"
            className="h-14 w-auto sm:h-16"
          />
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-header-gradient md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-semibold text-white"
                  activeProps={{ className: "block py-3 text-base font-semibold text-white underline underline-offset-4" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
