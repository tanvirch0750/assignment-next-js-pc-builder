import Link from 'next/link';

function HeroBanner() {
  return (
    <div
      className="hero sm:h-[500px]"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold">
            Tech Wizardry Unleashed Build Your PC Kingdom Today!
          </h1>
          <p className="mb-5 text-lg">
            Welcome to the Epicenter of PC Mastery, where Your Imagination Meets
            Innovation. Discover our cutting-edge tools and expert guidance to
            create a personalized PC that defines your style and surpasses your
            expectations.
          </p>
          <Link href="/pcBuilder" className="btn btn-primary">
            Build PC
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
