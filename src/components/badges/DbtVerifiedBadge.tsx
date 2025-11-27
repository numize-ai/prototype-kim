"use client";

import { Badge } from "~/components/ui/badge";

interface DbtVerifiedBadgeProps {
  className?: string;
}

export const DbtVerifiedBadge: React.FC<DbtVerifiedBadgeProps> = ({ className }) => {
  return (
    <Badge
      variant="default"
      className={`bg-blue-500 text-white hover:bg-blue-600 ${className ?? ""}`}
      title="This query uses dbt semantic models for verified accuracy"
    >
      🔵 dbt verified
    </Badge>
  );
};
