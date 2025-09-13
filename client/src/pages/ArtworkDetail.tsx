import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import type { Artwork } from "@shared/schema";

export default function ArtworkDetail() {
  const params = useParams();
  const artworkId = params.id ? parseInt(params.id) : null;

  const { data: artwork, isLoading, error } = useQuery<Artwork>({
    queryKey: ['/api/artworks', artworkId],
    enabled: !!artworkId
  });

  if (!artworkId) {
    return (
      <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="artwork-detail-invalid-id">
        <div className="alert-error">
          ไม่พบรหัสผลงานที่ต้องการ
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="artwork-detail-loading">
        <div className="flex items-center justify-center h-96">
          <div className="loading"></div>
        </div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="artwork-detail-error">
        <div className="alert-error">
          ไม่พบผลงานที่ต้องการ หรือเกิดข้อผิดพลาดในการโหลดข้อมูล
        </div>
        <Link href="/gallery" className="btn-secondary mt-4 inline-block" data-testid="back-to-gallery-error">
          ← กลับสู่แกลเลอรี
        </Link>
      </div>
    );
  }

  return (
    <section className="container max-w-6xl mx-auto px-5 py-8" data-testid="artwork-detail-page">
      <div className="mb-8">
        <Link href="/gallery" className="btn-secondary" data-testid="back-to-gallery">
          ← กลับสู่แกลเลอรี
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="artwork-image rounded-lg overflow-hidden shadow-2xl" data-testid="artwork-image-container">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';
            }}
            data-testid="artwork-image"
          />
        </div>
        
        <div className="artwork-info" data-testid="artwork-info">
          <h1 className="text-4xl font-bold text-primary mb-6 font-serif" data-testid="artwork-title">
            {artwork.title}
          </h1>
          
          <div className="artwork-meta space-y-4 mb-8" data-testid="artwork-meta">
            <div className="flex items-center">
              <span className="font-semibold w-24 text-muted-foreground">ศิลปิน:</span>
              <span className="text-lg" data-testid="artwork-artist">{artwork.artist}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-24 text-muted-foreground">หมวดหมู่:</span>
              <span className="text-lg" data-testid="artwork-category">{artwork.category}</span>
            </div>
          </div>
          
          <div data-testid="artwork-concept-section">
            <h3 className="text-2xl font-semibold text-primary mb-4 font-serif">แนวคิด/ความหมาย</h3>
            <p className="text-lg leading-relaxed" data-testid="artwork-concept">
              {artwork.concept}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
