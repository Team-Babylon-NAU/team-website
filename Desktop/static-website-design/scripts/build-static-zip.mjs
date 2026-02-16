import { writeFileSync, mkdirSync, existsSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const OUT = join(process.cwd(), "static-site");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// ─── app.css ────────────────────────────────────────────────────────────────────
const css = `/* ============================================================
   Nexus Project – app.css
   A self-contained static site stylesheet
   ============================================================ */

/* ---------- Reset & Base ---------- */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --bg:       #0a0d14;
  --bg-card:  #0f1219;
  --fg:       #dce3ed;
  --fg-muted: #6b7a90;
  --primary:  #3fb5a5;
  --primary-fg:#0a0d14;
  --secondary:#181c25;
  --border:   #1c2130;
  --radius:   0.75rem;
  --font-sans:'Inter',system-ui,-apple-system,sans-serif;
  --font-mono:'Space Mono','Courier New',monospace;
}

html{scroll-behavior:smooth}
body{
  font-family:var(--font-sans);
  background:var(--bg);
  color:var(--fg);
  line-height:1.6;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

a{color:inherit;text-decoration:none}
button{font:inherit;cursor:pointer;border:none;background:none;color:inherit}
img{max-width:100%;display:block}

/* ---------- Utility ---------- */
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
.text-balance{text-wrap:balance}
.font-mono{font-family:var(--font-mono)}

/* ---------- Particle Canvas ---------- */
#particle-canvas{
  position:fixed;inset:0;z-index:0;pointer-events:none;
}

/* ---------- Navigation ---------- */
.site-nav{
  position:fixed;top:0;left:0;right:0;z-index:50;
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  background:rgba(10,13,20,.7);
  border-bottom:1px solid var(--border);
}
.site-nav .inner{
  max-width:72rem;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  padding:1rem 1.5rem;
}
.site-nav .logo{font-size:1.125rem;font-weight:600;letter-spacing:-.02em;transition:color .3s}
.site-nav .logo:hover{color:var(--primary)}
.site-nav .logo .brace{color:var(--primary);font-family:var(--font-mono)}

.nav-links{display:flex;gap:2rem;align-items:center}
.nav-link{
  position:relative;font-size:.875rem;letter-spacing:.04em;
  color:var(--fg-muted);transition:color .3s;padding-bottom:2px;
}
.nav-link::after{
  content:'';position:absolute;bottom:0;left:0;width:0;height:1px;
  background:var(--primary);transition:width .3s cubic-bezier(.22,1,.36,1);
}
.nav-link:hover,.nav-link.active{color:var(--fg)}
.nav-link:hover::after,.nav-link.active::after{width:100%}

/* Mobile nav */
.mobile-toggle{display:none;color:var(--fg-muted);transition:color .3s}
.mobile-toggle:hover{color:var(--fg)}
.mobile-menu{
  display:none;flex-direction:column;gap:.25rem;
  padding:.75rem 1.5rem 1rem;
  border-bottom:1px solid var(--border);
  background:rgba(10,13,20,.95);backdrop-filter:blur(12px);
}
.mobile-menu.open{display:flex}
.mobile-menu button{
  text-align:left;padding:.5rem .75rem;border-radius:.5rem;
  font-size:.875rem;color:var(--fg-muted);transition:all .3s;
}
.mobile-menu button:hover,.mobile-menu button.active{background:var(--secondary);color:var(--fg)}

@media(max-width:768px){
  .nav-links{display:none}
  .mobile-toggle{display:block}
}

/* ---------- Page Transitions ---------- */
.page{display:none;animation:pageIn .5s cubic-bezier(.22,1,.36,1) forwards}
.page.active{display:block}
@keyframes pageIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* ---------- Stagger children ---------- */
.stagger>*{opacity:0;animation:fadeUp .6s cubic-bezier(.22,1,.36,1) forwards}
.stagger>*:nth-child(1){animation-delay:.1s}
.stagger>*:nth-child(2){animation-delay:.2s}
.stagger>*:nth-child(3){animation-delay:.3s}
.stagger>*:nth-child(4){animation-delay:.4s}
.stagger>*:nth-child(5){animation-delay:.5s}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

/* ---------- Scroll Reveal ---------- */
.reveal{opacity:0;transform:translateY(30px);transition:all .7s cubic-bezier(.22,1,.36,1)}
.reveal.visible{opacity:1;transform:translateY(0)}

/* ---------- Section Wrapper ---------- */
.section{position:relative;z-index:10;min-height:100vh;padding:7rem 1.5rem 5rem}
.section .wrap{max-width:60rem;margin:0 auto}

/* ---------- Page Title ---------- */
.page-label{
  margin-bottom:.5rem;font-size:.75rem;font-weight:500;
  letter-spacing:.12em;text-transform:uppercase;
  color:var(--primary);font-family:var(--font-mono);
}
.page-title{
  font-size:clamp(1.75rem,5vw,3rem);font-weight:700;
  letter-spacing:-.02em;color:var(--fg);margin-bottom:3rem;
}

/* ---------- Card ---------- */
.card{
  border-radius:var(--radius);border:1px solid var(--border);
  background:var(--bg-card);padding:2rem 2.5rem;
  transition:border-color .5s,box-shadow .5s;
}
.card:hover{border-color:rgba(63,181,165,.2);box-shadow:0 8px 30px rgba(63,181,165,.05)}
.card-icon{
  width:2.5rem;height:2.5rem;border-radius:.5rem;
  display:flex;align-items:center;justify-content:center;
  background:rgba(63,181,165,.1);color:var(--primary);
  transition:background .3s;
}
.card:hover .card-icon{background:rgba(63,181,165,.2)}
.card-header{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}
.card-heading{font-size:1.25rem;font-weight:600;color:var(--fg)}
.card p{color:var(--fg-muted);line-height:1.7}

/* ---------- Home Hero ---------- */
.hero{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  min-height:100vh;padding:2rem 1.5rem;text-align:center;position:relative;z-index:10;
}
.badge{
  display:inline-flex;align-items:center;gap:.5rem;
  border-radius:9999px;border:1px solid var(--border);
  background:rgba(24,28,37,.5);padding:.375rem 1rem;
  font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--fg-muted);margin-bottom:2rem;
}
.badge svg{color:var(--primary)}
.hero h1{
  font-size:clamp(2rem,6vw,4.25rem);font-weight:700;
  line-height:1.1;letter-spacing:-.03em;
  color:var(--fg);margin-bottom:1.5rem;
}
.hero h1 .accent{color:var(--primary);position:relative;display:inline-block;margin:0 .2em}
.hero h1 .accent::after{
  content:'';position:absolute;bottom:-.125rem;left:0;width:100%;
  height:1px;background:rgba(63,181,165,.4);
}
.hero .subtitle{
  max-width:36rem;margin:0 auto 3rem;font-size:clamp(.9375rem,2vw,1.125rem);
  color:var(--fg-muted);line-height:1.7;
}
.hero .cta-row{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
.btn{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.75rem 1.5rem;border-radius:.5rem;
  font-size:.875rem;font-weight:500;
  transition:all .3s;
}
.btn-primary{
  background:var(--primary);color:var(--primary-fg);
}
.btn-primary:hover{
  box-shadow:0 8px 24px rgba(63,181,165,.2);transform:translateY(-2px);
}
.btn-outline{
  border:1px solid var(--border);background:rgba(24,28,37,.5);color:var(--fg);
}
.btn-outline:hover{
  border-color:rgba(63,181,165,.3);background:var(--secondary);transform:translateY(-2px);
}
.btn .arrow{transition:transform .3s}
.btn:hover .arrow{transform:translateX(4px)}
.scroll-hint{
  position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:.5rem;
}
.scroll-hint span{font-size:.6875rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(107,122,144,.6)}
.scroll-hint .bar{width:1px;height:2rem;background:rgba(63,181,165,.3);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}

/* ---------- Video Card ---------- */
.video-card{
  border-radius:var(--radius);border:1px solid var(--border);
  background:var(--bg-card);overflow:hidden;
  transition:border-color .5s,box-shadow .5s;
}
.video-card:hover{border-color:rgba(63,181,165,.2);box-shadow:0 8px 30px rgba(63,181,165,.05)}
.video-area{
  position:relative;padding-top:56.25%;background:var(--secondary);
}
.video-area::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(circle at center,rgba(63,181,165,.05) 0%,transparent 70%);
}
.video-area .play-wrap{
  position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:1rem;
}
.play-btn{
  width:4rem;height:4rem;border-radius:50%;
  border:1px solid rgba(63,181,165,.3);
  background:rgba(63,181,165,.1);color:var(--primary);
  display:flex;align-items:center;justify-content:center;
  transition:all .3s;
}
.play-btn:hover{background:rgba(63,181,165,.2);transform:scale(1.1);box-shadow:0 8px 24px rgba(63,181,165,.2)}
.play-btn svg{margin-left:3px}
.video-label{font-size:.875rem;color:var(--fg-muted)}
.video-header{
  border-bottom:1px solid var(--border);background:rgba(24,28,37,.3);
  padding:1rem 1.5rem;text-align:center;
}
.video-header h3{font-size:1.125rem;font-weight:600;color:var(--fg)}
.video-header p{font-size:.875rem;color:var(--fg-muted);margin-top:.25rem}

/* ---------- Stats ---------- */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.5rem}
.stat-box{
  border-radius:.5rem;border:1px solid var(--border);
  background:rgba(24,28,37,.5);padding:1rem;text-align:center;
  transition:all .3s;
}
.stat-box:hover{border-color:rgba(63,181,165,.2);background:var(--secondary)}
.stat-val{font-size:1.5rem;font-weight:700;color:var(--primary);font-family:var(--font-mono)}
.stat-label{font-size:.6875rem;color:var(--fg-muted);margin-top:.25rem}

@media(max-width:640px){
  .stats{grid-template-columns:1fr}
}

/* ---------- Team Scroll ---------- */
.team-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}
.team-header .left{display:flex;align-items:center;gap:.75rem}
.team-header h3{font-size:1.25rem;font-weight:600;color:var(--fg)}
.team-arrows{display:flex;gap:.5rem}
.team-arrows button{
  width:2rem;height:2rem;border-radius:.375rem;
  border:1px solid var(--border);background:rgba(24,28,37,.5);
  color:var(--fg-muted);display:flex;align-items:center;justify-content:center;
  transition:all .3s;
}
.team-arrows button:hover{border-color:rgba(63,181,165,.3);color:var(--fg)}

.team-scroll{
  display:flex;gap:1.5rem;overflow-x:auto;
  scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
  scrollbar-width:thin;scrollbar-color:rgba(63,181,165,.3) transparent;
  padding-bottom:1rem;
}
.team-scroll::-webkit-scrollbar{height:4px}
.team-scroll::-webkit-scrollbar-track{background:transparent}
.team-scroll::-webkit-scrollbar-thumb{background:rgba(63,181,165,.3);border-radius:4px}
.team-scroll::-webkit-scrollbar-thumb:hover{background:rgba(63,181,165,.5)}

.member-card{
  min-width:16.25rem;max-width:16.25rem;scroll-snap-align:start;
  border-radius:var(--radius);border:1px solid var(--border);
  background:var(--bg-card);padding:1.5rem;
  transition:all .5s;
}
.member-card:hover{
  border-color:rgba(63,181,165,.2);
  box-shadow:0 8px 30px rgba(63,181,165,.05);
  transform:translateY(-4px);
}
.member-avatar{
  width:5rem;height:5rem;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  margin-bottom:1rem;border:1px solid var(--border);
  transition:border-color .3s;
}
.member-card:hover .member-avatar{border-color:rgba(63,181,165,.3)}
.member-avatar span{font-size:1.125rem;font-weight:600;color:var(--primary)}
.member-card h4{font-size:1rem;font-weight:600;color:var(--fg)}
.member-card .role{
  font-size:.75rem;font-weight:500;color:var(--primary);
  font-family:var(--font-mono);margin-bottom:.75rem;
}
.member-card .desc{font-size:.875rem;color:var(--fg-muted);line-height:1.6}

/* avatar color variants */
.avatar-a{background:linear-gradient(135deg,rgba(63,181,165,.2),rgba(63,181,165,.05))}
.avatar-b{background:linear-gradient(135deg,rgba(45,170,140,.2),rgba(45,170,140,.05))}

/* ---------- Tech Tags ---------- */
.tech-tags{display:flex;flex-wrap:wrap;gap:.75rem}
.tech-tag{
  display:inline-flex;align-items:center;gap:.5rem;
  border-radius:.5rem;border:1px solid var(--border);
  background:rgba(24,28,37,.5);padding:.625rem 1rem;
  transition:all .3s;cursor:default;
}
.tech-tag:hover{
  border-color:rgba(63,181,165,.3);background:var(--secondary);
  transform:translateY(-2px);
}
.tech-tag .name{font-size:.875rem;font-weight:500;color:var(--fg)}
.tech-tag .cat{
  font-size:.625rem;font-weight:500;color:var(--fg-muted);
  background:var(--bg);padding:.125rem .5rem;border-radius:.375rem;
  font-family:var(--font-mono);transition:color .3s;
}
.tech-tag:hover .cat{color:var(--primary)}

/* ---------- Timeline ---------- */
.timeline-section{text-align:center;margin-bottom:3rem}
.timeline-wrap{position:relative;padding-bottom:3rem}

.tl-line{
  position:absolute;left:50%;top:0;bottom:0;width:2px;
  background:linear-gradient(to bottom,transparent,rgba(63,181,165,.3) 10%,rgba(63,181,165,.3) 90%,transparent);
  transform:translateX(-50%);
}
.tl-progress{
  position:absolute;left:50%;top:0;width:2px;
  background:var(--primary);transform:translateX(-50%);
  transition:height .1s linear;
  box-shadow:0 0 8px rgba(63,181,165,.4);
}

.tl-item{margin-bottom:3rem;opacity:0;transform:translateY(30px);transition:all .6s cubic-bezier(.22,1,.36,1)}
.tl-item.visible{opacity:1;transform:translateY(0)}
.tl-item:last-child{margin-bottom:0}

/* Desktop: alternating */
.tl-desktop{display:none}
@media(min-width:769px){
  .tl-desktop{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:2rem}
  .tl-mobile{display:none}
}
.tl-dot{
  width:14px;height:14px;border-radius:50%;
  border:2px solid rgba(63,181,165,.3);background:var(--bg);
  transition:all .4s cubic-bezier(.22,1,.36,1);
  position:relative;z-index:2;
}
.tl-dot.active{
  border-color:var(--primary);background:var(--primary);
  box-shadow:0 0 12px rgba(63,181,165,.5);
}

.tl-card{
  border-radius:var(--radius);border:1px solid var(--border);
  background:var(--bg-card);padding:1.25rem;text-align:left;
  transition:all .5s;
}
.tl-card:hover{
  border-color:rgba(63,181,165,.2);box-shadow:0 8px 30px rgba(63,181,165,.05);
  transform:translateY(-2px);
}
.tl-card-header{display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem}
.tl-card h4{font-size:1rem;font-weight:600;color:var(--fg)}
.tl-card .ext-icon{opacity:0;transition:opacity .3s;color:var(--fg-muted)}
.tl-card:hover .ext-icon{opacity:1}
.tl-card p{font-size:.875rem;color:var(--fg-muted);line-height:1.6}
.tl-date{font-size:.875rem;font-weight:500;color:var(--primary);font-family:var(--font-mono)}

/* Mobile timeline */
@media(max-width:768px){
  .tl-line,.tl-progress{left:20px}
  .tl-mobile{display:grid;grid-template-columns:auto 1fr;gap:1rem}
  .tl-mobile .dot-col{display:flex;flex-direction:column;align-items:center}
}

/* ---------- Footer ---------- */
.site-footer{
  position:relative;z-index:10;
  border-top:1px solid var(--border);
  background:rgba(15,18,25,.5);backdrop-filter:blur(8px);
}
.site-footer .inner{
  max-width:72rem;margin:0 auto;padding:1.5rem;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:1rem;
}
.site-footer .copy{font-size:.75rem;color:var(--fg-muted)}
.site-footer .links{display:flex;gap:1.5rem}
.site-footer .links button{
  font-size:.75rem;text-transform:capitalize;color:var(--fg-muted);transition:color .3s;
}
.site-footer .links button:hover{color:var(--fg)}

/* ---------- Spacing helpers ---------- */
.mb-2{margin-bottom:.5rem}
.mb-3{margin-bottom:.75rem}
.mb-4{margin-bottom:1rem}
.mb-6{margin-bottom:1.5rem}
.mb-8{margin-bottom:2rem}
.mb-12{margin-bottom:3rem}
.mb-16{margin-bottom:4rem}
.mt-6{margin-top:1.5rem}
.gap-1{gap:1rem}

/* ---------- Google Fonts Loader ---------- */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
`;

// ─── SVG icons as reusable strings ──────────────────────────────────────────────
const icons = {
  zap: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  layers: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  arrowRight: `<svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  target: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  play: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  lightbulb: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  chevLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  code2: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
  externalLink: `<svg class="ext-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
  x: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
};

// ─── Data ───────────────────────────────────────────────────────────────────────
const team = [
  { name:"Sarah Chen",    role:"Project Lead",       desc:"Orchestrates cross-functional teams with a vision for scalable product delivery.",  initials:"SC", av:"a" },
  { name:"Marcus Rivera", role:"Lead Engineer",      desc:"Architects robust backend systems and drives technical excellence across the stack.", initials:"MR", av:"b" },
  { name:"Aiko Tanaka",   role:"UX Designer",        desc:"Crafts intuitive user experiences grounded in research and accessibility best practices.", initials:"AT", av:"a" },
  { name:"David Okonkwo", role:"Data Scientist",     desc:"Transforms complex datasets into actionable insights powering intelligent features.", initials:"DO", av:"b" },
  { name:"Elena Petrova", role:"DevOps Engineer",    desc:"Ensures seamless CI/CD pipelines and rock-solid infrastructure reliability.",       initials:"EP", av:"a" },
  { name:"James Mitchell",role:"Frontend Developer", desc:"Builds performant, accessible interfaces with a keen eye for pixel-perfect design.", initials:"JM", av:"b" },
  { name:"Priya Sharma",  role:"QA Lead",            desc:"Champions quality through automated testing strategies and meticulous code reviews.",  initials:"PS", av:"a" },
];

const techs = [
  {name:"React",cat:"Frontend"},{name:"TypeScript",cat:"Language"},{name:"Next.js",cat:"Framework"},
  {name:"Node.js",cat:"Runtime"},{name:"PostgreSQL",cat:"Database"},{name:"Redis",cat:"Cache"},
  {name:"Docker",cat:"DevOps"},{name:"GraphQL",cat:"API"},{name:"Tailwind CSS",cat:"Styling"},
  {name:"AWS",cat:"Cloud"},{name:"Kubernetes",cat:"Orchestration"},{name:"TensorFlow",cat:"ML"},
];

const timeline = [
  {date:"January 2025",title:"Project Inception",desc:"Initial research phase completed. Stakeholder interviews conducted and core requirements documented across 12 departments."},
  {date:"March 2025",title:"Architecture Design",desc:"System architecture finalized with microservices pattern. Tech stack selected after evaluating 15+ frameworks and tools."},
  {date:"May 2025",title:"Core Development",desc:"Primary development sprint launched. API layer, database schemas, and authentication system built and stress-tested."},
  {date:"August 2025",title:"ML Integration",desc:"Machine learning pipeline integrated for predictive analytics. Custom models trained on 2M+ data points for accuracy."},
  {date:"October 2025",title:"Beta Launch",desc:"Closed beta released to 500 users. Collected feedback through surveys, interviews, and in-app analytics sessions."},
  {date:"December 2025",title:"Performance Optimization",desc:"Load time reduced by 70%. Database queries optimized. CDN deployed globally across 14 edge locations."},
  {date:"February 2026",title:"Public Release",desc:"Full public launch with enterprise features. Onboarded 50+ organizations in the first week of general availability."},
];

// ─── index.html ─────────────────────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0a0d14">
  <title>Nexus Project</title>
  <meta name="description" content="A minimalist project showcase website">
  <link rel="stylesheet" href="app.css">
</head>
<body>

  <!-- Particle Background -->
  <canvas id="particle-canvas" aria-hidden="true"></canvas>

  <!-- Navigation -->
  <header class="site-nav">
    <nav class="inner">
      <button class="logo" data-nav="home"><span class="brace">{</span> Nexus <span class="brace">}</span></button>
      <div class="nav-links">
        <button class="nav-link active" data-nav="home">Home</button>
        <button class="nav-link" data-nav="overview">Overview</button>
        <button class="nav-link" data-nav="details">Details</button>
      </div>
      <button class="mobile-toggle" aria-label="Toggle menu">${icons.menu}</button>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <button class="active" data-nav="home">Home</button>
      <button data-nav="overview">Overview</button>
      <button data-nav="details">Details</button>
    </div>
  </header>

  <!-- ═══════════ HOME PAGE ═══════════ -->
  <div id="page-home" class="page active">
    <section class="hero stagger">
      <div class="badge">${icons.zap} Innovation Lab</div>
      <h1 class="text-balance">Building the <span class="accent">Future</span> of Digital</h1>
      <p class="subtitle">A comprehensive project showcase demonstrating cutting-edge technologies, innovative solutions, and a world-class team committed to excellence.</p>
      <div class="cta-row">
        <button class="btn btn-primary" data-nav="overview">${icons.layers} Project Overview ${icons.arrowRight}</button>
        <button class="btn btn-outline" data-nav="details">Project Details ${icons.arrowRight}</button>
      </div>
      <div class="scroll-hint">
        <span>Explore</span>
        <div class="bar"></div>
      </div>
    </section>
  </div>

  <!-- ═══════════ OVERVIEW PAGE ═══════════ -->
  <div id="page-overview" class="page">
    <section class="section">
      <div class="wrap">
        <div class="reveal mb-16">
          <p class="page-label font-mono">01 / Overview</p>
          <h2 class="page-title text-balance">Project Overview</h2>
        </div>

        <!-- Intro Card -->
        <div class="reveal mb-8">
          <div class="card">
            <div class="card-header">
              <div class="card-icon">${icons.target}</div>
              <h3 class="card-heading">Mission Statement</h3>
            </div>
            <p>Nexus is a next-generation platform designed to bridge the gap between complex enterprise workflows and intuitive user experiences. Our mission is to empower teams with tools that are both powerful and delightful to use, leveraging cutting-edge technology to deliver measurable impact at scale.</p>
          </div>
        </div>

        <!-- Video Card -->
        <div class="reveal mb-8">
          <div class="video-card">
            <div class="video-area">
              <div class="play-wrap">
                <button class="play-btn" aria-label="Play demo video">${icons.play}</button>
                <span class="video-label">Watch Project Demo</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Solution Card -->
        <div class="reveal mb-16">
          <div class="card">
            <div class="card-header">
              <div class="card-icon">${icons.lightbulb}</div>
              <h3 class="card-heading">Our Solution</h3>
            </div>
            <p>We developed an integrated platform that unifies data pipelines, real-time analytics, and collaborative workspaces into a single cohesive experience. By combining machine learning-driven insights with an elegant interface, Nexus reduces operational overhead by 60% while increasing team productivity.</p>
            <div class="stats">
              <div class="stat-box"><div class="stat-val font-mono">60%</div><div class="stat-label">Overhead Reduction</div></div>
              <div class="stat-box"><div class="stat-val font-mono">3x</div><div class="stat-label">Faster Deployment</div></div>
              <div class="stat-box"><div class="stat-val font-mono">99.9%</div><div class="stat-label">Uptime Guarantee</div></div>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div class="reveal">
          <div class="team-header">
            <div class="left">
              <div class="card-icon">${icons.users}</div>
              <h3>The Team</h3>
            </div>
            <div class="team-arrows">
              <button id="team-left" aria-label="Scroll team left">${icons.chevLeft}</button>
              <button id="team-right" aria-label="Scroll team right">${icons.chevRight}</button>
            </div>
          </div>
          <div class="team-scroll" id="team-scroll">
            ${team.map(m => `
            <div class="member-card">
              <div class="member-avatar avatar-${m.av}"><span>${m.initials}</span></div>
              <h4>${m.name}</h4>
              <div class="role font-mono">${m.role}</div>
              <div class="desc">${m.desc}</div>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- ═══════════ DETAILS PAGE ═══════════ -->
  <div id="page-details" class="page">
    <section class="section">
      <div class="wrap">
        <div class="reveal mb-16">
          <p class="page-label font-mono">02 / Details</p>
          <h2 class="page-title text-balance">Project Details</h2>
        </div>

        <!-- Technologies Card -->
        <div class="reveal mb-8">
          <div class="card">
            <div class="card-header">
              <div class="card-icon">${icons.code2}</div>
              <h3 class="card-heading">Technologies Used</h3>
            </div>
            <div class="tech-tags">
              ${techs.map(t => `<div class="tech-tag"><span class="name">${t.name}</span><span class="cat font-mono">${t.cat}</span></div>`).join("")}
            </div>
          </div>
        </div>

        <!-- Video Card with Title -->
        <div class="reveal mb-16">
          <div class="video-card">
            <div class="video-header">
              <h3>Technical Deep Dive</h3>
              <p>Architecture walkthrough and implementation details</p>
            </div>
            <div class="video-area">
              <div class="play-wrap">
                <button class="play-btn" aria-label="Play technical overview video">${icons.play}</button>
                <span class="video-label">Watch Technical Overview</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="reveal">
          <div class="timeline-section">
            <p class="page-label font-mono">Development Timeline</p>
            <h3 class="page-title" style="margin-bottom:0">From Concept to Launch</h3>
          </div>

          <div class="timeline-wrap" id="timeline">
            <div class="tl-line"></div>
            <div class="tl-progress" id="tl-progress"></div>

            ${timeline.map((t, i) => {
              const isLeft = i % 2 === 0;
              return `
            <div class="tl-item" data-index="${i}">
              <!-- Desktop -->
              <div class="tl-desktop">
                <div style="text-align:${isLeft ? 'right' : 'left'}; ${isLeft ? '' : 'order:3'}">
                  ${isLeft
                    ? `<div class="tl-card"><div class="tl-card-header"><h4>${t.title}</h4>${icons.externalLink}</div><p>${t.desc}</p></div>`
                    : `<div style="padding-right:1rem"><span class="tl-date">${t.date}</span></div>`
                  }
                </div>
                <div style="order:2;display:flex;justify-content:center">
                  <div class="tl-dot" data-dot="${i}"></div>
                </div>
                <div style="text-align:${isLeft ? 'left' : 'right'}; ${isLeft ? 'order:3' : ''}">
                  ${isLeft
                    ? `<div style="padding-left:1rem"><span class="tl-date">${t.date}</span></div>`
                    : `<div class="tl-card"><div class="tl-card-header"><h4>${t.title}</h4>${icons.externalLink}</div><p>${t.desc}</p></div>`
                  }
                </div>
              </div>
              <!-- Mobile -->
              <div class="tl-mobile">
                <div class="dot-col">
                  <div class="tl-dot" data-dot="${i}"></div>
                </div>
                <div>
                  <div class="tl-date mb-2">${t.date}</div>
                  <div class="tl-card"><div class="tl-card-header"><h4>${t.title}</h4>${icons.externalLink}</div><p>${t.desc}</p></div>
                </div>
              </div>
            </div>`;
            }).join("")}
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="inner">
      <span class="copy">&copy; 2026 Nexus Project. All rights reserved.</span>
      <div class="links">
        <button data-nav="home">Home</button>
        <button data-nav="overview">Overview</button>
        <button data-nav="details">Details</button>
      </div>
    </div>
  </footer>

  <script src="app.js"><\/script>
</body>
</html>`;

// ─── app.js ─────────────────────────────────────────────────────────────────────
const js = `/* ============================================================
   Nexus Project – app.js
   Self-contained vanilla JS for the static site
   ============================================================ */

(function () {
  "use strict";

  // ─── Particle System ────────────────────────────────────────────────────
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const mouse = { x: -1000, y: -1000 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(94,200,185," + p.opacity + ")";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = "rgba(94,200,185," + (0.06 * (1 - dist / 120)) + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 150) {
        const force = (150 - mDist) / 150;
        p.vx += (mdx / mDist) * force * 0.02;
        p.vy += (mdy / mDist) * force * 0.02;
      }
      p.vx *= 0.99;
      p.vy *= 0.99;
    }
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", function () {
    resizeCanvas();
    if (particles.length === 0) initParticles();
  });
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  resizeCanvas();
  initParticles();
  animateParticles();

  // ─── Page Navigation ────────────────────────────────────────────────────
  let currentPage = "home";

  function navigateTo(page) {
    if (page === currentPage) return;

    // Fade out
    const activePage = document.getElementById("page-" + currentPage);
    if (activePage) {
      activePage.style.opacity = "0";
    }

    setTimeout(function () {
      // Hide old
      document.querySelectorAll(".page").forEach(function (p) {
        p.classList.remove("active");
        p.style.opacity = "";
      });

      // Show new
      currentPage = page;
      const newPage = document.getElementById("page-" + page);
      if (newPage) {
        newPage.classList.add("active");
      }

      // Update nav links
      document.querySelectorAll("[data-nav]").forEach(function (btn) {
        const isNav = btn.classList.contains("nav-link") || btn.parentElement.id === "mobile-menu";
        if (isNav) {
          btn.classList.toggle("active", btn.getAttribute("data-nav") === page);
        }
      });

      // Close mobile menu
      document.getElementById("mobile-menu").classList.remove("open");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "instant" });

      // Trigger reveals
      setTimeout(initReveals, 100);
    }, 250);
  }

  // Wire up all navigation buttons
  document.querySelectorAll("[data-nav]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      navigateTo(this.getAttribute("data-nav"));
    });
  });

  // Mobile menu toggle
  document.querySelector(".mobile-toggle").addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("open");
  });

  // ─── Team Scroll ────────────────────────────────────────────────────────
  document.getElementById("team-left").addEventListener("click", function () {
    document.getElementById("team-scroll").scrollBy({ left: -320, behavior: "smooth" });
  });
  document.getElementById("team-right").addEventListener("click", function () {
    document.getElementById("team-scroll").scrollBy({ left: 320, behavior: "smooth" });
  });

  // ─── Scroll Reveal (IntersectionObserver) ───────────────────────────────
  function initReveals() {
    var reveals = document.querySelectorAll(".reveal:not(.visible)");
    if (!reveals.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }
  initReveals();

  // ─── Timeline Scroll Logic ──────────────────────────────────────────────
  function handleTimelineScroll() {
    var wrap = document.getElementById("timeline");
    if (!wrap) return;
    var rect = wrap.getBoundingClientRect();
    var viewportMid = window.innerHeight * 0.6;
    var progress = Math.max(0, Math.min(1, (viewportMid - rect.top) / rect.height));

    var bar = document.getElementById("tl-progress");
    if (bar) bar.style.height = (progress * 100) + "%";

    var items = wrap.querySelectorAll(".tl-item");
    items.forEach(function (item) {
      var itemRect = item.getBoundingClientRect();
      var idx = item.getAttribute("data-index");
      if (itemRect.top < window.innerHeight * 0.75) {
        item.classList.add("visible");
        // Activate dots
        item.querySelectorAll('.tl-dot[data-dot="' + idx + '"]').forEach(function (dot) {
          dot.classList.add("active");
        });
      }
    });
  }

  window.addEventListener("scroll", handleTimelineScroll, { passive: true });
  handleTimelineScroll();
})();
`;

// ─── Write files ────────────────────────────────────────────────────────────────
writeFileSync(join(OUT, "index.html"), html, "utf-8");
writeFileSync(join(OUT, "app.css"), css, "utf-8");
writeFileSync(join(OUT, "app.js"), js, "utf-8");

// ─── Create ZIP ─────────────────────────────────────────────────────────────────
try {
  execSync(`cd "${OUT}" && zip -r ../public/nexus-project.zip index.html app.css app.js`, {
    stdio: "inherit",
  });
  console.log("\\n✓ ZIP created at: public/nexus-project.zip");
  console.log("✓ Static files in: static-site/");
} catch {
  // zip might not be available, try tar
  try {
    execSync(`cd "${OUT}" && tar -czf ../public/nexus-project.tar.gz index.html app.css app.js`, {
      stdio: "inherit",
    });
    console.log("\\n✓ Archive created at: public/nexus-project.tar.gz");
    console.log("✓ Static files in: static-site/");
  } catch (e2) {
    console.log("\\n✓ Static files generated in: static-site/");
    console.log("  - index.html");
    console.log("  - app.css");
    console.log("  - app.js");
    console.log("\\nNote: zip/tar not available. Download via v0 UI instead.");
  }
}
