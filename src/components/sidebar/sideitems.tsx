import Link from 'next/link';
import { CiBookmarkCheck } from 'react-icons/ci';

export const SideItems = () => {
    return (
        <li>
            <Link href='/dashboard/rest-todo' className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
                <CiBookmarkCheck size={30} />
                <span className='group-hover:text-gray-700'>Todos</span>
            </Link>
        </li>
    );
}