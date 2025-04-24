
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/components/layout/AppLayout';

// Define permissions array separately
export const availablePermissions = [
  { id: "users_view", label: "Ver usuarios", description: "Permite ver la lista de usuarios" },
  { id: "users_manage", label: "Gestionar usuarios", description: "Permite crear, editar y eliminar usuarios" },
  { id: "reports_view", label: "Ver reportes", description: "Permite ver todos los reportes" },
  { id: "reports_manage", label: "Gestionar reportes", description: "Permite editar y actualizar reportes" },
  { id: "categories_manage", label: "Gestionar categorías", description: "Permite administrar las categorías" },
  { id: "settings_view", label: "Ver configuración", description: "Permite ver la configuración del sistema" },
  { id: "settings_manage", label: "Gestionar configuración", description: "Permite modificar la configuración" }
];

// Mock roles data - in a real app this would come from a service
const mockRoles = [
  { 
    id: "admin", 
    name: "Administrador", 
    description: "Acceso total al sistema",
    permissions: availablePermissions.map(p => p.id),
    createdAt: "2023-12-31"
  },
  { 
    id: "supervisor", 
    name: "Supervisor", 
    description: "Gestión de reportes",
    permissions: ["reports_view", "reports_manage", "users_view"],
    createdAt: "2023-12-15"
  },
  { 
    id: "mobile", 
    name: "Usuario Móvil", 
    description: "Uso de app móvil",
    permissions: ["reports_view"],
    createdAt: "2024-01-10"
  },
  { 
    id: "viewer", 
    name: "Visualizador", 
    description: "Solo lectura",
    permissions: ["reports_view", "users_view"],
    createdAt: "2024-02-05"
  }
];

const RoleDetail = () => {
  const { id } = useParams();
  const [role, setRole] = useState({
    id: "",
    name: "",
    description: "",
    permissions: [],
    createdAt: ""
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be a call to an API or service
      const foundRole = mockRoles.find(r => r.id === id);
      if (foundRole) {
        setRole(foundRole);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="container max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <p>Cargando...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!role.id) {
    return (
      <AppLayout>
        <div className="container max-w-7xl">
          <div className="mb-6">
            <Link 
              to="/admin" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Administración
            </Link>
          </div>
          <div className="flex items-center justify-center h-64">
            <p>Rol no encontrado</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container max-w-7xl">
        {/* Header with back button */}
        <div className="mb-6">
          <Link 
            to="/admin" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Administración
          </Link>
        </div>

        {/* Title section with edit button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">{role.name}</h1>
          </div>
          <Button variant="outline">
            Editar Rol
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main info section */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Rol</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Descripción</h3>
                  <p className="text-muted-foreground">{role.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Permisos asignados</h3>
                  <div className="grid gap-3">
                    {role.permissions && role.permissions.map(permId => {
                      const permission = availablePermissions.find(p => p.id === permId);
                      return (
                        <div key={permId} className="flex items-start space-x-2 p-3 rounded-lg border">
                          <div>
                            <p className="font-medium">{permission?.label || permId}</p>
                            <p className="text-sm text-muted-foreground">
                              {permission?.description || "Descripción no disponible"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Creado el {role.createdAt || "Fecha no disponible"}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Estado</h3>
                  <Badge variant="outline">Activo</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Usuarios con este rol</h3>
                  <span className="text-2xl font-bold">5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RoleDetail;
