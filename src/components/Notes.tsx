import { PUBLISHED_NOTES } from '../data/notes';
import '../styles/Notes.css';

type NotesProps = {
  /** Opens a note in its own window (Explorer → Notepad) */
  onOpenNote?: (noteId: string) => void;
};

/* The file browser. Each note opens as its own window, the way
   Notepad opened one window per document — see NoteDocument.tsx. */
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
      <div className="note-list">
        {PUBLISHED_NOTES.map((n) => (
          <button
            key={n.id}
            className="note-row"
            onClick={() => onOpenNote?.(n.id)}
          >
            <span className="note-row-icon" aria-hidden="true">
              ▤
            </span>
            <span className="note-row-main">
              <span className="note-row-name">{n.filename}</span>
              <span className="note-row-summary">{n.summary}</span>
            </span>
            <span className="note-row-date">{n.date}</span>
          </button>
        ))}
      </div>
    )}
  </div>
);

export default Notes;
