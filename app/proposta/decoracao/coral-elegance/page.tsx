import type { Metadata } from "next";
import { ProposalTemplate } from "@/components/proposta/proposal-template";
import { PROPOSALS } from "@/lib/proposta/data";

export const metadata: Metadata = {
  title: "Decoração Coral Elegance",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function CoralElegancePage() {
  return <ProposalTemplate data={PROPOSALS["coral-elegance"]} />;
}
