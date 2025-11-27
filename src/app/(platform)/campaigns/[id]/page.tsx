import React from "react";

import { Card, CardContent } from "~/components/ui/card";

import { getCampaignDetails } from "../helpers";

import { CampaignDetailsClient } from "./CampaignDetailsClient";

import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface CampaignDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * CampaignDetailsPage - Comprehensive drill-down view for individual campaign
 *
 * Dynamic route: /campaigns/[id]
 */
const CampaignDetailsPage = async ({ params }: CampaignDetailsPageProps): Promise<React.ReactElement> => {
  const { id } = await params;

  // Get campaign details
  const campaignData = getCampaignDetails(id);

  if (campaignData === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="size-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Campaign Not Found</h2>
            <p className="text-sm text-slate-600 mb-4">
              The campaign you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Return to Dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <CampaignDetailsClient campaignData={campaignData} />;
};

export default CampaignDetailsPage;
