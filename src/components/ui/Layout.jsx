import Navbar from './Navbar';

function Layout({ children, pageName, categories }) {
  return (
    <div>
      <Navbar pageName={pageName} categories={categories} />
      {pageName === 'home' ? (
        <>{children}</>
      ) : (
        <main className="min-h-screen mx-auto max-w-7xl px-4">{children}</main>
      )}

      <footer className="footer footer-center p-4 bg-slate-800 text-white">
        <div>
          <p>Copyright © 2023 - All right reserved by TechBD Ltd</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
