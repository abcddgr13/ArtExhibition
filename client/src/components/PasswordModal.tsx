import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = "muxdir]skPADMIN111";

export default function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("authenticated", "true");
      setPassword("");
      setError("");
      onSuccess();
      onClose();
    } else {
      setError("รหัสผ่านไม่ถูกต้อง");
      setPassword("");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card" data-testid="password-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-primary font-serif text-xl">
            ใส่รหัสผ่าน
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="รหัสผ่าน"
            className="form-control"
            autoFocus
            data-testid="password-input"
          />
          
          {error && (
            <Alert variant="destructive" data-testid="password-error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-4 justify-center">
            <Button type="submit" className="btn-primary" data-testid="password-submit">
              ยืนยัน
            </Button>
            <Button type="button" onClick={handleClose} className="btn-secondary" data-testid="password-cancel">
              ยกเลิก
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
