import Breadcrumb from "@/components/shop/Breadcrumb";
import ProductCard from "@/components/shop/ProductCard";
import { getProductByCategory } from "@/database/queries";

export default async function page(props) {
  const params = await props.params;

  const {
    category,
    lang
  } = params;

  const products = await getProductByCategory(category);
  return (
    <>
      <Breadcrumb pageName={category} />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <div className="col-span-4">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard langCode={lang} key={product?.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
