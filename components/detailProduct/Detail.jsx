import React from "react";
import DetailGallery from "./DetailGallery";
import SocailShare from "./SocailShare";
import QuantityAdjuster from "./QuantityAdjuster";
import Addwish from "../shop/Addwish";
import Rating from "../shop/Rating";
import AddCard from "../shop/AddCard";

export default function Detail({ product, userId, lan }) {
  return (
    <>
      <div className="container grid grid-cols-2 gap-6">
        <DetailGallery images={product?.image} />
        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {product?.name}
          </h2>
          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              <Rating rating={product?.ratings} />
            </div>
            <div className="text-xs text-gray-500 ml-3">
              ({product?.reviewsNumber} Reviews)
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>{lan?.availabile}: </span>

              <span
                className={
                  product?.quantity > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product?.quantity > 0
                  ? `In Stock (${product?.quantity})`
                  : "Out Of Stock"}
              </span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">
                {lan?.brand}:{" "}
              </span>
              <span className="text-gray-600">{product?.brand}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">
                {lan?.category}:{" "}
              </span>
              <span className="text-gray-600">{product?.category}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">{lan?.SKU}: </span>
              <span className="text-gray-600">{product?.sku}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">{lan?.size}: </span>
              {product?.sizes.map((size, index) => (
                <span key={index} className="text-primary font-bold">
                  {size},
                </span>
              ))}
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              ${product?.discount_price}
            </p>
            <p className="text-base text-gray-400 line-through">
              ${product?.price}
            </p>
          </div>

          <p className="mt-4 text-gray-600">{product?.description}</p>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">
              {lan?.quantity}
            </h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <QuantityAdjuster />
            </div>
          </div>

          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <AddCard
              lan={lan?.addcart}
              userId={userId}
              quantity={product?.quantity}
              productId={product?.id}
              detail={true}
            />
            <Addwish
              lan={lan?.wish}
              userId={userId}
              productId={product?.id}
              fromDetail={true}
            />
          </div>

          <SocailShare />
        </div>
      </div>
    </>
  );
}
