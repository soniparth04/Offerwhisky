import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewCatalog = () => {
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get(
          "https://offerwhisky.onrender.com/api/owner/view-catalog",
          {
            withCredentials: true,
          }
        );
        setCatalogs(response.data);
      } catch (err) {
        console.log("Error fetching catalogs", err);
      }
    };

    fetchCatalogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">All Catalogs</h2>
      {catalogs.length === 0 ? (
        <p className="text-center text-gray-500">No catalogs available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 lg:gap-5">
          {catalogs.map((catalog) => (
            <div key={catalog._id} className="bg-white rounded-lg shadow pb-4">
              {catalog.image && (
                <img
                  src={catalog.image}
                  alt={catalog.title}
                  className="w-full object-cover rounded-md"
                />
              )}
              <div className="m-2">
                <h3 className="text-lg font-bold">{catalog.title}</h3>
                <p className="text-sm">{catalog.description}</p>
                <p className="text-sm">{catalog.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCatalog;
