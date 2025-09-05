import CountrySelector from "@/components/clients/CountryModal";
import ProductPage from "@/components/clients/ProductCartC";
import RelatedProduct from "@/components/detailProduct/RelatedProduct";
import { getProductById } from "@/database/queries";
import { getCurrency } from "@/utils/getCookieServer";

export async function generateMetadata(props) {
  const params = await props.params;

  const { id } = params;

  const product = await getProductById(id);

  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      images: [
        {
          url: product?.image,
          alt: "Detail About The Food",
        },
      ],
    },
  };
}

export default async function page(props) {
  const params = await props.params;

  const { id } = params;

  const product = await getProductById(id);
  const currency = await getCurrency();

  return (
    <>
      <CountrySelector />
      <div>
        <ProductPage product={product} currency={currency} />
        <RelatedProduct category={product?.categoryId} />
      </div>
    </>
  );
}
