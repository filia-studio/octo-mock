import React from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="lg:min-h-36 flex flex-col justify-center items-center bg-white border-b border-gray-200 px-4 lg:px-16 py-4 sticky top-0 z-10">
      <div className="max-w-[75.5rem] w-full mx-auto flex items-center justify-between">
        <Button variant="link" className="text-black" onClick={toggleSidebar}>
          <MenuIcon className="size-7" />
        </Button>
      </div>
    </header>
  );
};
export default Header;
