"use client";

import React from "react";

import { Card, CardContent } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

import { CheckCircle2, Zap } from "lucide-react";

interface StatsCardsProps {
  connectedCount: number;
  totalCount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ connectedCount, totalCount }) => {
  const progressPercentage = Math.round((connectedCount / totalCount) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-slate-200 bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Connected</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{connectedCount}</p>
            </div>
            <CheckCircle2 className="size-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Progress</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{progressPercentage}%</p>
            </div>
            <div className="size-8 flex items-center justify-center">
              <Progress value={progressPercentage} className="w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Available</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{totalCount}</p>
            </div>
            <Zap className="size-8 text-slate-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
