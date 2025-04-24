import { Category, Report, User, SystemSetting } from '../types/admin';

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    avatar: "https://api.dicebear.com/7.x/ лица/svg?seed=Admin"
  },
  {
    id: "2",
    name: "Supervisor User",
    email: "supervisor@example.com",
    role: "supervisor",
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    avatar: "https://api.dicebear.com/7.x/ лица/svg?seed=Supervisor"
  },
  {
    id: "3",
    name: "Mobile User",
    email: "mobile@example.com",
    role: "mobile",
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    mobileUserType: "citizen",
    avatar: "https://api.dicebear.com/7.x/ лица/svg?seed=Mobile"
  },
  {
    id: "4",
    name: "Viewer User",
    email: "viewer@example.com",
    role: "viewer",
    active: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    avatar: "https://api.dicebear.com/7.x/ лица/svg?seed=Viewer"
  }
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Infraestructura",
    description: "Reportes relacionados con infraestructura urbana",
    color: "#3b82f6",
    icon: "building",
    active: true,
    createdAt: new Date()
  },
  {
    id: "2",
    name: "Medio Ambiente",
    description: "Reportes de problemas ambientales",
    color: "#10b981",
    icon: "tree",
    active: true,
    createdAt: new Date()
  },
  {
    id: "3",
    name: "Seguridad",
    description: "Reportes relacionados con seguridad ciudadana",
    color: "#ef4444",
    icon: "shield",
    active: true,
    createdAt: new Date()
  }
];

export const mockReports: Report[] = [
  {
    id: "1",
    title: "Bache en la calle principal",
    description: "Hay un bache grande en la intersección",
    status: "Open",
    category: "Infraestructura",
    location: {
      name: "Calle Principal #123",
      lat: -33.4489,
      lng: -70.6693
    },
    date: new Date("2024-01-15"),
    tags: ["urgent", "road"]
  },
  {
    id: "2",
    title: "Luminaria dañada",
    description: "Falla en el alumbrado público",
    status: "In Progress",
    category: "Alumbrado",
    location: {
      name: "Av. Libertador #456",
      lat: -33.4400,
      lng: -70.6500
    },
    date: new Date("2024-01-16"),
    tags: ["lights", "safety"]
  },
  {
    id: "3",
    title: "Acumulación de basura",
    description: "Basura sin recoger por varios días",
    status: "Resolved",
    category: "Limpieza",
    location: {
      name: "Plaza Central",
      lat: -33.4450,
      lng: -70.6600
    },
    date: new Date("2024-01-17"),
    tags: ["cleaning", "health"]
  }
];

export const mockSettings: SystemSetting[] = [
  {
    id: "1",
    key: "app_name",
    value: "GeoReport Manager",
    description: "Nombre de la aplicación",
    group: "general"
  },
  {
    id: "2",
    key: "theme",
    value: "light",
    description: "Tema de la aplicación",
    group: "general"
  },
  {
    id: "3",
    key: "api_url",
    value: "https://api.example.com",
    description: "URL de la API",
    group: "api"
  }
];
