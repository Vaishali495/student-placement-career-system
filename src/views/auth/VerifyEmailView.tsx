import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { verifyEmailApi } from "../../services/authService";
import axios from "axios";

type StatusType = "loading" | "success" | "error";

const VerifyEmailView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<StatusType>("loading");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  // Ref to prevent React 18 StrictMode double-firing
  const hasFetched = useRef(false);

  useEffect(() => {
  if (!token || hasFetched.current) return;
  hasFetched.current = true;

  const handleVerifyEmail = async () => {
    try {
      const response = await verifyEmailApi(token);
      setStatus("success");
      setMessage(response?.message || "Email verified successfully!");
    } catch (error: unknown) {
      setStatus("error");

      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Invalid or expired verification link.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  handleVerifyEmail();
}, [token]);

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 text-center space-y-6">
          {/* Loading State */}
          {status === "loading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-[#2563eb]">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Verifying Email...</h2>
              <p className="text-xs text-slate-500">Please wait while we validate your token.</p>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">Email Verified!</h2>
                <p className="text-xs text-slate-600 mt-2">{message}</p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full py-3 px-4 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer">
                <span>Proceed to Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Error / Expired State */}
          {status === "error" && (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto text-red-600 border border-red-100 shadow-xs">
                <XCircle className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">Verification Failed</h2>
                <p className="text-xs text-slate-600 mt-2">{message}</p>
              </div>

              <div className="space-y-3">
                {/* <button
                  type="button"
                  onClick={() => navigate("/verify-email-notice")}
                  className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all">
                  Resend Verification Email
                </button> */}

                <Link to="/login" className="block text-xs text-blue-600 font-semibold hover:underline">
                  Proceed to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailView;
