import { useState } from 'react';
import type { Memory } from '../types';
import { readPhoto } from '../services/photoService';

export function ImportPanel({
  ready,
  onSave,
}: {
  ready: boolean;
  onSave: (memory: Memory) => boolean;
}) {
  const [person, setPerson] = useState('');
  const [drafts, setDrafts] = useState<Memory[]>([]);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function collect(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setNotice('');
    const next: Memory[] = [];
    let skipped = 0;
    for (const file of Array.from(files).slice(0, 20)) {
      try {
        const image = file.type.startsWith('image/') ? await readPhoto(file) : undefined;
        if (!image && (!file.name.toLowerCase().endsWith('.txt') || file.size > 100000))
          throw new Error('Unsupported file');
        const text = image ? file.name : await file.text();
        next.push({
          id: crypto.randomUUID(),
          person: person.trim(),
          text: text.slice(0, 5000),
          date: new Date(file.lastModified).toISOString().slice(0, 10),
          image,
        });
      } catch {
        skipped += 1;
      }
    }
    setDrafts(next);
    setNotice(
      skipped
        ? skipped + ' files could not be imported.'
        : 'Review your files before saving. Dates use file modification time.',
    );
    setBusy(false);
  }

  return (
    <section className="import-panel" id="import">
      <div>
        <p className="eyebrow">02 / COLLECT</p>
        <h2>From your device.</h2>
        <p>
          Choose photographs or exported text conversations from your phone or computer.
          Nothing is collected without your selection.
        </p>
      </div>
      <div>
        <label>
          Person or collection
          <input value={person} onChange={(event) => setPerson(event.target.value)} />
        </label>
        <label className="file-drop">
          Choose up to 20 files
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,.txt"
            disabled={!ready || busy || !person.trim()}
            onChange={(event) => {
              void collect(event.target.files);
              event.target.value = '';
            }}
          />
        </label>
        <p role="status">{busy ? 'Reading files…' : notice}</p>
        {drafts.map((draft) => (
          <div className="import-draft" key={draft.id}>
            {draft.image && <img src={draft.image} alt="Selected photo" />}
            <span>{draft.text.slice(0, 100)}</span>
            <button
              onClick={() => {
                if (onSave(draft))
                  setDrafts((items) => items.filter((item) => item.id !== draft.id));
              }}
            >
              Save
            </button>
            <button
              onClick={() =>
                setDrafts((items) => items.filter((item) => item.id !== draft.id))
              }
            >
              Skip
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
