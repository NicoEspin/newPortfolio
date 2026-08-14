"use client";

import Link from "next/link";
import { MouseEvent } from "react";
import { useSignalNav } from "@/components/PageTransition";

/**
 * Link that triggers the signal-dot page transition instead of navigating
 * instantly. Used when moving between projects (Reveal / Track handoff).
 */
export default function SignalLink({
  href,
  children,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useSignalNav();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href, { x: e.clientX, y: e.clientY });
  };

  return (
    <Link href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
