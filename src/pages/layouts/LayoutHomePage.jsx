import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
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