import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram,  } from '@solana/web3.js';
import type { DiaryEntry } from '../types/diary';

export function useDiary() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Load entries from localStorage (simulating on-chain storage)
  useEffect(() => {
    if (publicKey) {
      const savedEntries = localStorage.getItem(`diary_${publicKey.toString()}`);
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    }
  }, [publicKey]);

  const saveEntry = async (entry: Omit<DiaryEntry, 'id' | 'timestamp' | 'publicKey'>) => {
    if (!publicKey) throw new Error('Wallet not connected');
    
    setLoading(true);
    try {
      // Create a simple transaction to "store" the entry on-chain
      // In a real implementation, this would interact with a Solana program
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // Self-transfer for demo
          lamports: 1, // Minimal amount
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      const newEntry: DiaryEntry = {
        ...entry,
        id: signature,
        timestamp: Date.now(),
        publicKey: publicKey.toString(),
      };

      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      
      // Save to localStorage (simulating on-chain storage)
      localStorage.setItem(`diary_${publicKey.toString()}`, JSON.stringify(updatedEntries));
      
      return newEntry;
    } catch (error) {
      console.error('Error saving entry:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    entries,
    saveEntry,
    loading,
    isConnected: !!publicKey,
  };
}
