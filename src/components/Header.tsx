import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  to: string;
  label: string;
  onClick?: () => void;
}

function NavItem({ to, label, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        "isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary'"}
      `}
    >
      {label}
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  const navItems = [
    { to: "/AA", label: "AA" },
    { to: "/BB", label: "BB" },
    { to: "/CC", label: "CC" },
    { to: "/DD", label: "DD" },
  ];

  return (
    <header className="border-b h-14 flex items-center sticky top-0 bg-background z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* LOGO */}
        <Link to="/" className="font-bold text-lg" onClick={close}>
          LOGO
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggle}
          aria-label={open ? "关闭菜单" : "打开菜单"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden absolute top-14 inset-x-0 border-b bg-background shadow-sm animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col py-2">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} onClick={close} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
