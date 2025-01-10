import { client } from '@/sanity/lib/client';
import Image from 'next/image';

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  tags: string[];
  rating?: number; // Optional rating
  ratingCount?: number; // Optional rating count
  createdAt: string;
}

const ProductsPage = async () => {
  // Fetch products using the query
  const productsQuery = `*[_type == "product" ]{
    _id,
    name,
    price,
    description,
    "imageUrl": image.asset->url,
    tags,
    rating,
    ratingCount,
    createdAt
  }`;

  const products: Product[] = await client.fetch(productsQuery);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-extrabold text-center mb-6">Our Products</h1>
      {/* Grid Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            {/* Product Image */}
<div className="relative w-full h-64 sm:h-80 md:h-[250px]  flex items-center justify-center">
  <Image
    src={product.imageUrl}
    alt={product.name}
    fill
    className="rounded-md object-cover"
  />
</div>
            {/* Product Name */}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            {/* Product Description */}
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
            {/* Product Price */}
            <div className="mt-2">
              <span className="text-lg font-bold text-green-500">
                ${product.price.toFixed(2)}
              </span>
            </div>
            {/* rating */}
            <div className="mt-2">
    
      <p className="text-sm font-medium text-gray-700">
        Rating: <span className="text-green-500">{product.rating} / 5</span>
      </p>
    
    
      <p className="text-xs text-gray-500">Based on {product.ratingCount} reviews</p>
    
  </div>
            {/* Added On */}
            <div className="text-xs text-gray-400 mt-2">
              Added on: {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;