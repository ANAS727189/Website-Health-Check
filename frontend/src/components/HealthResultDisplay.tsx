import { HealthResult } from "@/types";
import { formatDuration, formatSize } from "@/utils";

interface HealthResultDisplayProps {
  result: HealthResult;
}

export default function HealthResultDisplay({ result }: HealthResultDisplayProps) {
  return (
    <div className={`result-card ${result.alive ? "result-healthy" : "result-down"}`}>
      <div className="result-header">
        <div className="status-badge">
          {result.alive ? "🟢 HEALTHY" : "🔴 DOWN"}
        </div>
        <div className="url-display">{result.url}</div>
      </div>

      <div className="metrics-grid">
        <div className="metric">
          <span className="metric-label">Status</span>
          <span className="metric-value">{result.statusCode || "N/A"}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Response Time</span>
          <span className="metric-value">{formatDuration(result.durationMs)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Size</span>
          <span className="metric-value">{formatSize(result.responseSize)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Server</span>
          <span className="metric-value">{result.server || "Unknown"}</span>
        </div>
      </div>

      {result.sslInfo && (
        <div className="ssl-info">
          <h4>🔒 SSL Certificate</h4>
          <div className="ssl-grid">
            <div>Status: <span className={result.sslInfo.valid ? "text-green" : "text-red"}>
              {result.sslInfo.valid ? "Valid" : "Invalid"}
            </span></div>
            <div>Days Left: <span className={
              (result.sslInfo.daysLeft || 0) > 30 ? "text-green" : 
              (result.sslInfo.daysLeft || 0) > 7 ? "text-yellow" : "text-red"
            }>
              {result.sslInfo.daysLeft}
            </span></div>
            {result.sslInfo.issuer && <div>Issuer: {result.sslInfo.issuer}</div>}
          </div>
        </div>
      )}

      {result.error && (
        <div className="error-info">
          <h4>❌ Error Details</h4>
          <p>{result.error}</p>
        </div>
      )}
    </div>
  );
}
