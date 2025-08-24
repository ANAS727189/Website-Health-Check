import { useState } from "react";
import { HealthResult } from "@/types";
import { apiRequest } from "@/utils";

export const useHealthCheck = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HealthResult | null>(null);

  const checkSingleUrl = async (url: string) => {
    setLoading(true);
    try {
      const data = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/check`, { url });
      setResult(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetResult = () => {
    setResult(null);
  };

  return {
    loading,
    result,
    checkSingleUrl,
    resetResult,
  };
};
