import {assets} from "../assets/frontend_assets/assets";
import {Link,  NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems}= useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        setToken('');
        localStorage.removeItem('token');
        setCartItems({});
    }

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to="/"><img src={assets.logo} alt="logo" className="w-36" /></Link>
            <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

            </ul>
            <div className="flex items-center gap-6">
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="searchIcon" />
                <div className="relative group">
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer" alt="profileIcon" />
                    {/* Dropdown menu */}
                    {token && <div className="absolute right-0 pt-4 group-hover:block dropdown-menu">
                        <div className="flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100">
                            <p className="cursor-pointer hover:text-black">My Profile</p>
                            <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                            <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>}
                </div>
                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} alt="cartIcon" className="w-5 min-w-5" />
                        <p className="absolute right-[-5px] bottom-[-5px] leading-4 w-4 text-center bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                        <img src={assets.dropdown_icon} className="h-4 rotate-180 cursor-pointer" alt="" />
                        <p>Back</p>
                    </div>
                        <NavLink to='/' onClick={() => setVisible(false)}  className='py-2 pl-6 border'>
                            Home
                        </NavLink>
                        <NavLink to='/collection' onClick={() => setVisible(false)}  className='py-2 pl-6 border'>
                            COLLECTION
                        </NavLink>
                        <NavLink to='/about' onClick={() => setVisible(false)} className='py-2 pl-6 border'>
                            ABOUT
                        </NavLink>
                        <NavLink to='/contact'onClick={() => setVisible(false)} className='py-2 pl-6 border'>
                            CONTACT
                        </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar