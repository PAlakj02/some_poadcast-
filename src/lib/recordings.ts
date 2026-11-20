import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export type Recording = { id: string; title: string; description: string; drive_file_id: string; plays: number; created_at: string }

export const recordingsKey = ['recordings'] as const
export const visitorsKey = ['visitors'] as const
const VISIT_FLAG = 'echoes-visit-counted'

function client() {
  if (!supabase) throw new Error('Recordings are not set up yet (missing Supabase keys).')
  return supabase
}

// Accepts the links Google Drive's "Share" / "Copy link" buttons produce and returns the file id.
export function parseDriveLink(input: string): { id: string } | { error: string } {
  const link = input.trim()
  if (!link) return { error: 'Paste the Google Drive link to the recording.' }
  if (/\/folders\//.test(link)) return { error: 'That’s a folder link. Open the recording itself in Drive and copy its link.' }
  if (!/^https?:\/\/(drive|docs)\.google\.com\//i.test(link)) return { error: 'That doesn’t look like a Google Drive link.' }
  const id = link.match(/\/d\/([A-Za-z0-9_-]{10,})/)?.[1] ?? link.match(/[?&]id=([A-Za-z0-9_-]{10,})/)?.[1]
  return id ? { id } : { error: 'Couldn’t find the file in that link. Use Drive’s “Copy link” button.' }
}

export const drivePlayerUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`
export const driveViewUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`

export async function listRecordings() {
  const { data, error } = await client().from('recordings').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Recording[]
}

export async function addRecording({ title, description, driveLink }: { title: string; description: string; driveLink: string }) {
  const parsed = parseDriveLink(driveLink)
  if ('error' in parsed) throw new Error(parsed.error)
  const { error } = await client().from('recordings').insert({ title: title.trim(), description: description.trim(), drive_file_id: parsed.id })
  if (error) throw new Error(error.code === '23505' ? 'That recording has already been added.' : error.message)
}

export async function deleteRecording(recording: Recording) {
  const { error } = await client().from('recordings').delete().eq('id', recording.id)
  if (error) throw error
}

export async function countPlay(id: string) {
  if (supabase) await supabase.rpc('count_play', { recording_id: id })
}

// Counts each browser once, then just reads the shared total on later visits.
export async function loadVisitorCount() {
  const db = client()
  let counted = false
  try { counted = localStorage.getItem(VISIT_FLAG) === '1' } catch { /* storage blocked: count again */ }
  if (!counted) {
    const { data, error } = await db.rpc('count_visit')
    if (!error && data != null) {
      try { localStorage.setItem(VISIT_FLAG, '1') } catch { /* ignore */ }
      return Number(data)
    }
  }
  const { data, error } = await db.from('site_counters').select('value').eq('name', 'visitors').single()
  if (error) throw error
  return Number(data.value)
}

export function useRecordings() {
  return useQuery({ queryKey: recordingsKey, queryFn: listRecordings, enabled: !!supabase })
}

export function useVisitorCount() {
  return useQuery({ queryKey: visitorsKey, queryFn: loadVisitorCount, enabled: !!supabase, staleTime: Infinity, retry: 1 })
}
