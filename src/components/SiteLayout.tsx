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
      <div className="edition-line">
        <span>INDEPENDENT MEMORY ARCHIVE</span>
        <span>EST. 2026 / VOL. 01</span>
      </div>
      <div className="editorial-title">
        <p>
          For the people
          <br />
          we carry with us.
        </p>
        <h1>
          THE ART OF
          <br />
          <em>REMEMBERING.</em>
        </h1>
      </div>
      <div className="editorial-spread">
        <div className="editorial-left">
          <p className="eyebrow">01 — THE COLLECTION</p>
          <h2>
            Life, in
            <br />
            little pieces.
          </h2>
          <p>
            Photographs. Conversations. The ordinary moments that become extraordinary
            with time.
          </p>
          <a className="primary" href="#archive">
            Explore your archive ↗
          </a>
          <a className="editorial-link" href="#import">
            Collect from your device ↗
          </a>
          <small>001 / EVERARCHIVE</small>
        </div>
        <figure className="editorial-photo">
          <img
            src={import.meta.env.BASE_URL + 'images/editorial-family.jpg'}
            alt="Family together outdoors, illustrative stock photograph"
          />
          <figcaption>
            <span>FIG. 01 — TOGETHER</span>
            <span>ILLUSTRATIVE PHOTOGRAPH / UNSPLASH</span>
          </figcaption>
        </figure>
        <div className="editorial-right">
          <span>FIELD NOTES / 01</span>
          <p>“What we keep tells the story of who we are.”</p>
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
