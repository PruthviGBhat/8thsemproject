import Image from "next/image";
import Link from "next/link";
import ListingItem from "./components/ListingItem.jsx";


export default async function Home() {
  let rentListings = null;
  try {
    const result = await fetch(process.env.URL + '/api/listing/get', {
      method: 'POST',
      body: JSON.stringify({
        type: 'rent',
        limit: 4,
        order: 'asc',
      }),
      cache: 'no-store',
    });
    const data = await result.json();
    rentListings = data;
  } catch (error) {
    rentListings = { title: 'Failed to load listing' };
  }
  let saleListings = null;
  try {
    const result = await fetch(process.env.URL + '/api/listing/get', {
      method: 'POST',
      body: JSON.stringify({
        type: 'sale',
        limit: 4,
        order: 'asc',
      }),
      cache: 'no-store',
    });
    const data = await result.json();
    saleListings = data;
  } catch (error) {
    saleListings = { title: 'Failed to load listing' };
  }
  
  
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
    <Link
      href={'/createListing'}  
      className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
    >
      <button className='bg-green-700 text-white focus:outline-none w-16 sm:w-40 h-10 '>List Sites</button>
     
    </Link>
    <Link
      href={'/landrecords.karnataka.gov.in/Service2/'}  
      className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
    >
       <button className='bg-green-700 text-white focus:outline-none w-16 sm:w-40 h-10 '>Verify with Govt.</button>
     
    </Link>


  </div>
  <img
    src='https://www.luxuryvillasstay.com/wp-content/uploads/2023/05/luxury1.jpg'
    className='ml-36 w-5/6 h-[550px] object-cover'
  />
  <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
    

    

  {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for rent
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                href={'/search?type=rent'}
              >
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for sale
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                href={'/search?type=sale'}
              >
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}

  </div>
</div>
    </>
  );
}
