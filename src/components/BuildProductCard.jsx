import { addProducts } from '@/redux/pcBuilder/pcBuilderSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function BuildProductCard({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const handleAddBuilder = () => {
    dispatch(addProducts(product));
    router.push(`/pcBuilder`);
    setDisabled(true);
  };

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <figure className="p-2 w-full">
        <Image
          src={product?.image}
          height={500}
          width={500}
          alt={product?.productName}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{product?.productName}</h2>
        <p className="text-lg">
          Category:{' '}
          <span className="px-2 bg-green-300 rounded-full">
            {product?.category?.category}{' '}
          </span>
        </p>
        <p className="text-lg">Price: ${product?.price}</p>
        <p className="text-lg">Status: {product?.status}</p>
        <p className="text-lg">Rating: {product?.averageRating}/5</p>
        <div className="card-actions justify-end">
          <button
            disabled={disabled}
            className="btn btn-primary"
            onClick={handleAddBuilder}
          >
            Add To Builder
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuildProductCard;
