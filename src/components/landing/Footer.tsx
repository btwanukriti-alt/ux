function YoutubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="YouTube">
      <path
        d="M21.8 8.001s-.2-1.42-.82-2.05c-.79-.82-1.67-.83-2.08-.88C15.98 4.9 12 4.9 12 4.9h-.01s-3.98 0-6.9.17c-.4.05-1.28.06-2.08.88-.62.63-.82 2.05-.82 2.05S2 9.66 2 11.32v1.36c0 1.66.2 3.32.2 3.32s.2 1.42.82 2.05c.79.82 1.83.79 2.29.88 1.66.16 7.05.21 7.05.21s3.98-.01 6.9-.18c.4-.05 1.28-.06 2.08-.88.62-.63.82-2.05.82-2.05s.2-1.66.2-3.32v-1.36c0-1.66-.2-3.32-.2-3.32ZM9.99 14.6V8.79l5.6 2.91-5.6 2.9Z"
        fill="#a7bce4"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <img src="/assets/images/logo-jaadu-coloured.png" alt="Jaadu" width={169} height={41} />
          <div className="footer-legal">
            <a href="#">Privacy policy</a>
            <a href="#">Terms of use</a>
          </div>
          <div className="footer-socials">
            <img src="/assets/icons/icon-email-footer.svg" alt="Email" />
            <img src="/assets/icons/icon-linkedin-footer.svg" alt="LinkedIn" />
            <img src="/assets/icons/icon-instagram-footer.svg" alt="Instagram" />
            <YoutubeIcon />
          </div>
        </div>
        <div className="footer-divider" />
        <p className="footer-disclaimer">
          Jaadu is a research and analysis tool. It does not execute trades, hold funds, or provide investment
          advice. Backtested and simulated results are hypothetical, do not reflect all market conditions, and are
          not indicative of future performance. Crypto assets are volatile and you can lose money. Always do your
          own research.
        </p>
        <p className="footer-copyright">© 2026 Jaadu. All rights reserved.</p>
      </div>
    </footer>
  );
}
