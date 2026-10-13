import egypt from '@/assets/egypt.jpg'
import india from '@/assets/india.jpg'
import steppe from '@/assets/steppe.jpg'
import artifacts from '@/assets/history-hero.jpg'

export const regions = ['All regions', 'Egypt', 'India', 'Mesopotamia', 'Eurasia'] as const
export const episodes = [
  { id: '001', title: 'Egypt: Beyond the Pyramids', region: 'Egypt', category: 'Ancient Egypt', image: egypt, duration: '48 min', description: 'A journey along the Nile, into the beliefs, everyday lives, and enduring questions of ancient Egypt.', detail: 'Beyond the monumental tombs lies a world of farmers, scribes, craftspeople, and communities. This episode explores the human stories behind one of history’s most recognizable civilizations.' },
  { id: '002', title: 'The Indus Valley’s Silent Cities', region: 'India', category: 'Ancient India', image: india, duration: '52 min', description: 'Cities, trade, and an undeciphered script. Exploring the mysteries of the Indus Valley civilization.', detail: 'What can a city tell us when its writing remains unread? We explore urban life in the Indus Valley and the questions its archaeological record leaves open. The cover is illustrative, not a photograph of an Indus site.' },
  { id: '003', title: 'In Search of the First Words', region: 'Eurasia', category: 'Proto-Indo-Europeans', image: steppe, duration: '56 min', description: 'Across the Eurasian steppe, tracing the languages and journeys that connect a continent.', detail: 'Language, archaeology, and ancient DNA offer different windows into the past. This episode introduces the search for Proto-Indo-European origins, with space for evidence, uncertainty, and competing interpretations.' },
  { id: '004', title: 'Mesopotamia: A World in Clay', region: 'Mesopotamia', category: 'Ancient Mesopotamia', image: artifacts, duration: '45 min', description: 'Between two rivers, a story of cities, writing, and the traces people left behind.', detail: 'From clay tablets to the remains of early cities, we look at how the people of Mesopotamia recorded their world—and what those fragments can tell us today.' },
] as const
export type Episode = typeof episodes[number]
export function filterEpisodes(region: string, query: string) {
  const term = query.trim().toLowerCase()
  return episodes.filter(episode => (region === 'All regions' || episode.region === region) && `${episode.title} ${episode.category} ${episode.description}`.toLowerCase().includes(term))
}
export function podcastHead(title: string, description: string) {
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }
}
