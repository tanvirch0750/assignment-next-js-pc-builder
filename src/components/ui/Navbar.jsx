import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Navbar({ pageName, categories: categories2 }) {
  const [categories, setCategories] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchCategories() {
      // Replace this with your actual API call to fetch all categories.
      const response = await fetch(
        'https://pc-builder-backend-three.vercel.app/api/v1/category?page=1&limit=20'
      );
      const categoriesData = await response.json();
      setCategories(categoriesData);
    }

    fetchCategories();
  }, []);

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {pageName !== 'builder' && (
              <li tabIndex={0}>
                <details>
                  <summary className="text-lg font-semibold">
                    Categories
                  </summary>
                  <ul className="p-2 z-10 w-80">
                    {categories2?.map((category) => (
                      <li key={category?.id}>
                        <Link href={`/${category?.id}`}>
                          {category?.category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>
        <Link
          href="/"
          className="btn normal-case text-xl text-primary font-bold"
        >
          TechBD
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {pageName !== 'builder' && (
            <li tabIndex={0}>
              <details>
                <summary className="text-lg font-semibold">Categories</summary>
                <ul className="p-2 z-10 w-80">
                  {categories?.data?.map((category) => (
                    <li key={category?.id}>
                      <Link href={`/${category?.id}`}>
                        {category?.category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end flex gap-2">
        {session?.user ? (
          <>
            <Link
              href="/pcBuilder"
              className="btn btn-xs btn-primary md:btn-md"
            >
              PC Builder
            </Link>

            <button
              onClick={() => signOut()}
              className="btn btn-error btn-xs md:btn-md"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
