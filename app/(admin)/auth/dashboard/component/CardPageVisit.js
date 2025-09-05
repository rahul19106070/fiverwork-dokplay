// components

import { getTopSellingProducts } from "@/database/queries";

export default async function CardPageVisits() {
  const topSellingProducts = await getTopSellingProducts();

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
    </>
  );
}
