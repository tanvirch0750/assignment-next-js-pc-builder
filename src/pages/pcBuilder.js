import Layout from '@/components/ui/Layout';
import { removeProduct } from '@/redux/pcBuilder/pcBuilderSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

function PcBuilderPage({ allCategories }) {
  const addedProducts = useSelector((state) => state.addedProducts);
  const router = useRouter();
  const dispatch = useDispatch();

  const desiredCategories = [
    'CPU',
    'Motherboard',
    'RAM',
    'Power Supply Unit',
    'Storage Device',
  ];

  const disabled = !desiredCategories.every((category) =>
    addedProducts.some((obj) => obj.category.category === category)
  );

  const totalPrice = addedProducts.reduce(
    (acc, product) => acc + Number(product.price),
    0
  );

  const isCategoryAdded = (categoryId) =>
    addedProducts.some((product) => product.category.id === categoryId);

  const handleComplete = () => {
    if (!disabled) {
      alert('Congratulation, you successfully build your computer');
    }
  };

  return (
    <Layout>
      <section className="my-16">
        <h1 className="text-center text-4xl text-primary font-medium">
          Build Your PC
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {allCategories?.map((category) => (
            <button
              className="btn btn-primary"
              onClick={() => router.push(`build/${category.id}`)}
              key={category.id}
              disabled={isCategoryAdded(category.id)}
            >
              Select {category.category}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto mt-12">
          <table className="table text-center">
            {/* head */}
            <thead className="text-lg">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {addedProducts?.map((product) => (
                <tr key={product?.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            src={product?.image}
                            height={100}
                            width={100}
                            alt={product?.productName}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product?.productName}</td>
                  <td>{product?.category?.category}</td>
                  <td>{product?.price}</td>
                  <th>
                    <button
                      onClick={() => dispatch(removeProduct(product?.id))}
                      className="btn btn-error btn-xs"
                    >
                      Remove
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>

        <div className="grid grid-cols-2 gap-20 mt-12">
          <h2 className="text-center text-2xl text-primary font-medium">
            Total Price: {totalPrice} Taka
          </h2>
          <button
            disabled={disabled}
            onClick={handleComplete}
            className="btn btn-primary"
          >
            Complete
          </button>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    'https://pc-builder-backend-three.vercel.app/api/v1/category?page=1&limit=20'
  );
  const categoriesData = await response.json();

  const allCategories = categoriesData.data;

  return {
    props: {
      allCategories,
    },
  };
}

export default PcBuilderPage;
