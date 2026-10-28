import { useMemo, useState } from 'react';
import {
  ENTRIES,
  COURSEWORK,
  TYPE_LABELS,
  type EntryType,
  type TimelineEntry,
  type TimelineLink,
} from '../data/timeline';
import { thumbForLink } from '../utils/thumb';
import '../styles/Timeline.css';

type TimelineProps = {
  /** Handles a linked row: opens a window, a note, or a photo album */
  onNavigate?: (link: TimelineLink) => void;
};

const FILTERS: (EntryType | 'all')[] = [
  'all',
  'research',
  'project',
  'training',
  'award',
  'industry',
  'service',
  'education',
];

const Timeline = ({ onNavigate }: TimelineProps) => {
  const [filter, setFilter] = useState<EntryType | 'all'>('all');
  const [newestFirst, setNewestFirst] = useState(true);
  const [openCoursework, setOpenCoursework] = useState<Record<number, boolean>>({});
  const [showRest, setShowRest] = useState(false);

  // "All" leads with the pinned highlights as cards; the rest of the
  // list sits collapsed under them. A type filter shows its full list.
  const pinned = useMemo(() => ENTRIES.filter((e) => e.highlight), []);
  const visible = useMemo(
    () =>
      filter === 'all'
        ? ENTRIES.filter((e) => !e.highlight)
        : ENTRIES.filter((e) => e.type === filter),
    [filter]
  );
  const listOpen = filter !== 'all' || showRest;

  // Group into years, then order the year headings
  const years = useMemo(() => {
    const byYear = new Map<number, TimelineEntry[]>();
    for (const entry of visible) {
      const bucket = byYear.get(entry.year);
      if (bucket) bucket.push(entry);
      else byYear.set(entry.year, [entry]);
    }
    return [...byYear.entries()].sort((a, b) =>
      newestFirst ? b[0] - a[0] : a[0] - b[0]
    );
  }, [visible, newestFirst]);

  const toggleCoursework = (year: number) =>
    setOpenCoursework((prev) => ({ ...prev, [year]: !prev[year] }));

  const handleRowClick = (entry: TimelineEntry) => {
    if (entry.link && onNavigate) onNavigate(entry.link);
  };

  return (
    <div className="timeline">
      {/* ---- Filter chips ---- */}
      <div className="timeline-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f !== 'all' && <span className={`type-dot type-${f}`} />}
            {f === 'all' ? 'All' : TYPE_LABELS[f]}
          </button>
        ))}
      </div>

      {/* ---- Pinned highlights ---- */}
      {filter === 'all' && (
        <>
          <div className="timeline-pinned">
            {pinned.map((entry) => {
              const thumb = thumbForLink(entry.link);
              return (
                <button
                  key={entry.id}
                  className="pinned-card"
                  onClick={() => handleRowClick(entry)}
                >
                  <span className="pinned-thumb">
                    {thumb ? <img src={thumb} alt="" loading="lazy" /> : <span className={`type-dot type-${entry.type}`} />}
                  </span>
                  <span className="pinned-text">
                    <span className="pinned-date">{entry.date} {entry.year}</span>
                    <span className="pinned-title">{entry.title}</span>
                    {entry.detail && <span className="pinned-detail">{entry.detail}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <button className="rest-toggle" onClick={() => setShowRest((v) => !v)}>
            {showRest ? '▾' : '▸'} Everything else ({visible.length})
          </button>
        </>
      )}

      {listOpen && (
      <>
      {/* ---- Column headers (Explorer "Details" view) ---- */}
      <div className="timeline-head">
        <button
          className="col col-date sortable"
          onClick={() => setNewestFirst((v) => !v)}
          title="Sort by date"
        >
          Date {newestFirst ? '▼' : '▲'}
        </button>
        <div className="col col-item">Item</div>
        <div className="col col-type">Type</div>
      </div>

      {/* ---- Rows ---- */}
      <div className="timeline-body">
        {years.map(([year, entries]) => (
          <div key={year} className="timeline-year">
            <div className="year-header">{year}</div>

            {entries.map((entry) => {
              const clickable = Boolean(entry.link && onNavigate);
              return (
                <div
                  key={entry.id}
                  className={`timeline-row ${clickable ? 'clickable' : ''}`}
                  onClick={() => handleRowClick(entry)}
                  role={clickable ? 'button' : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleRowClick(entry);
                    }
                  }}
                >
                  <div className="col col-date">{entry.date}</div>
                  <div className="col col-item">
                    <span className="item-title">
                      {clickable && (
                        <span className="link-glyph" aria-hidden="true">
                          {entry.link?.kind === 'note'
                            ? '\u25A4'
                            : entry.link?.kind === 'album'
                              ? '\u25A9'
                              : '\u25B8'}
                        </span>
                      )}
                      {entry.title}
                      {entry.present && <span className="badge-now">NOW</span>}
                    </span>
                    {entry.detail && (
                      <span className="item-detail">{entry.detail}</span>
                    )}
                  </div>
                  <div className="col col-type">
                    <span className={`type-dot type-${entry.type}`} />
                    {TYPE_LABELS[entry.type]}
                  </div>
                </div>
              );
            })}

            {/* Coursework stays collapsed so it doesn't eat the scan */}
            {filter === 'all' && COURSEWORK[year] && (
              <>
                <button
                  className="coursework-toggle"
                  onClick={() => toggleCoursework(year)}
                >
                  {openCoursework[year] ? '▾' : '▸'} Coursework (
                  {COURSEWORK[year].length})
                </button>
                {openCoursework[year] && (
                  <ul className="coursework-list">
                    {COURSEWORK[year].map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        ))}

        {years.length === 0 && (
          <p className="timeline-empty">Nothing filed under that type yet.</p>
        )}
      </div>
      </>
      )}

      <div className="timeline-status">
        {filter === 'all' ? pinned.length + visible.length : visible.length} items
        {filter !== 'all' && `, filtered by ${TYPE_LABELS[filter]}`}
      </div>
    </div>
  );
};

export default Timeline;
