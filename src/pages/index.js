import FeaturedCategoryCard from '@/components/FeaturedCategoryCard';
import FeaturedProductCard from '@/components/FeaturedProductCard';
import HeroBanner from '@/components/ui/HeroBanner';
import Layout from '@/components/ui/Layout';

export default function Home({ featuredProducts, featuredCategory }) {
  return (
    <Layout pageName="home">
      <HeroBanner />
      <main className="min-h-screen mx-auto max-w-7xl px-3 py-8 md:py-12">
        <section>
          <h1 className="text-center text-2xl md:text-4xl text-primary font-medium">
            Featured Components
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-0 md:mt-12">
            {featuredProducts?.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        <section className="md:my-16 my-6">
          <h1 className="text-center text-2xl md:text-4xl text-primary font-medium">
            Featured Categories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 mt-4 md:mt-12">
            {featuredCategory?.map((category) => (
              <FeaturedCategoryCard category={category} key={category.id} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    'https://pc-builder-backend-three.vercel.app/api/v1/product?page=1&limit=100'
  );
  const products = await res.json();
  const featuredProducts = products.data.filter(
    (product) => product.featured === true
  );

  const res2 = await fetch(
    'https://pc-builder-backend-three.vercel.app/api/v1/category?page=1&limit=20'
  );
  const category = await res2.json();
  const featuredCategory = category.data.filter(
    (category) => category.featured === true
  );
  return { props: { featuredProducts, featuredCategory }, revalidate: 1000 };
};
