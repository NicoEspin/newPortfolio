"use client";

import { useEffect, useState } from "react";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/providers/SmoothScroll";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);

    return () => media.removeListener(update);
  }, [query]);

  return matches;
}

export function FinePointerCursor() {
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  if (!hasFinePointer) return null;

  return <Cursor />;
}

export function DesktopSmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  if (!isDesktop) return <>{children}</>;

  return <SmoothScroll>{children}</SmoothScroll>;
}
