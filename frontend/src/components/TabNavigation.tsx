import { ActiveTab } from "@/types";

interface TabNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="tab-container">
      <button
        className={`tab ${activeTab === "single" ? "tab-active" : ""}`}
        onClick={() => onTabChange("single")}
      >
        Single Check
      </button>
      <button
        className={`tab ${activeTab === "batch" ? "tab-active" : ""}`}
        onClick={() => onTabChange("batch")}
      >
        Batch Check
      </button>
    </div>
  );
}
