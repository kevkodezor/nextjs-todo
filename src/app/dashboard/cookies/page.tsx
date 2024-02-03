import { TabBar } from '@/components';

export const metadata = {
    title: 'Cookies'
}

export default function Cookies() {

    return (
        <div className='flex flex-col gap-3 bg-white rounded-md p-2 h-96'>
            <span className='text-3xl'>TabBar</span>
            <TabBar />
        </div>
    )
}
