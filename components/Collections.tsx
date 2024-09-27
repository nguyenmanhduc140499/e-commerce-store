"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Collections = () => {
  // const collections = await getCollections();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleImages = 6; // Limit the number of images shown at a time

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}/api/collections`,
        { cache: "no-cache" }
      );
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong!. Please try again.");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < collections.length - visibleImages) {
      setStartIndex(startIndex + 1);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="p-2 disabled:opacity-50"
          >
            <CircleChevronLeft size={45} />
          </button>

          {collections
            .slice(startIndex, startIndex + visibleImages)
            .map((collection: CollectionType) => (
              <Link
                href={`/collections/${collection._id}`}
                key={collection._id}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={350}
                  height={200}
                  className="rounded-lg cursor-pointer"
                />
              </Link>
            ))}

          <button
            onClick={handleNext}
            disabled={startIndex >= collections.length - visibleImages}
            className="p-2 disabled:opacity-50"
          >
            <CircleChevronRight size={45} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Collections;
export const dynamic = "force-dynamic";
