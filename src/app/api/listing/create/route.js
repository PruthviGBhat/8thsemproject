import { connect } from '@/lib/mongodb/mongoose';
import Listing from '@/lib/models/listing.model';

export const POST = async (req) => {
  try {
    // Connect to the database
    await connect();
    
    // Parse the request body with error handling
    let data;
    try {
      data = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid JSON in request body: ' + error.message
        }), 
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!data.name || !data.description || !data.address) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields'
        }), 
        { status: 400 }
      );
    }
    
    // Get the user reference from the request data
    // This assumes you're passing the user ID from the frontend
    const userRef = data.userMongoId || data.userRef;
    
    if (!userRef) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'User reference is required'
        }), 
        { status: 400 }
      );
    }
    
    // Map the type field to the sell/rent boolean fields in the schema
    const listingData = {
      name: data.name,
      description: data.description,
      address: data.address,
      bathrooms: data.bathrooms,
      bedrooms: data.bedrooms,
      furnished: data.furnished,
      parking: data.parking,
      imageUrls: data.imageUrls,
      sell: data.type === 'sale',
      Rent: data.type === 'rent',
      userRef: userRef,
      // Include any other fields you need
    };
    
    // Create the new listing
    const newListing = await Listing.create(listingData);
    
    // Return the created listing
    return new Response(
      JSON.stringify(newListing), 
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  } catch (error) {
    console.error('Error creating listing:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to create listing: ' + error.message
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};