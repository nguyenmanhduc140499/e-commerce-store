import Image from "next/image";
import Link from "next/link";
import HeartProcess from "./HeartProcess";
import { formatCurrencyVND } from "../lib/common";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCart = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[350px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={500}
        height={500}
        className="w-96 h-96 rounded-lg shadow-x1 object-cover justify-center"
      />
      <div className="flex flex-col justify-between">
        <p className="text-base-bold">{product.title}</p>
        <div className="flex justify-between items-center pt-4">
          <p className="text-body-bold">{formatCurrencyVND(product.price)}</p>
          <HeartProcess
            product={product}
            updateSignedInUser={updateSignedInUser}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCart;
