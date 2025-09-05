import Banner2 from "@/components/clients/Banner2";
import ButtonImg from "@/components/clients/ButtonImg";
import FeaturedCategories from "@/components/clients/FeaturesCat";
import FilterC from "@/components/clients/FilterC";
import ImageBanners from "@/components/clients/ImageBanner";
import OurBrand from "@/components/clients/OurBrand";
import Banner from "@/components/home/Banner";


export default async function Home() {


  return (
    <div className="w-full max-w-[1440px] mx-auto bg-[#ffffff] px-4">
      <FilterC />
      <Banner />
      <ImageBanners />
      <ButtonImg />
      <FeaturedCategories />
      <Banner2 />
      <OurBrand />
    </div>
  );
}
