"use client";

import React from "react";

import type { DeliveryMethod, RecurrenceType } from "~mocks/digest-data";

import { Calendar, CheckCircle2, Clock, Mail, Monitor, XCircle } from "lucide-react";

interface PagePropertiesProps {
  recurrence: RecurrenceType;
  deliveryMethod: DeliveryMethod;
  isActive: boolean;
  lastExecutedAt?: Date;
  nextExecutionAt?: Date;
  blockCount: number;
}

const RecurrenceBadge: React.FC<{ recurrence: RecurrenceType }> = ({ recurrence }) => {
  const config = {
    daily: { label: "Daily", className: "bg-blue-50 text-blue-700 border-blue-200" },
    weekly: { label: "Weekly", className: "bg-green-50 text-green-700 border-green-200" },
    monthly: { label: "Monthly", className: "bg-purple-50 text-purple-700 border-purple-200" },
  };

  const { label, className } = config[recurrence];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${className}`}>
      <Calendar className="size-3" />
      {label}
    </span>
  );
};

const DeliveryBadge: React.FC<{ method: DeliveryMethod }> = ({ method }) => {
  const config = {
    email: { label: "Email", icon: <Mail className="size-3" /> },
    "in-app": { label: "In-app", icon: <Monitor className="size-3" /> },
    both: { label: "Email & In-app", icon: <Mail className="size-3" /> },
  };

  const { label, icon } = config[method];

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
      {icon}
      {label}
    </span>
  );
};

const StatusBadge: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        <CheckCircle2 className="size-3" />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
      <XCircle className="size-3" />
      Inactive
    </span>
  );
};

export const PageProperties: React.FC<PagePropertiesProps> = ({
  recurrence,
  deliveryMethod,
  isActive,
  lastExecutedAt,
  nextExecutionAt,
  blockCount,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 py-3 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <RecurrenceBadge recurrence={recurrence} />
      </div>
      <div className="flex items-center gap-2">
        <DeliveryBadge method={deliveryMethod} />
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge isActive={isActive} />
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <span>{blockCount} blocks</span>
      </div>
      {lastExecutedAt && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="size-3" />
          <span>Last: {lastExecutedAt.toLocaleDateString()}</span>
        </div>
      )}
      {nextExecutionAt && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="size-3" />
          <span>Next: {nextExecutionAt.toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
};
