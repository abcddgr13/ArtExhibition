import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import PasswordModal from "@/components/PasswordModal";
import { apiRequest } from "@/lib/queryClient";
import { insertArtworkSchema, categories, type InsertArtwork } from "@shared/schema";

export default function AddArtwork() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isAuthenticated, showPasswordModal, setShowPasswordModal } = useAuth();

  const form = useForm<InsertArtwork>({
    resolver: zodResolver(insertArtworkSchema),
    defaultValues: {
      title: "",
      artist: "",
      category: undefined,
      concept: "",
      image: ""
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertArtwork) => {
      const response = await apiRequest("POST", "/api/artworks", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/artworks'] });
      toast({
        title: "สำเร็จ",
        description: "บันทึกผลงานเรียบร้อยแล้ว",
      });
      form.reset();
      setLocation("/gallery");
    },
    onError: (error) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกผลงานได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive"
      });
      console.error("Error creating artwork:", error);
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      form.setValue("image", result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: InsertArtwork) => {
    if (!data.image) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "กรุณาเลือกรูปภาพ",
        variant: "destructive"
      });
      return;
    }
    createMutation.mutate(data);
  };

  const handlePasswordSuccess = () => {
    // Authentication handled by the hook
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="container max-w-2xl mx-auto px-5 py-8" data-testid="add-artwork-auth-required">
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

  return (
    <section className="container max-w-2xl mx-auto px-5 py-8" data-testid="add-artwork-page">
      <div className="bg-card p-8 rounded-lg shadow-2xl border border-border">
        <h2 className="text-3xl font-bold text-center text-primary mb-8 font-serif" data-testid="add-artwork-title">
          เพิ่มผลงานศิลปะ
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="add-artwork-form">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อผลงาน</FormLabel>
                  <FormControl>
                    <Input {...field} className="form-control" data-testid="input-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อศิลปิน</FormLabel>
                  <FormControl>
                    <Input {...field} className="form-control" data-testid="input-artist" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>หมวดหมู่</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="form-control" data-testid="select-category">
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} data-testid={`category-option-${category.replace(/\s+/g, '-')}`}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="concept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>แนวคิด/ความหมาย</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="form-control min-h-[120px]" data-testid="textarea-concept" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อัปโหลดรูปภาพ</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                      data-testid="input-image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="btn-primary w-full"
              disabled={createMutation.isPending}
              data-testid="button-submit"
            >
              {createMutation.isPending ? (
                <>
                  <span className="loading mr-2"></span>
                  กำลังบันทึก...
                </>
              ) : (
                "บันทึกผลงาน"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
