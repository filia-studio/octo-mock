import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Plus, Clock, User, MapPin } from "lucide-react";
import { AddAppointmentDialog } from "./AddAppointmentDialog";

interface Appointment {
  id: string;
  patientName: string;
  patientMRN: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  room: string;
  notes: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    patientMRN: "OH-20251019001",
    department: "Cardiology",
    doctor: "Dr. Smith",
    date: "2024-10-19",
    time: "09:00",
    duration: 30,
    type: "Follow-up",
    status: "Confirmed",
    room: "Room 301",
    notes: "Routine check-up after medication adjustment"
  },
  {
    id: "2",
    patientName: "Michael Chen",
    patientMRN: "OH-20251019002",
    department: "Orthopedics",
    doctor: "Dr. Williams",
    date: "2024-10-19",
    time: "10:00",
    duration: 45,
    type: "Post-operative",
    status: "Confirmed",
    room: "Room 205",
    notes: "Post-op follow-up for knee replacement"
  },
  {
    id: "3",
    patientName: "Emily Rodriguez",
    patientMRN: "OH-20251019003",
    department: "Obstetrics",
    doctor: "Dr. Martinez",
    date: "2024-10-19",
    time: "11:00",
    duration: 30,
    type: "Prenatal",
    status: "Confirmed",
    room: "Room 102",
    notes: "28-week prenatal checkup"
  },
  {
    id: "4",
    patientName: "Robert Williams",
    patientMRN: "OH-20251019004",
    department: "Neurology",
    doctor: "Dr. Chen",
    date: "2024-10-19",
    time: "13:00",
    duration: 60,
    type: "Consultation",
    status: "Pending",
    room: "Room 404",
    notes: "Initial consultation for tremor symptoms"
  },
  {
    id: "5",
    patientName: "Lisa Anderson",
    patientMRN: "OH-20251019005",
    department: "Dermatology",
    doctor: "Dr. Brown",
    date: "2024-10-19",
    time: "14:30",
    duration: 30,
    type: "Screening",
    status: "Confirmed",
    room: "Room 115",
    notes: "Annual skin cancer screening"
  },
  {
    id: "6",
    patientName: "James Wilson",
    patientMRN: "OH-20251019006",
    department: "Emergency",
    doctor: "Dr. Davis",
    date: "2024-10-19",
    time: "15:30",
    duration: 30,
    type: "Urgent",
    status: "Pending",
    room: "ER Bay 3",
    notes: "Acute chest pain evaluation"
  },
  {
    id: "7",
    patientName: "Maria Garcia",
    patientMRN: "OH-20251019007",
    department: "Pediatrics",
    doctor: "Dr. Lee",
    date: "2024-10-20",
    time: "09:30",
    duration: 30,
    type: "Check-up",
    status: "Confirmed",
    room: "Room 210",
    notes: "6-month well-child visit"
  },
  {
    id: "8",
    patientName: "David Thompson",
    patientMRN: "OH-20251019008",
    department: "Cardiology",
    doctor: "Dr. Smith",
    date: "2024-10-20",
    time: "11:00",
    duration: 45,
    type: "Diagnostic",
    status: "Confirmed",
    room: "Room 301",
    notes: "ECG and stress test"
  }
];

export function AppointmentsScheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date("2024-10-19"));
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const selectedDateAppointments = appointments.filter(
    (apt) => apt.date === date?.toISOString().split('T')[0]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "default";
      case "Pending":
        return "secondary";
      case "Completed":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Appointments</h2>
          <p className="text-gray-500">Manage patient appointments and schedules</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Today's Total</CardDescription>
            <CardTitle className="text-3xl">{selectedDateAppointments.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Confirmed</CardDescription>
            <CardTitle className="text-3xl">
              {selectedDateAppointments.filter((a) => a.status === "Confirmed").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl">
              {selectedDateAppointments.filter((a) => a.status === "Pending").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl">
              {selectedDateAppointments.filter((a) => a.status === "Completed").length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Appointments for {date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </CardTitle>
            <CardDescription>
              {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? 's' : ''} scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateAppointments.length > 0 ? (
              <div className="space-y-4">
                {selectedDateAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                    <Card key={appointment.id} className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded px-3 py-2 min-w-[70px]">
                              <Clock className="h-4 w-4 mb-1" />
                              <span className="font-medium">{appointment.time}</span>
                              <span className="text-xs">{appointment.duration} min</span>
                            </div>
                            <div>
                              <h4 className="font-medium">{appointment.patientName}</h4>
                              <p className="text-sm text-gray-500">{appointment.patientMRN}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                                <Badge variant="outline">{appointment.type}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-4 w-4" />
                            <span>{appointment.doctor}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.room}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Badge variant="outline" className="text-xs">
                              {appointment.department}
                            </Badge>
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-gray-500 mt-3 pt-3 border-t">
                            {appointment.notes}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No appointments scheduled for this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Schedule Overview</CardTitle>
          <CardDescription>Visual timeline of all appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {timeSlots.map((slot) => {
              const slotAppointments = selectedDateAppointments.filter(
                (apt) => apt.time.startsWith(slot.split(':')[0])
              );
              return (
                <div key={slot} className="flex items-start gap-4 py-2 border-b last:border-0">
                  <div className="w-20 text-sm text-gray-500 pt-1">{slot}</div>
                  <div className="flex-1">
                    {slotAppointments.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {slotAppointments.map((apt) => (
                          <div
                            key={apt.id}
                            className="bg-primary/10 border border-primary/20 rounded px-3 py-1 text-sm"
                          >
                            <span className="font-medium">{apt.patientName}</span>
                            <span className="text-gray-500 ml-2">• {apt.department}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-300">Available</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AddAppointmentDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
