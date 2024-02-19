export const dynamic = 'forve-dynamic';
export const revalidate = false;

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { TodoList } from '@/list';
import { CreateTodo } from '@/list/todos/create';
import { getUserSession } from '@/actions/auth';

export const metadata = {
    title: 'Server Todos',
    description: 'todos'
}

export default async function ServerTodo () {

    const user = await getUserSession();
    if (!user) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany({
        where: { userId: user.id },
        orderBy: { createAt: 'desc' }
    });

    return (
        <div className='grid gap-5'>
            Server actions
            <CreateTodo />
            <TodoList data={todos} />
        </div>
    );
}