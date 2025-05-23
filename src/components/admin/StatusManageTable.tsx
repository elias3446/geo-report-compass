import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface Status {
  id: string;
  name: string;
  description: string;
  color: string;
}

const StatusManageTable: React.FC = () => {
  const statuses = [
    { 
      id: "Open", 
      name: "Open", 
      description: "Report is created and pending attention",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200"
    },
    { 
      id: "In Progress", 
      name: "In Progress", 
      description: "Report is currently being worked on",
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    { 
      id: "Resolved", 
      name: "Resolved", 
      description: "The reported issue has been resolved",
      color: "bg-green-100 text-green-800 border-green-200"
    }
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<Status | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStatus) {
      // ... existing code ...
    } else {
      const newStatus: Status = {
        id: `status_${uuidv4().split('-')[0]}`,
        ...formData,
        color: "bg-yellow-100 text-yellow-800 border-yellow-200"
      };
      // ... existing code ...
    }
    handleCloseDialog();
  };

  const handleDelete = (statusId: string) => {
    // ... existing code ...
  };

  const handleEdit = (status: Status) => {
    setEditingStatus(status);
    setFormData({ name: status.name, description: status.description });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingStatus(null);
    setFormData({ name: "", description: "" });
  };

  const handleStatusChange = (statusId: string, newStatus: string) => {
    // ... existing code ...
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Estados de Reporte</h2>
          <p className="text-gray-500">Administra los estados posibles de los reportes en el sistema</p>
        </div>
        <Button 
          className="flex items-center"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Estado
        </Button>
      </div>
      
      <ScrollArea className="h-[500px] border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statuses.map(status => (
              <TableRow key={status.id}>
                <TableCell>
                  <Badge variant="outline">{status.id}</Badge>
                </TableCell>
                <TableCell className="font-medium">{status.name}</TableCell>
                <TableCell>{status.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(status)}
                    className="mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(status.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStatus ? "Editar Estado" : "Nuevo Estado"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nombre del estado"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <Input
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción del estado"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingStatus ? "Guardar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusManageTable;
