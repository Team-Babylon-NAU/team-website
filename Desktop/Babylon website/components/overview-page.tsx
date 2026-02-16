"use client"

import { useEffect, useRef } from "react"
import {
  Target,
  Play,
  Lightbulb,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Project Lead",
    desc: "Orchestrates cross-functional teams with a vision for scalable product delivery.",
    initials: "SC",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "Marcus Rivera",
    role: "Lead Engineer",
    desc: "Architects robust backend systems and drives technical excellence across the stack.",
    initials: "MR",
    color: "from-chart-2/20 to-chart-2/5",
  },
  {
    name: "Aiko Tanaka",
    role: "UX Designer",
    desc: "Crafts intuitive user experiences grounded in research and accessibility best practices.",
    initials: "AT",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "David Okonkwo",
    role: "Data Scientist",
    desc: "Transforms complex datasets into actionable insights powering intelligent features.",
    initials: "DO",
    color: "from-chart-2/20 to-chart-2/5",
  },
  {
    name: "Elena Petrova",
    role: "DevOps Engineer",
    desc: "Ensures seamless CI/CD pipelines and rock-solid infrastructure reliability.",
    initials: "EP",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "James Mitchell",
    role: "Frontend Developer",
    desc: "Builds performant, accessible interfaces with a keen eye for pixel-perfect design.",
    initials: "JM",
    color: "from-chart-2/20 to-chart-2/5",
  },
  {
    name: "Priya Sharma",
    role: "QA Lead",
    desc: "Champions quality through automated testing strategies and meticulous code reviews.",
    initials: "PS",
    color: "from-primary/20 to-primary/5",
  },
]

export function OverviewPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

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

    return () => observer.disconnect()
  }, [])

  const scrollTeam = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative z-10 min-h-screen px-6 pb-20 pt-28 page-enter">
      <div className="mx-auto max-w-5xl">
        {/* Page Title */}
        <div
          ref={(el) => { sectionRefs.current[0] = el }}
          className="reveal mb-16"
        >
          <p className="mb-2 text-xs font-medium tracking-widest text-primary uppercase font-mono">
            01 / Overview
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Project Overview
          </h2>
        </div>

        {/* Intro Card */}
        <div
          ref={(el) => { sectionRefs.current[1] = el }}
          className="reveal mb-8"
        >
          <div className="group rounded-xl border border-border bg-card p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 sm:p-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <Target size={20} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Mission Statement
              </h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Nexus is a next-generation platform designed to bridge the gap
              between complex enterprise workflows and intuitive user
              experiences. Our mission is to empower teams with tools that
              are both powerful and delightful to use, leveraging
              cutting-edge technology to deliver measurable impact at scale.
            </p>
          </div>
        </div>

        {/* Video Card */}
        <div
          ref={(el) => { sectionRefs.current[2] = el }}
          className="reveal mb-8"
        >
          <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            <div className="relative flex aspect-video items-center justify-center bg-secondary">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.05)_0%,_transparent_70%)]" />
              <div className="relative flex flex-col items-center gap-4">
                <button
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label="Play demo video"
                >
                  <Play size={24} className="ml-1" />
                </button>
                <span className="text-sm text-muted-foreground">
                  Watch Project Demo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Card */}
        <div
          ref={(el) => { sectionRefs.current[3] = el }}
          className="reveal mb-16"
        >
          <div className="group rounded-xl border border-border bg-card p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 sm:p-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <Lightbulb size={20} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Our Solution
              </h3>
            </div>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              We developed an integrated platform that unifies data
              pipelines, real-time analytics, and collaborative
              workspaces into a single cohesive experience. By combining
              machine learning-driven insights with an elegant interface,
              Nexus reduces operational overhead by 60% while increasing
              team productivity.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { stat: "60%", label: "Overhead Reduction" },
                { stat: "3x", label: "Faster Deployment" },
                { stat: "99.9%", label: "Uptime Guarantee" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border bg-secondary/50 p-4 text-center transition-all duration-300 hover:border-primary/20 hover:bg-secondary"
                >
                  <p className="text-2xl font-bold text-primary font-mono">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div
          ref={(el) => { sectionRefs.current[4] = el }}
          className="reveal"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                The Team
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollTeam("left")}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary/50 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground"
                aria-label="Scroll team left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollTeam("right")}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary/50 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground"
                aria-label="Scroll team right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="team-scroll">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group min-w-[260px] max-w-[260px] snap-start rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Avatar placeholder */}
                <div
                  className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${member.color} border border-border transition-all duration-300 group-hover:border-primary/30`}
                >
                  <span className="text-lg font-semibold text-primary">
                    {member.initials}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-foreground">
                  {member.name}
                </h4>
                <p className="mb-3 text-xs font-medium text-primary font-mono">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
