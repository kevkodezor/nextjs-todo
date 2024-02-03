'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
    icon: React.ReactNode;
    route: string;
    title: string;
}

export const SideItems = ({ icon, route, title }: Props) => {

    const path = usePathname();

    return (
        <li>
            <Link href={route}
                className={`
                px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group transition-all
                hover:bg-gradient-to-r hover:bg-sky-600 hover:to-cyan-400 hover:text-white
                ${path === route ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}
            `}>
                {icon}
                <span className='group-hover:text-white'>{title}</span>
            </Link>
        </li>
    );
}