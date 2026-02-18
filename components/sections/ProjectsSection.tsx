'use client';

import { projects } from '@/data/content';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  useEffect(() => {
    const projectCards = document.querySelectorAll('[data-project-card]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            (entry.target as HTMLElement).getAttribute('data-index') || '0'
          );
          setVisibleProjects((prev) => [...new Set([...prev, index])]);
        }
      });
    });

    projectCards.forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section-padding bg-secondary/50">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              data-project-card
              data-index={idx}
              className={`transition-all duration-500 ${
                visibleProjects.includes(idx)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <Card variant="elevated" className="h-full overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative h-48 md:h-56 w-full overflow-hidden rounded-lg mb-4 -mx-6 -mt-6 mx-6 mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Link */}
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    View Project →
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Button variant="secondary" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
