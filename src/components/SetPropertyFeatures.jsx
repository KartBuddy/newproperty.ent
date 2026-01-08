import { useState } from "react";
import { Image, Home } from "lucide-react";

const PROPERTY_TYPES = [
  "1 RK",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Terrace Flats",
];

const SetPropertyFeatures = () => {
  const [form, setForm] = useState({
    projectName: "",
    area: "",
    image1: null,
    image2: null,
    propertyTypes: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const togglePropertyType = (type) => {
    setForm((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeature = {
      id: Date.now(),
      projectName: form.projectName,
      image1: URL.createObjectURL(form.image1),
      image2: URL.createObjectURL(form.image2),
      area: form.area,
      propertyTypes: form.propertyTypes,
    };

    const existing = JSON.parse(localStorage.getItem("featuredProperties")) || [];
    const updated = [newFeature, ...existing];
    localStorage.setItem("featuredProperties", JSON.stringify(updated));

    // Reset form
    setForm({
      projectName: "",
      area: "",
      image1: null,
      image2: null,
      propertyTypes: [],
    });

    alert("Featured property saved!");
  };

  return (
    <div className="mt-12 border-t border-slate-100 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <Home className="text-brand-500" />
        <h3 className="text-xl font-extrabold text-brand-900">Set Featured Properties</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1 block mb-2">
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="Enter project name"
            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1 block mb-2">
              Image 1
            </label>
            <label className="flex items-center justify-center border-2 border-dashed rounded-2xl h-32 cursor-pointer hover:border-brand-400 transition bg-slate-50">
              <input
                type="file"
                name="image1"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                required
              />
              <div className="flex flex-col items-center text-slate-400">
                <Image size={28} className="mb-1" />
                <span className="text-sm">Upload Image</span>
              </div>
            </label>
          </div>

          <div>
            <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1 block mb-2">
              Image 2
            </label>
            <label className="flex items-center justify-center border-2 border-dashed rounded-2xl h-32 cursor-pointer hover:border-brand-400 transition bg-slate-50">
              <input
                type="file"
                name="image2"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                required
              />
              <div className="flex flex-col items-center text-slate-400">
                <Image size={28} className="mb-1" />
                <span className="text-sm">Upload Image</span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1 block mb-2">
            Area (sq.ft)
          </label>
          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Enter area"
            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-brand-900 font-medium placeholder:text-slate-300"
            required
          />
        </div>

        <div>
          <label className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1 block mb-2">
            Property Types
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PROPERTY_TYPES.map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition ${
                  form.propertyTypes.includes(type)
                    ? "bg-brand-50 border-brand-500 text-brand-700"
                    : "bg-white border-slate-200 hover:border-brand-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.propertyTypes.includes(type)}
                  onChange={() => togglePropertyType(type)}
                  className="accent-brand-600"
                />
                <span className="text-sm font-medium">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 bg-brand-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-700 transition-all active:scale-95 shadow-lg shadow-brand-500/10 group"
        >
          Save Property Features
        </button>
      </form>
    </div>
  );
};

export default SetPropertyFeatures;
