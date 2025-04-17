
import React from 'react';
import { format } from 'date-fns';
import { Report } from '../../types/admin';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EyeIcon, MessageSquareIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { registerAdminActivity } from '@/services/activityService';

interface ReportsTableProps {
  reports: Report[];
  categories: { id: string; name: string }[];
  users: { id: string; name: string }[];
  onViewReport: (reportId: string) => void;
  onUpdateStatus: (reportId: string, status: Report['status']) => void;
  onAssignReport: (reportId: string, userId: string) => void;
  currentUser?: { id: string; name: string }; // Usuario actual para el registro de actividad
}

const statusColors = {
  'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'resolved': 'bg-green-100 text-green-800 border-green-200',
  'rejected': 'bg-red-100 text-red-800 border-red-200'
};

const priorityColors = {
  'low': 'bg-gray-100 text-gray-800 border-gray-200',
  'medium': 'bg-blue-100 text-blue-800 border-blue-200',
  'high': 'bg-red-100 text-red-800 border-red-200'
};

const statusLabels = {
  'pending': 'Pendiente',
  'in-progress': 'En Progreso',
  'resolved': 'Resuelto',
  'rejected': 'Rechazado'
};

const priorityLabels = {
  'low': 'Baja',
  'medium': 'Media',
  'high': 'Alta'
};

const ReportsTable: React.FC<ReportsTableProps> = ({ 
  reports, 
  categories,
  users,
  onViewReport,
  onUpdateStatus,
  onAssignReport,
  currentUser = { id: 'admin', name: 'Administrador' } // Valor por defecto
}) => {
  const handleUpdateStatus = (report: Report, newStatus: Report['status']) => {
    // Registrar la actividad antes de cambiar el estado
    registerAdminActivity({
      type: 'report_status_changed',
      title: 'Estado de reporte cambiado',
      description: `Se ha cambiado el estado del reporte "${report.title}" a ${statusLabels[newStatus]}`,
      userId: currentUser.id,
      userName: currentUser.name,
      relatedItemId: report.id,
      relatedReportId: report.id // Para compatibilidad con ActivityList
    });
    
    // Llamar a la función original
    onUpdateStatus(report.id, newStatus);
  };

  const handleAssignReport = (report: Report, userId: string) => {
    // Obtenemos el nombre del usuario asignado
    const assignedUser = users.find(u => u.id === userId);
    const userName = assignedUser ? assignedUser.name : 'No asignado';
    
    // Registrar la actividad
    registerAdminActivity({
      type: 'report_assigned',
      title: 'Reporte asignado',
      description: `Se ha asignado el reporte "${report.title}" a ${userName}`,
      userId: currentUser.id,
      userName: currentUser.name,
      relatedItemId: report.id,
      relatedReportId: report.id // Para compatibilidad con ActivityList
    });
    
    // Llamar a la función original
    onAssignReport(report.id, userId);
  };

  const handleViewReport = (reportId: string) => {
    // No registramos actividad para simplemente ver un reporte
    onViewReport(reportId);
  };

  if (!reports.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No se encontraron reportes.
      </div>
    );
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Desconocida';
  };

  const getUserName = (userId?: string) => {
    if (!userId) return 'No asignado';
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Usuario desconocido';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-mono text-xs">
                {report.id.substring(0, 8)}
              </TableCell>
              <TableCell className="font-medium">
                {report.title}
                {report.comments && report.comments.length > 0 && (
                  <Badge variant="outline" className="ml-2">
                    <MessageSquareIcon className="h-3 w-3 mr-1" />
                    {report.comments.length}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{getCategoryName(report.categoryId)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={priorityColors[report.priority]}>
                  {priorityLabels[report.priority]}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={report.status}
                  onValueChange={(value) => handleUpdateStatus(report, value as Report['status'])}
                >
                  <SelectTrigger className={`w-[140px] ${statusColors[report.status]}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={report.assignedTo || "unassigned"}
                  onValueChange={(value) => handleAssignReport(report, value === "unassigned" ? "" : value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Asignar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">No asignado</SelectItem>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{format(new Date(report.createdAt), 'dd/MM/yyyy')}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleViewReport(report.id)}
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportsTable;
