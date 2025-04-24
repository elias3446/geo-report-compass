
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag, CalendarDays, Edit, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/components/layout/AppLayout';

const CategoryDetail = () => {
  const { id } = useParams();
  // Mock data - replace with actual data fetching
  const category = {
    name: "Alumbrado Público",
    description: "Problemas relacionados con el alumbrado público",
    color: "#FFA000",
    status: "active",
    createdAt: "31/12/2023 19:00",
    reports: [
      { id: 1, title: "Farola dañada", status: "pending" }
    ],
    stats: {
      total: 1,
      pending: 1,
      resolved: 0
    }
  };

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

        {/* Title section with status badge */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <Tag className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <Badge 
              variant={category.status === 'active' ? 'outline' : 'secondary'}
              className="ml-2"
            >
              {category.status === 'active' ? 'Activa' : 'Inactiva'}
            </Badge>
          </div>
          <Button variant="outline" onClick={() => console.log('Edit category')}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Categoría
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main info section */}
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Categoría</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Información completa sobre esta categoría
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Descripción</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Color</h3>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {category.color}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Fecha de Creación</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span className="text-sm">{category.createdAt}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Reportes asociados</h3>
                  {category.reports.length > 0 ? (
                    category.reports.map(report => (
                      <div key={report.id} className="flex items-center justify-between py-2 border-b">
                        <span className="text-sm">{report.title}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{report.status}</Badge>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No hay reportes asociados a esta categoría.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actividad de la Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-6">
                  <div className="flex flex-col items-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      No hay actividad registrada para esta categoría.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de reportes:</span>
                  <span className="font-medium">{category.stats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Reportes pendientes:</span>
                  <span className="font-medium">{category.stats.pending}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Reportes resueltos:</span>
                  <span className="font-medium">{category.stats.resolved}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CategoryDetail;
