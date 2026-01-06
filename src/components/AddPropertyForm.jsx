import React, { useState, useEffect } from "react";
import {
  useAddPropertyMutation,
  useUpdatePropertyMutation,
  useSubmitPropertyRequestMutation,
} from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const AddPropertyForm = ({ onClose, property, isPage, mode = "admin" }) => {
  const navigate = useNavigate();
  const [addProperty, { isLoading: isAdding }] = useAddPropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation();
  const [submitPropertyRequest] = useSubmitPropertyRequestMutation();


  const isLoading = isAdding || isUpdating;

  const [newProperty, setNewProperty] = useState({
    title: "",
    property_type: "apartment",
    status: "available",
    price: "",
    area_sqft: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    parking: false,
    owner_name: "",
    owner_contact: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (property) {
      setNewProperty({
        title: property.title || "",
        property_type: property.property_type || "apartment",
        status: property.status || "available",
        price: property.price_raw || property.price || "",
        area_sqft: property.area_sqft || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        address: property.address || "",
        city: property.city || "",
        state: property.state || "",
        pincode: property.pincode || "",
        description: property.description || "",
        parking: property.parking || false,
        owner_name: property.owner_name || "",
        owner_contact: property.owner_contact || "",
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newProperty).forEach((key) => {
      formData.append(key, newProperty[key]);
    });

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      if (property) {
        await updateProperty({ id: property.id, formData }).unwrap();
        alert("Property Updated Successfully!");
      } else {
        if (mode === "client") {
          await submitPropertyRequest(formData).unwrap();
          alert("Your property has been submitted for approval.");
        } else {
          await addProperty(formData).unwrap();
          alert("Property Added Successfully!");
        }
      }

      if (isPage && mode === "admin") {
        navigate("/admin/properties");
      } else if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Failed to save:", err);
      if (err.data?.errors && Array.isArray(err.data.errors)) {
        const errorMsg = err.data.errors.map(e => `${e.field}: ${e.message}`).join("\n");
        alert("Validation Errors:\n" + errorMsg);
      } else {
        alert(err.data?.message || err.error || "Failed to save property. Please check the network connection or server status.");
      }
    }
  };

  const formContent = (
    <form
      onSubmit={handleSubmit}
      className={`${isPage ? 'bg-white rounded-[40px] shadow-[0_20px_60px_rgba(15,40,84,0.05)] border border-slate-50' : 'bg-white rounded-[40px] w-full max-w-2xl overflow-y-auto max-h-[90vh] shadow-2xl border border-slate-100'} p-10 space-y-8`}
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">
            {property ? 'Edit Property' : 'Add New Listing'}
          </h2>
          <p className="text-sm font-bold text-brand-400 mt-1 uppercase tracking-[0.1em]">
            {property ? 'Update existing property information' : 'Fill in the details to list on the market'}
          </p>
        </div>
        {!isPage && (
          <button onClick={onClose} type="button" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-brand-700 transition-all">✕</button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Title</label>
          <input
            name="title"
            placeholder="e.g. Modern Villa in Thane West"
            value={newProperty.title}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Type</label>
          <select
            name="property_type"
            value={newProperty.property_type}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all appearance-none"
          >
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="commercial">Commercial</option>
            <option value="office">Office</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Listing Status</label>
          <select
            name="status"
            value={newProperty.status}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all appearance-none"
          >
            <option value="available">For Sale</option>
            <option value="rented">For Rent</option>
            <option value="under_construction">Under Construction</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Price (₹)</label>
          <input
            name="price"
            type="number"
            placeholder="e.g. 25000000"
            value={newProperty.price}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-brand-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Area (SQFT)</label>
          <input
            name="area_sqft"
            type="number"
            placeholder="e.g. 1500"
            value={newProperty.area_sqft}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Beds</label>
            <input
              name="bedrooms"
              type="number"
              placeholder="0"
              value={newProperty.bedrooms}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Baths</label>
            <input
              name="bathrooms"
              type="number"
              placeholder="0"
              value={newProperty.bathrooms}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Owner Name</label>
            <input
              name="owner_name"
              placeholder="e.g. Rahul Sharma"
              value={newProperty.owner_name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Owner Contact</label>
            <input
              name="owner_contact"
              placeholder="10-digit mobile"
              value={newProperty.owner_contact}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Full Address</label>
          <input
            name="address"
            placeholder="Street address, colony, landmark"
            value={newProperty.address}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">City</label>
            <input
              name="city"
              placeholder="City"
              value={newProperty.city}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">State</label>
            <input
              name="state"
              placeholder="State"
              value={newProperty.state}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Pincode</label>
            <input
              name="pincode"
              placeholder="6 digits"
              value={newProperty.pincode}
              onChange={handleChange}
              required
              maxLength="6"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-50">
        <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Description</label>
        <textarea
          name="description"
          placeholder="Describe the property highlights, amenities, and nearby landmarks..."
          value={newProperty.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-5 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 focus:bg-white transition-all placeholder:text-slate-300 resize-none"
        ></textarea>
      </div>

      <div className="flex items-center gap-3 px-1">
        <input
          name="parking"
          type="checkbox"
          checked={newProperty.parking}
          onChange={handleChange}
          id="parking"
          className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-700 focus:ring-offset-0 focus:ring-brand-500/20 transition-all cursor-pointer"
        />
        <label htmlFor="parking" className="text-sm font-extrabold text-brand-900 cursor-pointer select-none">Available Parking Space</label>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-50">
        <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Gallery</label>
        <div className="relative group">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] cursor-pointer hover:bg-brand-50/30 hover:border-brand-200 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-500 shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <svg size={24} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <p className="text-sm font-extrabold text-brand-900">Click to upload photos</p>
            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wide">PNG, JPG up to 10MB</p>
            {selectedFiles.length > 0 && (
              <div className="mt-4 px-4 py-1.5 bg-brand-700 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-700/20">
                {selectedFiles.length} {selectedFiles.length === 1 ? 'File' : 'Files'} selected
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-8">
        <button
          type="button"
          onClick={isPage ? () => navigate("/admin/properties") : onClose}
          className="flex-1 py-4.5 bg-slate-50 text-[13px] font-extrabold text-slate-500 hover:text-brand-900 hover:bg-slate-100 rounded-2xl transition-all"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-[1.5] py-4.5 bg-brand-700 text-white rounded-2xl text-[13px] font-black uppercase tracking-[0.1em] hover:bg-brand-900 hover:-translate-y-0.5 transition-all shadow-xl shadow-brand-700/20 disabled:opacity-50"
        >
          {isLoading ? "Synchronizing..." : property ? "Update Listing" : "Publish Listing"}
        </button>
      </div>
    </form>
  );

  if (isPage) {
    return <div className="p-4 lg:p-10 max-w-5xl mx-auto">{formContent}</div>;
  }

  return (
    <div className="fixed inset-0 bg-brand-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 lg:p-8">
      {formContent}
    </div>
  );
};

export default AddPropertyForm;
