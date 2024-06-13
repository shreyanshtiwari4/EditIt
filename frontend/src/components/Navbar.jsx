
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.clear();
        navigate('/login');
    }, [navigate]);

    // const userImage = user.avatarURL;
    // const firstName = user.firstName;
    // const lastName  = user.lastName;
    // {  user && <div> {user.firstName} </div> }

    return (
        <div class="w-screen flex flex-row items-center p-3 justify-between bg-white shadow-xs">
            { user && <div class="ml-8 text-lg text-gray-700 hidden md:flex">{ user.username }</div>}
            <span class="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
                <input type="search" name="serch" placeholder="Search"
                    class="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none" />
                <i class="fas fa-search m-3 mr-5 text-lg text-gray-700 w-4 h-4">
                </i>
            </span>
            <div class="flex flex-row-reverse mr-4 ml-4 md:hidden">
                <i class="fas fa-bars"></i>
            </div >
            <div class="flex flex-row-reverse mr-8 hidden md:flex">
                <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Button</div>
                <div class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Link</div>
            </div>
        </div>
    );
}

export default Navbar;
