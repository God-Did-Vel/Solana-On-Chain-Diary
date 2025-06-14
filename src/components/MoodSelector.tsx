import { MOODS, } from '../types/diary';
import type { Mood } from '../types/diary';
import { cn } from '../utils/utils';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        How are you feeling?
      </label>
      <div className="grid grid-cols-4 gap-2">
        {MOODS.map((mood: Mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onMoodSelect(mood.value)}
            className={cn(
              "flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:scale-105",
              selectedMood === mood.value
                ? "border-purple-500 bg-purple-500/20"
                : "border-gray-600 bg-gray-800 hover:border-gray-500"
            )}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs text-gray-300">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
