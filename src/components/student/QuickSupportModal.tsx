import { useState } from "react";
import { ChevronRight, HelpCircle, Mail, MapPin, Phone, X } from "lucide-react";
import { LOGIN_FAQS } from "../../utils/constants";

interface QuickSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickSupportModal = ({ isOpen, onClose }: QuickSupportModalProps) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="bg-[#f8f9ff] px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 rounded-lg text-[#2563eb]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Portal Access & Support</h2>
              <p className="text-xs text-slate-500">Self-help guide & TPO Helpdesk contact</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Common Login Troubleshooting
            </p>

            <div className="space-y-2">
              {LOGIN_FAQS.map((faq, index) => {
                const IconComponent = faq.icon;
                const isOpenItem = activeFaq === index;

                return (
                  <div key={faq.question} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className="w-4 h-4 text-[#2563eb] shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{faq.question}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isOpenItem ? "rotate-90 text-[#2563eb]" : ""
                        }`}
                      />
                    </button>

                    {isOpenItem && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Issue Still Unresolved? Contact TPO Cell
            </p>

            <div className="bg-[#eff4ff] border border-blue-100 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                <Mail className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span>tpo-support@campus.edu</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                <Phone className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span>+91 (0171) 289-4500 (Ext. 104)</span>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                <span>Training & Placement Cell, Block B, Room 204</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#2563eb] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Close Helpdesk
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSupportModal;