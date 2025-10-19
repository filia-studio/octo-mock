import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  Package,
  MessageSquare
} from "lucide-react";

interface QuickStat {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

interface RecentActivity {
  id: string;
  type: "patient" | "appointment" | "task" | "alert";
  title: string;
  description: string;
  time: string;
  user: string;
}

const quickStats: QuickStat[] = [
  {
    label: "Total Patients",
    value: 1247,
    change: "+12% from last month",
    trend: "up",
    icon: <Users className="h-4 w-4" />
  },
  {
    label: "Today's Appointments",
    value: 28,
    change: "4 pending confirmation",
    trend: "up",
    icon: <Calendar className="h-4 w-4" />
  },
  {
    label: "Active Tasks",
    value: 16,
    change: "6 high priority",
    trend: "down",
    icon: <ClipboardList className="h-4 w-4" />
  },
  {
    label: "Low Stock Items",
    value: 8,
    change: "2 critical",
    trend: "down",
    icon: <Package className="h-4 w-4" />
  }
];

const recentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "patient",
    title: "New Patient Registered",
    description: "Sarah Johnson added to Cardiology department",
    time: "10 minutes ago",
    user: "Dr. Smith"
  },
  {
    id: "2",
    type: "appointment",
    title: "Appointment Confirmed",
    description: "Follow-up consultation for OH-20251019002",
    time: "25 minutes ago",
    user: "Nurse Williams"
  },
  {
    id: "3",
    type: "task",
    title: "Task Completed",
    description: "Lab results reviewed for Patient OH-20251019001",
    time: "1 hour ago",
    user: "Dr. Chen"
  },
  {
    id: "4",
    type: "alert",
    title: "Inventory Alert",
    description: "N95 masks below minimum stock level",
    time: "2 hours ago",
    user: "System"
  },
  {
    id: "5",
    type: "patient",
    title: "Patient Discharged",
    description: "Robert Williams discharged from Neurology",
    time: "3 hours ago",
    user: "Dr. Martinez"
  }
];

const upcomingAppointments = [
  {
    id: "1",
    patient: "Emily Rodriguez",
    department: "Obstetrics",
    time: "10:00 AM",
    type: "Follow-up"
  },
  {
    id: "2",
    patient: "Michael Chen",
    department: "Orthopedics",
    time: "11:30 AM",
    type: "Post-op"
  },
  {
    id: "3",
    patient: "Sarah Johnson",
    department: "Cardiology",
    time: "2:00 PM",
    type: "Consultation"
  },
  {
    id: "4",
    patient: "James Wilson",
    department: "Emergency",
    time: "3:30 PM",
    type: "Urgent"
  }
];

const departmentStats = [
  { name: "Cardiology", patients: 45, percentage: 22 },
  { name: "Orthopedics", patients: 38, percentage: 18 },
  { name: "Neurology", patients: 32, percentage: 16 },
  { name: "Emergency", patients: 28, percentage: 14 },
  { name: "Obstetrics", patients: 25, percentage: 12 },
  { name: "Other", patients: 37, percentage: 18 }
];

export function HomeDashboard() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "patient":
        return <Users className="h-4 w-4" />;
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "task":
        return <ClipboardList className="h-4 w-4" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "patient":
        return "bg-blue-100 text-blue-600";
      case "appointment":
        return "bg-green-100 text-green-600";
      case "task":
        return "bg-purple-100 text-purple-600";
      case "alert":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back, Dr. Anderson</h2>
        <p className="text-gray-500">Here's what's happening in your facility today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>{stat.label}</CardDescription>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {stat.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp className={`h-3 w-3 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">by {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded px-2 py-1 min-w-[60px]">
                      <span className="text-xs">{appointment.time.split(' ')[1]}</span>
                      <span className="font-medium">{appointment.time.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{appointment.patient}</p>
                      <p className="text-xs text-gray-500">{appointment.department}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unread Messages</CardTitle>
              <CardDescription>Interdepartmental communication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Cardiology Lab</p>
                    <p className="text-xs text-gray-500 truncate">Patient results ready for review</p>
                  </div>
                  <Badge>3</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>RD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Radiology</p>
                    <p className="text-xs text-gray-500 truncate">X-ray scan completed</p>
                  </div>
                  <Badge>1</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>PH</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Pharmacy</p>
                    <p className="text-xs text-gray-500 truncate">Medication approval needed</p>
                  </div>
                  <Badge>5</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
          <CardDescription>Patient distribution across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{dept.name}</span>
                  <span className="text-gray-500">{dept.patients} patients</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
