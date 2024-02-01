import { Widget } from '@/components';

export const metadata = {
    title: 'Dashboard'
}

export default function Dashboard () {
    return (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <Widget />
        </div>
    );
}