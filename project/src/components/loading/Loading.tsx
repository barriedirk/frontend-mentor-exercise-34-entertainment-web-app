import "./Loading.css";

import { useSignals } from "@preact/signals-react/runtime";

import { clsx } from "clsx";

import { loadingSignal } from "@/services/loadingSignal";

export function Loading() {
  useSignals();

  const loading = loadingSignal.readonly.value;

  console.log("Loading", { loading });

  return (
    <div
      aria-live="assertive"
      aria-busy={loading}
      role="status"
      className={clsx("progress background--inner", loading && "infinite")}
    >
      {loading && <span className="sr-only">Loading, please wait...</span>}
      <div className="bar"></div>
    </div>
  );
}
