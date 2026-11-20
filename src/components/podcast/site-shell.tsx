import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VisitorCount } from '@/components/podcast/visitor-count'
import { portfolio } from '@/lib/portfolio'

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/podcast', label: 'Podcast' },
] as const

function Brand() { return <span className="portfolio-brand">{portfolio.name}<span>.</span></span> }

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <header className="site-header sticky top-0 z-30 border-b">
    <div className="site-width flex h-full items-center justify-between gap-5">
      <Link to="/" aria-label={`${portfolio.name} home`}><Brand/></Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
        {tabs.map(tab => <Link key={tab.to} to={tab.to} activeOptions={{ exact: tab.to === '/' }} className="nav-link" activeProps={{ className: 'nav-link active' }}>{tab.label}</Link>)}
      </nav>
      <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
    </div>
    {open && <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-full flex flex-col gap-2 border-b bg-background px-5 py-4 shadow-sm">
      {tabs.map(tab => <Link key={tab.to} to={tab.to} activeOptions={{ exact: tab.to === '/' }} className="nav-link" activeProps={{ className: 'nav-link active' }} onClick={() => setOpen(false)}>{tab.label}</Link>)}
    </nav>}
  </header>
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-width flex flex-col justify-between gap-7 md:flex-row md:items-center">
      <Link to="/"><Brand/></Link>
      <p className="text-xs text-muted-foreground">{portfolio.tagline}</p>
      <div className="flex gap-6 text-xs text-muted-foreground">{tabs.map(tab => <Link key={tab.to} to={tab.to} className="hover:text-primary">{tab.label}</Link>)}</div>
    </div>
    <div className="site-width mt-7 flex flex-wrap justify-between gap-3 border-t pt-5 text-[10px] text-muted-foreground">
      <span>© {new Date().getFullYear()} {portfolio.name} · Echoes of History</span>
      <VisitorCount/>
    </div>
  </footer>
}
