import type { Memory } from '../types';
interface Props {
  memories: Memory[];
  ready: boolean;
  query: string;
  selected: string[];
  onQuery: (query: string) => void;
  onSelect: (id: string, checked: boolean) => void;
  onEdit: (memory: Memory) => void;
  onDelete: (id: string) => void;
}
export function MemoryArchive({
  memories,
  ready,
  query,
  selected,
  onQuery,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  const visible = memories.filter((memory) =>
    (memory.person + ' ' + memory.text).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div>
      <div className="sectionhead">
        <h2>
          Your archive <small>{memories.length}</small>
        </h2>
        <input
          aria-label="Search memories"
          placeholder="Search memories…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
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
                  onChange={(e) => onSelect(m.id, e.target.checked)}
                />{' '}
                Include in memorial
              </label>
              <div className="actions">
                <button onClick={() => onEdit(m)}>Edit</button>
                <button onClick={() => onDelete(m.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
