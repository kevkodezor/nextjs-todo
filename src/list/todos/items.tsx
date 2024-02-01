'use client'
import { startTransition, useOptimistic } from 'react'
import { Todo } from '@prisma/client'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import styles from './item.module.css'

interface Props {
    todo: Todo;
    onTodo: (id:string, complete:boolean) => Promise<Todo|void>
}

export const TodoItem = ({ todo, onTodo }: Props) => {
    // Simulate hook useState
    const [todoOptimized, setTodoOptimized] = useOptimistic(
        todo,
        (state, newComplete: boolean) => ({...state, newComplete })
    );

    const onToggleTodo = async () => {
        try {
            startTransition(() => setTodoOptimized(!todoOptimized.complete));
            await onTodo(todoOptimized.id, !todoOptimized.complete)
        } catch (error) {
            startTransition(() => setTodoOptimized(!todoOptimized.complete));
        }
    }

  return (
      <div className={todoOptimized.complete ? styles.todoDone : styles.todoPending}>
        <div className='flex flex-col sm:flex-row justify-start items-center gap-5'>
            <div
                // onClick={() => onTodo(todoOptimized.id, !todoOptimized.complete)}
                onClick={onToggleTodo}
                className={`
                flex p-2 rounded-md cursor-pointer
                hover:bg-opacity-60
               ${todoOptimized.complete ? ' bg-blue-100' : ' bg-red-100'}
            `}>
                  {todoOptimized.complete
                    ? <IoCheckboxOutline size={30} />
                    : <IoSquareOutline size={30} />
                }
            </div>
            <div className='text-center sm:text-left'>
                {todoOptimized.description}
            </div>
        </div>
    </div>
  )
}
