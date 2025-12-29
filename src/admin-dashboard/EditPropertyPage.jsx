import React from "react";
import { useParams } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../features/api/apiSlice";
import AddPropertyForm from "../components/AddPropertyForm";

const EditPropertyPage = () => {
    const { id } = useParams();
    const { data: property, isLoading, error } = useGetPropertyByIdQuery(id);

    if (isLoading) return <div className="p-8 text-center text-brand-400 uppercase font-black animate-pulse">Loading Property Data...</div>;
    if (error) return <div className="p-8 text-center text-rose-500 font-bold uppercase">Error loading property: {error.message}</div>;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">Edit Property</h2>
                <p className="text-sm font-bold text-brand-400 mt-1 uppercase tracking-[0.1em]">Update details for #KB-{id}</p>
            </div>
            <AddPropertyForm isPage={true} property={property} />
        </div>
    );
};

export default EditPropertyPage;
