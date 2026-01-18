// PDFViewer.tsx
type PDFViewerProps = {
  src: string;
};

const PDFViewer = ({ src }: PDFViewerProps) => {
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
