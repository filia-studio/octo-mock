import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import {
  Users,
  MessageSquare,
  ClipboardList,
  Package,
  Activity,
  Home,
  CalendarDays,
} from "lucide-react";
import { HomeDashboard } from "./components/HomeDashboard";
import { PatientRecordsDashboard } from "./components/PatientRecordsDashboard";
import { AppointmentsScheduler } from "./components/AppointmentsScheduler";
import { InterdepartmentalChat } from "./components/InterdepartmentalChat";
import { TaskManagement } from "./components/TaskManagement";
import { InventoryTracking } from "./components/InventoryTracking";
import DashboardLayout from "./components/layouts/dashboard";

type View =
  | "home"
  | "patients"
  | "appointments"
  | "chat"
  | "tasks"
  | "inventory";

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
    <DashboardLayout activePath={activeView} onNavigate={setActiveView}>
      <main className="bg-gray-50">{renderView()}</main>
    </DashboardLayout>
  );
}
