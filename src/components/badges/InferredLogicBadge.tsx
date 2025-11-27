"use client";

import { Badge } from "~/components/ui/badge";

interface InferredLogicBadgeProps {
  className?: string;
}

export const InferredLogicBadge: React.FC<InferredLogicBadgeProps> = ({ className }) => {
  return (
    <Badge
      variant="outline"
      className={`border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100 ${className ?? ""}`}
      title="This query uses inferred logic from warehouse schema"
    >
      ⚠️ Inferred logic
    </Badge>
  );
};
