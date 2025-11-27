/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable id-length */
/* eslint-disable complexity */
"use client";

import React from "react";

import type { ChartData } from "~mocks/chat-data";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChatChartProps {
  data: ChartData;
}

export const ChatChart: React.FC<ChatChartProps> = ({ data }) => {
  const colors = data.colors ?? ["#0f172a", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

  const renderChart = () => {
    switch (data.type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={data.xKey ?? "x"} stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              {data.legend !== undefined && data.legend && <Legend />}
              <Line
                type="monotone"
                dataKey={data.yKey ?? "y"}
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ fill: colors[0]!, r: 4 }}
                activeDot={{ r: 6 }}
              />
              {/* Optional second line for target */}
              {data.data[0] && "target" in data.data[0] && (
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={data.xKey ?? "x"} stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              {data.legend && <Legend />}
              {data.yKeys && data.yKeys.length > 0 ? (
                data.yKeys.map((key, index) => (
                  <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
                ))
              ) : (
                <Bar dataKey={data.yKey ?? "y"} fill={colors[0]} radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(props: any) => {
                  const percent = props.percent ?? 0;
                  const name = props.name || "";
                  return `${name}: ${(percent * 100).toFixed(0)}%`;
                }}
                labelLine={false}
              >
                {data.data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={data.xKey ?? "x"} stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              {data.legend && <Legend />}
              <Area type="monotone" dataKey={data.yKey ?? "y"} stroke={colors[0]} fill={colors[0]} fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "funnel":
        // Custom funnel visualization using bars
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis type="category" dataKey="stage" stroke="#64748b" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill={colors[0]} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">{renderChart()}</CardContent>
    </Card>
  );
};
