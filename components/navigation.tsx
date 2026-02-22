"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

type Page = "home" | "overview" | "details"

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links: { id: Page; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
  ]

  const handleNavigate = (page: Page) => {
    onNavigate(page)
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => handleNavigate("home")}
          className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-primary"
        >
          <span className="text-primary font-mono">{"{"}</span>
          {" Nexus "}
          <span className="text-primary font-mono">{"}"}</span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              className={`nav-link text-sm tracking-wide transition-colors duration-300 ${
                currentPage === link.id
                  ? "text-foreground active"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-muted-foreground transition-colors duration-300 hover:text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-border/50 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`rounded-md px-3 py-2 text-left text-sm transition-colors duration-300 ${
                  currentPage === link.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
