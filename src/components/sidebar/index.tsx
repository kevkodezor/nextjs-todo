import Image from 'next/image';
import Link from 'next/link';
import { CiLogout, CiHome, CiSquareCheck, CiBoxList } from 'react-icons/ci';
import { PiCookieDuotone } from 'react-icons/pi';
import { SideItems } from './sideitems';
import { IoCartOutline } from 'react-icons/io5';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const menuItems = [
    { icon: <CiHome />, title: 'Home', route: '/dashboard' },
    { icon: <CiSquareCheck />, title: 'Todos', route: '/dashboard/rest-todo' },
    { icon: <CiBoxList />, title: 'Server Actions', route: '/dashboard/server-actions' },
    { icon: <PiCookieDuotone />, title: 'Cookies', route: '/dashboard/cookies' },
    { icon: <IoCartOutline />, title: 'Products', route: '/dashboard/products' },
]

export const Sidebar = async () => {

    const session = await getServerSession(authOptions);

    const username = session?.user?.name ?? 'User name';
    const avatar = session?.user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';
    // const role = session?.user?.role ?? 'User role';

    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    <Link href="/dashboard" title="home">
                        <Image
                            src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                            className="w-32"
                            alt="tailus logo"
                            width={150}
                            height={150}
                        />
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <Image
                        src={avatar}
                        alt='photo profile'
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                        width={150}
                        height={150}
                    />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{username}</h5>
                    <span className="hidden text-gray-400 lg:block">'Admin</span>
                </div>

                <ul key='8991' className='space-y-2 tracking-wide mt-8 overflow-auto'>
                    {menuItems.map(item => (
                        <SideItems
                            icon={item.icon}
                            title={item.title}
                            route={item.route}
                        />
                    ))}
                </ul>
            </div>

            <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
                <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
                    <CiLogout />
                    <span className='group-hover:text-gray-700'>Logout</span>
                </button>
            </div>
        </aside>
    );
}