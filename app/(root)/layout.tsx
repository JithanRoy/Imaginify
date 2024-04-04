import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { Suspense } from "react";
import React from "react";
import Loading from "../../components/shared/loading";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      {/* Sidebar  */}
      <Sidebar />
      {/* MobileNav  */}
      <MobileNav />
      <div className="root-container">
        <Suspense fallback={<Loading />}>
          <div className="wrapper md:block">{children}</div>
        </Suspense>
      </div>
    </main>
  );
};

export default layout;
