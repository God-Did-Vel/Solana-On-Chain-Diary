export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  imageUrl?: string;
  timestamp: number;
  publicKey: string;
}

export interface Mood {
  emoji: string;
  label: string;
  value: string;
}

export const MOODS: Mood[] = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '😤', label: 'Angry', value: 'angry' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful' },
  { emoji: '😍', label: 'Excited', value: 'excited' },
  { emoji: '😌', label: 'Peaceful', value: 'peaceful' },
];
