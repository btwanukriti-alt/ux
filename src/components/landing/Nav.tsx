import Link from "next/link";

export function Nav() {
  return (
    <header className="nav" id="top">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          <img src="/assets/images/logo-jaadu-coloured.png" alt="Jaadu" width={169} height={41} />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#top">Overview</a>
          <a href="#quant-lab">Quant Lab</a>
          <a href="#features">Features</a>
          <a href="#journey">Journey</a>
          <a href="#team">Team</a>
        </nav>
        <div className="nav-actions">
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
