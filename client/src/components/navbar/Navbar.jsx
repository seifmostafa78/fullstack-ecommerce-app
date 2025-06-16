import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "../../redux/features/cart/cartSlice";
import AuthButtons from "./AuthButtons";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { quantity } = useSelector(getCart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="h-16 bg-background border-b border-border">
      <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        <div className="sm:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[250px]"
              aria-describedby={undefined}
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">SHOP.</SheetTitle>
              </SheetHeader>
              <div className="border-t pt-4 pl-2">
                <AuthButtons onAction={() => setIsMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden sm:flex items-center gap-5 flex-1">
          <span className="text-sm font-medium">EN</span>
          <div className="flex items-center border border-border rounded-md px-2 py-[1px] max-w-xs w-full">
            <Input
              placeholder="Search"
              className="border-none outline-none bg-transparent text-sm focus-visible:ring-0"
            />
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1 flex justify-center sm:justify-center">
          <Link to="/" className="text-decoration-none">
            <h1 className="text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors">
              SHOP.
            </h1>
          </Link>
        </div>
        <div className="flex items-center justify-end gap-4 flex-1">
          <div className="hidden sm:block">
            <AuthButtons />
          </div>
          <Link to="/cart" className="relative text-decoration-none">
          <ShoppingCartOutlinedIcon className="h-6 w-6 text-foreground hover:text-primary transition-colors cursor-pointer" />
            {quantity > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
              >
                {quantity}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
