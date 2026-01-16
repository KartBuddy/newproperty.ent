import React, { useState, useEffect } from "react";
import {
  useAddPropertyMutation,
  useUpdatePropertyMutation,
  useSubmitPropertyRequestMutation,
} from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const FURNISHING_OPTIONS = [
  'Light', 'Ceiling Fan', 'Air Conditioner (AC)', 'Heater', 'Air Cooler',
  'Television (TV)', 'Modular Kitchen', 'Sofa Set', 'Dining Table', 'Wardrobe',
  'King Size Bed', 'Queen Size Bed', 'Mattress', 'Washing Machine',
  'Refrigerator', 'Microwave / Oven', 'Geyser', 'Chimney', 'Curtains / Blinds', 'Study Table'
];

// Amenity options
const CORE_BUILDING_FEATURES = [
  'Lobby reception / concierge / porter service',
  'Elevators (multiple & service lifts)',
  'Power backup (generators/UPS)',
  'Reliable water supply and storage systems',
  'BMC Water supply',
  'Covered & visitor parking',
  'EV charging stations',
  'Bike parking',
  'Wi-Fi in common areas',
  'Smart building systems'
];

const CONVENIENCE_SERVICES = [
  'Package delivery lockers',
  'On-site maintenance team',
  'Waste management and recycling',
  'Rainwater harvesting / sustainability systems',
  'Dry-cleaning / laundry services',
  'Retail essentials (grocery, pharmacy)'
];

const FITNESS_WELLNESS = [
  'Gym & fitness centre',
  'Yoga / aerobics / wellness zones',
  'Jogging & walking tracks',
  'Spa / sauna / steam rooms',
  'Swimming pools (lap & leisure)'
];

const FAMILIES_RECREATION = [
  'Children\'s play areas',
  'Sports courts (badminton, basketball, tennis)',
  'Clubhouse / community hall',
  'Multipurpose rooms',
  'Mini-theatre / entertainment rooms',
  'Co-working / shared workspaces',
  'Community gardens & green spaces'
];

const SOCIAL_LEISURE_SPACES = [
  'Rooftop lounges & decks',
  'BBQ & outdoor seating zones',
  'Cafe / coffee spots (in luxury projects)',
  'Party / banquet halls',
  'Library / reading rooms'
];

const COMMERCIAL_AMENITIES = [
  'High-speed elevators & access control',
  'Business lounges / meeting rooms',
  'Conference & event halls',
  'Cafeterias / food courts',
  'On-site retail and services',
  'Shared co-working spaces',
  'Multi-level parking & EV infrastructure',
  'Central HVAC and power backup'
];

const PROPERTY_TYPES = {
  residential: ['Flat', 'Apartment', 'Villa', 'Plot'],
  commercial: ['Office', 'Shop', 'Warehouse'],
  industrial: ['Factory', 'Industrial Shed']
};

const AddPropertyForm = ({ onClose, property, isPage, mode = "admin" }) => {
  const navigate = useNavigate();
  const [addProperty, { isLoading: isAdding }] = useAddPropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation();
  const [submitPropertyRequest] = useSubmitPropertyRequestMutation();

  const isLoading = isAdding || isUpdating;

  const [formData, setFormData] = useState({
    title: "",
    property_category: "",
    property_type: "",
    transaction_type: "",
    price: "",
    monthly_rent: "",
    security_deposit: "",
    area_sqft: "",
    usable_carpet_area: "",
    bedrooms: "",
    bathrooms: "",
    kitchens: "",
    halls: "",
    bhk_type: "",
    parking: false,
    flat_office_no: "",
    wing_block_tower: "",
    floor_no: "",
    building_society_name: "",
    plot_cts_survey_no: "",
    street_road_name: "",
    landmark: "",
    local_area_sector: "",
    area_locality: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    truck_access_available: false,
    furnishing_status: "",
    furnishings: [],
    core_building_features: [],
    convenience_services: [],
    fitness_wellness: [],
    families_recreation: [],
    social_leisure_spaces: [],
    commercial_amenities: [],
    description: "",
    owner_name: "",
    owner_contact: "",
    status: "available"
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [customFurnishing, setCustomFurnishing] = useState("");
  const [availablePropertyTypes, setAvailablePropertyTypes] = useState([]);
  const [activeAmenityTab, setActiveAmenityTab] = useState('Core Building Features');

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        property_category: property.property_category || "",
        property_type: property.property_type || "",
        transaction_type: property.transaction_type || "",
        price: property.price_raw || property.price || "",
        monthly_rent: property.monthly_rent || "",
        security_deposit: property.security_deposit || "",
        area_sqft: property.area_sqft || "",
        usable_carpet_area: property.usable_carpet_area || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        kitchens: property.kitchens || "",
        halls: property.halls || "",
        bhk_type: property.bhk_type || "",
        parking: property.parking || false,
        flat_office_no: property.flat_office_no || "",
        wing_block_tower: property.wing_block_tower || "",
        floor_no: property.floor_no || "",
        building_society_name: property.building_society_name || "",
        plot_cts_survey_no: property.plot_cts_survey_no || "",
        street_road_name: property.street_road_name || "",
        landmark: property.landmark || "",
        local_area_sector: property.local_area_sector || "",
        area_locality: property.area_locality || "",
        city: property.city || "",
        district: property.district || "",
        state: property.state || "",
        pincode: property.pincode || "",
        truck_access_available: property.truck_access_available || false,
        furnishing_status: property.furnishing_status || "",
        furnishings: property.furnishings || [],
        core_building_features: property.core_building_features || [],
        convenience_services: property.convenience_services || [],
        fitness_wellness: property.fitness_wellness || [],
        families_recreation: property.families_recreation || [],
        social_leisure_spaces: property.social_leisure_spaces || [],
        commercial_amenities: property.commercial_amenities || [],
        description: property.description || "",
        owner_name: property.owner_name || "",
        owner_contact: property.owner_contact || "",
        status: property.status || "available"
      });
    }
  }, [property]);

  useEffect(() => {
    if (formData.property_category) {
      setAvailablePropertyTypes(PROPERTY_TYPES[formData.property_category] || []);
      const currentType = formData.property_type;
      const validTypes = PROPERTY_TYPES[formData.property_category]?.map(t => t.toLowerCase().replace(' ', '_')) || [];
      if (!validTypes.includes(currentType)) {
        setFormData(prev => ({ ...prev, property_type: "" }));
      }
    }
  }, [formData.property_category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFurnishingToggle = (item) => {
    setFormData(prev => {
      const furnishings = [...(prev.furnishings || [])];
      const index = furnishings.indexOf(item);
      if (index === -1) {
        furnishings.push(item);
      } else {
        furnishings.splice(index, 1);
      }
      return { ...prev, furnishings };
    });
  };

  const addCustomFurnishing = () => {
    if (customFurnishing.trim()) {
      handleFurnishingToggle(customFurnishing.trim());
      setCustomFurnishing("");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create image previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'furnishings' && Array.isArray(formData[key])) {
        submitData.append(key, JSON.stringify(formData[key]));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    selectedFiles.forEach((file) => {
      submitData.append("images", file);
    });

    try {
      if (property) {
        await updateProperty({ id: property.id, formData: submitData }).unwrap();
        alert("Property Updated Successfully!");
      } else {
        if (mode === "client") {
          await submitPropertyRequest(submitData).unwrap();
          alert("Your property has been submitted for approval.");
        } else {
          await addProperty(submitData).unwrap();
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
        alert(err.data?.message || err.error || "Failed to save property.");
      }
    }
  };

  const showPlotFields = formData.property_type !== 'plot';
  const showTruckAccess = ['commercial', 'industrial'].includes(formData.property_category);
  const showFurnishing = formData.furnishing_status && formData.furnishing_status !== 'unfurnished';

  const renderAmenityCheckboxes = () => {
    let amenities = [];
    let fieldName = '';
    
    switch (activeAmenityTab) {
      case 'Core Building Features':
        amenities = CORE_BUILDING_FEATURES;
        fieldName = 'core_building_features';
        break;
      case 'Convenience & Services':
        amenities = CONVENIENCE_SERVICES;
        fieldName = 'convenience_services';
        break;
      case 'Fitness & Wellness':
        amenities = FITNESS_WELLNESS;
        fieldName = 'fitness_wellness';
        break;
      case 'Families & Recreation':
        amenities = FAMILIES_RECREATION;
        fieldName = 'families_recreation';
        break;
      case 'Social & Leisure':
        amenities = SOCIAL_LEISURE_SPACES;
        fieldName = 'social_leisure_spaces';
        break;
      case 'Commercial':
        amenities = COMMERCIAL_AMENITIES;
        fieldName = 'commercial_amenities';
        break;
      default:
        amenities = [];
    }

    return amenities.map((amenity) => {
      const isChecked = formData[fieldName]?.includes(amenity) || false;
      return (
        <label 
          key={amenity} 
          className={`flex items-start p-3 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer ${
            isChecked 
              ? 'bg-brand-50 border border-brand-100' 
              : 'bg-white border border-slate-100 hover:border-brand-100 hover:bg-brand-50/50'
          }`}
        >
          <div className="flex items-center h-5 mt-0.5">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleAmenityToggle(fieldName, amenity)}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 transition"
            />
          </div>
          <span className="ml-3 text-sm font-medium text-slate-700">
            {amenity}
          </span>
        </label>
      );
    });
  };

  const handleAmenityToggle = (field, item) => {
    setFormData(prev => {
      const currentAmenities = [...(prev[field] || [])];
      const index = currentAmenities.indexOf(item);
      if (index === -1) {
        currentAmenities.push(item);
      } else {
        currentAmenities.splice(index, 1);
      }
      return { ...prev, [field]: currentAmenities };
    });
  };

  const formContent = (
    <div className={`${isPage ? 'bg-white rounded-[40px] shadow-[0_20px_60px_rgba(15,40,84,0.05)] border border-slate-50' : 'bg-white rounded-[40px] w-full max-w-6xl overflow-y-auto max-h-[90vh] shadow-2xl border border-slate-100'} p-10 space-y-8`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">
            {property ? 'Edit Property' : 'Add New Listing'}
          </h2>
          <p className="text-sm font-bold text-brand-400 mt-1 uppercase tracking-[0.1em]">
            {property ? 'Update existing property information' : 'Fill in complete details to list on the market'}
          </p>
        </div>
        {!isPage && (
          <button onClick={onClose} type="button" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-brand-700 transition-all">✕</button>
        )}
      </div>

      <div className="space-y-6">
        {/* 1. Property Basics */}
        <section className="p-6 bg-slate-50 rounded-2xl">
          <h3 className="text-lg font-bold text-brand-900 mb-4">1. Property Basics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Category*</label>
              <select name="property_category" value={formData.property_category} onChange={handleChange} required className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all">
                <option value="">Select</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Type*</label>
              <select name="property_type" value={formData.property_type} onChange={handleChange} required disabled={!formData.property_category} className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all disabled:bg-gray-100">
                <option value="">Select</option>
                {availablePropertyTypes.map(type => (
                  <option key={type} value={type.toLowerCase().replace(' ', '_')}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Transaction Type*</label>
              <select name="transaction_type" value={formData.transaction_type} onChange={handleChange} required className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all">
                <option value="">Select</option>
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Title*</label>
              <input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Modern Villa in Thane West" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>

            {formData.transaction_type === 'sale' && (
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Expected Sale Price (₹)*</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="5000000" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
              </div>
            )}

            {formData.transaction_type === 'rent' && (
              <>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Monthly Rent (₹)*</label>
                  <input type="number" name="monthly_rent" value={formData.monthly_rent} onChange={handleChange} required placeholder="25000" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Security Deposit (₹)</label>
                  <input type="number" name="security_deposit" value={formData.security_deposit} onChange={handleChange} placeholder="50000" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
                </div>
              </>
            )}
          </div>
        </section>

        {/* 2. Property Address */}
        {showPlotFields && (
          <section className="p-6 bg-slate-50 rounded-2xl">
            <h3 className="text-lg font-bold text-brand-900 mb-4">2. Property Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Flat / Office No.</label>
                <input name="flat_office_no" value={formData.flat_office_no} onChange={handleChange} placeholder="1201" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Wing / Block / Tower</label>
                <input name="wing_block_tower" value={formData.wing_block_tower} onChange={handleChange} placeholder="A Wing" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Floor No.</label>
                <input name="floor_no" value={formData.floor_no} onChange={handleChange} placeholder="12" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Building / Society Name</label>
                <input name="building_society_name" value={formData.building_society_name} onChange={handleChange} placeholder="Paradise Apartments" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Plot / CTS / Survey No.</label>
                <input name="plot_cts_survey_no" value={formData.plot_cts_survey_no} onChange={handleChange} placeholder="CTS 1234" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
              </div>
            </div>
          </section>
        )}

        {/* 3. Street & Locality */}
        <section className="p-6 bg-slate-50 rounded-2xl">
          <h3 className="text-lg font-bold text-brand-900 mb-4">3. Street & Locality</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Street / Road Name</label>
              <input name="street_road_name" value={formData.street_road_name} onChange={handleChange} placeholder="MG Road" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Landmark</label>
              <input name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Near City Mall" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Local Area / Sector</label>
              <input name="local_area_sector" value={formData.local_area_sector} onChange={handleChange} placeholder="Sector 15" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Area / Locality</label>
              <input name="area_locality" value={formData.area_locality} onChange={handleChange} placeholder="Andheri West" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
          </div>
        </section>

        {/* 4. Administrative Details */}
        <section className="p-6 bg-slate-50 rounded-2xl">
          <h3 className="text-lg font-bold text-brand-900 mb-4">4. Administrative Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">City*</label>
              <input name="city" value={formData.city} onChange={handleChange} required placeholder="Mumbai" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">District*</label>
              <input name="district" value={formData.district} onChange={handleChange} required placeholder="Mumbai Suburban" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">State*</label>
              <input name="state" value={formData.state} onChange={handleChange} required placeholder="Maharashtra" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Pincode*</label>
              <input name="pincode" value={formData.pincode} onChange={handleChange} required maxLength="6" placeholder="400001" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
          </div>
        </section>

        {/* 5. Property Specifications */}
        <section className="p-6 bg-slate-50 rounded-2xl">
          <h3 className="text-lg font-bold text-brand-900 mb-4">5. Property Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Total Area (sq ft)*</label>
              <input type="number" name="area_sqft" value={formData.area_sqft} onChange={handleChange} required placeholder="1200" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Usable Carpet Area (sq ft)</label>
              <input type="number" name="usable_carpet_area" value={formData.usable_carpet_area} onChange={handleChange} placeholder="1000" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            {formData.property_category === 'residential' && (
              <>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">BHK Type</label>
                  <input name="bhk_type" value={formData.bhk_type} onChange={handleChange} placeholder="2 BHK, 3 BHK, Studio" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Bedrooms</label>
                  <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="3" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Bathrooms</label>
                  <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="2" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Kitchens</label>
                  <input type="number" name="kitchens" value={formData.kitchens} onChange={handleChange} placeholder="1" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Halls / Living Rooms</label>
                  <input type="number" name="halls" value={formData.halls} onChange={handleChange} placeholder="1" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
                </div>
              </>
            )}
            <div className="flex items-center pt-6">
              <input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} id="parking" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-700 focus:ring-offset-0 focus:ring-brand-500/20 transition-all cursor-pointer" />
              <label htmlFor="parking" className="ml-2 text-sm font-extrabold text-brand-900 cursor-pointer select-none">Parking Available</label>
            </div>
          </div>
        </section>

        {/* 6. Accessibility */}
        {showTruckAccess && (
          <section className="p-6 bg-slate-50 rounded-2xl">
            <h3 className="text-lg font-bold text-brand-900 mb-4">6. Accessibility</h3>
            <div className="flex items-center">
              <input type="checkbox" name="truck_access_available" checked={formData.truck_access_available} onChange={handleChange} id="truck" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-700 focus:ring-offset-0 focus:ring-brand-500/20 transition-all cursor-pointer" />
              <label htmlFor="truck" className="ml-2 text-sm font-extrabold text-brand-900 cursor-pointer select-none">Truck Access Available</label>
            </div>
          </section>
        )}

        {/* 7. Furnishing */}
        <section className="p-6 bg-slate-50 rounded-2xl">
          <h3 className="text-lg font-bold text-brand-900 mb-4">7. Furnishing Details</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Furnishing Status</label>
              <select name="furnishing_status" value={formData.furnishing_status} onChange={handleChange} className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all">
                <option value="">Select</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>

            {showFurnishing && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-600">Available Furnishings</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {FURNISHING_OPTIONS.map(item => (
                    <label key={item} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" checked={formData.furnishings.includes(item)} onChange={() => handleFurnishingToggle(item)} className="h-4 w-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </label>
                  ))}
                  {formData.furnishings.filter(f => !FURNISHING_OPTIONS.includes(f)).map(item => (
                    <label key={item} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" checked onChange={() => handleFurnishingToggle(item)} className="h-4 w-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={customFurnishing} onChange={(e) => setCustomFurnishing(e.target.value)} placeholder="Add custom item" className="flex-1 px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
                  <button onClick={addCustomFurnishing} className="px-6 py-4 bg-green-600 text-white rounded-2xl text-sm font-bold hover:bg-green-700 transition-all">Add</button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 8. Property Amenities - Enhanced */}
        <section className="p-4 sm:p-6 bg-slate-50 rounded-2xl">
          <h3 className="text-lg font-bold text-brand-900 mb-4 sm:mb-6">8. Property Amenities</h3>
          
          {/* Grid Tab Navigation */}
          <div className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Core Building Features', 'Convenience & Services', 'Fitness & Wellness', 'Families & Recreation', 'Social & Leisure', 'Commercial'].map((tab) => (
                <button
                  key={tab}
                  className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 text-left ${
                    activeAmenityTab === tab
                      ? 'bg-brand-100 text-brand-700 shadow-sm'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                  onClick={() => setActiveAmenityTab(tab)}
                  title={tab}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Amenities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {renderAmenityCheckboxes()}
          </div>
        </section>

        {/* 9. Owner & Description */}
        <section className="p-6 bg-slate-50 rounded-2xl">
          <h3 className="text-lg font-bold text-brand-900 mb-4">9. Owner & Description</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Owner Name*</label>
              <input name="owner_name" value={formData.owner_name} onChange={handleChange} required placeholder="Rahul Sharma" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Contact Number*</label>
              <input name="owner_contact" value={formData.owner_contact} onChange={handleChange} required placeholder="9876543210" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe the property, amenities, nearby facilities..." className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-brand-900 outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-slate-300 resize-none"></textarea>
          </div>
        </section>

        {/* 9. Property Images */}
        <section className="space-y-3">
          <label className="text-[11px] font-extrabold text-brand-400 uppercase tracking-widest ml-1">Property Gallery</label>
          <div className="relative group">
            <input type="file" multiple onChange={handleFileChange} accept="image/*" className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] cursor-pointer hover:bg-brand-50/30 hover:border-brand-200 transition-all group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-500 shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
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

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-2xl border-2 border-slate-100" />
                  <button onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-8">
          <button onClick={isPage ? () => navigate("/admin/properties") : onClose} className="flex-1 py-4.5 bg-slate-50 text-[13px] font-extrabold text-slate-500 hover:text-brand-900 hover:bg-slate-100 rounded-2xl transition-all">
            Discard Changes
          </button>
          <button onClick={handleSubmit} disabled={isLoading} className="flex-[1.5] py-4.5 bg-brand-700 text-white rounded-2xl text-[13px] font-black uppercase tracking-[0.1em] hover:bg-brand-900 hover:-translate-y-0.5 transition-all shadow-xl shadow-brand-700/20 disabled:opacity-50">
            {isLoading ? "Synchronizing..." : property ? "Update Listing" : "Publish Listing"}
          </button>
        </div>
      </div>
    </div>
  );

  if (isPage) {
    return <div className="p-4 lg:p-10 max-w-7xl mx-auto">{formContent}</div>;
  }

  return (
    <div className="fixed inset-0 bg-brand-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 lg:p-8">
      {formContent}
    </div>
  );
};

export default AddPropertyForm;