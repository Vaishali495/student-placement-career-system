import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../../components/Header";
import { Mail, CheckCircle2, RefreshCw, AlertCircle } from "lucide-react";
import { resendVerificationApi } from "../../services/authService";

const VerifyEmailNotice: React.FC = () => {
  const location = useLocation();

  // Retrieve email passed from registration state
  const registeredEmail = location.state?.email || "your email address";

  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleResend = async () => {
    if (!location.state?.email) {
      setResendStatus({
        type: "error",
        text: "Email address not found. Please try logging in or registering again.",
      });
      return;
    }

    setLoading(true);
    setResendStatus(null);

    try {
      await resendVerificationApi(location.state.email);
      setResendStatus({
        type: "success",
        text: "A fresh verification link has been sent to your email!",
      });
    } catch (err: any) {
      setResendStatus({
        type: "error",
        text: err.response?.data?.message || "Failed to resend verification email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 text-center space-y-6">
          {/* Animated Mail Icon Badge */}
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-[#2563eb] border border-blue-100 shadow-xs">
            <Mail className="w-8 h-8 animate-bounce" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Check Your Inbox</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              We have sent a verification email to:
              <span className="block font-semibold text-slate-900 mt-0.5">{registeredEmail}</span>
            </p>
          </div>

          {/* Alert Message for Spam Folder Check */}
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 text-left flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold block">Can't find the email?</span>
              Please check your <strong className="font-semibold underline">Spam / Junk folder</strong>. Sometimes institutional email filters route verification links there.
            </div>
          </div>

          {/* Dynamic Feedback Notification */}
          {resendStatus && (
            <div
              className={`p-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 ${
                resendStatus.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {resendStatus.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              <span>{resendStatus.text}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Resending Link..." : "Resend Verification Email"}</span>
            </button>

            {/* <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full py-3 px-4 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Login</span>
              <ArrowRight className="w-4 h-4" />
            </button> */}
          </div>

          <p className="text-[11px] text-slate-400">
            Entered wrong email?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailNotice;