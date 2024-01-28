import prisma from '@/lib/prisma';
import { TodoList } from '@/list';

export const metadata = {
    title: 'Todo list',
    description: 'todos'
}

export default async function RestTodo () {

    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }});

    return (
        <TodoList data={todos} />
    );
}