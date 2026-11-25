export function SiteHeader() {
  return (
    <header>
      <a className="brand" href="./">
        ever<span>archive.</span>
      </a>
      <span className="tag">PRIVATE BROWSER DEMO</span>
    </header>
  );
}
export function Hero() {
  return (
    <section className="hero">
      <p className="eyebrow">A PLACE FOR WHAT REMAINS</p>
      <h1>
        Every memory
        <br />
        has a home.
      </h1>
      <p>Preserve the words, photographs and moments that tell your family's story.</p>
      <a className="primary" href="#add">
        Archive a memory
      </a>
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
