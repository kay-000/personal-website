import '../styles/SystemProperties.css';

const SystemProperties = () => {
  return (
    <div className="system-properties">
      <div className="system-header">
        <div className="system-logo">
          <span className="logo-text">Kayla</span>
          <span className="logo-os">OS</span>
        </div>
        <div className="system-version">Version 1.0 (Build 2025)</div>
      </div>

      <div className="system-section">
        <h3>System:</h3>
        <table className="specs-table">
          <tbody>
            <tr>
              <td>Processor:</td>
              <td>Coffee-Powered Brain @ 3.5 cups/day</td>
            </tr>
            <tr>
              <td>RAM:</td>
              <td>2 brain cells (1 dedicated to snacks)</td>
            </tr>
            <tr>
              <td>Storage:</td>
              <td>∞ GB of random facts nobody asked for</td>
            </tr>
            <tr>
              <td>Graphics:</td>
              <td>Imagination 9000 RTX</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="system-section">
        <h3>Registered to:</h3>
        <p>Kayla McFarlane</p>
        <p>Professional Robot Wrangler</p>
        <p>Carnegie Mellon University</p>
      </div>

      <div className="system-section">
        <h3>System Status:</h3>
        <div className="status-bar">
          <div className="status-label">Motivation:</div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: '47%' }}></div>
          </div>
          <span className="status-percent">47%</span>
        </div>
        <div className="status-bar">
          <div className="status-label">Caffeine Level:</div>
          <div className="progress-container">
            <div className="progress-bar caffeine" style={{ width: '89%' }}></div>
          </div>
          <span className="status-percent">89%</span>
        </div>
        <div className="status-bar">
          <div className="status-label">Snack Supply:</div>
          <div className="progress-container">
            <div className="progress-bar snacks" style={{ width: '23%' }}></div>
          </div>
          <span className="status-percent">LOW!</span>
        </div>
      </div>

      <div className="system-footer">
        <p>* No actual robots were harmed in the making of this website</p>
      </div>
    </div>
  );
};

export default SystemProperties;
