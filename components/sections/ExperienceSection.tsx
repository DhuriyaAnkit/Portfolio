'use client';

import { experience } from '@/data/content';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useEffect, useState } from 'react';

export default function ExperienceSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const cards = document.querySelectorAll('[data-experience-card]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            (entry.target as HTMLElement).getAttribute('data-index') || '0'
          );
          setVisibleCards((prev) => [...new Set([...prev, index])]);
        }
      });
    });

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section-padding bg-secondary/50">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Experience
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {experience.map((item, idx) => (
            <div
              key={item.id}
              data-experience-card
              data-index={idx}
              className={`transition-all duration-500 ${
                visibleCards.includes(idx)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <Card variant="elevated">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{item.position}</h3>
                    <p className="text-lg text-primary font-semibold">
                      {item.company}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground mt-2 md:mt-0">
                    {item.period}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
