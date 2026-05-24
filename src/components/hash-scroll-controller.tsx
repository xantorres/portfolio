"use client";

import { useEffect } from "react";

function safeDecode(raw: string): string | null {
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
}

function samePageHash(anchor: HTMLAnchorElement): string | null {
  const href = anchor.getAttribute("href");
  if (!href || href === "#") return null;

  const url = new URL(href, window.location.href);
  if (
    url.origin !== window.location.origin ||
    url.pathname !== window.location.pathname ||
    !url.hash
  ) {
    return null;
  }

  return safeDecode(url.hash.slice(1));
}

function scrollToHash(hash: string, smooth: boolean) {
  const target = document.getElementById(hash);
  if (!target) return false;
  target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  return true;
}

export function HashScrollController() {
  useEffect(() => {
    function prefersReduced(): boolean {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target ||
        anchor.hasAttribute("download") ||
        anchor.classList.contains("skip-link")
      ) {
        return;
      }

      const hash = samePageHash(anchor);
      if (!hash || !scrollToHash(hash, !prefersReduced())) return;

      event.preventDefault();
      history.pushState(null, "", `#${hash}`);
    }

    function handlePopState() {
      const raw = window.location.hash.slice(1);
      if (!raw) return;
      const hash = safeDecode(raw);
      if (!hash) return;
      // Browser-restored navigation should mirror the smooth-scroll behaviour of forward clicks.
      scrollToHash(hash, !prefersReduced());
    }

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
