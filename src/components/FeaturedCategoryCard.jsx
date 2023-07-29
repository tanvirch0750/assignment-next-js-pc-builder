import Link from 'next/link';

function FeaturedCategoryCard({ category }) {
  return (
    <div className="card w-full bg-primary text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">{category?.category}</h2>
        <p>Explore All the component of {category?.category}</p>
        <Link className="btn btn-white" href={`/${category.id}`}>
          Explore all
        </Link>
      </div>
    </div>
  );
}

export default FeaturedCategoryCard;
