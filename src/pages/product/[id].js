import Layout from '@/components/ui/Layout';
import Image from 'next/image';

function ProductDetailPage({ product }) {
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
              <p className="text-lg">Rating: {product?.averageRating}/5</p>
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
