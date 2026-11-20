import { useState } from 'react'
import { ArrowUpRight, Headphones, Mic, Play, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { countPlay, drivePlayerUrl, driveViewUrl, useRecordings, type Recording } from '@/lib/recordings'
import { supabase } from '@/lib/supabase'

const dateFormat = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' })

// The Drive player only loads after "Listen" is pressed, so long lists stay fast and each listen is counted once.
function RecordingItem({ recording, onDelete }: { recording: Recording; onDelete?: ((recording: Recording) => void) | undefined }) {
  const [playing, setPlaying] = useState(false)
  const plays = recording.plays + (playing ? 1 : 0)
  return <li className="recording-item">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="episode-meta text-muted-foreground">{dateFormat.format(new Date(recording.created_at))}</p>
        <h3 className="episode-title mt-2">{recording.title}</h3>
      </div>
      <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground" title="Times played"><Headphones className="size-3.5"/>{plays.toLocaleString()} {plays === 1 ? 'listen' : 'listens'}</span>
    </div>
    {recording.description && <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{recording.description}</p>}
    {playing && <iframe src={drivePlayerUrl(recording.drive_file_id)} title={`Player: ${recording.title}`} allow="autoplay" className="recording-player"/>}
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {!playing && <Button size="sm" onClick={() => { setPlaying(true); void countPlay(recording.id) }}><Play/>Listen</Button>}
      <Button variant="outline" size="sm" asChild><a href={driveViewUrl(recording.drive_file_id)} target="_blank" rel="noreferrer">Open in Google Drive <ArrowUpRight/></a></Button>
      {onDelete && <Button variant="outline" size="sm" className="ml-auto" onClick={() => onDelete(recording)}><Trash2/>Remove</Button>}
    </div>
  </li>
}

export function RecordingsList({ onDelete, emptyText = 'New recordings are on their way. Check back soon!' }: { onDelete?: (recording: Recording) => void; emptyText?: string }) {
  const { data, isPending, isError } = useRecordings()
  if (!supabase) return <p className="recordings-note"><Mic className="size-4 shrink-0"/>Recordings will appear here once the site’s database is connected.</p>
  if (isPending) return <p className="recordings-note">Loading recordings…</p>
  if (isError) return <p className="recordings-note">Recordings couldn’t be loaded right now. Please try again later.</p>
  if (!data.length) return <p className="recordings-note"><Mic className="size-4 shrink-0"/>{emptyText}</p>
  return <ul className="grid gap-5">{data.map(recording => <RecordingItem key={recording.id} recording={recording} onDelete={onDelete}/>)}</ul>
}
