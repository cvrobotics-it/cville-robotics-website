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

      {/* 50/50 Raffle Modal */}
      <FundraiserModal campaignId="5050-raffle-2026">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2026 50/50 Raffle
          </h2>

          <a
            href="https://www.zeffy.com/en-US/ticketing/centreville-robotics-booster-club-incs-5050-raffle--2026"
            className="btn btn-secondary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy 50/50 Raffle Tickets
          </a>
        </div>
      </FundraiserModal>
    </div>
  );
}
