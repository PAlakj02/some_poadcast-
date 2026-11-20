import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState, type MouseEvent } from 'react'
import { ArrowLeft, Award, Lightbulb, Sparkles } from 'lucide-react'
import { RecordingsList } from '@/components/podcast/recordings-list'
import { VisitorCount } from '@/components/podcast/visitor-count'
import { portfolio, portfolioSections } from '@/lib/portfolio'
import { podcastHead } from '@/lib/podcast'

export const Route = createFileRoute('/portfolio')({ head: () => podcastHead(`${portfolio.name} — Portfolio`, `${portfolio.name}'s portfolio: the young host of Echoes of History, a world history podcast.`), component: Portfolio })

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id)
  if (!target) return
  event.preventDefault()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

// Highlights the nav link of the section currently in view.
function useActiveSection() {
  const [active, setActive] = useState<string>('top')
  useEffect(() => {
    const ids = ['top', ...portfolioSections.map(section => section.id)]
    const update = () => {
      let current = 'top'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = ids.at(-1) ?? current
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  return active
}

function Portfolio() {
  const active = useActiveSection()
  return <div className="portfolio">
    <header className="portfolio-nav">
      <div className="site-width flex h-full items-center gap-6">
        <a href="#top" onClick={event => scrollToSection(event, 'top')} className="portfolio-brand">{portfolio.name}<span>.</span></a>
        <nav aria-label="Portfolio sections" className="portfolio-links">
          {portfolioSections.map(section => <a key={section.id} href={`#${section.id}`} onClick={event => scrollToSection(event, section.id)} className={active === section.id ? 'nav-link active' : 'nav-link'} aria-current={active === section.id ? 'location' : undefined}>{section.label}</a>)}
        </nav>
        <Link to="/" className="portfolio-back"><ArrowLeft className="size-3.5"/><span className="hidden sm:inline">Back to podcast</span><span className="sm:hidden">Podcast</span></Link>
      </div>
    </header>

    <main>
      <section id="top" className="portfolio-hero">
        <div className="site-width rise-in">
          <div className="portfolio-monogram" aria-hidden="true">{portfolio.name.charAt(0)}</div>
          <p className="eyebrow mt-8 flex items-center gap-3 text-gold"><span className="h-px w-7 bg-gold"/>Portfolio</p>
          <h1 className="hero-title">Hi, I’m <em>{portfolio.name}.</em></h1>
          <p className="hero-copy max-w-xl">{portfolio.tagline} {portfolio.intro}</p>
          <p className="hero-note"><VisitorCount/></p>
        </div>
      </section>

      <section id="about" className="portfolio-section site-width grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div><p className="eyebrow mb-3 text-primary">About me</p><h2 className="section-heading">Curious about the past, excited to share it.</h2></div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">{portfolio.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section id="interests" className="portfolio-section border-y bg-secondary">
        <div className="site-width">
          <p className="eyebrow mb-3 text-primary">What I love</p><h2 className="section-heading mb-9">Interests</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{portfolio.interests.map(item => <div key={item.title}><Sparkles className="mb-4 size-5 text-primary" strokeWidth={1.5}/><h3 className="text-2xl">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p></div>)}</div>
        </div>
      </section>

      <section id="podcast" className="portfolio-section site-width">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div><p className="eyebrow mb-3 text-primary">Listen</p><h2 className="section-heading">My podcast recordings</h2></div>
          <Link to="/episodes" className="text-xs text-primary underline-offset-4 hover:underline">See the full podcast site</Link>
        </div>
        <RecordingsList/>
      </section>

      <section id="projects" className="portfolio-section border-y bg-secondary">
        <div className="site-width">
          <p className="eyebrow mb-3 text-primary">Things I’ve made</p><h2 className="section-heading mb-9">Projects</h2>
          <div className="grid gap-6 md:grid-cols-3">{portfolio.projects.map(project => <article key={project.title} className="portfolio-card"><Lightbulb className="mb-4 size-5 text-primary" strokeWidth={1.5}/><h3 className="text-2xl">{project.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{project.copy}</p></article>)}</div>
        </div>
      </section>

      <section id="achievements" className="portfolio-section site-width">
        <p className="eyebrow mb-3 text-primary">Milestones</p><h2 className="section-heading mb-9">Achievements</h2>
        <ol className="portfolio-timeline">{portfolio.achievements.map(item => <li key={item.title}><Award className="size-5 text-primary" strokeWidth={1.5}/><div><p className="episode-meta text-muted-foreground">{item.year}</p><h3 className="mt-1 text-2xl">{item.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.copy}</p></div></li>)}</ol>
      </section>
    </main>

    <footer className="site-footer">
      <div className="site-width flex flex-col justify-between gap-4 text-xs text-muted-foreground md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} {portfolio.name} · Echoes of History</span>
        <VisitorCount/>
        <Link to="/" className="hover:text-primary">Back to the podcast</Link>
      </div>
    </footer>
  </div>
}
