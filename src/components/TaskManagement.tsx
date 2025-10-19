import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus } from "lucide-react";
import { AddTaskDialog } from "./AddTaskDialog";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  department: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "To Do" | "In Progress" | "Completed";
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review Lab Results - Patient OH-20251019001",
    description: "Complete blood count and metabolic panel review required",
    assignedTo: "Dr. Smith",
    department: "Cardiology",
    priority: "High",
    status: "To Do",
    dueDate: "2024-10-19"
  },
  {
    id: "2",
    title: "Schedule Follow-up Appointment",
    description: "Post-surgery follow-up for Patient OH-20251019002",
    assignedTo: "Nurse Johnson",
    department: "Orthopedics",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2024-10-20"
  },
  {
    id: "3",
    title: "Medication Order Review",
    description: "Verify and approve medication changes for ward B",
    assignedTo: "Dr. Chen",
    department: "Pharmacy",
    priority: "Urgent",
    status: "To Do",
    dueDate: "2024-10-18"
  },
  {
    id: "4",
    title: "Equipment Maintenance",
    description: "Routine maintenance check on MRI machine",
    assignedTo: "Tech Williams",
    department: "Radiology",
    priority: "Low",
    status: "Completed",
    dueDate: "2024-10-17"
  },
  {
    id: "5",
    title: "Patient Discharge Planning",
    description: "Prepare discharge paperwork and home care instructions",
    assignedTo: "Nurse Davis",
    department: "General",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2024-10-19"
  },
  {
    id: "6",
    title: "Inventory Audit",
    description: "Monthly audit of surgical supplies",
    assignedTo: "Admin Brown",
    department: "Supply Chain",
    priority: "Low",
    status: "To Do",
    dueDate: "2024-10-25"
  }
];

export function TaskManagement() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const tasksByStatus = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    "Completed": tasks.filter((t) => t.status === "Completed")
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "destructive";
      case "High":
        return "default";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Task Board</h2>
          <p className="text-gray-500">Manage tasks across departments</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <Card key={status} className="flex flex-col">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{status}</CardTitle>
                <Badge variant="outline">{statusTasks.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 space-y-3">
              {statusTasks.map((task) => (
                <Card key={task.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-1">{task.title}</h4>
                        <p className="text-sm text-gray-500">{task.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline">{task.department}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{task.assignedTo}</span>
                        <span className="text-gray-500">Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {statusTasks.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No tasks in this column
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AddTaskDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
