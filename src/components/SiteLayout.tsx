export function SiteHeader() {
  return (
    <header>
      <a className="brand" href="./">
        ever<span>archive.</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#archive">Archive</a>
        <a href="#memorial">Memory book</a>
        <a href="#import">Import</a>
      </nav>
      <span className="tag">PRIVATE / LOCAL</span>
    </header>
  );
}
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">THE PERSONAL ARCHIVE / VOL. 01</p>
        <h1>
          Every memory
          <br />
          <em>has a home.</em>
        </h1>
        <p>Preserve the words, photographs and moments that tell your family's story.</p>
        <a className="primary" href="#add">
          Archive a memory ↗
        </a>
      </div>
      <div className="book-object" aria-hidden="true">
        <div className="book-page">
          <span>EVERARCHIVE / 01</span>
          <strong>
            THE
            <br />
            STORIES
            <br />
            WE KEEP.
          </strong>
          <i>Collected moments.</i>
          <small>001</small>
        </div>
        <div className="book-page book-right">
          <div className="photo-placeholder">
            <span>
              YOUR
              <br />
              PHOTOGRAPH
              <br />
              HERE
            </span>
          </div>
          <i>From the family archive.</i>
          <small>002</small>
        </div>
      </div>
    </section>
  );
}
export function SiteFooter() {
  return (
    <footer>
      EverArchive · Fictional sample memories · Data stays in this browser. Not a secure
      backup.
    </footer>
  );
}
