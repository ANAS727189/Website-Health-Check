import { useState } from "react";
import { useBatchCheck } from "@/hooks";
import BatchResultDisplay from "./BatchResultDisplay";

export default function BatchCheck() {
  const [batchUrls, setBatchUrls] = useState("");
  const { loading, batchResult, checkBatchUrls } = useBatchCheck();

  const batchCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const urls = batchUrls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);
    
    try {
      await checkBatchUrls(urls);
    } catch (error) {
      // Error already handled in the hook
    }
  };

  return (
    <div className="panel">
      <form onSubmit={batchCheck} className="form-container">
        <div className="batch-input-group">
          <textarea
            value={batchUrls}
            onChange={(e) => setBatchUrls(e.target.value)}
            placeholder={`Enter multiple URLs (one per line):\nexample.com\ngoogle.com\ngithub.com`}
            className="desert-textarea"
            rows={6}
            disabled={loading}
          />
          <button
            type="submit"
            className="desert-button"
            disabled={loading || !batchUrls.trim()}
          >
            {loading ? "🔍 Checking All..." : "🔍 Check All Sites"}
          </button>
        </div>
      </form>

      {batchResult && <BatchResultDisplay batchResult={batchResult} />}
    </div>
  );
}
