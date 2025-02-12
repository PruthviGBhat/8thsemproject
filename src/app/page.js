import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
  <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
    <h1 className='text-slate-700 font-bold text-3xl lg:text-5xl'>
    Trusted Platform for Your <span className='text-blue-800'>Real Estate</span>
      <br />
      Needs, Find Your  <span className='text-blue-800'>Dream Home</span> Online
    </h1>
    <div className='text-gray-400 text-xs sm:text-sm'>
      Easy Estate is the best place to find your next perfect place to
      live. With an extensive selection of properties to choose from
      <br />
      We have a wide range of properties for you to choose from.
    </div>
    <a
      href='#'
      className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
    >
      Let&apos;s get started...
    </a>
       
  </div>
  <img
    src='https://www.luxuryvillasstay.com/wp-content/uploads/2023/05/luxury1.jpg'
    className='ml-36 w-5/6 h-[550px] object-cover'
  />
  <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
    {/* Static Offer Listings */}
    <div className=''>
      <div className='my-3'>
        <h2 className='text-2xl font-semibold text-slate-600'>
          Recent Offers
        </h2>
        <a
          className='text-sm text-blue-800 hover:underline'
          href='#'
        >
          Show more listings
        </a>
      </div>
      <div className='flex flex-wrap gap-4'>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>Luxury Apartment</h3>
          <p className='text-gray-600'>$300,000</p>
        </div>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>Cozy Cottage</h3>
          <p className='text-gray-600'>$150,000</p>
        </div>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>Modern Loft</h3>
          <p className='text-gray-600'>$250,000</p>
        </div>
      </div>
    </div>

    {/* Static Rent Listings */}
    <div className=''>
      <div className='my-3'>
        <h2 className='text-2xl font-semibold text-slate-600'>
          Recent places for rent
        </h2>
        <a
          className='text-sm text-blue-800 hover:underline'
          href='#'
        >
          Show more places for rent
        </a>
      </div>
      <div className='flex flex-wrap gap-4'>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>1 Bedroom Apartment</h3>
          <p className='text-gray-600'>$1,200/month</p>
        </div>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>2 Bedroom Condo</h3>
          <p className='text-gray-600'>$1,500/month</p>
        </div>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>Studio Apartment</h3>
          <p className='text-gray-600'>$900/month</p>
        </div>
      </div>
    </div>

    {/* Static Sale Listings */}
    <div className=''>
      <div className='my-3'>
        <h2 className='text-2xl font-semibold text-slate-600'>
          Recent places for sale
        </h2>
        <a
          className='text-sm text-blue-800 hover:underline'
          href={'/search?type=sale'}
        >
          Show more places for sale
        </a>
      </div>
      <div className='flex flex-wrap gap-4'>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>Family Home</h3>
          <p className='text-gray-600'>$400,000</p>
        </div>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>Beachfront Property</h3>
          <p className='text-gray-600'>$1,000,000</p>
        </div>
        <div className='border p-4 rounded shadow'>
          <h3 className='font-semibold'>Country House</h3>
          <p className='text-gray-600'>$350,000</p>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
