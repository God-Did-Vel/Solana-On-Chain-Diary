import type { DiaryEntry } from '../types/diary';
import { DiaryEntryCard } from './DiaryEntryCard';
import { BookOpen } from 'lucide-react';

interface DiaryEntryListProps {
  entries: DiaryEntry[];
}

export function DiaryEntryList({ entries }: DiaryEntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-300 mb-2">No entries yet</h3>
        <p className="text-gray-400">Start writing your first diary entry!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Your Entries ({entries.length})</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <DiaryEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
