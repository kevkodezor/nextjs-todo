import prisma from '@/lib/prisma';
import { TodoList } from '@/list';
import { CreateTodo } from '@/list/todos/create';

export const metadata = {
    title: 'Server Todos',
    description: 'todos'
}

export default async function ServerTodo () {

    const todos = await prisma.todo.findMany({ orderBy: { createAt: 'desc' }});

    return (
        <div className='grid gap-5'>
            Server actions
            <CreateTodo />
            <TodoList data={todos} />
        </div>
    );
}