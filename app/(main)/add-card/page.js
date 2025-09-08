import { cookies } from "next/headers";
import CardList from "@/components/addcard/CardList";
import { getCartWithProducts } from "@/database/queries";

export default async function CartPage() {
  const cookieStore = await cookies();
  const trackingId = cookieStore.get("trackingId")?.value;

  let products = [];

  if (trackingId) {
    try {
      products = await getCartWithProducts(trackingId);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  return (
    <div>
      <CardList products={products} trackingId={trackingId} />
    </div>
  );
}
