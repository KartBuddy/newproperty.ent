import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = API_URL.replace("/api", "");

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      // Optional: add any headers if needed
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
        params: params, // Support filtering
      }),
      providesTags: ["Properties"],
      transformResponse: (response) => {
        const properties = response.properties || [];
        return properties.map((p) => {
          // Identify if current visitor has liked this property via LocalStorage
          const likedInStorage = JSON.parse(
            localStorage.getItem("kartbuddy_liked_status") || "{}"
          );
          const isLiked = !!likedInStorage[p.id];

          return {
            ...p,
            _id: p.id,
            location: `${p.city}, ${p.state}`,
            type: p.status === "rented" ? "rent" : "sale",
            area: `${p.area_sqft} sq ft`,
            image:
              p.images && p.images.length > 0
                ? `${IMAGE_BASE_URL}/${p.images[0]}`
                : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
            price_raw: p.price,
            formattedPrice: new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(p.price),
            likes: p.likes || 0,
            isLiked: isLiked,
          };
        });
      },
    }),
    addProperty: builder.mutation({
      query: (newProperty) => ({
        url: "/properties/create",
        method: "POST",
        body: newProperty,
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
        return properties.map((p) => {
          // Identify if current visitor has liked this property via LocalStorage
          const likedInStorage = JSON.parse(
            localStorage.getItem("kartbuddy_liked_status") || "{}"
          );
          const isLiked = !!likedInStorage[p.id];

          return {
            ...p,
            _id: p.id,
            location: `${p.city}, ${p.state}`,
            type: p.status === "rented" ? "rent" : "sale",
            area: `${p.area_sqft} sq ft`,
            image:
              p.images && p.images.length > 0
                ? `${IMAGE_BASE_URL}/${p.images[0]}`
                : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
            price_raw: p.price,
            formattedPrice: new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(p.price),
            likes: p.likes || 0,
            isLiked: isLiked,
          };
        });
      },
    }),
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: "Properties", id }],
      transformResponse: (response) => {
        const p = response.property;
        if (!p) return null;

        const likedInStorage = JSON.parse(
          localStorage.getItem("kartbuddy_liked_status") || "{}"
        );
        const isLiked = !!likedInStorage[p.id];

        return {
          ...p,
          _id: p.id,
          location: `${p.city}, ${p.state}`,
          type: p.status === "rented" ? "rent" : "sale",
          area: `${p.area_sqft} sq ft`,
          image:
            p.images && p.images.length > 0
              ? `${IMAGE_BASE_URL}/${p.images[0]}`
              : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
          images:
            p.images && p.images.length > 0
              ? p.images.map((img) => `${IMAGE_BASE_URL}/${img}`)
              : [],
          price_raw: p.price,
          formattedPrice: new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(p.price),
          likes: p.likes || 0,
          isLiked: isLiked,
        };
      },
    }),
    // CLIENT submits property (PENDING)
    submitPropertyRequest: builder.mutation({
      query: (formData) => ({
        url: "/properties/request",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Properties"],
    }),

    // ADMIN fetches pending properties
    getPendingProperties: builder.query({
      query: () => "/properties/admin/pending",
      providesTags: ["Properties"],
      transformResponse: (response) => response.properties || [],
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

        // Update local storage status
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
    submitContact: builder.mutation({
      query: (payload) => ({
        url: "/contact",
        method: "POST",
        body: payload,
      }),
    }),
    getContactSubmissions: builder.query({
      query: () => "/contact",
      providesTags: ["Inquiries"], // Re-using Inquiries tag for simplicity or add 'Contacts'
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
