"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

const SCENE_URL = "https://prod.spline.design/rjGep9cbFtBZCEU8/scene.splinecode";

function SceneSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 200,
          height: 400,
          background: "rgba(243, 239, 231, 0.03)",
        }}
      />
    </div>
  );
}

export default function SplineScene({
  onLoad,
  className,
}: {
  onLoad?: (app: Application) => void;
  className?: string;
}) {
  return (
    <Suspense fallback={<SceneSkeleton />}>
      <Spline
        scene={SCENE_URL}
        onLoad={onLoad}
        className={className}
        style={{ width: "100%", height: "100%" }}
      />
    </Suspense>
  );
}
