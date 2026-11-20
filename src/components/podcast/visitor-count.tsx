import { Eye } from 'lucide-react'
import { useVisitorCount } from '@/lib/recordings'
import { cn } from '@/lib/utils'

export function VisitorCount({ className }: { className?: string }) {
  const { data } = useVisitorCount()
  if (data == null) return null
  return <span className={cn('inline-flex items-center gap-1.5', className)} aria-live="polite"><Eye className="size-3.5"/>{data.toLocaleString()} {data === 1 ? 'visitor' : 'visitors'}</span>
}
