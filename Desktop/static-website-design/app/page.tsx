"use client"

import { useState, useEffect } from "react"
import { ParticleCanvas } from "@/components/particle-canvas"
import { Navigation } from "@/components/navigation"
import { HomePage } from "@/components/home-page"
import { OverviewPage } from "@/components/overview-page"
import { DetailsPage } from "@/components/details-page"

type Page = "home" | "overview" | "details"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = (page: Page) => {
    if (page === currentPage) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: "instant" })
    }, 250)
  }

  // Trigger reveal on scroll for elements already in view
  useEffect(() => {
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll(".reveal")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible")
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
      )
      reveals.forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }, 100)
    return () => clearTimeout(timer)
  }, [currentPage])

  return (
    <div className="relative min-h-screen bg-background">
      <ParticleCanvas />
      <Navigation currentPage={currentPage} onNavigate={navigateTo} />

      <main
        className={`transition-opacity duration-250 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentPage === "home" && <HomePage onNavigate={navigateTo} />}
        {currentPage === "overview" && <OverviewPage />}
        {currentPage === "details" && <DetailsPage />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {"2026 Nexus Project. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            {(["home", "overview", "details"] as Page[]).map((page) => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className="text-xs capitalize text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
