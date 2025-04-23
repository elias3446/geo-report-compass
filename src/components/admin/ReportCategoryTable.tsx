
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Category } from '@/types/admin';

interface CategoryWithReports extends Omit<Category, 'active' | 'createdAt'> {
  status: 'active' | 'inactive';
  reports: number;
}

interface ReportCategoryTableProps {
  categories: CategoryWithReports[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

const ReportCategoryTable: React.FC<ReportCategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <ScrollArea className="h-[500px] border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[25%]">Nombre</TableHead>
              <TableHead className="w-[35%]">Descripción</TableHead>
              <TableHead className="w-[15%] text-center">Reportes</TableHead>
              <TableHead className="w-[15%] text-center">Estado</TableHead>
              <TableHead className="w-[10%] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="truncate">{category.description}</TableCell>
                <TableCell className="text-center">{category.reports}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={category.status === 'active' ? 'success' : 'secondary'}
                  >
                    {category.status === 'active' ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit({
                        ...category,
                        active: category.status === 'active',
                        createdAt: new Date()
                      })}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => onDelete(category.id)}
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
    </div>
  );
};

export default ReportCategoryTable;
