import { Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


export default function PublicNavbar() {
  const navigate = useNavigate();

  // Function to handle navigation and close the mobile menu
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-white to-gray-50 shadow-lg">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  {/* Clickable Logo */}
                  <Link to="/">
                    <GiTakeMyMoney className="h-8 w-auto text-green-500 hover:rotate-12 transition-transform duration-300 cursor-pointer" />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center px-1 pt-1 text-sm border-b-2 border-indigo-500 font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200 "
                  >
                    SpendWise
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to="/register"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
                  >
                    <FaRegUser className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="relative ml-2 inline-flex items-center gap-x-1.5 rounded-md bg-gradient-to-r from-green-600 to-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-green-700 hover:to-green-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 "
                  >
                    <RiLoginCircleLine
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Login
                  </Link>
                      
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden transition-all duration-300 ease-in-out">
            <div className="space-y-1 pb-3 pt-2">
              {/* Use DisclosureButton with onClick for navigation */}
              <DisclosureButton
                as="button"
                onClick={() => {
                  handleNavigation("/register");
                  close(); // Close the mobile menu
                }}
                className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6 transition-all duration-200"
              >
                Register
              </DisclosureButton>
              <DisclosureButton
                as="button"
                onClick={() => {
                  handleNavigation("/login");
                  close(); // Close the mobile menu
                }}
                className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6 transition-all duration-200"
              >
                Login
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
