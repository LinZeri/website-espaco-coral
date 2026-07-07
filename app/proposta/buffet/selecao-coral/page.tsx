import type { Metadata } from "next";
import { ProposalTemplate } from "@/components/proposta/proposal-template";
import { PROPOSALS } from "@/lib/proposta/data";

export const metadata: Metadata = {
  title: "Menu Seleção Coral",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function SelecaoCoralPage() {
  return <ProposalTemplate data={PROPOSALS["selecao-coral"]} />;
}
