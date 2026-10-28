import { PUBLISHED_NOTES } from '../data/notes';
import { stillFor } from '../utils/thumb';
import '../styles/Notes.css';

type NotesProps = {
  /** Opens a note in its own window (Explorer → Notepad) */
  onOpenNote?: (noteId: string) => void;
};

/* The file browser, in Explorer's Thumbnails view so it reads
   differently from the Details-view timeline. Each note opens as
   its own window — see NoteDocument.tsx. */
const Notes = ({ onOpenNote }: NotesProps) => (
  <div className="notes">
    <h2>Notes</h2>
    <p className="notes-intro">
      Field notes from conferences, summer schools, and outreach — what it was,
      what I did, and what I took away.
    </p>

    {PUBLISHED_NOTES.length === 0 ? (
      <p className="empty-note">
        No notes published yet. Write them in <code>src/data/notes/</code> and
        set <code>draft: false</code> to publish.
      </p>
    ) : (
      <div className="note-grid">
        {PUBLISHED_NOTES.map((n) => {
          const thumb = stillFor(n.photos?.[0]);
          return (
            <button
              key={n.id}
              className="note-tile"
              onClick={() => onOpenNote?.(n.id)}
              title={n.summary}
            >
              <span className="note-tile-thumb">
                {thumb ? (
                  <img src={thumb} alt="" loading="lazy" />
                ) : (
                  <span className="note-row-icon" aria-hidden="true">▤</span>
                )}
              </span>
              <span className="note-tile-title">{n.title}</span>
              <span className="note-tile-date">{n.date}</span>
            </button>
          );
        })}
      </div>
    )}
  </div>
);

export default Notes;
