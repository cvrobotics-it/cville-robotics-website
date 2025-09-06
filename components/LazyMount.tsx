// components/LazyMount.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyMount({
  children,
  rootMargin = "200px",
}: {
  children: React.ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref}>{visible ? children : <div className="h-64" />}</div>;
}
