import HeroBanner from '@/components/ui/HeroBanner';
import Layout from '@/components/ui/Layout';

export default function Home() {
  return (
    <Layout pageName="home">
      <HeroBanner />
      <main className="min-h-screen mx-auto max-w-6xl">
        <h1>Hello Home page</h1>
      </main>
    </Layout>
  );
}
