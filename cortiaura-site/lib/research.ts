// Shared by the Research page and its API route.
// Deliberately no health questions: these are ways to get involved and topics of interest only.

// Form value -> HubSpot "Research involvement" (ca_research_pathway) option value.
export const RESEARCH_PATHWAYS: Record<string, { hubspot: string; label: string; hint: string }> = {
  register: {
    hubspot: 'research_register',
    label: 'Research interest register',
    hint: 'Hear when a study opens, then decide whether to take part',
  },
  panel: {
    hubspot: 'patient_panel',
    label: 'Patient and public involvement panel',
    hint: 'Help us design studies before they start',
  },
};

// Form value -> HubSpot "Research topics" (ca_research_topics) option value.
export const RESEARCH_TOPICS: Record<string, { hubspot: string; label: string }> = {
  gutbrain: { hubspot: 'gut_brain_research', label: 'The gut–brain axis' },
  digestive: { hubspot: 'digestive_health_research', label: 'Digestive health research' },
  vagus: { hubspot: 'vagus_nerve_wellbeing', label: 'Vagus nerve and nervous system wellbeing' },
  recovery: { hubspot: 'stress_sleep_recovery', label: 'Stress, sleep and recovery' },
};

export const RESEARCH_COUNTRIES = ['United Kingdom', 'Ireland', 'Other'];
