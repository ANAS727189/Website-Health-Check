import { BatchResponse, HealthResult } from "@/types";
import { formatDuration } from "@/utils";

interface BatchResultDisplayProps {
  batchResult: BatchResponse;
}

export default function BatchResultDisplay({ batchResult }: BatchResultDisplayProps) {
  return (
    <div className="batch-results">
      <div className="summary-cards">
        <div className="summary-card total">
          <div className="summary-number">{batchResult.summary.total}</div>
          <div className="summary-label">Total Sites</div>
        </div>
        <div className="summary-card healthy">
          <div className="summary-number">{batchResult.summary.healthy}</div>
          <div className="summary-label">Healthy</div>
        </div>
        <div className="summary-card down">
          <div className="summary-number">{batchResult.summary.down}</div>
          <div className="summary-label">Down</div>
        </div>
      </div>

      <div className="batch-results-list">
        {batchResult.results.map((site, index) => (
          <div key={index} className={`batch-result-item ${site.alive ? "healthy" : "down"}`}>
            <div className="batch-site-header">
              <span className={`batch-status ${site.alive ? "status-up" : "status-down"}`}>
                {site.alive ? "🟢" : "🔴"}
              </span>
              <span className="batch-url">{site.url}</span>
              <span className="batch-time">{formatDuration(site.durationMs)}</span>
            </div>
            {site.error && (
              <div className="batch-error">{site.error}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
