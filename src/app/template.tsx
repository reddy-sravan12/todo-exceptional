import Footer from "@/components/global/footer/page";
import Navbar from "@/components/global/navbar/page";
import StoreLayout from "@/components/global/storeLayout";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-container">
      <StoreLayout>
        <Navbar />
        {children}
        <Footer />
      </StoreLayout>
    </div>
  );
}
