import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { href: "/", label: "หน้าแรก" },
    { href: "/about", label: "เกี่ยวกับ" },
    { href: "/gallery", label: "แกลเลอรี" },
    { href: "/add", label: "เพิ่มผลงาน" },
    { href: "/admin", label: "จัดการผลงาน" }
  ];

  return (
    <header className="bg-card sticky top-0 z-50 shadow-xl" data-testid="header">
      <div className="container max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary font-serif no-underline" data-testid="logo">
            นิทรรศการศิลปะ
          </Link>
          
          <nav data-testid="nav">
            <ul className="flex gap-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 no-underline ${
                      location === item.href 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5"
                    }`}
                    data-testid={`nav-link-${item.href.replace('/', '') || 'home'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
