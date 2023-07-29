import Navbar from './Navbar';

function Layout({ children, pageName }) {
  return (
    <div>
      <Navbar />
      {pageName === 'home' ? (
        <>{children}</>
      ) : (
        <main className="min-h-screen mx-auto max-w-7xl">{children}</main>
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
