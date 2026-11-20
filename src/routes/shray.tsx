import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState, type FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Session } from '@supabase/supabase-js'
import { CheckCircle2, Link2, Lock, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RecordingsList } from '@/components/podcast/recordings-list'
import { addRecording, deleteRecording, parseDriveLink, recordingsKey, type Recording } from '@/lib/recordings'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/shray')({
  head: () => ({ meta: [{ title: 'Shray’s studio — Echoes of History' }, { name: 'robots', content: 'noindex, nofollow' }] }),
  component: Studio,
})

function Studio() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  useEffect(() => {
    if (!supabase) return
    void supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  return <main className="site-width editorial-section max-w-2xl">
    <p className="eyebrow text-primary">Shray’s studio</p>
    <h1 className="page-title">Add a new recording</h1>
    {!supabase
      ? <p className="recordings-note">The studio needs the site’s database keys before it can be used. See the README.</p>
      : session === undefined
        ? <p className="recordings-note">Checking login…</p>
        : session ? <Uploader session={session}/> : <Login/>}
  </main>
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true); setError('')
    const { error } = await supabase!.auth.signInWithPassword({ email: email.trim(), password })
    if (error) setError('That email or password isn’t right.')
    setBusy(false)
  }
  return <form onSubmit={submit} className="studio-card mt-6 space-y-4">
    <p className="flex items-center gap-2 text-sm text-muted-foreground"><Lock className="size-4"/>This page is only for Shray. Please log in.</p>
    <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)}/></div>
    <div className="space-y-1.5"><Label htmlFor="password">Password</Label><Input id="password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)}/></div>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <Button type="submit" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</Button>
  </form>
}

function Uploader({ session }: { session: Session }) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [driveLink, setDriveLink] = useState('')
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const linkCheck = driveLink.trim() ? parseDriveLink(driveLink) : null

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true); setMessage(null)
    try {
      await addRecording({ title, description, driveLink })
      setTitle(''); setDescription(''); setDriveLink('')
      setMessage({ kind: 'ok', text: 'Added! It’s now live on the website.' })
      await queryClient.invalidateQueries({ queryKey: recordingsKey })
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Something went wrong.'
      setMessage({ kind: 'error', text: /row-level security/i.test(text) ? 'This account isn’t allowed to add recordings.' : text })
    }
    setBusy(false)
  }

  async function remove(recording: Recording) {
    if (!window.confirm(`Remove “${recording.title}” from the website? (It stays in your Google Drive.)`)) return
    try {
      await deleteRecording(recording)
      await queryClient.invalidateQueries({ queryKey: recordingsKey })
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Couldn’t remove it.')
    }
  }

  return <>
    <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
      <span>Logged in as {session.user.email}</span>
      <Button variant="ghost" size="sm" onClick={() => void supabase!.auth.signOut()}><LogOut/>Log out</Button>
    </div>

    <ol className="studio-steps">
      <li>Upload your recording to Google Drive.</li>
      <li>In Drive, click <strong>Share</strong> → General access → <strong>Anyone with the link</strong> (Viewer).</li>
      <li>Click <strong>Copy link</strong> and paste it below.</li>
    </ol>

    <form onSubmit={submit} className="studio-card space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="drive">Google Drive link</Label>
        <div className="relative"><Link2 className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground"/><Input id="drive" className="pl-9" placeholder="https://drive.google.com/file/d/…" required value={driveLink} onChange={event => setDriveLink(event.target.value)}/></div>
        {linkCheck && ('error' in linkCheck
          ? <p className="text-xs text-destructive">{linkCheck.error}</p>
          : <p className="flex items-center gap-1.5 text-xs text-primary"><CheckCircle2 className="size-3.5"/>Looks good.</p>)}
      </div>
      <div className="space-y-1.5"><Label htmlFor="title">Episode title</Label><Input id="title" required maxLength={120} value={title} onChange={event => setTitle(event.target.value)}/></div>
      <div className="space-y-1.5"><Label htmlFor="description">What is it about? (optional)</Label><Textarea id="description" maxLength={1000} rows={3} value={description} onChange={event => setDescription(event.target.value)}/></div>
      {message && <p role={message.kind === 'error' ? 'alert' : 'status'} className={message.kind === 'error' ? 'text-sm text-destructive' : 'text-sm text-primary'}>{message.text}</p>}
      <Button type="submit" disabled={busy || !linkCheck || 'error' in linkCheck}>{busy ? 'Adding…' : 'Add to website'}</Button>
    </form>

    <h2 className="section-heading mb-6 mt-14">On the website now</h2>
    <RecordingsList onDelete={remove} emptyText="Nothing added yet — your first recording will show up here."/>
    <p className="mt-10 text-xs text-muted-foreground"><Link to="/portfolio" hash="podcast" className="text-primary hover:underline">See how visitors see it →</Link></p>
  </>
}
