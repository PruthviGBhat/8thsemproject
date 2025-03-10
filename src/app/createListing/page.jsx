"use client"
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import Image from 'next/image';

const page = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentFiles, setDocumentFiles] = useState([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    imageUrls: [],
    documentUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  const authenticator = async () => {
    try {
      const response = await fetch("/api/uploadauth");
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  
  const handleImageUploadSuccess = (data) => {
    if (formData.imageUrls.length + 1 <= 6) {
      setFormData({
        ...formData,
        imageUrls: [...formData.imageUrls, data.url],
      });
      setImageUploadError(false);
    } else {
      setImageUploadError('You can only upload 6 images per listing');
    }
    setUploading(false);
  };

  const handleDocumentUploadSuccess = (data) => {
    setFormData({
      ...formData,
      documentUrls: [...formData.documentUrls, data.url],
    });
    setUploading(false);
  };

  const handleUploadError = (err) => {
    setImageUploadError('Image upload failed. Please try again.');
    setUploading(false);
    console.error("Upload error:", err);
  };

  const handleUploadProgress = (progress) => {
    console.log(`Upload is ${progress}% done`);
  };

  const handleRemoveImage = (index) => {
    const updatedImageUrls = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imageUrls: updatedImageUrls,
    });
  };

  const handleRemoveDocument = (index) => {
    const updatedDocumentUrls = formData.documentUrls.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      documentUrls: updatedDocumentUrls,
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  // In your page.jsx, update handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (formData.imageUrls.length < 1)
      return setError('You must upload at least one image');
    setLoading(true);
    setError(false);
    const res = await fetch('/api/listing/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        sell: formData.type === 'sale',
        Rent: formData.type === 'rent',
        userMongoId: user.publicMetadata.userMongoId,
      }),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed with status ${res.status}: ${errorText}`);
    }
    
    const data = await res.json();
    setLoading(false);
    if (data.success === false) {
      setError(data.message);
    }
    router.push(`/listing/${data._id}`);
  } catch (error) {
    console.log(error);
    setError(error.message);
    setLoading(false);
  }
};

  if (!isLoaded) {
    return (
      <h1 className='text-center text-xl my-7 font-semibold'>Loading...</h1>
    );
  }
  if (!isSignedIn) {
    return (
      <h1 className='text-center text-xl my-7 font-semibold'>
        You are not authorized to view this page
      </h1>
    );
  }

  return (
    <>
      <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>
          Create a Listing
        </h1>
        <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 flex-1'>
            <input
              type='text'
              placeholder='Name'
              className='border p-3 rounded-lg'
              id='name'
              maxLength='62'
              minLength='10'
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type='text'
              placeholder='Description'
              className='border p-3 rounded-lg'
              id='description'
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type='text'
              placeholder='Address'
              className='border p-3 rounded-lg'
              id='address'
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className='w-5'
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                />
                <span>Sell</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='rent'
                  className='w-5'
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='parking'
                  className='w-5'
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='furnished'
                  className='w-5'
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bedrooms'
                  min='1'
                  max='10'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bathrooms'
                  min='1'
                  max='10'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='regularPrice'
                  min='50'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Regular price</p>
                  <span className='text-xs'>( In ₹ )</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>
              Images:
              <span className='font-normal text-gray-600 ml-2'>
                Upload the image of Villa/land/building (max 6)
              </span>
            </p>
            <div className='flex flex-col gap-4'>
              <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
                <div className="flex flex-col gap-2">
                  <IKUpload
                    fileName={`property_${Date.now()}.jpg`}
                    folder="/properties"
                    onError={handleUploadError}
                    onSuccess={handleImageUploadSuccess}
                    onUploadProgress={handleUploadProgress}
                    className="p-3 border border-gray-300 rounded w-full"
                  />
                  {imageUploadError && (
                    <p className='text-red-700 text-sm'>{imageUploadError}</p>
                  )}
                </div>
              </ImageKitProvider>
              
              {formData.imageUrls.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold">Uploaded Property Images:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div
                        key={`img-${index}`}
                        className='flex justify-between p-3 border items-center'
                      >
                        <img
                          src={url}
                          alt={`listing image ${index + 1}`}
                          className='w-20 h-20 object-contain rounded-lg'
                        />
                        <button
                          type='button'
                          onClick={() => handleRemoveImage(index)}
                          className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <p className='font-semibold mt-4'>
              Documents:
              <span className='font-normal text-gray-600 ml-2'>
                Upload the government's original document image
              </span>
            </p>
            <div className='flex flex-col gap-4'>
              <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
                <div className="flex flex-col gap-2">
                  <IKUpload
                    fileName={`document_${Date.now()}.jpg`}
                    folder="/documents"
                    onError={handleUploadError}
                    onSuccess={handleDocumentUploadSuccess}
                    onUploadProgress={handleUploadProgress}
                    className="p-3 border border-gray-300 rounded w-full"
                  />
                </div>
              </ImageKitProvider>
              
              {formData.documentUrls.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold">Uploaded Documents:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.documentUrls.map((url, index) => (
                      <div
                        key={`doc-${index}`}
                        className='flex justify-between p-3 border items-center'
                      >
                        <img
                          src={url}
                          alt={`document image ${index + 1}`}
                          className='w-20 h-20 object-contain rounded-lg'
                        />
                        <button
                          type='button'
                          onClick={() => handleRemoveDocument(index)}
                          className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-4'
              disabled={loading || uploading}
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
          </div>
        </form>
      </main>
    </>
  )
}

export default page