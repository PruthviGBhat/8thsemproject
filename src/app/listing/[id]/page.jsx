import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
  } from 'react-icons/fa';
  
  export default async function Listing({ params }) {
    let listing = null;
    try {
      const result = await fetch(process.env.URL + '/api/listing/get', {
        method: 'POST',
        body: JSON.stringify({ listingId: params.id }),
        cache: 'no-store',
      });
  
      if (!result.ok) {
        throw new Error(`Failed to fetch: ${result.status}`);
      }
  
      const data = await result.json();
  
      // Check if data exists and has elements
      if (data && Array.isArray(data) && data.length > 0) {
        listing = data[0];
      } else {
        throw new Error('No listing data returned');
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      listing = { name: 'Failed to load listing' };
    }
  
    // If listing is null or has error message, show not found
    if (!listing || listing.name === 'Failed to load listing') {
      return (
        <main className='bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex items-center justify-center'>
          <div className='text-center p-8 bg-white rounded-xl shadow-md max-w-md'>
            <h2 className='text-2xl font-serif text-gray-800 mb-4'>
              Listing Not Found
            </h2>
            <p className='text-gray-600'>The property you're looking for doesn't seem to exist.</p>
          </div>
        </main>
      );
    }
  
    // Add a safety check for imageUrls
    const hasImages = listing.imageUrls && Array.isArray(listing.imageUrls) && listing.imageUrls.length > 0;
  
    return (
      <main className='bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
            {/* Hero Image Section */}
            {hasImages ? (
              <div className='relative w-full h-[500px]'>
                <img
                  src={listing.imageUrls[0]}
                  alt={listing.name}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                <div className='absolute bottom-0 left-0 right-0 p-8'>
                  <h1 className='text-4xl font-bold text-white mb-2 drop-shadow-md'>{listing.name}</h1>
                  <p className='flex items-center gap-2 text-white/90 text-lg'>
                    <FaMapMarkerAlt className='text-green-400' />
                    {listing.address}
                  </p>
                </div>
              </div>
            ) : (
              <div className='w-full h-[500px] bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center'>
                <p className='text-gray-500 text-xl'>No image available</p>
              </div>
            )}
  
            {/* Content Section */}
            <div className='p-8'>
              {/* Status Badge */}
              <div className='mb-6'>
                <span className={`inline-block rounded-full px-6 py-2 text-sm font-semibold shadow-md ${
                  listing.Rent 
                    ? 'bg-blue-600 text-white' 
                    : listing.sell 
                      ? 'bg-green-600 text-white' 
                      : 'bg-purple-600 text-white'
                }`}>
                  {listing.Rent ? 'For Rent' : listing.sell ? 'For Sale' : 'Property'}
                </span>
              </div>
  
              {/* Description Section */}
              <div className='mb-8'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>About This Property</h2>
                <p className='text-gray-700 leading-relaxed'>
                  {listing.description}
                </p>
              </div>
  
              {/* Features Section */}
              <div className='bg-gray-50 p-6 rounded-xl mb-8'>
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>Features</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                  <div className='flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm'>
                    <FaBed className='text-2xl text-blue-500' />
                    <div>
                      <p className='text-xs text-gray-500'>Bedrooms</p>
                      <p className='font-semibold'>{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm'>
                    <FaBath className='text-2xl text-blue-500' />
                    <div>
                      <p className='text-xs text-gray-500'>Bathrooms</p>
                      <p className='font-semibold'>{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm'>
                    <FaParking className='text-2xl text-blue-500' />
                    <div>
                      <p className='text-xs text-gray-500'>Parking</p>
                      <p className='font-semibold'>{listing.parking ? 'Available' : 'Not Available'}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm'>
                    <FaChair className='text-2xl text-blue-500' />
                    <div>
                      <p className='text-xs text-gray-500'>Furniture</p>
                      <p className='font-semibold'>{listing.furnished ? 'Furnished' : 'Unfurnished'}</p>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Location Map Section */}
              <div className='mb-8'>
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>Location</h3>
                <div className='relative w-full h-96 rounded-xl overflow-hidden shadow-md'>
                  <iframe className='absolute top-0 left-0 w-full h-full'
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12080.73732861526!2d-74.0059418!3d40.7127847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMDA2JzEwLjAiTiA3NMKwMjUnMzcuNyJX!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus"
                    frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }