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
      {/* Hero Section with Gradient Overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
        <img
          src='https://www.luxuryvillasstay.com/wp-content/uploads/2023/05/luxury1.jpg'
          className='w-full h-screen object-fill opacity-55 inset-0 z-0'
          alt="Luxury Home"
        />
        
        <div className='absolute inset-0 z-20 flex items-center'>
          <div className='max-w-6xl mx-auto px-6 md:px-10'>
            <div className="max-w-2xl ">
              <h1 className='text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6'>
                Trusted Platform for Your Real Estate Needs
              </h1>
              <p className='text-white text-sm md:text-base mb-8 leading-relaxed'>
                Find Your Dream Home Online with Easy Estate, 
                the premier destination for your next perfect place to live.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={'/createListing'}>
                  <button className='bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 px-6 rounded-lg w-full sm:w-auto'>
                    List Your Property
                  </button>
                </Link>
                <Link target='_blank' href={'https://landrecords.karnataka.gov.in/Service2/'}>
                  <button className='bg-green-600 hover:bg-green-700 transition-colors text-white font-medium py-3 px-6 rounded-lg w-full sm:w-auto'>
                    Verify with Government
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Listings Section */}
      <div className='max-w-6xl mx-auto p-6 my-16'>
        {rentListings && rentListings.length > 0 && (
          <div className='mb-16'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-3xl font-bold text-slate-800 border-b-4 border-blue-600 pb-2 inline-block'>
                Featured Rentals
              </h2>
              <Link
                className='text-blue-600 hover:text-blue-800 font-medium flex items-center group'
                href={'/search?type=rent'}
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-3xl font-bold text-slate-800 border-b-4 border-green-600 pb-2 inline-block'>
                Properties for Sale
              </h2>
              <Link
                className='text-green-600 hover:text-green-800 font-medium flex items-center group'
                href={'/search?type=sale'}
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Why Choose Easy Estate</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Properties</h3>
              <p className="text-gray-600">All our listings are verified and comply with government regulations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
              <p className="text-gray-600">Find the best prices for premium properties in prime locations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Process</h3>
              <p className="text-gray-600">Quick and hassle-free property transactions and verifications.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}