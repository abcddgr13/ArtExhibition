import { useState, useEffect } from "react";
import { Link } from "wouter";
import type { Artwork } from "@shared/schema";

interface CarouselProps {
  artworks: Artwork[];
}

export default function Carousel({ artworks }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (artworks.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % artworks.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [artworks.length]);

  if (artworks.length === 0) {
    return (
      <div className="relative h-[70vh] bg-muted rounded-lg overflow-hidden shadow-2xl flex items-center justify-center" data-testid="carousel-empty">
        <p className="text-xl text-muted-foreground">ไม่มีผลงานสำหรับแสดง</p>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] my-8 rounded-lg overflow-hidden shadow-2xl" data-testid="carousel">
      {artworks.map((artwork, index) => (
        <div
          key={artwork.id}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          data-testid={`carousel-slide-${index}`}
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <h2 className="text-4xl font-bold mb-2 text-primary font-serif" data-testid={`carousel-title-${index}`}>
              {artwork.title}
            </h2>
            <p className="text-xl mb-4 text-gray-300" data-testid={`carousel-artist-${index}`}>
              โดย {artwork.artist}
            </p>
            <Link
              href={`/artwork/${artwork.id}`}
              className="btn-primary inline-block no-underline"
              data-testid={`carousel-link-${index}`}
            >
              ดูรายละเอียด
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
