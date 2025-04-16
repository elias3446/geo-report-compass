
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import NewReport from "./pages/NewReport";
import ReportDetail from "./pages/ReportDetail";
import EditReport from "./pages/EditReport";
import MapPage from "./pages/MapView";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { ReportProvider } from "./contexts/ReportContext";
import { TimeFilterProvider } from "./context/TimeFilterContext";
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ReportProvider>
              <TimeFilterProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/reports/:id" element={<ReportDetail />} />
                  <Route path="/reports/:id/edit" element={<EditReport />} />
                  <Route path="/new-report" element={<NewReport />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TimeFilterProvider>
            </ReportProvider>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
