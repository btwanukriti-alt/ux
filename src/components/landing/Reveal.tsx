"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export function Reveal({
  as: Tag = "div",
  className = "",
  threshold = 0.12,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  threshold?: number;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={id}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}

/** Fires `onEnter` once, the first time the wrapped element scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Mounts children only once the wrapper has scrolled into view, and keeps them mounted after. */
export function LazyMount({
  children,
  threshold = 0.2,
  className,
}: {
  children: ReactNode;
  threshold?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);
  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}
