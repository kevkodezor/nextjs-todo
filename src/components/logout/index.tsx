'use client'
import { signOut, useSession } from 'next-auth/react';
import { CiLogout } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';

export const Logout = () => {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
                <IoTimeOutline />
                <span className='group-hover:text-gray-700'>Espere...</span>
            </button>
        )
    }

    return (
        <button
            onClick={() => signOut()}
            className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'
        >
            <CiLogout />
            <span className='group-hover:text-gray-700'>Logout</span>
        </button>
    );
}