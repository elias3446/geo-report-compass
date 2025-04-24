
import { Category, Report } from '../types/admin';
import { mockCategories, mockReports } from './mockData';

// En un escenario real, esto se reemplazaría con llamadas a una API o base de datos
export const getCategoryById = (id: string | undefined) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error('ID de categoría no proporcionado'));
      return;
    }
    
    // Buscar en los datos simulados de mockData
    let category = mockCategories.find(cat => cat.id === id);
    
    // Si no se encuentra, intentar buscar en los datos propios
    if (!category) {
      category = localCategories.find(cat => cat.id === id);
    }
    
    if (category) {
      setTimeout(() => resolve(category), 500);  // Simular latencia de red
    } else {
      reject(new Error('Categoría no encontrada'));
    }
  });
};

export const getReportsByCategory = (categoryId: string | undefined) => {
  return new Promise((resolve) => {
    if (!categoryId) {
      resolve([]);
      return;
    }
    
    // Primero intentamos encontrar la categoría
    const category = mockCategories.find(cat => cat.id === categoryId) || 
                     localCategories.find(cat => cat.id === categoryId);
    
    if (!category) {
      resolve([]);
      return;
    }
    
    // Filtrar reportes por la categoría encontrada
    const categoryReports = mockReports.filter(report => 
      report.category === category.name || report.category === categoryId
    );
    
    setTimeout(() => resolve(categoryReports), 500);  // Simular latencia de red
  });
};

// Datos locales adicionales para asegurar que tengamos categorías disponibles
const localCategories: Category[] = [
  {
    id: '1',
    name: 'Infraestructura',
    description: 'Reportes relacionados con infraestructura urbana',
    color: '#3b82f6',
    icon: 'building',
    active: true,
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Medio Ambiente',
    description: 'Reportes de problemas ambientales',
    color: '#10b981',
    icon: 'tree',
    active: true,
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Seguridad',
    description: 'Reportes relacionados con seguridad ciudadana',
    color: '#ef4444',
    icon: 'shield',
    active: true,
    createdAt: new Date()
  }
];

// Función para obtener todas las categorías (tanto de mockData como locales)
export const getAllCategories = () => {
  // Combinar categorías y eliminar duplicados por id
  const allCategories = [...mockCategories, ...localCategories];
  const uniqueCategories = allCategories.filter(
    (category, index, self) => index === self.findIndex(c => c.id === category.id)
  );
  
  return uniqueCategories;
};

// Función para agregar reportes a mockReports
export const addMockReports = (reports: Report[]) => {
  reports.forEach(report => {
    if (!mockReports.find(r => r.id === report.id)) {
      mockReports.push(report);
    }
  });
};
