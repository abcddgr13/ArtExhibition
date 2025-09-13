import { useQuery } from "@tanstack/react-query";
import ArtworkCard from "@/components/ArtworkCard";
import type { GalleryData } from "@shared/schema";

export default function Gallery() {
  const { data: galleryData, isLoading, error } = useQuery<GalleryData>({
    queryKey: ['/api/artworks']
  });

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="gallery-loading">
        <div className="flex items-center justify-center h-96">
          <div className="loading"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="gallery-error">
        <div className="alert-error">
          เกิดข้อผิดพลาดในการโหลดผลงานศิลปะ กรุณาลองใหม่อีกครั้ง
        </div>
      </div>
    );
  }

  if (!galleryData || Object.keys(galleryData).length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="gallery-empty">
        <h1 className="text-5xl font-bold text-primary text-center mb-12 font-serif">
          แกลเลอรีผลงานศิลปะ
        </h1>
        <div className="text-center">
          <p className="text-xl text-muted-foreground">ยังไม่มีผลงานศิลปะในแกลเลอรี</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container max-w-6xl mx-auto px-5 py-8" data-testid="gallery-page">
      <h1 className="text-5xl font-bold text-primary text-center mb-12 font-serif" data-testid="gallery-title">
        แกลเลอรีผลงานศิลปะ
      </h1>
      
      <div className="space-y-12">
        {Object.entries(galleryData).map(([category, artworks]) => (
          <div key={category} className="category-section" data-testid={`category-${category.replace(/\s+/g, '-')}`}>
            <h2 className="text-3xl font-semibold text-primary mb-6 border-b-2 border-border pb-2 font-serif" data-testid={`category-title-${category.replace(/\s+/g, '-')}`}>
              {category}
            </h2>
            
            {artworks.length === 0 ? (
              <p className="text-muted-foreground text-lg" data-testid={`category-empty-${category.replace(/\s+/g, '-')}`}>
                ยังไม่มีผลงานในหมวดหมู่นี้
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid={`category-grid-${category.replace(/\s+/g, '-')}`}>
                {artworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
