import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsBagHeart, BsInfoCircleFill, BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineUnorderedList } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import {
  MdAccountBox,
  MdAccountCircle,
  MdArticle,
  MdCategory,
  MdContactPage,
  MdHome,
  MdMenu,
  MdShop,
} from "react-icons/md";
import logo from "../assets/images/logo/logo_transparent.png";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getUserWishlist } from "../features/user/userSlice";
import Autosuggest from "react-autosuggest";
import { getAProduct } from "../features/product/productSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchProducts, setSearchProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.products);
  const wishlistState = useSelector((state) => state.auth.wishlist);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getUserWishlist());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCartCount(userCartState?.length);
    setWishlistCount(wishlistState?.length);
  }, [userCartState, wishlistState]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < productState?.length; i++) {
      const element = productState[i];
      data.push({
        id: element?._id,
        name: element?.title,
        description: element?.description,
      });
    }
    setSearchProducts(data);
  }, [productState]);

  const getSuggestions = (value) => {
    const inputValue = value?.trim().toLowerCase();
    const inputLength = inputValue?.length;

    return inputLength === 0
      ? []
      : searchProducts.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const handleSuggestionSelected = (e, { suggestion, method }) => {
    if (method === "enter") {
      e.preventDefault();
    }
    setSearchQuery(suggestion.name);
    navigate(`/product/${suggestion.id}`);
    dispatch(getAProduct(suggestion.id));
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleSuggestionsFetchRequested = async ({ value }) => {
    if (!value) {
      console.log(value);
      setSuggestions([]);
      return;
    }
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    value: searchQuery,
    onChange: (e, { newValue }) => {
      setSearchQuery(newValue);
    },
    placeholder: "Search product here...",
    autoComplete: "abcd",
    name: "searchQuery",
  };

  return (
    <>
      <header>
        <nav className="px-5 py-2 items-center border-b-[1px] bg-zinc-50 flex justify-between md:py-0 xl:px-32 md:justify-around">
          <div className="flex items-center md:w-[15%]">
            <div onClick={handleMenu} className="md:hidden mr-3">
              <MdMenu size={22} />
            </div>
            <div className="text-2xl">
              <Link to="/">
                <img className="w-full hidden md:block" src={logo} alt="logo" />
                <h1 className="md:hidden">ShoppingSpot</h1>
              </Link>
            </div>
          </div>
          <div className="mx-10 md:w-[40%] hidden md:flex">
            <div className="w-full">
              {/* <InputWidget
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search Product Here"
              /> */}
              <Autosuggest
                inputProps={inputProps}
                suggestions={suggestions}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={handleSuggestionsClearRequested}
                onSuggestionSelected={handleSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={renderSuggestion}
              />
            </div>
            <Link
              to="/"
              className="w-10 flex -ml-10 z-10 justify-center items-center rounded-sm"
            >
              <BsSearch />
            </Link>
          </div>
          <div className="flex items-center justify-end gap-5 md:gap-0 md:justify-around md:w-[40%]">
            <div className="relative group hidden md:block">
              <button className="hidden py-4 md:hover:text-color-2 gap-1  md:flex flex-col justify-center items-center text-center transition-all duration-300">
                <MdCategory size={22} />
                <div className="flex items-center">
                  <span className="m-0 text-sm">Categories</span>
                  <FaAngleDown />
                </div>
              </button>
              <div className="absolute z-[200] hidden bg-grey-200 group-hover:block">
                <div className="px-2 py-3 bg-white shadow-lg w-48">
                  <div className="my-2">
                    <NavLink to="/pitch-deck" className="link">
                      Electronics
                    </NavLink>
                  </div>
                  <div className="my-2">
                    <NavLink to="/company-reg" className="link">
                      Laptops
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/orders"
              className="py-4 md:hover:text-color-2 gap-1  flex flex-col justify-center items-center text-center transition-all duration-300"
            >
              <AiOutlineUnorderedList size={22} />
              <p className="m-0 text-sm hidden md:block">My Orders</p>
            </Link>
            <Link
              to="/wishlist"
              className="relative md:hover:text-color-2 gap-1  flex flex-col justify-center items-center text-center transition-all duration-300"
            >
              <BsBagHeart size={22} />
              {wishlistCount > 0 && (
                <div className="absolute -top-3 right-1">
                  <span className="bg-color-1 text-white p-1 rounded-full text-[10px]">
                    {wishlistCount}
                  </span>
                </div>
              )}
              <p className="m-0 text-sm hidden md:block">Wishlist</p>
            </Link>
            <Link
              to="/cart"
              className="relative md:hover:text-color-2 gap-1  flex flex-col justify-center items-center text-center transition-all duration-300"
            >
              <AiOutlineShoppingCart size={22} />
              {cartCount > 0 && (
                <div className="absolute -top-3 -right-2">
                  <span className="bg-color-1 text-white p-1 rounded-full text-[10px]">
                    {cartCount}
                  </span>
                </div>
              )}
              <p className="m-0 text-sm hidden md:block">Cart</p>
            </Link>
            {authState?.user === null ? (
              <Link
                to="/login"
                className="my-2 md:py-3 md:px-5 rounded-full md:bg-color-1 md:hover:bg-indigo-800 md:text-white gap-1  flex flex-col md:flex-row justify-center items-center text-center transition-all duration-300"
              >
                <MdAccountBox size={22} />
                <p className="m-0 text-sm hidden lg:block">Login/Register</p>
              </Link>
            ) : (
              <div className="relative group hidden md:block">
                <button className="my-2 md:py-3 md:px-5 rounded-full md:bg-color-1 md:hover:bg-indigo-800 md:text-white gap-1  flex flex-col md:flex-row justify-center items-center text-center transition-all duration-300">
                  <MdAccountCircle size={22} />
                  <p className="m-0 text-sm hidden lg:block">My Account</p>
                </button>
                <div className="absolute z-[200] hidden bg-grey-200 group-hover:block group-hover:transition-all group-hover:duration-300">
                  <div className="px-2 py-3 bg-white shadow-lg w-48">
                    <div className="my-2 hover:text-color-1">
                      <NavLink to="/profile" className="link">
                        Profile
                      </NavLink>
                    </div>
                    <div className="my-2 hover:text-color-1">
                      <button onClick={handleLogout} className="link">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        <nav
          className={`absolute transition-all top-18 ${
            showMenu ? "left-0" : "-left-[700px]"
          }  w-[60%] h-[100%] justify-center md:flex md:sticky md:top-0 md:h-10 md:w-full md:justify-start bg-zinc-100`}
        >
          <div className="py-8 md:py-0 md:block">
            <ul className="flex flex-col items-center gap-8 md:flex-row md:gap-10 md:px-8 lg:px-32">
              <li className="py-2  md:hover:text-color-1 transition-all duration-300">
                <NavLink
                  activeClassName="active"
                  to="/"
                  className="flex items-center gap-2"
                >
                  <MdHome /> Home
                </NavLink>
              </li>
              <li className="py-2  md:hover:text-color-1 transition-all duration-300">
                <NavLink to="/about" className="flex items-center gap-2">
                  <BsInfoCircleFill />
                  About Us
                </NavLink>
              </li>
              <li className="py-2  md:hover:text-color-1 transition-all duration-300">
                <NavLink to="/store" className="flex items-center gap-2">
                  <MdShop />
                  Our Store
                </NavLink>
              </li>
              <li className="py-2  md:hover:text-color-1 transition-all duration-300">
                <NavLink to="/blog" className="flex items-center gap-2">
                  <MdArticle />
                  Blogs
                </NavLink>
              </li>
              <li className="py-2  md:hover:text-color-1 transition-all duration-300">
                <NavLink to="/contact" className="flex items-center gap-2">
                  <MdContactPage />
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:hidden"></div>
        </nav>
      </header>
    </>
  );
};

export default Header;
