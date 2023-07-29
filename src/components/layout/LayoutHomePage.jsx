
import React from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';


const LayoutHomePage = () => {
    return (
        <>
            <div className='ml-[15%]'>
                <Header></Header>
                <div className='px-4 pt-5'>
                    <Outlet />
                </div>
            </div>
            <Sidebar></Sidebar>
        </>
    );
};

export default LayoutHomePage;