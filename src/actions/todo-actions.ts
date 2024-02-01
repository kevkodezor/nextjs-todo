'use server'
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const updateTodoServer = async (id:string, complete:boolean):Promise<Todo> => {
    const todo = await prisma.todo.findFirst({ where: { id }});
    if (!todo) throw `Todo ${id} not found`;
    
    const updateTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    }) ;
    // This help to mantained changes in the route
    revalidatePath('/dashboard/server-actions');
    return updateTodo; 
}

export const createTodoServer = async (description: string): Promise<Todo> => {
    const todo = await prisma.todo.create({ data: { description} });
    revalidatePath('/dashboard/server-actions');
    return todo;
}

export const deleteTodosServer = async (): Promise<void> => {
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath('/dashboard/server-actions');
}