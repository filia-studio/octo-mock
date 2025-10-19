import React, { useState } from "react";
import Sidebar from "../nav/sidebar";
import Header from "../nav/header";
import { cn } from "../ui/utils";

const DashboardLayout: React.FC = ({
  children,
  onNavigate,
  activePath,
}: {
  children: React.ReactNode;
  onNavigate?: (path: string) => void;
  activePath?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={isOpen}
        toggle={toggleSidebar}
        onNavigate={onNavigate}
        activePath={activePath}
      />
      <section
        className={cn("w-full h-full overflow-auto flex flex-col", {
          "w-full": isOpen,
          "lg:w-[80%]": !isOpen,
        })}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="pt-8 px-4 max-w-[75.5rem] mx-auto w-full">
          {children}
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;
