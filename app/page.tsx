import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { AboutPreview } from "@/components/AboutPreview";
import { GallerySection } from "@/components/GallerySection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FAQPreviewSection } from "@/components/FAQPreviewSection";
import { CTASection } from "@/components/CTASection";
import { ContactQuoteSection } from "@/components/ContactQuoteSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <HowItWorks />
      <AboutPreview />
      <GallerySection />
      <WhyChooseUs />
      <FAQPreviewSection />
      <CTASection />
      <ContactQuoteSection />
    </>
  );
}
