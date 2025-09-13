import { Link } from "wouter";
import type { Artwork } from "@shared/schema";

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Link href={`/artwork/${artwork.id}`} className="artwork-card block no-underline" data-testid={`artwork-card-${artwork.id}`}>
      <img
        src={artwork.image}
        alt={artwork.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300';
        }}
        data-testid={`artwork-image-${artwork.id}`}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground" data-testid={`artwork-title-${artwork.id}`}>
          {artwork.title}
        </h3>
        <p className="text-muted-foreground" data-testid={`artwork-artist-${artwork.id}`}>
          โดย {artwork.artist}
        </p>
      </div>
    </Link>
  );
}
