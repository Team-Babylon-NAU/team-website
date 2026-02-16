"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Play, Code2, ExternalLink } from "lucide-react"

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Runtime" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Redis", category: "Cache" },
  { name: "Docker", category: "DevOps" },
  { name: "GraphQL", category: "API" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "AWS", category: "Cloud" },
  { name: "Kubernetes", category: "Orchestration" },
  { name: "TensorFlow", category: "ML" },
]

const timelineItems = [
  {
    date: "January 2025",
    title: "Project Inception",
    description:
      "Initial research phase completed. Stakeholder interviews conducted and core requirements documented across 12 departments.",
  },
  {
    date: "March 2025",
    title: "Architecture Design",
    description:
      "System architecture finalized with microservices pattern. Tech stack selected after evaluating 15+ frameworks and tools.",
  },
  {
    date: "May 2025",
    title: "Core Development",
    description:
      "Primary development sprint launched. API layer, database schemas, and authentication system built and stress-tested.",
  },
  {
    date: "August 2025",
    title: "ML Integration",
    description:
      "Machine learning pipeline integrated for predictive analytics. Custom models trained on 2M+ data points for accuracy.",
  },
  {
    date: "October 2025",
    title: "Beta Launch",
    description:
      "Closed beta released to 500 users. Collected feedback through surveys, interviews, and in-app analytics sessions.",
  },
  {
    date: "December 2025",
    title: "Performance Optimization",
    description:
      "Load time reduced by 70%. Database queries optimized. CDN deployed globally across 14 edge locations.",
  },
  {
    date: "February 2026",
    title: "Public Release",
    description:
      "Full public launch with enterprise features. Onboarded 50+ organizations in the first week of general availability.",
  },
]

export function DetailsPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)
  const [activeItems, setActiveItems] = useState<Set<number>>(new Set())

  const handleScroll = useCallback(() => {
    if (!timelineRef.current) return

    const container = timelineRef.current
    const rect = container.getBoundingClientRect()
    const containerTop = rect.top
    const containerHeight = rect.height
    const viewportMid = window.innerHeight * 0.6

    const progress = Math.max(
      0,
      Math.min(1, (viewportMid - containerTop) / containerHeight)
    )
    setLineHeight(progress * 100)

    const items = container.querySelectorAll(".timeline-item")
    const newActive = new Set<number>()
    items.forEach((item, i) => {
      const itemRect = item.getBoundingClientRect()
      if (itemRect.top < window.innerHeight * 0.75) {
        newActive.add(i)
        item.classList.add("visible")
      }
    })
    setActiveItems(newActive)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <section className="relative z-10 min-h-screen px-6 pb-20 pt-28 page-enter">
      <div className="mx-auto max-w-5xl">
        {/* Page Title */}
        <div
          ref={(el) => { sectionRefs.current[0] = el }}
          className="reveal mb-16"
        >
          <p className="mb-2 text-xs font-medium tracking-widest text-primary uppercase font-mono">
            02 / Details
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Project Details
          </h2>
        </div>

        {/* Technologies Card */}
        <div
          ref={(el) => { sectionRefs.current[1] = el }}
          className="reveal mb-8"
        >
          <div className="group rounded-xl border border-border bg-card p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <Code2 size={20} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Technologies Used
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="group/tag flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 transition-all duration-300 hover:border-primary/30 hover:bg-secondary hover:-translate-y-0.5 cursor-default"
                >
                  <span className="text-sm font-medium text-foreground">
                    {tech.name}
                  </span>
                  <span className="rounded-md bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors duration-300 group-hover/tag:text-primary font-mono">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Card */}
        <div
          ref={(el) => { sectionRefs.current[2] = el }}
          className="reveal mb-16"
        >
          <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            <div className="border-b border-border bg-secondary/30 px-6 py-4 text-center">
              <h3 className="text-lg font-semibold text-foreground">
                Technical Deep Dive
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Architecture walkthrough and implementation details
              </p>
            </div>
            <div className="relative flex aspect-video items-center justify-center bg-secondary">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.05)_0%,_transparent_70%)]" />
              <div className="relative flex flex-col items-center gap-4">
                <button
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label="Play technical overview video"
                >
                  <Play size={24} className="ml-1" />
                </button>
                <span className="text-sm text-muted-foreground">
                  Watch Technical Overview
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div
          ref={(el) => { sectionRefs.current[3] = el }}
          className="reveal"
        >
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-medium tracking-widest text-primary uppercase font-mono">
              Development Timeline
            </p>
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
              From Concept to Launch
            </h3>
          </div>

          <div ref={timelineRef} className="relative pb-12">
            {/* Spine line background */}
            <div className="timeline-line" />
            {/* Animated progress line */}
            <div
              className="timeline-line-progress"
              style={{ height: `${lineHeight}%` }}
            />

            <div className="relative">
              {timelineItems.map((item, index) => {
                const isLeft = index % 2 === 0

                return (
                  <div
                    key={item.date}
                    className="timeline-item mb-12 last:mb-0"
                  >
                    {/* Desktop layout */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                      {/* Left content */}
                      <div
                        className={`${isLeft ? "" : "order-3"} ${
                          isLeft ? "text-right" : "text-left"
                        }`}
                      >
                        {isLeft ? (
                          <TimelineCard item={item} align="right" />
                        ) : (
                          <div className="pr-4">
                            <p className="text-sm font-medium text-primary font-mono">
                              {item.date}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="order-2 flex justify-center">
                        <div
                          className={`timeline-dot ${
                            activeItems.has(index) ? "active" : ""
                          }`}
                        />
                      </div>

                      {/* Right content */}
                      <div
                        className={`${isLeft ? "order-3" : ""} ${
                          isLeft ? "text-left" : "text-right"
                        }`}
                      >
                        {isLeft ? (
                          <div className="pl-4">
                            <p className="text-sm font-medium text-primary font-mono">
                              {item.date}
                            </p>
                          </div>
                        ) : (
                          <TimelineCard item={item} align="left" />
                        )}
                      </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="grid grid-cols-[auto_1fr] gap-4 md:hidden">
                      <div className="flex flex-col items-center">
                        <div
                          className={`timeline-dot ${
                            activeItems.has(index) ? "active" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-medium text-primary font-mono">
                          {item.date}
                        </p>
                        <TimelineCard item={item} align="left" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({
  item,
  align,
}: {
  item: (typeof timelineItems)[number]
  align: "left" | "right"
}) {
  return (
    <div
      className={`group rounded-xl border border-border bg-card p-5 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 ${
        align === "right" ? "text-left" : "text-left"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <h4 className="text-base font-semibold text-foreground">
          {item.title}
        </h4>
        <ExternalLink
          size={12}
          className="text-muted-foreground/0 transition-all duration-300 group-hover:text-muted-foreground"
        />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </div>
  )
}
