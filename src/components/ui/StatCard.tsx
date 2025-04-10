
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  change?: {
    value: string;
    positive: boolean;
  };
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  change,
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {change && (
          <div className="flex items-center mt-1">
            <span
              className={`text-xs ${
                change.positive ? "text-green-500" : "text-red-500"
              }`}
            >
              {change.positive ? "+" : "-"}
              {change.value}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              from last period
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
