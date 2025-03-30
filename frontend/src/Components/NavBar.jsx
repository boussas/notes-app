import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { Search } from "lucide-react";

export const NavBar = ({ searchQuery, setSearchQuery }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white w-full shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between py-3 px-4 md:px-8 gap-4">
        <div className="text-black text-xl font-bold w-full md:w-auto text-center md:text-left">
          <Link to="/">Home</Link>
        </div>

        {user && (
          <>
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search notes here..."
                className="bg-gray-100 outline-none pl-10 pr-3 py-2 rounded-full w-full focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-5 w-full md:w-auto justify-center">
              <span className="text-gray-800 font-medium text-sm sm:text-base">
                Welcome, {user.fullName}
              </span>

              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition cursor-pointer w-full sm:w-auto text-center"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
