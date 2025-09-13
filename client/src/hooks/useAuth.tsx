import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  showPasswordModal: boolean;
  setShowPasswordModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    // Check authentication status from sessionStorage
    const authStatus = sessionStorage.getItem("authenticated");
    setIsAuthenticated(authStatus === "true");
    
    // Show password modal if not authenticated and trying to access protected route
    const currentPath = window.location.pathname;
    const protectedRoutes = ["/add", "/admin"];
    
    if (!authStatus && protectedRoutes.includes(currentPath)) {
      setShowPasswordModal(true);
    }
  }, []);

  // Listen for storage changes to update auth state
  useEffect(() => {
    const handleStorageChange = () => {
      const authStatus = sessionStorage.getItem("authenticated");
      setIsAuthenticated(authStatus === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for direct sessionStorage changes within the same tab
    const originalSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function(key, value) {
      originalSetItem.apply(this, [key, value]);
      if (key === "authenticated") {
        setIsAuthenticated(value === "true");
      }
    };

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      sessionStorage.setItem = originalSetItem;
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      showPasswordModal,
      setShowPasswordModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
