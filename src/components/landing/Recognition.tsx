import { Reveal } from "./Reveal";

export function Recognition() {
  return (
    <Reveal as="section" className="recognition">
      <span className="eyebrow">RECOGNISED BY</span>
      <div className="recognition-logos">
        <img src="/assets/images/logo-nvidia.png" alt="Nvidia Inception Program" width={178} height={97} />
        <img src="/assets/images/logo-google-for-startups.png" alt="Google for Startups" width={189} height={100} />
        <img src="/assets/images/logo-startup-india.png" alt="Startup India" width={179} height={101} />
      </div>
    </Reveal>
  );
}
