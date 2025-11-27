"use client";

import React from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import type { DataConnector } from "~mocks/connectors";

import { AlertCircle, CheckCircle2, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import Image from "next/image";

interface ConnectorCardProps {
  connector: DataConnector;
  isConnecting: boolean;
  isFailed: boolean;
  onConnect: (connector: DataConnector) => void;
  onDisconnect: (connectorId: string) => void;
}

const ConnectorCard: React.FC<ConnectorCardProps> = ({
  connector,
  isConnecting,
  isFailed,
  onConnect,
  onDisconnect,
}) => {
  const getCardClassName = (): string => {
    if (connector.isConnected) {
      return "relative transition-all hover:shadow-lg border-green-500 bg-green-50/30 shadow-sm";
    }
    if (isFailed) {
      return "relative transition-all hover:shadow-lg border-red-300 bg-red-50/30";
    }
    return "relative transition-all hover:shadow-lg border-slate-200 bg-white hover:border-slate-300";
  };

  return (
    <Card className={getCardClassName()}>
      {connector.isPremium === true && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-900 border-amber-200">
            Premium
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {/* Connector logo */}
          <div className="w-14 h-14 rounded-xl bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 overflow-hidden p-2.5 shadow-sm">
            <Image
              src={connector.icon}
              alt={`${connector.name} logo`}
              width={56}
              height={56}
              className="object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base text-slate-900">{connector.name}</CardTitle>
              {connector.isConnected && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CheckCircle2 className="size-5 text-green-600 shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connected and syncing</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <CardDescription className="text-xs line-clamp-2 mt-1">{connector.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        {isFailed && !isConnecting && (
          <div className="flex items-center gap-2 p-2 bg-red-100 border border-red-200 rounded-md">
            <AlertCircle className="size-4 text-red-600 shrink-0" />
            <p className="text-xs text-red-800">Connection failed. Please try again.</p>
          </div>
        )}

        {connector.isConnected ? (
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="w-full"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onConnect(connector);
                  }}
                >
                  <RefreshCw className="size-4" />
                  Refresh Connection
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh connection and sync data</p>
              </TooltipContent>
            </Tooltip>
            <Button
              className="w-full text-xs"
              variant="ghost"
              size="sm"
              onClick={() => {
                onDisconnect(connector.id);
              }}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            variant="default"
            size="sm"
            onClick={() => {
              onConnect(connector);
            }}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                Connect
                <ChevronRight className="size-4" />
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectorCard;
