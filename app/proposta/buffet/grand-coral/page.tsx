import type { Metadata } from "next";
import { ProposalTemplate } from "@/components/proposta/proposal-template";
import { PROPOSALS } from "@/lib/proposta/data";

export const metadata: Metadata = {
  title: "Menu Grand Coral",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function GrandCoralPage() {
  return <ProposalTemplate data={PROPOSALS["grand-coral"]} />;
}
