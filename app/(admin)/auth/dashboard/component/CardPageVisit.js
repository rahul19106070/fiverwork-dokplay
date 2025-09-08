// components

import { getTopSellingProducts, getToRefillProducts } from "@/database/queries";
import Link from "next/link";

export default async function CardPageVisits() {
  const topSellingProducts = await getTopSellingProducts();
  const refillProducts = await getToRefillProducts();

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="text-[20px] text-blueGray-700">
                Most Sold Products
              </h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="min-w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
                  Products Name
                </th>
                <th className="px-6 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
                  Sold
                </th>
                <th className="px-6 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
                  Quantity
                </th>
                <th className="px-6 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
                  $ Price
                </th>
                <th className="px-6 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
                  € Price
                </th>
              </tr>
            </thead>
            <tbody>
              {topSellingProducts.map((product) => (
                <tr key={product?.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-[15px] font-thin whitespace-nowrap p-4 text-left">
                    {product?.name}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {product?.totalSold}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {product?.currentStock}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    ${product?.priceUSD}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    €{product?.priceEUR}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="text-[20px] text-blueGray-700">
                Quantity To Order
              </h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="min-w-full bg-transparent border-collapse">
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '45%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="px-3 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left min-w-[120px] max-w-[200px]">
                  Manufacturer Name
                </th>
                <th className="px-3 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left min-w-[140px] max-w-[220px]">
                  Product Name
                </th>
                <th className="px-2 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left min-w-[80px] max-w-[120px]">
                  Stock
                </th>
                <th className="px-2 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left min-w-[80px] max-w-[120px]">
                  Min Stock
                </th>
                <th className="px-2 text-[#0eadef] font-thin bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-[15px] uppercase border-l-0 border-r-0 whitespace-nowrap text-left min-w-[100px] max-w-[140px]">
                  Quantity To Order
                </th>
              </tr>
            </thead>
            <tbody>
              {refillProducts.map((product) => (
                <tr key={product?.id}>
                  <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-[15px] font-thin whitespace-nowrap p-2 text-left min-w-[120px] max-w-[200px]">
                    {product?.manufacturerName || product?.manufacturerId || '-'}
                  </th>
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 min-w-[140px] max-w-[220px]">
                    {product?.name}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 min-w-[80px] max-w-[120px]">
                    {product?.quantity}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 min-w-[80px] max-w-[120px]">
                    {product?.minStock}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 min-w-[100px] max-w-[140px]">
                    <div className="flex flex-col items-center gap-1">
                      <Link
                        style={{ color: "blue", textDecoration: "underline" }}
                        href={`/auth/dashboard/products/${product?.id}`}
                      >
                        LINK
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
