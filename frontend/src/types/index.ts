export interface HealthResult {
  url: string;
  statusCode?: number;
  duration?: number;
  durationMs?: number;
  alive: boolean;
  error?: string;
  responseSize?: number;
  headers?: { [key: string]: string };
  sslInfo?: {
    valid: boolean;
    issuer?: string;
    subject?: string;
    expiryDate?: string;
    daysLeft?: number;
  };
  contentType?: string;
  server?: string;
  timestamp: string;
}

export interface BatchResponse {
  results: HealthResult[];
  summary: {
    total: number;
    healthy: number;
    down: number;
  };
}

export type ActiveTab = "single" | "batch";
