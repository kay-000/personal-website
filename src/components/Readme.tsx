import type { TimelineLink } from '../data/timeline';
import { asset } from '../utils/asset';
import { NOTES_BY_ID, isVideo } from '../data/notes';
import AutoLoopVideo from './AutoLoopVideo';
import '../styles/Readme.css';

// The Jensen Huang clip leads, pulled from its note so there's one copy
const JENSEN = NOTES_BY_ID['jensen-2026']?.photos?.find(isVideo);

/* The first window every visitor sees. Replaces the old
   "click around and explore" welcome with the highlights,
   each one a link into the rest of the site. */
type Highlight = { label: string; detail: string; link: TimelineLink };

const HIGHLIGHTS: Highlight[] = [
  { label: 'Rales Fellow', detail: 'Full-tuition fellowship, 1 of 34 from 400+ applicants', link: { kind: 'note', id: 'rales-fellowship' } },
  { label: 'AirLab researcher', detail: 'Safety evaluation for autonomous navigation, RA-L manuscript in prep', link: { kind: 'project', id: 'research' } },
  { label: '2nd Place, IROS 2026', detail: 'IEEE RAS Standards Video Prize, $4,000 to ICRA 2027', link: { kind: 'note', id: 'iros-2026' } },
  { label: 'ROSCon Global 2026 Scholar', detail: 'Fully funded, Toronto', link: { kind: 'note', id: 'roscon-2026' } },
  { label: 'RimA Summer School', detail: 'Spot and Go2 in Karlsruhe, selected from 450', link: { kind: 'note', id: 'fzi-kit-2026' } },
  { label: 'FIReVision', detail: 'Thermal IR wildfire simulator, 15,000+ synthetic images', link: { kind: 'project', id: 'firevision' } },
  { label: 'Memorial Sloan Kettering', detail: 'Software intern, 1st place intern hackathon', link: { kind: 'project', id: 'msk' } },
];

type ReadmeProps = {
  onNavigate: (link: TimelineLink) => void;
  onOpenWindow: (id: string) => void;
};

const Readme = ({ onNavigate, onOpenWindow }: ReadmeProps) => (
  <div className="readme">
    <div className="readme-head">
      <img src={asset('pfp.jpeg')} alt="Kayla McFarlane" />
      <div>
        <h2>Kayla McFarlane</h2>
        <p className="readme-role">MS Robotics, Carnegie Mellon University</p>
      </div>
    </div>

    {JENSEN && (
      <figure className="readme-hero">
        <AutoLoopVideo src={JENSEN.src} poster={JENSEN.poster} />
        <figcaption>
          Welcoming Jensen Huang to Carnegie Mellon with Martial Hebert and
          Burcu Akinci, May 2026.{' '}
          <button className="readme-link" onClick={() => onNavigate({ kind: 'note', id: 'jensen-2026' })}>
            Read the story
          </button>
        </figcaption>
      </figure>
    )}

    <h3>Highlights</h3>
    <ul className="readme-list">
      {HIGHLIGHTS.map((h) => (
        <li key={h.label}>
          <button onClick={() => onNavigate(h.link)}>
            <span className="readme-label">{h.label}</span>
            <span className="readme-detail">{h.detail}</span>
          </button>
        </li>
      ))}
    </ul>

    <div className="readme-actions">
      <button onClick={() => onOpenWindow('kayla_cv')}>Open CV</button>
      <button onClick={() => onOpenWindow('kayla_info')}>Full timeline</button>
      <button onClick={() => onOpenWindow('contact')}>Contact me</button>
    </div>
  </div>
);

export default Readme;
