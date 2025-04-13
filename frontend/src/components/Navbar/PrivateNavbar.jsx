import { Fragment, useEffect } from "react";
import { Disclosure, DisclosureButton, Menu, Transition,DisclosurePanel, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { useAuthStore } from "../../store/useAuthStore";
import useThemeStore from "../../store/useThemeStore";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function PrivateNavbar() {
  const location = useLocation();
  const {logout}= useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const handleLogout = ()=>{
      logout();
  }
  return (
    <Disclosure as="nav" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-start items-center">
              <div className="flex justify-center flex-row w-full">
                <div className="-ml-2 mr-2 flex items-left md:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                  {/* Logo */}
                  <GiTakeMyMoney className="h-8 w-auto text-green-500" />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/add-transaction"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300 ${location.pathname === '/add-transaction' ?'border-b-2 border-indigo-500 text-gray-900' :'border-transapernt'}`}
                  >
                    Add Transaction
                  </Link>
                  <Link
                    to="/add-category"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300 ${location.pathname === '/add-category' ?'border-b-2 border-indigo-500' :'border-transparent'}`}
                  >
                    Add Category
                  </Link>
                  <Link
                    to="/categories"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300 ${location.pathname === '/categories' ?'border-b-2 border-indigo-500' :'border-transparent'}`}
                  >
                    Categories
                  </Link>
                  <Link
                    to="/profile"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300 ${location.pathname === '/profile' ?'border-b-2 border-indigo-500' :'border-transparent'}`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300 ${location.pathname === '/dashboard' ?'border-b-2 border-indigo-500' :'border-transparent'}`}
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    type="button"
                    className={`relative inline-flex items-center gap-x-1.5 rounded-md p-2 text-sm font-medium ${isDarkMode ? 'text-yellow-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} focus:outline-none`}
                  >
                    {isDarkMode ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 cursor-pointer"
                  >
                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                    <span>Logout</span>
                  </button>

                  {/* <Link
                  to="/"
                  className="relative m-2 inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 cursor-pointer"
                  >
                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                    LogOut
                  </Link> */}
                </div>
                <div className="hidden md:ml-1 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-1">
                    <div>
                  <MenuButton className={`relative flex rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-white'} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="/student-dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                `block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                              )}
                            >
                              My Dashboard
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              // onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                `block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navs  private links*/}
          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/add-transaction">
                  <DisclosureButton
                    as="button"
                    className={`block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} sm:pl-5 sm:pr-6`}
                >
                  Add Transaction
                </DisclosureButton>
              </Link>
              <Link to="/add-category">
                  <DisclosureButton
                    as="button"
                    className={`block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} sm:pl-5 sm:pr-6`}
                >
                  Add Category
                </DisclosureButton>
              </Link>
              <Link to="/categories">
                  <DisclosureButton
                    as="button"
                    className={`block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} sm:pl-5 sm:pr-6`}
                  >
                    Categories
                  </DisclosureButton>
              </Link>
              <Link to="/profile">
                  <DisclosureButton
                    as="button"
                    className={`block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} sm:pl-5 sm:pr-6`}
                  >
                    Profile
                  </DisclosureButton>
              </Link>
              <Link to="/dashboard">
                  <DisclosureButton
                    as="button"
                    className={`block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} sm:pl-5 sm:pr-6`}
                  >
                    My Dashboard
                  </DisclosureButton>
              </Link>
            </div>
            {/* Profile links */}
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="mt-3 space-y-1">
                  <DisclosureButton
                    as="button"
                    onClick={handleLogout}
                    className={`block px-4 py-2 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'} sm:px-6`}
                  >
                    Sign out
                  </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
