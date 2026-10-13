import { describe, expect, it } from 'vitest'
import { filterEpisodes } from '@/lib/podcast'

describe('Episode discovery', () => {
  it('includes the requested world regions', () => {
    expect(filterEpisodes('All regions', '').map(episode => episode.region)).toEqual(['Egypt', 'India', 'Eurasia', 'Mesopotamia'])
  })
  it('filters Egypt without including other regions', () => {
    expect(filterEpisodes('Egypt', '').map(episode => episode.id)).toEqual(['001'])
  })
  it('finds Proto-Indo-European stories through topic search', () => {
    expect(filterEpisodes('All regions', 'Proto-Indo-Europeans').map(episode => episode.id)).toEqual(['003'])
  })
  it('combines topic and region filters', () => {
    expect(filterEpisodes('India', 'pyramids')).toEqual([])
  })
})