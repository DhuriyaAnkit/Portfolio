'use client';

import { gallery } from '@/data/content';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<typeof gallery[0] | null>(null);

  // Get unique categories
  const categories = ['All', ...new Set(gallery.map((item) => item.category))];

  // Filter images based on selected category
  const filteredImages =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    const imageElements = document.querySelectorAll('[data-gallery-image]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            (entry.target as HTMLElement).getAttribute('data-index') || '0'
          );
          setVisibleImages((prev) => [...new Set([...prev, index])]);
        }
      });
    });

    imageElements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredImages]);

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Photo Gallery
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A collection of my work, achievements, and memorable moments from my professional journey.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleImages([]);
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item, idx) => (
            <div
              key={item.id}
              data-gallery-image
              data-index={idx}
              className={`cursor-pointer group relative overflow-hidden rounded-xl transition-all duration-500 ${
                visibleImages.includes(idx)
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for selected image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-background rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-primary hover:bg-primary/80 text-primary-foreground p-2 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm">
                    {selectedImage.category}
                  </span>
                </div>
                <p className="text-muted-foreground">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
