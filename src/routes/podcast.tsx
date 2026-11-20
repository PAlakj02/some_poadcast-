import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Clock3, Globe2, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EpisodeDetails } from '@/components/podcast/episode-card'
import { RecordingsList } from '@/components/podcast/recordings-list'
import { episodes, podcastHead } from '@/lib/podcast'
import hero from '@/assets/history-hero.jpg'

export const Route = createFileRoute('/podcast')({ head: () => podcastHead('Echoes of History — Shray’s world history podcast', 'Listen to Echoes of History: the people, places, and ideas of the ancient world, hosted by Shray.'), component: Podcast })

const aboutPodcast = [
  'Our journey begins largely in the ancient world: Egypt, India, Mesopotamia, and the wide expanse of Eurasia. But history doesn’t stay within neat borders, and neither do we.',
  'A question about an ancient city can lead to a trade route. A familiar word can take us back to the Proto-Indo-Europeans. An artifact can open a window onto an everyday life very different from our own.',
  'This is a place for those connections, for the big questions, and for the details that make the past feel human.',
]

function Podcast() {
  return <main>
    <section className="hero">
      <img src={hero} width={1920} height={1024} alt="A collection of ancient Egyptian, Mesopotamian, and Indian artifacts" className="hero-image" fetchPriority="high"/>
      <div className="site-width hero-content rise-in">
        <p className="eyebrow flex items-center gap-3 text-gold"><span className="h-px w-7 bg-gold"/>The podcast</p>
        <h1 className="hero-title">Echoes of<br/><em>History.</em></h1>
        <p className="hero-copy">The people, places, and ideas that shaped our world. A journey through history, one story at a time.</p>
        <div className="hero-actions"><Button variant="hero" size="lg" asChild><a href="#listen"><Headphones/>Listen now</a></Button><Button variant="heroOutline" size="lg" asChild><a href="#explore">Explore episodes</a></Button></div>
        <p className="hero-note"><Globe2 className="size-3.5"/>Across civilizations. Across continents. Across time.</p>
      </div>
    </section>

    <section id="listen" className="portfolio-section site-width">
      <p className="eyebrow mb-3 text-primary">Hosted by Shray</p>
      <h2 className="section-heading mb-8">Latest recordings</h2>
      <RecordingsList/>
    </section>

    <section id="explore" className="portfolio-section border-y bg-secondary">
      <Carousel opts={{ align: 'start' }} className="site-width">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><p className="eyebrow mb-3 text-primary">Stories worth uncovering</p><h2 className="section-heading">Explore the podcast</h2></div>
          <div className="flex shrink-0 gap-2"><CarouselPrevious className="static size-10 translate-y-0"/><CarouselNext className="static size-10 translate-y-0"/></div>
        </div>
        <CarouselContent className="-ml-6">
          {episodes.map(episode => <CarouselItem key={episode.id} className="pl-6 sm:basis-1/2 lg:basis-1/3">
            <EpisodeDetails episode={episode}>
              <button type="button" className="carousel-card">
                <img src={episode.image} alt="" width={1024} height={768} loading="lazy" className="episode-image"/>
                <span className="block p-5">
                  <span className="episode-meta flex items-center justify-between gap-2"><span className="text-primary">Ep. {episode.id} · {episode.category}</span><span className="flex items-center gap-1 text-muted-foreground"><Clock3 className="size-3"/>{episode.duration}</span></span>
                  <span className="episode-title mt-3 block">{episode.title}</span>
                  <span className="mt-2 block text-[13px] leading-6 text-muted-foreground">{episode.description}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">Open <ArrowUpRight className="size-3"/></span>
                </span>
              </button>
            </EpisodeDetails>
          </CarouselItem>)}
          <CarouselItem className="pl-6 sm:basis-1/2 lg:basis-1/3">
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="carousel-card">
                  <img src={hero} alt="" width={1920} height={1024} loading="lazy" className="episode-image"/>
                  <span className="block p-5">
                    <span className="episode-meta text-primary">About the podcast</span>
                    <span className="episode-title mt-3 block">The story behind the stories</span>
                    <span className="mt-2 block text-[13px] leading-6 text-muted-foreground">Why Echoes of History exists, and where it’s headed next.</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">Open <ArrowUpRight className="size-3"/></span>
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <p className="eyebrow text-primary">About the podcast</p>
                <DialogTitle className="font-serif text-3xl font-normal">Driven by curiosity. Not confined by an era.</DialogTitle>
                <DialogDescription asChild><div className="space-y-4 leading-relaxed">{aboutPodcast.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></DialogDescription>
              </DialogContent>
            </Dialog>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <p className="site-width mt-8 text-xs leading-6 text-muted-foreground">The episode cards are samples with illustrative artwork. Shray’s real recordings appear under “Latest recordings”.</p>
    </section>
  </main>
}
