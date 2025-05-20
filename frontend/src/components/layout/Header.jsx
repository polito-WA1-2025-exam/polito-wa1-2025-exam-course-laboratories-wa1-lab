import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "../../store/useUserStore.js";

export function Header() {
  const location = useLocation();
  const { user } = useUserStore();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-xl">Poke Bowl App</div>

        <nav className="flex items-center space-x-8">
          <Link to="/">
            <Button
              variant={location.pathname === "/" ? "default" : "ghost"}
            >
              Poke Creation
            </Button>
          </Link>
          <Link to="/user">
            <Button
              variant={location.pathname === "/user" ? "default" : "ghost"}
            >
              User Info
            </Button>
          </Link>

          {user && (
            <Link to="/user">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;