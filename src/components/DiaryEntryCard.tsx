import type { DiaryEntry, } from '../types/diary';
import  {  MOODS } from '../types/diary';
import { Calendar, ExternalLink } from 'lucide-react';

interface DiaryEntryCardProps {
  entry: DiaryEntry;
}

export function DiaryEntryCard({ entry }: DiaryEntryCardProps) {
  const mood = MOODS.find(m => m.value === entry.mood);
  const date = new Date(entry.timestamp);

  const handleViewOnChain = () => {
    // Open Solana explorer with the transaction ID
    window.open(`https://explorer.solana.com/tx/${entry.id}?cluster=devnet`, '_blank');
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{entry.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {date.toLocaleDateString()} at {date.toLocaleTimeString()}
            </div>
            {mood && (
              <div className="flex items-center gap-1">
                <span>{mood.emoji}</span>
                <span>{mood.label}</span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleViewOnChain}
          className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors"
          title="View on Solana Explorer"
        >
          <ExternalLink size={16} />
          On-chain
        </button>
      </div>

      {entry.imageUrl && (
        <img
          src={entry.imageUrl}
          alt="Entry attachment"
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      <p className="text-gray-300 whitespace-pre-wrap">{entry.content}</p>
    </div>
  );
}
