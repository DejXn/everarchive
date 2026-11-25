import { useState } from 'react';
import { ImportPanel } from './components/ImportPanel';
import type { Memory } from './types';
import { useMemories } from './hooks/useMemories';
import { SiteHeader, Hero, SiteFooter } from './components/SiteLayout';
import { MemoryArchive } from './components/MemoryArchive';
import { MemoryForm } from './components/MemoryForm';
import { MemorialBuilder } from './components/MemorialBuilder';

export default function App() {
  const { memories, ready, error, setError, upsert, remove } = useMemories();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [editing, setEditing] = useState<Memory>();
  function select(id: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, id] : current.filter((item) => item !== id),
    );
  }
  function edit(memory: Memory) {
    setEditing(memory);
    document.getElementById('add')?.scrollIntoView();
  }
  function deleteMemory(id: string) {
    if (window.confirm('Delete this memory?') && remove(id)) {
      select(id, false);
      if (editing?.id === id) setEditing(undefined);
    }
  }
  const chosen = memories
    .filter((memory) => selected.includes(memory.id))
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <section className="workspace" id="archive">
          <MemoryArchive
            memories={memories}
            ready={ready}
            query={query}
            selected={selected}
            onQuery={setQuery}
            onSelect={select}
            onEdit={edit}
            onDelete={deleteMemory}
          />
          <MemoryForm
            key={editing?.id ?? 'new'}
            initial={editing}
            ready={ready}
            onSave={upsert}
            setError={setError}
            onCancel={() => setEditing(undefined)}
          />
        </section>
        <ImportPanel ready={ready} onSave={upsert} />
        <MemorialBuilder chosen={chosen} />
      </main>
      <SiteFooter />
    </>
  );
}
