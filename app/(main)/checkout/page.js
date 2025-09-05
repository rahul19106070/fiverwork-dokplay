import CheckoutPage from "@/components/checkout/ControllCheckout";
import { checkOrderExists, getCartByTrackingId } from "@/database/queries";
import { getCurrency } from "@/utils/getCookieServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Checkout() {
  const cookieStore = await cookies();
  const trackingId = cookieStore.get("trackingId")?.value;
  const currency = await getCurrency();

  // If no tracking ID, redirect to cart
  if (!trackingId) {
    redirect("/cart");
  }

  // Check if order already exists
  const isOrderExist = await checkOrderExists(trackingId);

  // If order exists, redirect to payment
  if (isOrderExist) {
    redirect("/checkout/payment");
  }

  // Fetch cart products
  let products = [];
  try {
    products = await getCartByTrackingId(trackingId);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    // Optionally redirect to cart if error occurs
    redirect("/cart");
  }

  // Calculate subtotal
  const subtotal = products
    .reduce((total, p) => {
      const price = currency === "euro" ? p.price?.eur || 0 : p.price?.usd || 0;
      return total + price * (p.cartQuantity ?? p.quantity ?? 0);
    }, 0)
    .toFixed(2);

  return (
    <CheckoutPage
      products={products}
      subtotal={parseFloat(subtotal)} // Convert string to number
      trackingId={trackingId}
      currency={currency}
    />
  );
}
