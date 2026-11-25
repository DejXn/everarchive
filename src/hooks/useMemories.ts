import { useEffect, useState } from 'react';
import type { Memory } from '../types';
import { loadMemories, persistMemories } from '../services/memoryService';
export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await loadMemories();
        if (active) {
          setMemories(data);
          setReady(true);
        }
      } catch {
        if (active) setError('Unable to load archive. Refresh to retry.');
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);
  function save(next: Memory[]) {
    try {
      persistMemories(next);
      setMemories(next);
      setError('');
      return true;
    } catch {
      setError('Storage is full or unavailable. Try a smaller photo.');
      return false;
    }
  }

  function upsert(memory: Memory) {
    return save(
      memories.some((item) => item.id === memory.id)
        ? memories.map((item) => (item.id === memory.id ? memory : item))
        : [memory, ...memories],
    );
  }
  function remove(id: string) {
    return save(memories.filter((item) => item.id !== id));
  }
  return { memories, ready, error, setError, upsert, remove };
}
