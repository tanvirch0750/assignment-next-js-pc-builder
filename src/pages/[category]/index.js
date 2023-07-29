import FeaturedProductCard from '@/components/FeaturedProductCard';
import Layout from '@/components/ui/Layout';

function CategoryPage({ categoryProducts }) {
  return (
    <Layout>
      {categoryProducts.length === 0 ? (
        <h1 className="text-center text-4xl text-primary font-medium mt-4">
          No product found
        </h1>
      ) : (
        <section className="my-12">
          <h1 className="text-center text-4xl text-primary font-medium">
            {categoryProducts[0].category.category}
          </h1>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {categoryProducts?.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetch(
    'https://pc-builder-backend-three.vercel.app/api/v1/category?page=1&limit=20'
  );
  const categoriesData = await response.json();

  const paths = categoriesData?.data?.map((category) => ({
    params: { category: category.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { category } = params;
  const response = await fetch(
    `https://pc-builder-backend-three.vercel.app/api/v1/product?category=${category}`
  );
  const res = await response.json();

  const categoryProducts = res.data;

  return {
    props: {
      categoryProducts: categoryProducts || [],
    },
  };
}

export default CategoryPage;
