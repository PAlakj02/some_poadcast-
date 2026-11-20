import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Headphones, Lightbulb, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VisitorCount } from '@/components/podcast/visitor-count'
import { portfolio } from '@/lib/portfolio'
import { podcastHead } from '@/lib/podcast'
import hero from '@/assets/history-hero.jpg'

export const Route = createFileRoute('/')({ head: () => podcastHead(`${portfolio.name} — Young historian & podcast host`, `${portfolio.name}'s portfolio: research, projects, and the Echoes of History podcast.`), component: Home })

function Home() {
  return <main>
    <section className="hero">
      <img src={hero} width={1920} height={1024} alt="A collection of ancient Egyptian, Mesopotamian, and Indian artifacts" className="hero-image" fetchPriority="high"/>
      <div className="site-width hero-content rise-in">
        <p className="eyebrow flex items-center gap-3 text-gold"><span className="h-px w-7 bg-gold"/>Portfolio</p>
        <h1 className="hero-title">Hey, I’m <em>{portfolio.name}.</em></h1>
        <p className="hero-copy">{portfolio.tagline} {portfolio.intro}</p>
        <div className="hero-actions">
          <Button variant="hero" size="lg" asChild><Link to="/podcast"><Headphones/>Listen to my podcast</Link></Button>
          <Button variant="heroOutline" size="lg" asChild><Link to="/research">See my research <ArrowRight/></Link></Button>
        </div>
        <p className="hero-note"><VisitorCount/></p>
      </div>
    </section>

    <section className="portfolio-section site-width grid gap-10 md:grid-cols-[1fr_1.4fr]">
      <div><p className="eyebrow mb-3 text-primary">About me</p><h2 className="section-heading">Curious about the past, excited to share it.</h2></div>
      <div className="space-y-5 text-sm leading-7 text-muted-foreground">{portfolio.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>

    <section className="portfolio-section border-y bg-secondary">
      <div className="site-width">
        <p className="eyebrow mb-3 text-primary">What I love</p><h2 className="section-heading mb-9">Interests</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{portfolio.interests.map(item => <div key={item.title}><Sparkles className="mb-4 size-5 text-primary" strokeWidth={1.5}/><h3 className="text-2xl">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p></div>)}</div>
      </div>
    </section>

    <section className="portfolio-section site-width">
      <p className="eyebrow mb-3 text-primary">Things I’ve made</p><h2 className="section-heading mb-9">Projects</h2>
      <div className="grid gap-6 md:grid-cols-3">{portfolio.projects.map(project => <article key={project.title} className="portfolio-card"><Lightbulb className="mb-4 size-5 text-primary" strokeWidth={1.5}/><h3 className="text-2xl">{project.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{project.copy}</p></article>)}</div>
    </section>
  </main>
}
