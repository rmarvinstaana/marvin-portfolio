export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="site-footer-name">Marvin Sta. Ana</span>
        <span className="site-footer-divider">·</span>
        <span className="site-footer-role">Head of Content · mb.io</span>
        <span className="site-footer-divider">·</span>
        <span className="site-footer-location">Dubai, UAE</span>
      </div>
      <div className="site-footer-copy-line">© {new Date().getFullYear()} · Built with React & too much coffee</div>
    </footer>
  )
}
