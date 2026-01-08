import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL.replace(/\/api$/, "");

const transformProperty = (p) => {
  const likedInStorage = JSON.parse(
    localStorage.getItem("kartbuddy_liked_status") || "{}"
  );
  const isLiked = !!likedInStorage[p.id];

  // Handle price display based on transaction type
  const displayPrice = p.transaction_type === 'rent' 
    ? p.monthly_rent 
    : p.price;

  return {
    ...p,
    _id: p.id,
    location: `${p.city}, ${p.state}`,
    type: p.transaction_type || (p.status === "rented" ? "rent" : "sale"),
    area: `${p.area_sqft} sq ft`,
    image:
      p.images && p.images.length > 0
        ? `${IMAGE_BASE_URL}/${p.images[0]}`
        : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
    images:
      p.images && p.images.length > 0
        ? p.images.map((img) => `${IMAGE_BASE_URL}/${img}`)
        : [],
    price_raw: displayPrice,
    formattedPrice: displayPrice ? new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(displayPrice) : "Price on request",
    likes: p.likes || 0,
    isLiked: isLiked,
  };
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Properties", "Inquiries"],
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Properties", "Inquiries"],
    }),
    
    getProperties: builder.query({
      query: (params) => ({
        url: "/properties",
        params: params,
      }),
      providesTags: ["Properties"],
      transformResponse: (response) => {
        const properties = response.properties || [];
        return properties.map(transformProperty);
      },
    }),
    
    addProperty: builder.mutation({
      query: (formData) => ({
        url: "/properties/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Properties"],
    }),
    
    getAdminProperties: builder.query({
      query: (params) => ({
        url: "/properties/admin",
        params,
      }),
      providesTags: ["Properties"],
      transformResponse: (response) => {
        const properties = response.properties || [];
        return properties.map(transformProperty);
      },
    }),
    
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: "Properties", id }],
      transformResponse: (response) => {
        const p = response.property;
        if (!p) return null;
        return transformProperty(p);
      },
    }),
    
    submitPropertyRequest: builder.mutation({
      query: (formData) => ({
        url: "/properties/request",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Properties"],
    }),
    
    getPendingProperties: builder.query({
      query: () => "/properties/admin/pending",
      providesTags: ["Properties"],
      transformResponse: (response) => (response.properties || []).map(transformProperty),
    }),
    
    updatePropertyApproval: builder.mutation({
      query: ({ id, approved }) => ({
        url: `/properties/${id}/approval`,
        method: "PATCH",
        body: {
          status: approved ? "approved" : "rejected",
        },
      }),
      invalidatesTags: ["Properties"],
    }),
    
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),
    
    updateProperty: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/properties/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Properties"],
    }),
    
    toggleLike: builder.mutation({
      query: (id) => {
        const likedInStorage = JSON.parse(
          localStorage.getItem("kartbuddy_liked_status") || "{}"
        );
        const isLiked = !!likedInStorage[id];

        if (isLiked) {
          delete likedInStorage[id];
        } else {
          likedInStorage[id] = true;
        }
        localStorage.setItem(
          "kartbuddy_liked_status",
          JSON.stringify(likedInStorage)
        );

        return {
          url: `/properties/${id}/toggle-like`,
          method: "PATCH",
          body: { increment: !isLiked },
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Properties", id },
        "Properties",
      ],
    }),
    
    // Inquiry endpoints
    addInquiry: builder.mutation({
      query: (inquiry) => ({
        url: "/inquiries/create",
        method: "POST",
        body: inquiry,
      }),
      invalidatesTags: ["Inquiries"],
    }),
    
    getInquiries: builder.query({
      query: () => "/inquiries",
      providesTags: ["Inquiries"],
      transformResponse: (response) => response.inquiries || [],
    }),
    
    getInquiryById: builder.query({
      query: (id) => `/inquiries/${id}`,
      providesTags: (result, error, id) => [{ type: "Inquiries", id }],
      transformResponse: (response) => response.inquiry,
    }),
    
    getInquiriesByProperty: builder.query({
      query: (propertyId) => `/inquiries/property/${propertyId}`,
      providesTags: ["Inquiries"],
      transformResponse: (response) => response.inquiries || [],
    }),
    
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/inquiries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiries"],
    }),
    
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: userData,
      }),
    }),
    
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/update-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
    
    // Contact endpoints
    submitContact: builder.mutation({
      query: (payload) => ({
        url: "/contact",
        method: "POST",
        body: payload,
      }),
    }),
    
    getContactSubmissions: builder.query({
      query: () => "/contact",
      providesTags: ["Inquiries"],
    }),
    
    deleteContactSubmission: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiries"],
    }),
    
    getContactSubmissionById: builder.query({
      query: (id) => `/contact/${id}`,
      providesTags: (result, error, id) => [{ type: "Inquiries", id }],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetDashboardStatsQuery,
  useAddPropertyMutation,
  useGetAdminPropertiesQuery,
  useGetPropertyByIdQuery,
  useSubmitPropertyRequestMutation,
  useGetPendingPropertiesQuery,
  useUpdatePropertyApprovalMutation,
  useAddInquiryMutation,
  useGetInquiriesQuery,
  useGetInquiryByIdQuery,
  useGetInquiriesByPropertyQuery,
  useDeleteInquiryMutation,
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
  useToggleLikeMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useSubmitContactMutation,
  useGetContactSubmissionsQuery,
  useGetContactSubmissionByIdQuery,
  useDeleteContactSubmissionMutation,
} = apiSlice;