import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { MoodSelector } from '../components/MoodSelector';
import { ImageUpload } from '../components/ImageUpload';
import { useDiary } from '../hooks/useDiary';

interface DiaryEntryFormProps {
  onEntryAdded: () => void;
}

export function DiaryEntryForm({ onEntryAdded }: DiaryEntryFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { saveEntry, loading } = useDiary();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !mood) return;

    try {
      await saveEntry({
        title: title.trim(),
        content: content.trim(),
        mood,
        imageUrl,
      });

      // Reset form
      setTitle('');
      setContent('');
      setMood('');
      setImageUrl(undefined);
      onEntryAdded();
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-700">
      <h2 className="text-xl font-semibold text-white">Write a new entry</h2>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind today?"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={6}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          required
        />
      </div>

      <MoodSelector selectedMood={mood} onMoodSelect={setMood} />
      
      <ImageUpload imageUrl={imageUrl} onImageChange={setImageUrl} />

      <button
        type="submit"
        disabled={loading || !title.trim() || !content.trim() || !mood}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <Save size={20} />
        )}
        {loading ? 'Saving to blockchain...' : 'Save Entry'}
      </button>
    </form>
  );
}
