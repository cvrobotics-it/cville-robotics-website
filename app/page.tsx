import HeroSection from "@/components/hero";
import InfoCards from "@/components/info-cards";
import StemAppreciation from "@/components/stem-appreciation";
import FundraiserModal from "@/components/fundraiser-modal";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <InfoCards />
      <StemAppreciation />

      {/* Fundraiser Video Modal */}
      <FundraiserModal campaignId="raffle-2025-2026">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Centreville Robotics Raffle 2025-2026!
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Enter our annual raffle and help support our robotics programs while
            having a chance to win amazing prizes!
          </p>

          <a
            href="https://www.zeffy.com/en-US/ticketing/centreville-robotics-annual-raffle--2026"
            className="btn btn-secondary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Raffle Tickets
          </a>
        </div>
      </FundraiserModal>
    </div>
  );
}
