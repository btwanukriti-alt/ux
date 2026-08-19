import { Reveal } from "./Reveal";

const MEMBERS = [
  {
    name: "K Sahitya",
    title: "Founder & CEO",
    bio: "Trading since school, full-time on algorithmic strategies since 2022. Jaadu is the terminal he kept wishing existed.",
  },
  {
    name: "Akarsh Nayak",
    title: "CTO",
    bio: "Builds the engine underneath — data pipelines, backtests, and everything that has to stay fast.",
  },
  {
    name: "K Sahitya",
    title: "Founder & CEO",
    bio: "Role and bio to confirm before launch.",
  },
];

export function Team() {
  return (
    <section className="section team" id="team">
      <Reveal as="div" className="section-heading">
        <span className="eyebrow">THE TEAM</span>
        <h2>The people building it</h2>
        <p>A small team of traders and engineers, building the terminal they wanted to work in.</p>
      </Reveal>

      <Reveal as="div" className="team-grid">
        {MEMBERS.map((m, i) => (
          <article className="team-card" key={i}>
            <div className="team-card-socials">
              <img src="/assets/icons/icon-email-team.svg" alt="Email" />
              <img src="/assets/icons/icon-linkedin-team.svg" alt="LinkedIn" />
              <img src="/assets/icons/icon-instagram-team.svg" alt="Instagram" />
            </div>
            <h5 className="team-name">{m.name}</h5>
            <span className="team-title">{m.title}</span>
            <p className="team-bio">{m.bio}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
