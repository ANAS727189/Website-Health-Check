import { useState } from "react";
import { BatchResponse } from "@/types";
import { apiRequest } from "@/utils";

export const useBatchCheck = () => {
  const [loading, setLoading] = useState(false);
  const [batchResult, setBatchResult] = useState<BatchResponse | null>(null);

  const checkBatchUrls = async (urls: string[]) => {
    setLoading(true);
    try {
      const data = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/batch`, { urls });
      setBatchResult(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetBatchResult = () => {
    setBatchResult(null);
  };

  return {
    loading,
    batchResult,
    checkBatchUrls,
    resetBatchResult,
  };
};
