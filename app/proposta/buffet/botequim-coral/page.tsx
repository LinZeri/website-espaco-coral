import type { Metadata } from "next";
import { ProposalTemplate } from "@/components/proposta/proposal-template";
import { PROPOSALS } from "@/lib/proposta/data";

export const metadata: Metadata = {
  title: "Menu Botequim Coral",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function BotequimCoralPage() {
  return <ProposalTemplate data={PROPOSALS["botequim-coral"]} />;
}
