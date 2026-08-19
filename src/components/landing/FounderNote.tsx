import { Reveal } from "./Reveal";

export function FounderNote() {
  return (
    <Reveal as="section" className="section founder-note">
      <div className="section-heading">
        <span className="eyebrow">WHY IT EXISTS</span>
        <h2>The question that started it</h2>
        <p>Six years in the markets, and one conviction: a hunch should have to prove itself.</p>
      </div>
      <div className="founder-quote">
        <img src="/assets/icons/founder-note-quote-mark-open.svg" alt="" className="quote-mark quote-mark--open" />
        <blockquote>
          <p>
            I&apos;ve been obsessed with the markets since 11th grade. I traded my own money - made some, lost some
            — and somewhere in that I realised the thing nobody tells you: the individual trader isn&apos;t
            competing on a level field. The technology gap between what institutions have and what the rest of us
            have is massive, and it&apos;s getting wider.
          </p>
          <p>
            So I decided to do something about it. I dropped out after my first year of college to build it
            full-time. We&apos;re still building — and we&apos;re on the verge of launching.
          </p>
        </blockquote>
        <img src="/assets/icons/founder-note-quote-mark-close.svg" alt="" className="quote-mark quote-mark--close" />
      </div>
      <div className="founder-attribution">
        <span className="founder-name">K SAHITYA</span>
        <span className="founder-title">FOUNDER &amp; CEO · ALZYON TECH SOLUTIONS</span>
      </div>
    </Reveal>
  );
}
