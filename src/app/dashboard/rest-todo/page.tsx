import prisma from '@/lib/prisma';
import { TodoList } from '@/list';
import { CreateTodo } from '@/list/todos/create';

export const metadata = {
    title: 'Todo list',
    description: 'todos'
}

export default async function RestTodo () {

    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }});

    return (
        <div className='grid gap-5'>
            <CreateTodo />
            <TodoList data={todos} />
        </div>
    );
}