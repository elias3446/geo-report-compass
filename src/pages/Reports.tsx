
import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ReportList from "@/components/reports/ReportList";
import { TimeFilterProvider } from "@/context/TimeFilterContext";

const Reports = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight break-words">Reports Management</h1>
          <p className="text-muted-foreground">
            View and manage all submitted reports
          </p>
        </div>
      </div>
      <TimeFilterProvider>
        <div className="w-full overflow-x-auto">
          <ReportList key={key} />
        </div>
      </TimeFilterProvider>
    </AppLayout>
  );
};

export default Reports;
