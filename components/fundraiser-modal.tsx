"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

interface FundraiserModalProps {
  videoUrl: string;
  title?: string;
  description?: string;
  campaignId?: string; // Unique ID for each fundraiser campaign
  forceShow?: boolean;
  onClose?: () => void;
}

export default function FundraiserModal({
  videoUrl,
  title = "Support Our Fundraiser",
  description = "Help us continue inspiring the next generation",
  campaignId = "default",
  forceShow = false,
  onClose,
}: FundraiserModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
      return;
    }

    // Check if user has already seen THIS specific campaign
    const seenCampaignKey = `hasSeenFundraiser_${campaignId}`;
    // const hasSeenModal = sessionStorage.getItem(seenCampaignKey);
    const hasSeenModal = false; // For testing purposes, always show

    if (!hasSeenModal) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 50);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [forceShow, campaignId]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      if (!forceShow) {
        const seenCampaignKey = `hasSeenFundraiser_${campaignId}`;
        sessionStorage.setItem(seenCampaignKey, "true");
      }
      onClose?.();
    }, 300);
  };

  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent immediate navigation

    // Trigger big confetti burst
    const duration = 1500;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"],
      });
    }, 250);

    // Navigate after confetti starts (give it 500ms to be visible)
    setTimeout(() => {
      window.open((e.target as HTMLAnchorElement).href, "_blank");
      handleClose();
    }, 500);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
        <div
          className={`bg-white rounded-lg sm:rounded-xl shadow-xl max-w-3xl w-full max-h-[95vh] overflow-y-auto pointer-events-auto transform transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
            <button
              onClick={handleClose}
              className="absolute right-2 sm:right-4 top-3 sm:top-4 btn btn-ghost btn-sm btn-circle hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-8 sm:pr-10">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {description}
            </p>
          </div>

          {/* Video Content */}
          <div className="p-4 sm:p-6">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
              {videoUrl.includes("youtube.com") ||
              videoUrl.includes("youtu.be") ||
              videoUrl.includes("vimeo.com") ? (
                <iframe
                  className="w-full h-full"
                  src={`${videoUrl}${
                    videoUrl.includes("?") ? "&" : "?"
                  }autoplay=1&mute=1`}
                  title="Fundraiser Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  muted
                  playsInline
                  src={videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href="https://app.verticalraise.com/donationV3/?fundraiser_id=572711&media=email&uid=2181447&semail=rfajotina@gmail.com"
                className="btn btn-primary flex-1"
                onClick={handleDonateClick}
              >
                Donate Now
              </Link>
              <button onClick={handleClose} className="btn btn-ghost flex-1">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
