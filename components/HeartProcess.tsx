"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HeartProcessProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartProcess = ({ product, updateSignedInUser }: HeartProcessProps) => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const customer: any = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };
  const getBaseUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(customer),
      });
      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log("GET_user", error);
    }
  };

  //only trigger if user login
  useEffect(() => {
    if (user) {
      getBaseUser();
    }
  }, [user]);

  const handleLike = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!user) {
      router.push("/sign-in");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId: product._id }),
      });
      const updateUser = await res.json();
      setSignedInUser(updateUser);
      setIsLiked(updateUser.wishlist.includes(product._id));
      updateSignedInUser && updateSignedInUser(updateUser);
    } catch (error) {
      console.log("POST_like_user", error);
    }
  };
  return (
    <button onClick={handleLike}>
      <Heart
        color={isHovered ? "red" : "black"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        fill={`${isLiked ? "red" : "white"}`}
      />
    </button>
  );
};

export default HeartProcess;
