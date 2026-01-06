import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPropertyByIdQuery,
  useUpdatePropertyApprovalMutation
} from "../features/api/apiSlice";
import Navbar from "./components/DashboardLayout";

const AdminPropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: property, isLoading } = useGetPropertyByIdQuery(id);
  const [updateApproval] = useUpdatePropertyApprovalMutation();

  if (isLoading || !property) return null;

  const handleApproval = async (status) => {
    await updateApproval({ id, approved: status === "approved" }).unwrap();
    navigate("/admin/properties");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Status Banner */}
        <div className="mb-6 flex items-center justify-between">
          <span
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest
              ${
                property.approval_status === "approved"
                  ? "bg-emerald-500 text-white"
                  : property.approval_status === "pending"
                  ? "bg-amber-400 text-brand-900"
                  : "bg-rose-500 text-white"
              }`}
          >
            {property.approval_status}
          </span>

          {property.approval_status === "pending" && (
            <div className="flex gap-3">
              <button
                onClick={() => handleApproval("approved")}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-extrabold hover:bg-emerald-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleApproval("rejected")}
                className="px-6 py-3 bg-rose-600 text-white rounded-xl font-extrabold hover:bg-rose-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>

        {/* Property Details (reuse same structure as landing) */}
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
          <h1 className="text-4xl font-black text-brand-900 mb-4">
            {property.title}
          </h1>

          <p className="text-slate-500 font-medium mb-6">
            {property.address}, {property.city}, {property.state}
          </p>

          {/* Images */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {property.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                className="rounded-2xl object-cover h-48 w-full"
              />
            ))}
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Detail label="Price" value={property.formattedPrice} />
            <Detail label="Area" value={`${property.area_sqft} sqft`} />
            <Detail label="Bedrooms" value={property.bedrooms || "N/A"} />
            <Detail label="Bathrooms" value={property.bathrooms || "N/A"} />
            <Detail label="Owner" value={property.owner_name} />
            <Detail label="Contact" value={property.owner_contact} />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-black mb-3">Description</h3>
            <p className="text-slate-600 font-medium">
              {property.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </p>
    <p className="text-lg font-black text-brand-900">{value}</p>
  </div>
);

export default AdminPropertyDetails;
