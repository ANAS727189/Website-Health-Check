"use client";
import { useState } from "react";
import { ActiveTab } from "@/types";
import { Header, TabNavigation, SingleCheck, BatchCheck } from "@/components";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("single");

  return (
    <div className="min-h-screen desert-bg">
      <div className="container">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === "single" && <SingleCheck />}
        {activeTab === "batch" && <BatchCheck />}
      </div>
    </div>
  );
}
