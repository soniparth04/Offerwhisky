import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ViewCatalog = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState({});

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get(
          "https://offerwhisky.onrender.com/api/owner/view-catalog",
          { withCredentials: true }
        );
        setCatalogs(response.data);

        const initialIndexes = {};
        response.data.forEach((catalog) => {
          initialIndexes[catalog._id] = 0;
        });
        setCurrentIndexes(initialIndexes);
      } catch (err) {
        console.log("Error fetching catalogs", err);
      }
    };

    fetchCatalogs();
  }, []);

  const handlePrev = (id) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : prev[id],
    }));
  };

  const handleNext = (id, totalImages) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: prev[id] < totalImages - 1 ? prev[id] + 1 : prev[id],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">All Catalogs</h2>
      {catalogs.length === 0 ? (
        <p className="text-center text-gray-500">No catalogs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {catalogs.map((catalog) => {
            const images = catalog.image || [];
            const currentImage = currentIndexes[catalog._id] || 0;

            return (
              <div
                key={catalog._id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
                  {images.length > 0 ? (
                    <>
                      <img
                        src={images[currentImage]}
                        alt={`catalog-${currentImage}`}
                        className="h-full object-contain"
                      />

                      {/* Image count badge (only if more than 1 image) */}
                      {images.length > 1 && (
                        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full opacity-80">
                          {currentImage + 1} / {images.length}
                        </div>
                      )}

                      {/* Left arrow (only if not first image) */}
                      {images.length > 1 && currentImage > 0 && (
                        <button
                          onClick={() => handlePrev(catalog._id)}
                          className="absolute left-2 text-white bg-black/40 rounded-full p-1"
                        >
                          <ChevronLeft size={20} />
                        </button>
                      )}

                      {/* Right arrow (only if not last image) */}
                      {images.length > 1 && currentImage < images.length - 1 && (
                        <button
                          onClick={() =>
                            handleNext(catalog._id, images.length)
                          }
                          className="absolute right-2 text-white bg-black/40 rounded-full p-1"
                        >
                          <ChevronRight size={20} />
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-400">No image</p>
                  )}
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-bold">{catalog.title}</h3>
                  <p className="text-sm text-gray-700">{catalog.description}</p>
                  <p className="text-sm font-medium mt-1">Price: ₹{catalog.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewCatalog;
