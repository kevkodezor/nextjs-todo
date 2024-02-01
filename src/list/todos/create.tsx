'use client'
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoTrashOutline } from 'react-icons/io5';
import { cretaeTodo, deleteTodos } from '@/helpers/todo';
import { createTodoServer } from '@/actions';

export const CreateTodo = () => {

    const [description, setDescription] = useState('');
    const router = useRouter();

    const onCreate = async (e:FormEvent) => {
        e.preventDefault();
        if (description.trim().length === 0) return;
        
        // await cretaeTodo(description); // This function use REST API
        await createTodoServer(description); // This funcion use server actions
        setDescription('');
        // router.refresh(); // Enable when use REST API
    }

    const onDelete = async () => {
        await deleteTodos();
        router.refresh();
    }

    return (
        <form className='flex gap-2 items-center' onSubmit={onCreate}>
            <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all'
                placeholder='¿Cuál es la nueva tarea?' />

            <button type='submit' className='flex items-center justify-center rounded h-10 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all'>
                Crear
            </button>

            <span className='flex flex-1'></span>

            <button
                onClick={() => onDelete()}
                type='button' className='flex items-center justify-center rounded h-10 bg-red-400 p-2 text-white hover:bg-red-700 transition-all'>
                <IoTrashOutline />
                Borrar completadas
            </button>
        </form>
    )
}
