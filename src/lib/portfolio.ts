// Shray's portfolio content. Edit the text here — the page layout picks it up automatically.
// Keep personal details (school, city, phone, personal email) off this public page.

export const portfolioSections = [
  { id: 'about', label: 'About' },
  { id: 'interests', label: 'Interests' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
] as const

export const portfolio = {
  name: 'Shray',
  tagline: 'Young historian, storyteller, and host of Echoes of History.',
  intro: 'I love finding out how people lived thousands of years ago — and then telling everyone about it.',
  about: [
    'Hi! I’m Shray. I started Echoes of History because I kept asking questions about the ancient world and wanted somewhere to share the answers I found.',
    'Each episode starts with something I’m curious about — a pyramid, a lost city, or a word that’s older than anyone remembers — and follows it wherever it leads.',
  ],
  interests: [
    { title: 'Ancient civilizations', copy: 'Egypt, the Indus Valley, Mesopotamia, and the peoples of the Eurasian steppe.' },
    { title: 'Languages & words', copy: 'How words travel across continents and what they tell us about the past.' },
    { title: 'Storytelling', copy: 'Turning research into stories that are fun to listen to.' },
    { title: 'Maps & archaeology', copy: 'Reading old maps and learning how archaeologists find clues.' },
  ],
  projects: [
    { title: 'Echoes of History podcast', copy: 'A history podcast I research, record, and host, exploring the ancient world one story at a time.' },
    { title: 'Timeline of the ancient world', copy: 'A hand-drawn timeline linking events in Egypt, India, and Mesopotamia side by side.' },
    { title: 'Project placeholder', copy: 'Add another project here — a school project, a model, a piece of writing, or a video.' },
  ],
  achievements: [
    { year: '2026', title: 'Launched Echoes of History', copy: 'Recorded and published the first episodes of the podcast.' },
    { year: '2026', title: 'Achievement placeholder', copy: 'Add a competition, award, certificate, or milestone here.' },
  ],
}
