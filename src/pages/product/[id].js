import Layout from '@/components/ui/Layout';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const StarRating = dynamic(() => import('@/components/ui/StarRating'), {
  ssr: false,
});

function ProductDetailPage({ product }) {
  const [userRating, setUserRating] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    const updateRating = async () => {
      try {
        if (userRating > Number(0)) {
          const response = await fetch(
            `https://pc-builder-backend-three.vercel.app/api/v1/product/${product?.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ individualRating: Number(userRating) }),
            }
          );
          if (response?.ok) {
            alert('Rating updated successfully');
          }

          setUserRating('');
        }
      } catch (error) {}
    };

    updateRating();
  }, [userRating, product]);

  const handleRatingUpdate = async () => {
    // Calculate the new rating (for simplicity, just increasing the rating by 1)
    const newRating = rating + 1;

    // Send the PATCH request to update the rating

    if (response.ok) {
      // Update the rating in the state and on the UI
      setRating(newRating);
    }
  };

  return (
    <Layout>
      <section className="my-16">
        <div className="card card-side bg-base-100 shadow-xl">
          <figure className="p-2">
            <Image
              src={product?.image}
              height={500}
              width={500}
              alt={product?.productName}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product?.productName}</h2>
            <div className="flex flex-col gap-1">
              <p className="text-lg">
                Category:{' '}
                <span className="px-2 bg-green-300 rounded-full">
                  {product?.category?.category}{' '}
                </span>
              </p>
              <p className="text-lg">Price: ${product?.price}</p>
              <p className="text-lg">Status: {product?.status}</p>
              <p className="text-lg ">
                Average Rating:{' '}
                <span className="px-2 bg-yellow-300 rounded-full">
                  {product?.averageRating?.toFixed(1)}/5
                </span>
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Key Features</h2>
              <div className="flex flex-col gap-1">
                {product?.keyFeatures.map((f) => (
                  <p className="text-lg" key={f}>
                    {f}
                  </p>
                ))}
              </div>
            </div>
            {session?.user && (
              <div>
                <p className="flex items-center gap-2 text-lg">
                  Give rating:{' '}
                  <StarRating
                    size={24}
                    onSetRating={setUserRating}
                    maxRating={5}
                  />
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-1">Description</h2>
          <p>{product?.description}</p>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-1">Reviews</h2>
          <div>
            {product?.reviews.map((r, idx) => (
              <div key={r + idx}>
                <p>User:</p>
                <p className="font-medium">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetch(
    'https://pc-builder-backend-three.vercel.app/api/v1/product?page=1&limit=100'
  );
  const products = await response.json();

  const paths = products?.data?.map((product) => ({
    params: { id: product._id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const response = await fetch(
    `https://pc-builder-backend-three.vercel.app/api/v1/product/${id}`
  );
  const res = await response.json();

  const product = res.data;

  return {
    props: {
      product,
    },
    revalidate: 600,
  };
}

export default ProductDetailPage;
