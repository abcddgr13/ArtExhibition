import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import PasswordModal from "@/components/PasswordModal";
import { apiRequest } from "@/lib/queryClient";
import type { GalleryData, Artwork, InsertArtwork } from "@shared/schema";
import { categories } from "@shared/schema";

interface EditingArtwork {
  id: number;
  title: string;
  artist: string;
  category: string;
  concept: string;
}

export default function Admin() {
  const [editingArtwork, setEditingArtwork] = useState<EditingArtwork | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isAuthenticated, showPasswordModal, setShowPasswordModal } = useAuth();

  const { data: galleryData, isLoading } = useQuery<GalleryData>({
    queryKey: ['/api/artworks'],
    enabled: isAuthenticated
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/artworks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/artworks'] });
      toast({
        title: "สำเร็จ",
        description: "ลบผลงานเรียบร้อยแล้ว",
      });
    },
    onError: () => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบผลงานได้",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertArtwork> }) => {
      const response = await apiRequest("PATCH", `/api/artworks/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/artworks'] });
      setEditingArtwork(null);
      toast({
        title: "สำเร็จ",
        description: "อัปเดตผลงานเรียบร้อยแล้ว",
      });
    },
    onError: () => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัปเดตผลงานได้",
        variant: "destructive"
      });
    }
  });

  const handleDelete = (artwork: Artwork) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ที่จะลบผลงาน "${artwork.title}"?`)) {
      deleteMutation.mutate(artwork.id);
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      category: artwork.category,
      concept: artwork.concept
    });
  };

  const handleSaveEdit = () => {
    if (!editingArtwork) return;

    const { id, ...updateData } = editingArtwork;
    updateMutation.mutate({
      id,
      data: updateData as Partial<InsertArtwork>
    });
  };

  const handlePasswordSuccess = () => {
    // Authentication handled by the hook
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="admin-auth-required">
          <div className="alert-error">
            คุณต้องเข้าสู่ระบบเพื่อเข้าถึงหน้านี้
          </div>
        </div>
        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handlePasswordSuccess}
        />
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-5 py-8" data-testid="admin-loading">
        <div className="flex items-center justify-center h-96">
          <div className="loading"></div>
        </div>
      </div>
    );
  }

  const allArtworks = galleryData ? Object.values(galleryData).flat() : [];

  return (
    <section className="container max-w-6xl mx-auto px-5 py-8" data-testid="admin-page">
      <h1 className="text-5xl font-bold text-primary text-center mb-12 font-serif" data-testid="admin-title">
        จัดการผลงานศิลปะ
      </h1>
      
      {allArtworks.length === 0 ? (
        <div className="text-center" data-testid="admin-empty">
          <p className="text-xl text-muted-foreground">ยังไม่มีผลงานศิลปะในระบบ</p>
        </div>
      ) : (
        <div className="space-y-4" data-testid="admin-artwork-list">
          {allArtworks.map((artwork) => (
            <div key={artwork.id} className="bg-card p-6 rounded-lg border border-border" data-testid={`admin-artwork-${artwork.id}`}>
              {editingArtwork?.id === artwork.id ? (
                <div className="space-y-4" data-testid={`edit-form-${artwork.id}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={editingArtwork.title}
                      onChange={(e) => setEditingArtwork({...editingArtwork, title: e.target.value})}
                      placeholder="ชื่อผลงาน"
                      data-testid={`edit-title-${artwork.id}`}
                    />
                    <Input
                      value={editingArtwork.artist}
                      onChange={(e) => setEditingArtwork({...editingArtwork, artist: e.target.value})}
                      placeholder="ชื่อศิลปิน"
                      data-testid={`edit-artist-${artwork.id}`}
                    />
                  </div>
                  <Select
                    value={editingArtwork.category}
                    onValueChange={(value) => setEditingArtwork({...editingArtwork, category: value})}
                  >
                    <SelectTrigger data-testid={`edit-category-${artwork.id}`}>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    value={editingArtwork.concept}
                    onChange={(e) => setEditingArtwork({...editingArtwork, concept: e.target.value})}
                    placeholder="แนวคิด/ความหมาย"
                    className="min-h-[100px]"
                    data-testid={`edit-concept-${artwork.id}`}
                  />
                  <div className="flex gap-4">
                    <Button
                      onClick={handleSaveEdit}
                      className="btn-primary"
                      disabled={updateMutation.isPending}
                      data-testid={`save-edit-${artwork.id}`}
                    >
                      {updateMutation.isPending ? "กำลังบันทึก..." : "บันทึก"}
                    </Button>
                    <Button
                      onClick={() => setEditingArtwork(null)}
                      className="btn-secondary"
                      data-testid={`cancel-edit-${artwork.id}`}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4 items-center" data-testid={`artwork-view-${artwork.id}`}>
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-30 h-20 object-cover rounded border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150';
                    }}
                    data-testid={`artwork-image-${artwork.id}`}
                  />
                  <div data-testid={`artwork-info-${artwork.id}`}>
                    <h4 className="text-lg font-semibold" data-testid={`artwork-title-${artwork.id}`}>{artwork.title}</h4>
                    <p className="text-muted-foreground" data-testid={`artwork-artist-${artwork.id}`}>โดย {artwork.artist}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`artwork-category-${artwork.id}`}>หมวดหมู่: {artwork.category}</p>
                  </div>
                  <div className="flex gap-2" data-testid={`artwork-actions-${artwork.id}`}>
                    <Button
                      onClick={() => handleEdit(artwork)}
                      className="btn-secondary"
                      data-testid={`edit-button-${artwork.id}`}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      onClick={() => handleDelete(artwork)}
                      className="btn-danger"
                      disabled={deleteMutation.isPending}
                      data-testid={`delete-button-${artwork.id}`}
                    >
                      {deleteMutation.isPending ? "กำลังลบ..." : "ลบ"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
