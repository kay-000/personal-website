// PDFViewer.tsx
import { asset } from '../utils/asset';
import { usePocket } from '../utils/usePocket';

type PDFViewerProps = {
  src: string;
};

const PDFViewer = ({ src }: PDFViewerProps) => {
  const pocket = usePocket();

  // Phone browsers show only the first page of an embedded PDF,
  // or nothing at all, so hand it to the browser's own viewer
  if (pocket) {
    const name = decodeURIComponent(src.split('/').pop() ?? 'Document.pdf');
    return (
      <div className="pocket-pdf">
        <img src={asset('icons/file.svg')} alt="" />
        <span className="pocket-pdf-name">{name}</span>
        <a className="pocket-pdf-open" href={src} target="_blank" rel="noreferrer">
          Open PDF
        </a>
        <a href={src} download>
          Download
        </a>
      </div>
    );
  }

  return (
    <>
        <a href={src} download>
            Download PDF
        </a>
        <iframe
        src={src}
        title="PDF Viewer"
        style={{
            width: '100%',
            height: '100%',
            border: 'none',
        }}
        />
    </>
  );
};

export default PDFViewer;
