import { useState } from 'react';
import type { Memory } from '../types';
export function MemorialBuilder({ chosen }: { chosen: Memory[] }) {
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState(false);
  return (
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
  );
}
