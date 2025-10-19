import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Users, MessageSquare, ClipboardList, Package, Activity, Home, CalendarDays } from "lucide-react";
import { HomeDashboard } from "./components/HomeDashboard";
import { PatientRecordsDashboard } from "./components/PatientRecordsDashboard";
import { AppointmentsScheduler } from "./components/AppointmentsScheduler";
import { InterdepartmentalChat } from "./components/InterdepartmentalChat";
import { TaskManagement } from "./components/TaskManagement";
import { InventoryTracking } from "./components/InventoryTracking";

type View = "home" | "patients" | "appointments" | "chat" | "tasks" | "inventory";

export default function App() {
  const [activeView, setActiveView] = useState<View>("home");

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomeDashboard />;
      case "patients":
        return <PatientRecordsDashboard />;
      case "appointments":
        return <AppointmentsScheduler />;
      case "chat":
        return <InterdepartmentalChat />;
      case "tasks":
        return <TaskManagement />;
      case "inventory":
        return <InventoryTracking />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-semibold">MediCare EMR</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("home")}
                  isActive={activeView === "home"}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("patients")}
                  isActive={activeView === "patients"}
                >
                  <Users className="h-4 w-4" />
                  <span>Patient Records</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("appointments")}
                  isActive={activeView === "appointments"}
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>Appointments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("chat")}
                  isActive={activeView === "chat"}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Interdepartmental Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("tasks")}
                  isActive={activeView === "tasks"}
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Task Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("inventory")}
                  isActive={activeView === "inventory"}
                >
                  <Package className="h-4 w-4" />
                  <span>Inventory & Expiry</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">
          <div className="border-b bg-white px-6 py-4 flex items-center gap-4">
            <SidebarTrigger />
            <h1>
              {activeView === "home" && "Dashboard Overview"}
              {activeView === "patients" && "Patient Records Dashboard"}
              {activeView === "appointments" && "Appointments Scheduler"}
              {activeView === "chat" && "Interdepartmental Communication"}
              {activeView === "tasks" && "Task Management System"}
              {activeView === "inventory" && "Inventory & Expiry Tracking"}
            </h1>
          </div>
          <div className="p-6 bg-gray-50 min-h-[calc(100vh-73px)]">
            {renderView()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
