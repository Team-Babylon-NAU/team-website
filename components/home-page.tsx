"use client"

import { ArrowRight, Layers, Zap } from "lucide-react"

interface HomePageProps {
  onNavigate: (page: "overview" | "details") => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 page-enter">
      <div className="relative z-10 mx-auto max-w-3xl text-center stagger-children">
        {/* Badge */}
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase">
          <Zap size={12} className="text-primary" />
          Innovation Lab
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl text-balance">
          Building the
          <span className="relative mx-3 inline-block text-primary">
            Future
            <span className="absolute -bottom-1 left-0 h-px w-full bg-primary/40" />
          </span>
          of Digital
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A comprehensive project showcase demonstrating cutting-edge
          technologies, innovative solutions, and a world-class team
          committed to excellence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => onNavigate("overview")}
            className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
          >
            <Layers size={16} />
            Project Overview
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <button
            onClick={() => onNavigate("details")}
            className="group flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-secondary hover:-translate-y-0.5"
          >
            Project Details
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-muted-foreground/60 uppercase">
            Explore
          </span>
          <div className="h-8 w-px animate-pulse bg-primary/30" />
        </div>
      </div>
    </section>
  )
}
