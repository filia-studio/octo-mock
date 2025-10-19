import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, LogOut } from "lucide-react";
import { cn } from "../ui/utils";

export type Route = {
  title: string;
  path: string;
  subRoutes?: Route[];
};

export const routes: Route[] = [
  {
    path: "home",
    title: "Home",
  },
  {
    path: "patients",
    title: "Patients",
  },
  {
    path: "appointments",
    title: "Appointments",
  },
  {
    path: "chat",
    title: "Chat",
  },
  {
    path: "tasks",
    title: "Tasks",
  },
  {
    path: "inventory",
    title: "Inventory",
  },
];

const Sidebar = ({
  isOpen,
  toggle,
  onNavigate,
  activePath,
}: {
  isOpen?: boolean;
  toggle: () => void;
  onNavigate?: (path: string) => void;
  activePath?: string;
}) => {
  const [subRoute, setSubRoute] = useState("");

  const subPaths =
    routes?.find((path) => path.title === subRoute)?.subRoutes ?? [];

  const handleLogout = () => {};

  return (
    <section
      className={cn(
        "z-50 bg-white md:w-[30%] lg:w-[20%] w-full border-r border-[#E1E1E1] h-full sidebar",
        { "absolute -left-full": isOpen, "absolute lg:static": !isOpen }
      )}
    >
      <div className="h-36 flex items-center justify-center border-b border-[#E1E1E1]">
        <img src="/assets/svgs/logo.svg" alt="" className="w-12" />
      </div>
      <div className="py-4 px-5">
        <p
          onClick={() => setSubRoute("")}
          className="text-[0.625rem] text-primary font-bold tracking-[19%] cursor-pointer"
        >
          MENU{" "}
          {subRoute ? (
            <>
              <ArrowRight className="inline text-black size-2 mx-2" />{" "}
              {subRoute}
            </>
          ) : null}
        </p>
        <div className="w-full mt-8 relative">
          <div
            className={cn("w-[200%] flex transition-all duration-300", {
              "translate-x-0": !subRoute,
              "-translate-x-1/2": subRoute,
            })}
          >
            <div className="flex flex-col gap-10 w-full">
              {routes.map(({ title, path, subRoutes }) => (
                <p
                  onClick={() => {
                    subRoutes?.length ? setSubRoute(title) : setSubRoute("");
                    onNavigate?.(path);
                  }}
                  className={cn("cursor-pointer", {
                    "active": path === activePath,
                  })}
                >
                  {title}
                </p>
              ))}
              <span className="cursor-pointer" onClick={handleLogout}>
                Logout
              </span>
            </div>
            <div className="flex flex-col gap-10 w-full">
              {subPaths.map(({ title, path }) => (
                <p
                  onClick={() => onNavigate?.(path)}
                  className={cn("cursor-pointer", {
                    "active": path === activePath,
                  })}
                >
                  {title}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        size="icon"
        className="rounded-full size-7 bg-black absolute top-2.5 right-2.5 lg:hidden"
        onClick={toggle}
      >
        <LogOut className="size-3" />
      </Button>
    </section>
  );
};

export default Sidebar;
