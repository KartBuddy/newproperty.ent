import React from "react";
import AddPropertyForm from "./AddPropertyForm";
import Navbar from "./NavBar";

const RequestPropertyPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 px-4">
            <h1 className="text-3xl font-extrabold text-brand-900 tracking-tight">
              Request to Add Property
            </h1>
            <p className="text-sm font-bold text-brand-400 mt-1 uppercase tracking-[0.1em]">
              Your listing will be reviewed by our admin team
            </p>
          </div>

          <AddPropertyForm
            isPage={true}
            mode="client"
          />
        </div>
      </div>
    </>
  );
};

export default RequestPropertyPage;
