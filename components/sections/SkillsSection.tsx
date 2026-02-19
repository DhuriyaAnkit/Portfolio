'use client';

import { skills } from '@/data/content';
import Badge from '@/components/ui/Badge';
import { useEffect, useState } from 'react';

export default function SkillsSection() {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);

  useEffect(() => {
    const categories = document.querySelectorAll('[data-skill-category]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            (entry.target as HTMLElement).getAttribute('data-index') || '0'
          );
          setVisibleCategories((prev) => [...new Set([...prev, index])]);
        }
      });
    });

    categories.forEach((cat) => {
      observer.observe(cat);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, idx) => (
            <div
              key={idx}
              data-skill-category
              data-index={idx}
              className={`transition-all duration-500 ${
                visibleCategories.includes(idx)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="bg-secondary border border-border rounded-xl p-6 hover:border-primary transition-colors duration-200">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {skillGroup.category}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
