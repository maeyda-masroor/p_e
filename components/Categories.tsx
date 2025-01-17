"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function fetchCategories() {
  const query = `*[_type == "category"]{
    _id,
    name,
    image,
    createdAt
  }`;
  const data = await client.fetch(query);
  return data;
}

function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 lg:pl-36 lg:pr-36 p-4 overflow-x-hidden mx-auto">
      {categories.map((category) => (
        <div
          className="bg-white text-black gap-2 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
          key={category._id}
        >
          <div className="p-4">
            <h1 className="text-2xl font-extrabold">
              <Link href={`/category/${category._id}`}>{category.name}</Link>
            </h1>
            <br />
            <br />
            <br />
            <button className="bg-black text-white p-4 rounded-full w-32 h-12">
              Explore
            </button>
          </div>
          <div>
            {category.image ? (
              <Image
                src={urlFor(category.image).url()}
                alt={category.title || "Category Image"}
                width={200}
                height={200}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;

