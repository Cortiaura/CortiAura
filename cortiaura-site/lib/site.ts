// One place for the facts search engines and AI assistants use to recognise CortiAura and its founder.
// Keep names, descriptions and profile links identical everywhere (site, LinkedIn, Crunchbase, Dealroom...).

export const SITE_URL = 'https://www.cortiaura.com';

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/cortiaura',
  facebook: 'https://www.facebook.com/profile.php?id=61595278711959',
  instagram: 'https://www.instagram.com/cortiaurascience/',
  x: 'https://x.com/CortiAura',
};

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRASHANT_URL = `${SITE_URL}/authors/prashant-bhand`;
export const PRASHANT_ID = `${PRASHANT_URL}#person`;
export const RATNAKAR_ID = `${SITE_URL}/about#ratnakar-mishra`;

export const ORG_DESCRIPTION =
  'CortiAura is a UK neurotechnology company developing a non-invasive wearable built around the gut–brain connection. It is in development and not yet available.';

export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'CortiAura',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/logo.svg`,
  description: ORG_DESCRIPTION,
  email: 'Prashant@cortiaura.com',
  areaServed: 'GB',
  knowsAbout: ['Gut–brain axis', 'Vagus nerve', 'Heart rate variability', 'Neurotechnology'],
  sameAs: [SOCIAL.linkedin, SOCIAL.facebook, SOCIAL.instagram, SOCIAL.x],
  founder: [{ '@id': PRASHANT_ID }, { '@id': RATNAKAR_ID }],
};

export const PRASHANT = {
  '@type': 'Person',
  '@id': PRASHANT_ID,
  name: 'Dr Prashant Bhand',
  honorificPrefix: 'Dr',
  jobTitle: 'Gastroenterologist',
  description:
    'Dr Prashant Bhand is an NHS gastroenterologist with 9–10 years of experience in gastroenterology and the founder of CortiAura.',
  image: `${SITE_URL}/assets/prashant.jpeg`,
  url: PRASHANT_URL,
  worksFor: { '@id': ORG_ID },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Grant Medical College, Mumbai' },
  knowsAbout: ['Gastroenterology', 'Gut–brain axis', 'Vagus nerve', 'Autonomic nervous system', 'Neuromodulation'],
};

export const RATNAKAR = {
  '@type': 'Person',
  '@id': RATNAKAR_ID,
  name: 'Dr Ratnakar Mishra',
  jobTitle: 'Co-founder and Chief Scientific Officer',
  url: `${SITE_URL}/about`,
  worksFor: { '@id': ORG_ID },
  knowsAbout: ['Neuroscience', 'Synaptic plasticity', 'Neurodegeneration'],
};

// Key for IndexNow (Bing, Yandex and others). The same value is served at /<key>.txt.
export const INDEXNOW_KEY = '697748ba8f486a130138632c6b29ae53';
