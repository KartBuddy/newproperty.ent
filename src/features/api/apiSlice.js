import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['Properties', 'Inquiries'],
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (params) => ({
        url: '/properties',
        params: params, // Support filtering
      }),
      providesTags: ['Properties'],
      transformResponse: (response) => {
        const properties = response.properties || [];
        return properties.map(p => ({
          ...p,
          _id: p.id, // Support both id and _id
          location: `${p.city}, ${p.state}`,
          type: p.status === 'rented' ? 'rent' : 'sale', // Simple map for now
          area: `${p.area_sqft} sq ft`,
          image: p.images && p.images.length > 0
            ? `http://localhost:8000/${p.images[0]}`
            : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
          price_raw: p.price,
          formattedPrice: new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
          }).format(p.price)
        }));
      }
    }),
    addProperty: builder.mutation({
      query: (newProperty) => ({
        url: '/properties/create',
        method: 'POST',
        body: newProperty,
      }),
      invalidatesTags: ['Properties'],
    }),
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: 'Properties', id }],
      transformResponse: (response) => {
        const p = response.property;
        if (!p) return null;
        return {
          ...p,
          _id: p.id,
          location: `${p.city}, ${p.state}`,
          type: p.status === 'rented' ? 'rent' : 'sale',
          area: `${p.area_sqft} sq ft`,
          image: p.images && p.images.length > 0
            ? `http://localhost:8000/${p.images[0]}`
            : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
          images: p.images && p.images.length > 0
            ? p.images.map(img => `http://localhost:8000/${img}`)
            : [],
          price_raw: p.price,
          formattedPrice: new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
          }).format(p.price)
        };
      },
    }),
    addInquiry: builder.mutation({
      query: (inquiry) => ({
        url: '/inquiries/create',
        method: 'POST',
        body: inquiry,
      }),
      invalidatesTags: ['Inquiries'],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Properties'],
    }),
    updateProperty: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/properties/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Properties'],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useAddPropertyMutation,
  useGetPropertyByIdQuery,
  useAddInquiryMutation,
  useDeletePropertyMutation,
  useUpdatePropertyMutation
} = apiSlice;
