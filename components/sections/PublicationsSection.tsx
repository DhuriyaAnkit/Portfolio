'use client';

import { publications } from '@/data/content';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';

export default function PublicationsSection() {
  const [visiblePublications, setVisiblePublications] = useState<number[]>([]);

  useEffect(() => {
    const pubItems = document.querySelectorAll('[data-publication-item]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            (entry.target as HTMLElement).getAttribute('data-index') || '0'
          );
          setVisiblePublications((prev) => [...new Set([...prev, index])]);
        }
      });
    });

    pubItems.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="publications" className="section-padding">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Publications
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {publications.map((pub, idx) => (
            <div
              key={pub.id}
              data-publication-item
              data-index={idx}
              className={`transition-all duration-500 ${
                visiblePublications.includes(idx)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <Card
                variant="outlined"
                className="hover:bg-primary/5 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {pub.title}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-muted-foreground">
                      <span>{pub.publication}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{pub.year}</span>
                    </div>
                  </div>

                  <svg
                    className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
