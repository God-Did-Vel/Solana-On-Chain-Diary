import "./App.css";

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletContextProvider } from './contexts/WalletContext';
import { WalletButton } from './components/WalletButton';
import { DiaryEntryForm } from './components/DiaryEntryForm';
import { DiaryEntryList } from './components/DiaryEntryList';
import { useDiary } from './hooks/useDiary';
import { BookOpen, Plus, List } from 'lucide-react';

function DiaryApp() {
  const { connected } = useWallet();
  const { entries } = useDiary();
  const [activeTab, setActiveTab] = useState<'write' | 'entries'>('write');

  if (!connected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <BookOpen className="mx-auto h-16 w-16 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">On-Chain Diary</h1>
          <p className="text-gray-400 max-w-md">
            Your personal journal stored permanently on the Solana blockchain. 
            Connect your wallet to start writing.
          </p>
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">On-Chain Diary</h1>
          </div>
          <WalletButton />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('write')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'write'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Plus size={20} />
              Write Entry
            </button>
            <button
              onClick={() => setActiveTab('entries')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'entries'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <List size={20} />
              My Entries ({entries.length})
            </button>
          </div>
        </div>

        {activeTab === 'write' ? (
          <DiaryEntryForm onEntryAdded={() => setActiveTab('entries')} />
        ) : (
          <DiaryEntryList entries={entries} />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <WalletContextProvider>
      <DiaryApp />
    </WalletContextProvider>
  );
}

export default App;
