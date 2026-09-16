import '../styles/FileTile.css';

type FileTileProps = {
  name: string;
  kind?: 'file' | 'folder';
  onClick: () => void;
};

/* The Explorer-style icon tile. Used by the Projects tree and by
   note attachments so a file looks the same wherever it appears. */
const FileTile = ({ name, kind = 'file', onClick }: FileTileProps) => (
  <div className="file-tile" onClick={onClick}>
    {kind === 'file' ? (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" />
      </svg>
    ) : (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" />
      </svg>
    )}
    <span className="file-tile-name">{name}</span>
  </div>
);

export default FileTile;
