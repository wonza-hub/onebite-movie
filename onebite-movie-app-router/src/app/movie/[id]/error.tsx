"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div>
      <h1>Error</h1>
      <p>Error: {error.message}</p>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        Try again
      </button>
    </div>
  );
}
