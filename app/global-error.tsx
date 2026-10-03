"use client";

/**
 * Replaces Next's default production message, which is only ever
 * "Application error: a client-side exception has occurred" and names
 * neither the error nor where it came from. A crash that only reproduces
 * on one engine is undiagnosable without this.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const detail = [
    error?.name && `${error.name}: ${error.message || "(no message)"}`,
    error?.digest && `digest ${error.digest}`,
    error?.stack?.split("\n").slice(1, 4).join("\n"),
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          background: "#000",
          color: "#fff",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 640 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.08em", opacity: 0.55, margin: 0 }}>
            SOMETHING BROKE
          </p>
          <h1 style={{ fontSize: 28, lineHeight: 1.2, margin: "16px 0 0", fontWeight: 500 }}>
            This page hit an error.
          </h1>

          <pre
            style={{
              marginTop: 24,
              padding: 16,
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: 12,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              opacity: 0.8,
              overflowX: "auto",
            }}
          >
            {detail || "No detail was attached to the error."}
          </pre>

          <button
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "12px 20px",
              border: "1px solid rgba(255,255,255,0.4)",
              background: "transparent",
              color: "#fff",
              font: "inherit",
              fontSize: 12,
              letterSpacing: "0.08em",
              cursor: "pointer",
            }}
          >
            TRY AGAIN
          </button>
        </div>
      </body>
    </html>
  );
}
