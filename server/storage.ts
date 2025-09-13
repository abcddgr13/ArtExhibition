import { type Artwork, type InsertArtwork, type GalleryData, categories } from "@shared/schema";

export interface IStorage {
  getArtworks(): Promise<GalleryData>;
  getArtworkById(id: number): Promise<Artwork | undefined>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  updateArtwork(id: number, artwork: Partial<InsertArtwork>): Promise<Artwork | undefined>;
  deleteArtwork(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private artworks: GalleryData;
  private nextId: number = 26;

  constructor() {
    // Initialize with sample artworks
    this.artworks = {
      "แผ่นพับ อาชีพทัศนศิลป์": [
        {id: 1, title: "การออกแบบโปสเตอร์", artist: "นายสมชาย ดีไซน์", concept: "การสื่อสารด้วยภาพและตัวอักษร", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "แผ่นพับ อาชีพทัศนศิลป์"},
        {id: 2, title: "แผ่นพับสินค้า", artist: "นางสาววิไล กราฟิก", concept: "ศิลปะเพื่อการตลาด", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "แผ่นพับ อาชีพทัศนศิลป์"},
        {id: 3, title: "บรรจุภัณฑ์สร้างสรรค์", artist: "นายประยุทธ แพ็คเกจ", concept: "ความยั่งยืนในการออกแบบ", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "แผ่นพับ อาชีพทัศนศิลป์"},
        {id: 4, title: "โปสเตอร์งานเทศกาล", artist: "นางสุดา อีเวนต์", concept: "สีสันแห่งความสุข", image: "https://images.unsplash.com/photo-1594736797933-d0ca0304e30d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "แผ่นพับ อาชีพทัศนศิลป์"},
        {id: 5, title: "นิตยสารศิลปะ", artist: "นายกิตติ เมกะซีน", concept: "การจัดวางหน้าสร้างสรรค์", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "แผ่นพับ อาชีพทัศนศิลป์"}
      ],
      "Pop-up": [
        {id: 6, title: "ป๊อปอาร์ตสีสด", artist: "นางสาววิไล สีสัน", concept: "การแสดงออกที่โดดเด่น", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Pop-up"},
        {id: 7, title: "แฟชั่นป๊อป", artist: "นายสมชาย แฟชั่น", concept: "ศิลปะในชีวิตประจำวัน", image: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Pop-up"},
        {id: 8, title: "อิโมจิอาร์ต", artist: "นางสุดา ดิจิทัล", concept: "ภาษาใหม่ของยุคดิจิทัล", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Pop-up"},
        {id: 9, title: "สตรีทอาร์ต", artist: "นายประยุทธ ถนน", concept: "ศิลปะสำหรับทุกคน", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Pop-up"},
        {id: 10, title: "การ์ตูนป๊อป", artist: "นายกิตติ การ์ตูน", concept: "ความสุขในรูปแบบศิลปะ", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Pop-up"}
      ],
      "ประติมากรรม": [
        {id: 11, title: "ประติมากรรมโลหะ", artist: "นายประยุทธ โลหะ", concept: "ความแข็งแกร่งของวัสดุ", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "ประติมากรรม"},
        {id: 12, title: "ประติมากรรมหิน", artist: "นางสุดา หิน", concept: "ความงดงามตามธรรมชาติ", image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "ประติมากรรม"},
        {id: 13, title: "ประติมากรรมไม้", artist: "นายกิตติ ไผ่", concept: "ความอบอุ่นของงานหัตถกรรม", image: "https://images.unsplash.com/photo-1512901505-5bb21b1fb3f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "ประติมากรรม"},
        {id: 14, title: "ประติมากรรมดิน", artist: "นางสาววิไล ดิน", concept: "การกลับสู่รากเหง้า", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "ประติมากรรม"},
        {id: 15, title: "ประติมากรรมนามธรรม", artist: "นายสมชาย นามธรรม", concept: "ความหมายเกินกว่าที่เห็น", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "ประติมากรรม"}
      ],
      "Cubism Art": [
        {id: 16, title: "ผู้หญิงในมิติต่างๆ", artist: "นายกิตติ คิวบ์", concept: "การมองผ่านหลายมุมมอง", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Cubism Art"},
        {id: 17, title: "เมืองในเรขาคณิต", artist: "นางสุดา มิติ", concept: "ความซับซ้อนของเมืองใหญ่", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Cubism Art"},
        {id: 18, title: "ดนตรีในรูปทรง", artist: "นายประยุทธ เสียง", concept: "การแปลงเสียงเป็นภาพ", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Cubism Art"},
        {id: 19, title: "ธรรมชาติแบบคิวบิสม์", artist: "นางสาววิไล ธรรมชาติ", concept: "ความเป็นระเบียบในความวุ่นวาย", image: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Cubism Art"},
        {id: 20, title: "อารมณ์ในเรขาคณิต", artist: "นายสมชาย อารมณ์", concept: "การถ่ายทอดความรู้สึกผ่านรูปทรง", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Cubism Art"}
      ],
      "Thai Pop Art": [
        {id: 21, title: "ไทยแลนด์ป๊อป", artist: "นางสุดา ไทยแลนด์", concept: "อัตลักษณ์ไทยในยุคใหม่", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Thai Pop Art"},
        {id: 22, title: "วัฒนธรรมผสมผสาน", artist: "นายกิตติ วัฒนธรรม", concept: "ความเป็นไทยในโลกโกลบอล", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Thai Pop Art"},
        {id: 23, title: "อาหารไทยป๊อป", artist: "นางสาววิไล ครัว", concept: "ความภูมิใจในอาหารไทย", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Thai Pop Art"},
        {id: 24, title: "เทศกาลไทยสมัยใหม่", artist: "นายประยุทธ เทศกาล", concept: "ประเพณีที่ไม่เสื่อมคลาย", image: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Thai Pop Art"},
        {id: 25, title: "ชุดไทยป๊อปอาร์ต", artist: "นายสมชาย แฟชั่น", concept: "ความงามไทยในมุมมองใหม่", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", category: "Thai Pop Art"}
      ]
    };
  }

  async getArtworks(): Promise<GalleryData> {
    return this.artworks;
  }

  async getArtworkById(id: number): Promise<Artwork | undefined> {
    for (const category in this.artworks) {
      const found = this.artworks[category as keyof GalleryData].find(artwork => artwork.id === id);
      if (found) return found;
    }
    return undefined;
  }

  async createArtwork(artwork: InsertArtwork): Promise<Artwork> {
    const newArtwork: Artwork = {
      ...artwork,
      id: this.nextId++,
      createdAt: new Date()
    };

    if (!this.artworks[artwork.category]) {
      this.artworks[artwork.category] = [];
    }

    this.artworks[artwork.category].push(newArtwork);
    return newArtwork;
  }

  async updateArtwork(id: number, updates: Partial<InsertArtwork>): Promise<Artwork | undefined> {
    for (const category in this.artworks) {
      const index = this.artworks[category as keyof GalleryData].findIndex(artwork => artwork.id === id);
      if (index !== -1) {
        const currentArtwork = this.artworks[category as keyof GalleryData][index];
        const updatedArtwork = { ...currentArtwork, ...updates };
        
        // If category changed, move artwork to new category
        if (updates.category && updates.category !== category) {
          this.artworks[category as keyof GalleryData].splice(index, 1);
          if (!this.artworks[updates.category]) {
            this.artworks[updates.category] = [];
          }
          this.artworks[updates.category].push(updatedArtwork);
        } else {
          this.artworks[category as keyof GalleryData][index] = updatedArtwork;
        }
        
        return updatedArtwork;
      }
    }
    return undefined;
  }

  async deleteArtwork(id: number): Promise<boolean> {
    for (const category in this.artworks) {
      const index = this.artworks[category as keyof GalleryData].findIndex(artwork => artwork.id === id);
      if (index !== -1) {
        this.artworks[category as keyof GalleryData].splice(index, 1);
        return true;
      }
    }
    return false;
  }
}

export const storage = new MemStorage();
