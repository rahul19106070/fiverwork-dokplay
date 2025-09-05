import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Hdotrade- Home",
  description:
    "Appropriately integrate technically sound value with scalable infomediaries negotiate sustainable strategic theme areas",
  openGraph: {
    images: [
      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    ],
  },
};

export default async function RootLayout(props) {
  const { children } = props;

  return (
    <>
      <Navbar sideMenu={true} />
      {children}
      <Footer />
    </>
  );
}
