import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Plus, Trash2, Eye } from "lucide-react";
import { Trash2Icon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { availablePermissions } from "@/pages/RoleDetail"; // Correct import path

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const RoleManageTable: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([
    { 
      id: "admin", 
      name: "Administrador", 
      description: "Acceso total al sistema",
      permissions: availablePermissions.map(p => p.id)
    },
    { 
      id: "supervisor", 
      name: "Supervisor", 
      description: "Gestión de reportes",
      permissions: ["reports_view", "reports_manage", "users_view"]
    },
    { 
      id: "mobile", 
      name: "Usuario Móvil", 
      description: "Uso de app móvil",
      permissions: ["reports_view"]
    },
    { 
      id: "viewer", 
      name: "Visualizador", 
      description: "Solo lectura",
      permissions: ["reports_view", "users_view"]
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    description: "", 
    permissions: [] as string[] 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id ? { ...role, ...formData } : role
      ));
      toast.success("Rol actualizado correctamente");
    } else {
      const newRole: Role = {
        id: `role_${uuidv4().split('-')[0]}`,
        ...formData
      };
      setRoles([...roles, newRole]);
      toast.success("Rol creado correctamente");
    }
    handleCloseDialog();
  };

  const handleDelete = (roleId: string) => {
    if (roleId === "admin") {
      toast.error("No se puede eliminar el rol de administrador");
      return;
    }
    setRoles(roles.filter(role => role.id !== roleId));
    toast.success("Rol eliminado correctamente");
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRole(null);
    setFormData({ name: "", description: "", permissions: [] });
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };
  
  const handleViewRole = (roleId: string) => {
    console.log("Navigating to role detail:", roleId);
    navigate(`/admin/roles/${roleId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Roles</h2>
          <p className="text-gray-500">Administra los roles y permisos del sistema</p>
        </div>
        <Button 
          className="flex items-center"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Rol
        </Button>
      </div>
      
      <ScrollArea className="h-[500px] border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Permisos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map(role => (
              <TableRow 
                key={role.id}
                className="cursor-pointer"
                onClick={() => handleViewRole(role.id)}
              >
                <TableCell>
                  <Badge variant="outline">{role.id}</Badge>
                </TableCell>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.length > 0 ? (
                      role.permissions.map(permId => (
                        <Badge key={permId} variant="secondary" className="text-xs">
                          {availablePermissions.find(p => p.id === permId)?.label || permId}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">Sin permisos</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRole(role.id);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(role);
                    }}
                    className="mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(role.id);
                    }}
                    disabled={role.id === "admin"}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
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
              {editingRole ? "Editar Rol" : "Nuevo Rol"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nombre del rol"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <Input
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción del rol"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Permisos</label>
              <div className="border rounded-md p-4 space-y-3">
                {availablePermissions.map(permission => (
                  <div key={permission.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={formData.permissions.includes(permission.id)}
                      onCheckedChange={() => handlePermissionToggle(permission.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={permission.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.label}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingRole ? "Guardar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManageTable;
