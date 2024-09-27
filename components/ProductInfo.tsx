"use client";

import { useState } from "react";
import HeartProcess from "./HeartProcess";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hook/useCart";
import { formatCurrencyVND } from "../lib/common";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const cart = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [selectColor, setSelectColor] = useState<string>(productInfo.colors[0]);
  const [selectSize, setSelectSize] = useState<string>(productInfo.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-heading3-bold border border-transparent pr-5">
          {productInfo.title}
        </p>
        <HeartProcess product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold">
        {formatCurrencyVND(productInfo.price)}
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Description:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex-flex-col gap-2">
          <p className="text-base-medium text-grey-2">Colors:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border-2 border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}
      {productInfo.sizes.length > 0 && (
        <div className="flex-flex-col gap-2">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border-2 border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectSize === size && "bg-black text-white"
                }`}
                onClick={() => {
                  setSelectSize(size);
                }}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-gray-2">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          />
        </div>
        <button
          className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
          onClick={() => {
            if (!user) {
              router.push("/sign-in");
            } else {
              cart.addItem({
                item: productInfo,
                quantity,
                color: selectColor,
                size: selectSize,
              });
            }
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
