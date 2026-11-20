import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { portfolio } from '@/lib/portfolio'
import { podcastHead } from '@/lib/podcast'

export const Route = createFileRoute('/research')({ head: () => podcastHead(`Research — ${portfolio.name}`, `The history questions ${portfolio.name} is researching.`), component: Research })

function Research() {
  return <main>
    <section className="page-intro site-width">
      <p className="eyebrow text-primary">Research</p>
      <h1 className="page-title">Questions I’m digging into.</h1>
      <p className="max-w-2xl text-sm leading-7 text-muted-foreground">Every podcast episode starts as research. These are the topics I’m reading about, taking notes on, and trying to answer.</p>
    </section>
    <section className="editorial-section site-width">
      <div className="grid gap-6 md:grid-cols-2">{portfolio.research.map(item => <article key={item.title} className="portfolio-card">
        <div className="episode-meta flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-primary"><BookOpen className="size-3.5"/>{item.topic}</span><span className="text-muted-foreground">{item.status}</span></div>
        <h2 className="episode-title mt-4">{item.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
      </article>)}</div>
      <Button asChild className="mt-10"><Link to="/podcast">Hear the stories on the podcast <ArrowRight/></Link></Button>
    </section>
  </main>
}
