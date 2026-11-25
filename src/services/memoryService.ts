import type { Memory } from '../types';
const STORAGE_KEY = 'everarchive-v1';
export async function loadMemories(): Promise<Memory[]> {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved) as Memory[];
  const response = await fetch(import.meta.env.BASE_URL + 'memories.json');
  if (!response.ok) throw new Error('Could not load sample memories');
  return response.json() as Promise<Memory[]>;
}
export function persistMemories(memories: Memory[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}
