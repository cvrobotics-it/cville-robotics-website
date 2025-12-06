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
      <FundraiserModal
        videoUrl="/videos/VR-Fundraiser.mp4"
        title="Support Our Vertical Raise Fundraiser! 🚀"
        description="Help us reach our goals and continue inspiring the next generation"
        campaignId="vertical-raise-2024-2025"
      />
    </div>
  );
}
