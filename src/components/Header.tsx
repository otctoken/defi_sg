import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@mysten/dapp-kit";

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }: { isActive: boolean }) =>
        `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o: boolean) => !o);
  const close = () => setOpen(false);

  const navItems = [
    { to: "/Home", label: "Home" },
    { to: "/AA", label: "AA" },
    { to: "/BB", label: "BB" },
    { to: "/CC", label: "CC" },
    { to: "/DD", label: "DD" },
  ];

  return (
    <header className="border-b border-gray-700 h-14 flex items-center sticky top-0 bg-gray-900 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center font-bold text-lg text-[#eda820]"
            onClick={close}
          >
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            <span className="ml-2">Savings game</span>
          </Link>

          <nav className="hidden md:flex gap-4">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* ✅ 链接钱包按钮：所有屏幕尺寸都显示 */}
          <nav>
            <ConnectButton
            // {...({ variant: "default" } as any)}
            // className="!bg-[#eda820] !text-white hover:!bg-yellow-600 h-8 px-2 text-xs rounded-md"
            />
          </nav>

          {/* 移动端菜单按钮：只在小屏显. */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden text-gray-100 border-gray-700"
            onClick={toggle}
            aria-label={open ? "关闭菜单" : "打开菜单"}
          >
            {open ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute top-14 inset-x-0 border-b border-gray-700 bg-gray-900 shadow-sm">
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
