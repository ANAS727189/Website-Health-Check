import { useState } from "react";
import { useHealthCheck } from "@/hooks";
import HealthResultDisplay from "./HealthResultDisplay";

export default function SingleCheck() {
  const [url, setUrl] = useState("");
  const { loading, result, checkSingleUrl } = useHealthCheck();

  const checkWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await checkSingleUrl(url);
    } catch (error) {
      // Error already handled in the hook
    }
  };

  return (
    <div className="panel">
      <form onSubmit={checkWebsite} className="form-container">
        <div className="input-group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., example.com)"
            className="desert-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="desert-button"
            disabled={loading || !url.trim()}
          >
            {loading ? "🔍 Checking..." : "🔍 Check Site"}
          </button>
        </div>
      </form>

      {result && <HealthResultDisplay result={result} />}
    </div>
  );
}
