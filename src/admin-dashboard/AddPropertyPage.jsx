import React from "react";
import AddPropertyForm from "../components/AddPropertyForm";

const AddPropertyPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-3xl font-extrabold text-brand-900 tracking-tight">Add New Property</h2>
                <p className="text-sm font-bold text-brand-400 mt-1 uppercase tracking-[0.1em]">Create a new listing for your portfolio</p>
            </div>
            <AddPropertyForm isPage={true} />
        </div>
    );
};

export default AddPropertyPage;
