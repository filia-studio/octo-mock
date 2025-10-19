import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Search, Plus, FileText } from "lucide-react";
import { PatientDetailsDialog } from "./PatientDetailsDialog";
import { AddPatientDialog } from "./AddPatientDialog";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  mrn: string;
  lastVisit: string;
  department: string;
  status: "Active" | "Discharged" | "Admitted";
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    oxygen: number;
  };
  notes: string;
}

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    mrn: "OH-20251019001",
    lastVisit: "2024-10-15",
    department: "Cardiology",
    status: "Active",
    bloodType: "O+",
    allergies: ["Penicillin"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    vitals: {
      bloodPressure: "138/88",
      heartRate: 76,
      temperature: 98.6,
      oxygen: 98,
    },
    notes: "Patient responding well to current medication regimen.",
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 62,
    gender: "Male",
    mrn: "OH-20251019002",
    lastVisit: "2024-10-17",
    department: "Orthopedics",
    status: "Admitted",
    bloodType: "A+",
    allergies: [],
    conditions: ["Osteoarthritis"],
    medications: ["Ibuprofen 400mg"],
    vitals: {
      bloodPressure: "128/82",
      heartRate: 72,
      temperature: 98.4,
      oxygen: 99,
    },
    notes: "Post-op knee replacement, day 3. Recovery progressing normally.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    age: 28,
    gender: "Female",
    mrn: "OH-20251019003",
    lastVisit: "2024-10-18",
    department: "Obstetrics",
    status: "Active",
    bloodType: "B+",
    allergies: ["Latex"],
    conditions: ["Pregnancy - 28 weeks"],
    medications: ["Prenatal vitamins"],
    vitals: {
      bloodPressure: "118/75",
      heartRate: 82,
      temperature: 98.2,
      oxygen: 99,
    },
    notes: "Routine prenatal checkup. All vitals normal.",
  },
  {
    id: "4",
    name: "Robert Williams",
    age: 71,
    gender: "Male",
    mrn: "OH-20251019004",
    lastVisit: "2024-10-10",
    department: "Neurology",
    status: "Discharged",
    bloodType: "AB-",
    allergies: ["Sulfa drugs"],
    conditions: ["Parkinson's Disease"],
    medications: ["Carbidopa-Levodopa 25/100mg"],
    vitals: {
      bloodPressure: "142/90",
      heartRate: 68,
      temperature: 98.3,
      oxygen: 97,
    },
    notes: "Follow-up in 3 months for medication adjustment.",
  },
];

export function PatientRecordsDashboard() {
  const [patients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Patient Records</h2>
        <p className="text-gray-500">Manage and view patient information</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, octo ID, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Patients</CardDescription>
            <CardTitle className="text-3xl">{patients.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Currently Admitted</CardDescription>
            <CardTitle className="text-3xl">
              {patients.filter((p) => p.status === "Admitted").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Cases</CardDescription>
            <CardTitle className="text-3xl">
              {patients.filter((p) => p.status === "Active").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Discharged Today</CardDescription>
            <CardTitle className="text-3xl">
              {
                patients.filter(
                  (p) =>
                    p.status === "Discharged" && p.lastVisit === "2024-10-18"
                ).length
              }
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Table>
        <TableHeader className="bg-[#C80740]">
          <TableRow>
            <TableHead className="text-white py-3 px-4 rounded-tl-[10px]">
              Octo ID
            </TableHead>
            <TableHead className="text-white py-3 px-4">Patient Name</TableHead>
            <TableHead className="text-white py-3 px-4">Age</TableHead>
            <TableHead className="text-white py-3 px-4">Gender</TableHead>
            <TableHead className="text-white py-3 px-4">Department</TableHead>
            <TableHead className="text-white py-3 px-4">Last Visit</TableHead>
            <TableHead className="text-white py-3 px-4">Status</TableHead>
            <TableHead className="text-white py-3 px-4 rounded-tr-[10px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="py-3 px-4 bg-[#A80334] text-white">
                {patient.mrn}
              </TableCell>
              <TableCell className="py-3 px-4">{patient.name}</TableCell>
              <TableCell className="py-3 px-4">{patient.age}</TableCell>
              <TableCell className="py-3 px-4">{patient.gender}</TableCell>
              <TableCell className="py-3 px-4">{patient.department}</TableCell>
              <TableCell className="py-3 px-4">{patient.lastVisit}</TableCell>
              <TableCell className="py-3 px-4">
                <Badge
                  variant={
                    patient.status === "Admitted"
                      ? "default"
                      : patient.status === "Active"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {patient.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetails(patient)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PatientDetailsDialog
        patient={selectedPatient}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
      <AddPatientDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
