import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Memory } from './types';
const KEY = 'everarchive-v1';
export default function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [person, setPerson] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [image, setImage] = useState<string>();
  const [selected, setSelected] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState(false);
  const [editing, setEditing] = useState<string>();
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const saved = localStorage.getItem(KEY);
        const data = saved
          ? JSON.parse(saved)
          : await fetch(import.meta.env.BASE_URL + 'memories.json').then((r) => {
              if (!r.ok) throw Error('Could not load sample memories');
              return r.json();
            });
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
      localStorage.setItem(KEY, JSON.stringify(next));
      setMemories(next);
      setError('');
      return true;
    } catch {
      setError('Storage is full or unavailable. Try a smaller photo.');
      return false;
    }
  }
  function reset() {
    setPerson('');
    setBody('');
    setImage(undefined);
    setEditing(undefined);
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
    if (
      save(
        editing
          ? memories.map((m) => (m.id === editing ? item : m))
          : [item, ...memories],
      )
    )
      reset();
  }
  async function upload(file?: File) {
    if (!file) return;
    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      setError('Choose a JPEG, PNG or WebP under 2 MB.');
      return;
    }
    setBusy(true);
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      setImage(data);
      setError('');
    } catch {
      setError('Unable to read image.');
    } finally {
      setBusy(false);
    }
  }
  const visible = memories.filter((m) =>
    (m.person + ' ' + m.text).toLowerCase().includes(query.toLowerCase()),
  );
  const chosen = memories
    .filter((m) => selected.includes(m.id))
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <header>
        <a className="brand" href="./">
          ever<span>archive.</span>
        </a>
        <span className="tag">PRIVATE BROWSER DEMO</span>
      </header>
      <main>
        <section className="hero">
          <p className="eyebrow">A PLACE FOR WHAT REMAINS</p>
          <h1>
            Every memory
            <br />
            has a home.
          </h1>
          <p>
            Preserve the words, photographs and moments that tell your family's story.
          </p>
          <a className="primary" href="#add">
            Archive a memory
          </a>
        </section>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <section className="workspace">
          <div>
            <div className="sectionhead">
              <h2>
                Your archive <small>{memories.length}</small>
              </h2>
              <input
                aria-label="Search memories"
                placeholder="Search memories…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {!ready ? (
              <p>Loading archive…</p>
            ) : visible.length === 0 ? (
              <p>No matching memories.</p>
            ) : (
              <div className="cards">
                {visible.map((m) => (
                  <article key={m.id}>
                    {m.image && <img src={m.image} alt={'Memory of ' + m.person} />}
                    <p className="eyebrow">{m.date}</p>
                    <h3>{m.person}</h3>
                    <p className="story">{m.text}</p>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected.includes(m.id)}
                        onChange={(e) =>
                          setSelected((s) =>
                            e.target.checked
                              ? [...s, m.id]
                              : s.filter((id) => id !== m.id),
                          )
                        }
                      />{' '}
                      Include in memorial
                    </label>
                    <div className="actions">
                      <button
                        onClick={() => {
                          setEditing(m.id);
                          setPerson(m.person);
                          setBody(m.text);
                          setDate(m.date);
                          setImage(m.image);
                          document.getElementById('add')?.scrollIntoView();
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm('Delete this memory?') &&
                            save(memories.filter((x) => x.id !== m.id))
                          )
                            setSelected((s) => s.filter((id) => id !== m.id));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
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
        </section>
        <section className="memorial">
          <p className="eyebrow">KEEP THEIR STORY ALIVE</p>
          <h2>Build a memorial</h2>
          <p>Select memories above to create a printable tribute.</p>
          <input
            aria-label="Memorial title"
            placeholder="In loving memory of…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="primary"
            disabled={!chosen.length}
            onClick={() => setPreview(true)}
          >
            Preview memorial ({chosen.length})
          </button>
          {preview && (
            <div className="tribute">
              <h2>{title.trim() || 'In loving memory'}</h2>
              {chosen.map((m) => (
                <article key={m.id}>
                  {m.image && <img src={m.image} alt={m.person} />}
                  <h3>{m.person}</h3>
                  <p>{m.text}</p>
                  <small>{m.date}</small>
                </article>
              ))}
              <button onClick={() => window.print()}>Print / Save PDF</button>
              <button onClick={() => setPreview(false)}>Close</button>
            </div>
          )}
        </section>
      </main>
      <footer>
        EverArchive · Fictional sample memories · Data stays in this browser. Not a secure
        backup.
      </footer>
    </>
  );
}
