'use client'
import { IoTrashOutline } from 'react-icons/io5';

export const CreateTodo = () => {
    return (
        <form className='flex gap-2 items-center'>
            <input type='text'
                className='w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all'
                placeholder='¿Cuál es la nueva tarea?' />

            <button type='submit' className='flex items-center justify-center rounded h-10 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all'>
                Crear
            </button>

            <span className='flex flex-1'></span>

            <button
                //TODO: onClick={ () => deleteCompleted() }
                type='button' className='flex items-center justify-center rounded h-10 bg-red-400 p-2 text-white hover:bg-red-700 transition-all'>
                <IoTrashOutline />
                Delete
            </button>
        </form>
    )
}
