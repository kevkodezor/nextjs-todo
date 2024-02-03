export const dynamic = 'forve-dynamic';
export const revalidate = false;

import prisma from '@/lib/prisma';
import { Widget } from '@/components';

export const metadata = {
    title: 'Dashboard'
}

export default async function Dashboard () {

    const todos = await prisma.todo.findMany({ orderBy: { createAt: 'desc' } });
    const completed = todos.filter(todo => todo.complete === true);
    const pending = todos.filter(todo => todo.complete === false);

    return (
        <div className='grid gap-2'>
            <h1 className='text-4xl'>Todos</h1>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <Widget title='All Todos' total={todos.length} />
                <Widget title='Completed' total={completed.length} />
                <Widget title='Pending' total={pending.length} />
            </div>
        </div>
    );
}