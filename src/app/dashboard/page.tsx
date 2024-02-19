export const dynamic = 'forve-dynamic';
export const revalidate = false;

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Widget } from '@/components';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getUserSession } from '@/actions/auth';

export const metadata = {
    title: 'Dashboard'
}

export default async function Dashboard () {

    const user = await getUserSession();
    if (!user) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany({
        where: { userId: user.id },
        orderBy: { createAt: 'desc'}
    }); 
    const completed = todos.filter(todo => todo.complete === true);
    const pending = todos.filter(todo => todo.complete === false);

    const session = await getServerSession(authOptions);
    if (!session) redirect('/api/auth/signin');

    return (
        <div className='grid gap-2'>
            <h1 className='text-4xl'>Todos</h1>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <Widget title='All Todos' total={todos.length} />
                <Widget title='Completed' total={completed.length} />
                <Widget title='Pending' total={pending.length} />
            </div>
            <h2 className='text-2xl'>Información de usuario</h2>
            {session.user?.name}
            <hr />
            {session.user?.email}
            <hr />
            {session.user?.image}
        </div>
    );
}