"use client";

import { useState } from "react";

import {
  analyzeThreat,
} from "../services/api";

export default function useThreatAnalysis() {

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const [error, setError] =
    useState("");

  async function analyze(
    content: string
  ) {

    try {

      setLoading(true);

      setError("");

      const response =
        await analyzeThreat(
          content
        );

      setResult(
        response
      );

    } catch (err) {

      setError(
        "Analysis failed"
      );

      console.error(
        err
      );

    } finally {

      setLoading(false);

    }
  }

  return {

    loading,

    result,

    error,

    analyze,
  };
}