import { getProducts } from "@/database/queries";
import ShopProducts from "../shop/ShopProducts";
import { getCurrency } from "@/utils/getCookieServer";

export default async function ProductQuery({
  search,
  manufacturerId,
  categoryId,
  subcategoryId,
  page = 1,
}) {
  const limit = 9; // Items per page

  // Fetch products with pagination and filters
  const result = await getProducts({
    search,
    manufacturerId,
    categoryId,
    subcategoryId,
    page: parseInt(page),
    limit,
  });

  const currency = await getCurrency();
  console.log("working..........", currency);

  return (
    <>
      <ShopProducts
        products={result.products}
        currency={currency}
        paginationData={{
          totalCount: result.totalCount,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
          hasNext: result.hasNext,
          hasPrev: result.hasPrev,
        }}
      />
    </>
  );
}
