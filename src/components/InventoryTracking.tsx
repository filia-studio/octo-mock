import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Search, Plus, AlertTriangle, Package } from "lucide-react";
import { Progress } from "./ui/progress";
import { AddInventoryDialog } from "./AddInventoryDialog";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  expiryDate: string;
  location: string;
  supplier: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Surgical Gloves - Size L",
    category: "PPE",
    quantity: 450,
    unit: "boxes",
    minStock: 200,
    expiryDate: "2025-03-15",
    location: "Storage Room A",
    supplier: "MediSupply Co."
  },
  {
    id: "2",
    name: "N95 Respirator Masks",
    category: "PPE",
    quantity: 120,
    unit: "boxes",
    minStock: 150,
    expiryDate: "2025-06-20",
    location: "Storage Room A",
    supplier: "SafeGuard Medical"
  },
  {
    id: "3",
    name: "Disposable Syringes 10ml",
    category: "Supplies",
    quantity: 850,
    unit: "units",
    minStock: 500,
    expiryDate: "2026-01-10",
    location: "Storage Room B",
    supplier: "MedTech Solutions"
  },
  {
    id: "4",
    name: "Antibiotic - Amoxicillin 500mg",
    category: "Medication",
    quantity: 380,
    unit: "bottles",
    minStock: 200,
    expiryDate: "2024-11-30",
    location: "Pharmacy",
    supplier: "PharmaCorp"
  },
  {
    id: "5",
    name: "Sterile Gauze Pads",
    category: "Supplies",
    quantity: 650,
    unit: "packs",
    minStock: 300,
    expiryDate: "2025-08-15",
    location: "Storage Room B",
    supplier: "MediSupply Co."
  },
  {
    id: "6",
    name: "IV Solution - Saline 1000ml",
    category: "Fluids",
    quantity: 95,
    unit: "bags",
    minStock: 100,
    expiryDate: "2024-12-20",
    location: "Emergency Room",
    supplier: "FluidMed Inc."
  },
  {
    id: "7",
    name: "Pain Relief - Ibuprofen 400mg",
    category: "Medication",
    quantity: 520,
    unit: "bottles",
    minStock: 250,
    expiryDate: "2025-04-05",
    location: "Pharmacy",
    supplier: "PharmaCorp"
  },
  {
    id: "8",
    name: "Alcohol Sanitizer 500ml",
    category: "Hygiene",
    quantity: 180,
    unit: "bottles",
    minStock: 150,
    expiryDate: "2026-02-28",
    location: "Multiple Locations",
    supplier: "CleanCare Medical"
  }
];

export function InventoryTracking() {
  const [inventory] = useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date("2024-10-18");
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (expiryDate: string) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return { label: "Expired", variant: "destructive" as const };
    if (days <= 30) return { label: `${days} days`, variant: "destructive" as const };
    if (days <= 90) return { label: `${days} days`, variant: "default" as const };
    return { label: `${days} days`, variant: "secondary" as const };
  };

  const getStockStatus = (quantity: number, minStock: number) => {
    const percentage = (quantity / minStock) * 100;
    if (quantity < minStock) return { color: "text-red-600", bgColor: "bg-red-600" };
    if (percentage < 150) return { color: "text-yellow-600", bgColor: "bg-yellow-600" };
    return { color: "text-green-600", bgColor: "bg-green-600" };
  };

  const lowStockItems = inventory.filter((item) => item.quantity < item.minStock);
  const expiringItems = inventory.filter((item) => getDaysUntilExpiry(item.expiryDate) <= 90 && getDaysUntilExpiry(item.expiryDate) >= 0);
  const expiredItems = inventory.filter((item) => getDaysUntilExpiry(item.expiryDate) < 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <CardDescription>Total Items</CardDescription>
            </div>
            <CardTitle className="text-3xl">{inventory.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <CardDescription>Low Stock</CardDescription>
            </div>
            <CardTitle className="text-3xl">{lowStockItems.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <CardDescription>Expiring Soon</CardDescription>
            </div>
            <CardTitle className="text-3xl">{expiringItems.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-gray-600" />
              <CardDescription>Expired</CardDescription>
            </div>
            <CardTitle className="text-3xl">{expiredItems.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
          <CardDescription>Track supplies and expiry dates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item.quantity, item.minStock);
                const expiryStatus = getExpiryStatus(item.expiryDate);
                const stockPercentage = Math.min((item.quantity / item.minStock) * 100, 100);

                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={stockStatus.color}>
                        {item.quantity} {item.unit}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={stockPercentage} className="h-2" />
                        <p className="text-xs text-gray-500">
                          Min: {item.minStock} {item.unit}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>{item.expiryDate}</div>
                        <Badge variant={expiryStatus.variant} className="text-xs">
                          {expiryStatus.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{item.location}</TableCell>
                    <TableCell>
                      {item.quantity < item.minStock ? (
                        <Badge variant="destructive">Low Stock</Badge>
                      ) : getDaysUntilExpiry(item.expiryDate) < 0 ? (
                        <Badge variant="destructive">Expired</Badge>
                      ) : getDaysUntilExpiry(item.expiryDate) <= 30 ? (
                        <Badge variant="destructive">Critical</Badge>
                      ) : (
                        <Badge variant="secondary">Normal</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddInventoryDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
