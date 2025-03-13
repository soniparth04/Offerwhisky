import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Importing Lucide React icon

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-indigo-500 border-b shadow-md sticky-top px-1 py-3 flex justify-between items-center">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-black hover:text-gray-600"
      >
        <ArrowLeft size={24} />
      </button>

    </nav>
  );
};

export default Navbar;
