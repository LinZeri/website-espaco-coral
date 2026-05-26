import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Espa%C3%A7o%20Coral.";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white shadow-lg hover:bg-[#20ba5a] transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
    >
      <MessageCircle size={20} />
      <span className="text-sm font-medium hidden sm:block">WhatsApp</span>
    </a>
  );
}
