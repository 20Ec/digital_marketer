"use client";

import { useEffect } from "react";

export function SectionReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const motionItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          "main > header",
          "main > header nav > *",
          "main > header nav > div > *",
          "main > section > div > div > *",
          "main > section .motion-card",
          "main > section .hero-copy > *",
          "main > footer > div > *",
          "main > footer > div > div > *",
        ].join(", "),
      ),
    ).filter((item) => item.getClientRects().length > 0);

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px" },
    );

    sections.forEach((section) => {
      section.classList.add("section-reveal");
      observer.observe(section);
    });

    motionItems.forEach((item) => {
      item.classList.add("motion-item");
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove("section-reveal", "is-visible");
      });
      motionItems.forEach((item) => {
        item.classList.remove("motion-item", "is-visible");
      });
    };
  }, []);

  return null;
}
