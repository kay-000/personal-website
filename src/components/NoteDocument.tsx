import { NOTES_BY_ID } from '../data/notes';
import { asset } from '../utils/asset';
import FileTile from './FileTile';
import PhotoGallery from './PhotoGallery';
import '../styles/Notes.css';

type NoteDocumentProps = {
  noteId: string;
  /** Opens an attached file in its own window */
  onOpenFile?: (id: string, title: string, src: string) => void;
};

/* A single note, rendered as its own window — the Notepad half of
   the Explorer→Notepad split. Notes.tsx is the file browser.

   Photos belong to the note and lead it: a video runs as the hero,
   stills sit directly under it, and the prose follows. Clicking a
   thumbnail enlarges it rather than navigating away. */
const NoteDocument = ({ noteId, onOpenFile }: NoteDocumentProps) => {
  const note = NOTES_BY_ID[noteId];

  if (!note) {
    return (
      <div className="notes">
        <p className="empty-note">
          Can't find a published note with the id <code>{noteId}</code>. Check{' '}
          <code>src/data/notes/index.ts</code> — it may still be a draft.
        </p>
      </div>
    );
  }

  return (
    <div className="notes notepad-page">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-meta">{note.date}</p>

      <PhotoGallery photos={note.photos ?? []} />

      {note.sections.map((section, si) => (
        <section key={section.heading ?? si} className="note-section">
          {section.heading && <h3>{section.heading}</h3>}
          {section.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>
      ))}

      {note.attachments && note.attachments.length > 0 && onOpenFile && (
        <div className="note-attachments">
          <h3>Attachments</h3>
          <div className="file-tiles">
            {note.attachments.map((file) => (
              <FileTile
                key={file.src}
                name={file.name}
                onClick={() =>
                  onOpenFile(`${note.id}-${file.src}`, file.name, asset(file.src))
                }
              />
            ))}
          </div>
        </div>
      )}

      {note.tags && note.tags.length > 0 && (
        <p className="note-tags">
          {note.tags.map((tag) => (
            <span key={tag} className="note-tag">
              {tag}
            </span>
          ))}
        </p>
      )}

    </div>
  );
};

export default NoteDocument;
