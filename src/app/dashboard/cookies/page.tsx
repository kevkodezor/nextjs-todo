import { cookies } from 'next/headers';
import { TabBar } from '@/components';

export const metadata = {
    title: 'Cookies'
}

export default function Cookies() {

    const cookieStore = cookies();
    const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';

    return (
        <div className='flex flex-col gap-3 bg-white rounded-md p-2 h-96'>
            <span className='text-3xl'>TabBar</span>
            <TabBar indexTab={Number(cookieTab)} />
        </div>
    )
}
