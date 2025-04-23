import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Puedes ajustar nombres o descripciones según tu flujo de negocio.
const reportStates = [
  {
    id: "Open",
    nombre: "Open",
    descripcion: "Report is created and pending attention."
  },
  {
    id: "In Progress",
    nombre: "In Progress",
    descripcion: "Report is currently being worked on."
  },
  {
    id: "Resolved",
    nombre: "Resolved",
    descripcion: "The reported issue has been resolved."
  }
];

const ReportStatusTable: React.FC = () => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-lg">Estados de Reporte</h3>
      <button disabled className="px-4 py-2 bg-muted-foreground text-muted rounded opacity-60 cursor-not-allowed">Agregar Estado</button>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Estado</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reportStates.map(st => (
          <TableRow key={st.id}>
            <TableCell>
              <Badge variant="outline">{st.id}</Badge>
            </TableCell>
            <TableCell className="font-medium">{st.nombre}</TableCell>
            <TableCell>{st.descripcion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default ReportStatusTable;

