"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface FundraiserModalProps {
  campaignId?: string; // Unique ID for each fundraiser campaign
  forceShow?: boolean;
  onClose?: () => void;
  children: React.ReactNode | ((closeModal: () => void) => React.ReactNode); // Required custom content
  debug?: boolean; // Show modal every time for testing
}

export default function FundraiserModal({
  campaignId = "default",
  forceShow = false,
  onClose,
  children,
  debug = false,
}: FundraiserModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (forceShow || debug) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
      return;
    }

    // Check if user has seen THIS specific campaign in the last 24 hours
    const seenCampaignKey = `hasSeenFundraiser_${campaignId}`;
    const lastSeenTimestamp = localStorage.getItem(seenCampaignKey);

    let shouldShowModal = true;

    if (lastSeenTimestamp) {
      const lastSeen = new Date(parseInt(lastSeenTimestamp));
      const now = new Date();
      const hoursDiff = (now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60);

      // Don't show if less than 24 hours have passed
      if (hoursDiff < 24) {
        shouldShowModal = false;
      }
    }

    if (shouldShowModal) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 50);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [forceShow, campaignId, debug]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      if (!forceShow && !debug) {
        const seenCampaignKey = `hasSeenFundraiser_${campaignId}`;
        // Store current timestamp instead of just "true"
        localStorage.setItem(seenCampaignKey, Date.now().toString());
      }
      onClose?.();
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all duration-300 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 min-h-[60px] flex items-center justify-end">
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/80 transition-colors duration-200 group z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
            {typeof children === "function" ? children(handleClose) : children}
          </div>

          {/* Always present footer with Maybe Later button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
