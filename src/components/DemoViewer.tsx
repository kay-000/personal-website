type DemoViewerProps = {
  src: string;
};

const DemoViewer: React.FC<DemoViewerProps> = ({ src }) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        src={src}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Demo"
      />
    </div>
  );
};

export default DemoViewer;
