import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Patient } from "./PatientRecordsDashboard";
import { Heart, Thermometer, Activity, Droplet } from "lucide-react";

interface PatientDetailsDialogProps {
  patient: Patient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientDetailsDialog({ patient, open, onOpenChange }: PatientDetailsDialogProps) {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{patient.name}</DialogTitle>
          <DialogDescription>
            MRN: {patient.mrn} | {patient.age} years old | {patient.gender}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge>{patient.bloodType}</Badge>
            <Badge variant={patient.status === "Admitted" ? "default" : "secondary"}>
              {patient.status}
            </Badge>
            <Badge variant="outline">{patient.department}</Badge>
          </div>

          <Tabs defaultValue="vitals" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="vitals" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <CardDescription>Blood Pressure</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-2xl">{patient.vitals.bloodPressure}</CardTitle>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <CardDescription>Heart Rate</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-2xl">{patient.vitals.heartRate} bpm</CardTitle>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <CardDescription>Temperature</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-2xl">{patient.vitals.temperature}°F</CardTitle>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-cyan-500" />
                      <CardDescription>Oxygen Sat.</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-2xl">{patient.vitals.oxygen}%</CardTitle>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="conditions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {patient.conditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No known allergies</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {patient.medications.map((medication, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        {medication}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Notes</CardTitle>
                  <CardDescription>Last visit: {patient.lastVisit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{patient.notes}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
