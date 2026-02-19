'use client';

import { education } from '@/data/content';
import Card from '@/components/ui/Card';
import { useEffect, useState } from 'react';

export default function EducationSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const items = document.querySelectorAll('[data-education-item]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            (entry.target as HTMLElement).getAttribute('data-index') || '0'
          );
          setVisibleItems((prev) => [...new Set([...prev, index])]);
        }
      });
    });

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="section-padding">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Education
        </h2>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent md:w-0.5" />

            {/* Education items */}
            <div className="space-y-8">
              {education.map((item, idx) => (
                <div
                  key={item.id}
                  data-education-item
                  data-index={idx}
                  className={`relative transition-all duration-500 ${
                    visibleItems.includes(idx)
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 top-4 w-8 h-8 bg-primary rounded-full border-4 border-background md:left-1/2 md:transform md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 ${idx % 2 === 0 ? 'md:mr-1/2 md:pr-12' : 'md:ml-1/2 md:pl-12'}`}>
                    <Card variant="elevated">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{item.degree}</h3>
                          <p className="text-primary font-semibold">
                            {item.field}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground font-medium mb-2">
                        {item.institution}
                      </p>

                      <p className="text-sm text-muted-foreground mb-2">
                        {item.year}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
