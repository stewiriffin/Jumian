'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Store, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock: number;
  seller: string;
  specifications?: { [key: string]: string };
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Product not found');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      seller: product.seller,
      inStock: product.inStock,
    }, quantity);

    toast.success(`${quantity} item(s) added to cart!`);
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      inStock: product.inStock,
    });

    toast.success('Added to wishlist!');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jumia-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const categorySlug = product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-jumia-orange">Home</Link>
        <span>/</span>
        <Link href={`/category/${categorySlug}`} className="hover:text-jumia-orange">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-jumia-orange font-medium truncate">{product.name}</span>
      </div>

      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-jumia-orange hover:underline mb-6">
        <ArrowLeft size={20} />
        Back to Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg p-6 mb-4">
            <div className="relative h-[400px] mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-jumia-orange text-white px-3 py-1 rounded-lg font-bold">
                  -{product.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 border-2 rounded-lg overflow-hidden ${
                      selectedImage === idx ? 'border-jumia-orange' : 'border-gray-200'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="bg-white rounded-lg p-6">
            {/* Seller */}
            <p className="text-sm text-gray-600 mb-2">
              Sold by: <span className="text-jumia-orange font-medium">{product.seller}</span>
            </p>

            {/* Product Name */}
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="border-t border-b py-6 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.discount && (
                <div className="inline-block bg-orange-100 text-jumia-orange px-3 py-1 rounded text-sm font-bold">
                  Save {product.discount}%
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="font-medium">In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-jumia-orange flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-16 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-jumia-orange flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                  product.inStock
                    ? 'bg-jumia-orange text-white hover:bg-orange-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button
                onClick={handleAddToWishlist}
                className="w-full py-4 border-2 border-jumia-orange text-jumia-orange rounded-lg font-bold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
              >
                <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="text-jumia-orange" size={20} />
                <span>Free delivery on orders over KES 5,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="text-jumia-orange" size={20} />
                <span>100% secure payment</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="text-jumia-orange" size={20} />
                <span>7 days easy return</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg p-6 mb-12">
        <div className="flex gap-6 border-b mb-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 font-semibold ${
              activeTab === 'description'
                ? 'text-jumia-orange border-b-2 border-jumia-orange'
                : 'text-gray-600'
            }`}
          >
            Description
          </button>
          {product.specifications && (
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 font-semibold ${
                activeTab === 'specifications'
                  ? 'text-jumia-orange border-b-2 border-jumia-orange'
                  : 'text-gray-600'
              }`}
            >
              Specifications
            </button>
          )}
        </div>

        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        )}

        {activeTab === 'specifications' && product.specifications && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b pb-3">
                <span className="font-semibold text-gray-700 w-1/2">{key}:</span>
                <span className="text-gray-600 w-1/2">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
