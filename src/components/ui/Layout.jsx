import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen mx-auto max-w-6xl">{children}</main>
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by TechBD Ltd</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
