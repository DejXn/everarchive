import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Memory } from '../types';
import { readPhoto } from '../services/photoService';
interface Props {
  ready: boolean;
  initial?: Memory;
  onSave: (memory: Memory) => boolean;
  setError: (message: string) => void;
  onCancel: () => void;
}
export function MemoryForm({ ready, initial, onSave, setError, onCancel }: Props) {
  const [person, setPerson] = useState(initial?.person ?? '');
  const [body, setBody] = useState(initial?.text ?? '');
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().slice(0, 10),
  );
  const [image, setImage] = useState<string | undefined>(initial?.image);
  const [editing, setEditing] = useState<string | undefined>(initial?.id);
  const [busy, setBusy] = useState(false);
  function reset() {
    setPerson('');
    setBody('');
    setImage(undefined);
    setEditing(undefined);
    onCancel();
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!person.trim() || !body.trim()) return;
    const item = {
      id: editing ?? crypto.randomUUID(),
      person: person.trim(),
      text: body.trim(),
      date,
      image,
    };
    if (onSave(item)) reset();
  }
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      const data = await readPhoto(file);
      setImage(data);
      setError('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to read image.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <aside id="add">
      <h2>{editing ? 'Edit memory' : 'Add a memory'}</h2>
      <form onSubmit={submit}>
        <label>
          Person
          <input
            required
            maxLength={100}
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          />
        </label>
        <label>
          Date
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Message or story
          <textarea
            required
            maxLength={5000}
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Paste a text message or write a memory…"
          />
        </label>
        <label>
          Photo (optional)
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => void upload(e.target.files?.[0])}
          />
        </label>
        {image && (
          <>
            <img className="thumbnail" src={image} alt="Upload preview" />
            <button type="button" onClick={() => setImage(undefined)}>
              Remove photo
            </button>
          </>
        )}
        <button className="primary" disabled={!ready || busy}>
          {editing ? 'Save changes' : 'Save memory'}
        </button>
        {editing && (
          <button type="button" onClick={reset}>
            Cancel
          </button>
        )}
      </form>
    </aside>
  );
}
