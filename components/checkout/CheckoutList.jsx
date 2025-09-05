import { getProductById } from "@/database/queries";
import { useEffect, useState } from "react";

export default function CheckoutList({ item }) {
  const [product, setProduct] = useState();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getProductById(item?.itemId);
      setProduct(response);
      // ...
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h5 className="text-gray-800 font-medium">{product?.name}</h5>
          {/* <p className="text-sm text-gray-600">Size: M</p> */}
        </div>
        <p className="text-gray-600">{item.itemQuantity}X</p>
        <p className="text-gray-800 font-medium">${product?.discount_price}</p>
      </div>
    </>
  );
}
