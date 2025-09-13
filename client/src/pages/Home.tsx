import { useQuery } from "@tanstack/react-query";
import Carousel from "@/components/Carousel";
import type { GalleryData } from "@shared/schema";

export default function Home() {
  const { data: galleryData, isLoading } = useQuery<GalleryData>({
    queryKey: ['/api/artworks']
  });

  // Get featured artworks (first artwork from each category)
  const featuredArtworks = galleryData ? 
    Object.values(galleryData).flat().slice(0, 5) : [];

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="home-loading">
        <div className="flex items-center justify-center h-96">
          <div className="loading"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="container max-w-6xl mx-auto px-5" data-testid="home-page">
      <Carousel artworks={featuredArtworks} />
      
      <div className="text-center mt-12">
        <h2 className="text-4xl font-bold text-primary font-serif mb-4" data-testid="home-welcome-title">
          ยินดีต้อนรับสู่นิทรรศการศิลปะออนไลน์
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="home-welcome-description">
          สัมผัสประสบการณ์ศิลปะที่ไม่เหมือนใครผ่านคอลเลกชันงานศิลปะคุณภาพสูงจากศิลปินชั้นนำ
        </p>
      </div>
    </section>
  );
}
