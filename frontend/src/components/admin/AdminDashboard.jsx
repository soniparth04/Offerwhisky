import { useState } from "react";
import { Search } from "lucide-react";

const OwnerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-4 ">
      {/* Navigation Panel */}
      <div className="flex items-center justify-center p-4 rounded-md relative">
        <Search className="w-6 h-6 absolute left-4" />
        <h1 className="text-xl font-semibold">OW Admin Dashboard</h1>
        
      </div>
      {/* Search Box */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Total Users</div>
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Total Offers</div>
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Active Users</div>
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Active Offers</div>
      </div>

      <p className="mt-4 font-semibold">Quick actions</p>
      {/* View Links */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">View All Shop Owners</div>
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">View All Users</div>
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">View All Offers</div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
