'use client'

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Profile() {

    const { data: session } = useSession();
    const avatar = session?.user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';

    return (
        <div className='
            bg-white
            rounded-md
            h-96
            flex
            flex-col
            justify-center
            items-center
            p-5
        '>
            <Image
                className='rounded-lg'
                src={avatar}
                alt='photo profile'
                width={150}
                height={150}
            />
            <div className='grid gap-2 m-5 w-full border rounded-md p-1 border-cyan-200'>
                <h4 className='text-1xl flex justify-between'><b>Usuario</b> {session?.user?.name}</h4>
                <hr />
                <h4 className='text-1xl flex justify-between'><b>Correo</b> {session?.user?.email}</h4>
                <hr />
                <h4 className='text-1xl flex justify-between'><b>Rol</b> Admin</h4>
            </div>
        </div>
    );
}