"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Local time in the studio's city. Renders nothing on the server — the
 * value differs between server and client by definition, so it has to
 * arrive after mount or hydration will complain.
 */
export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: site.timezone,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {site.city} {time ?? "--:--"}
    </span>
  );
}
