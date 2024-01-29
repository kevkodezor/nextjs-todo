'use client'
import { Todo } from '@prisma/client'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import styles from './item.module.css'

interface Props {
    todo: Todo;
    onTodo: (id:string, complete:boolean) => Promise<Todo|void>
}

export const TodoItem = ({ todo, onTodo }: Props) => {
    const { id, description, complete } = todo;

  return (
      <div className={complete ? styles.todoDone : styles.todoPending}>
        <div className='flex flex-col sm:flex-row justify-start items-center gap-5'>
            <div
                  onClick={() => onTodo(id, complete)}
                className={`
                flex p-2 rounded-md cursor-pointer
                hover:bg-opacity-60
               ${complete ? ' bg-blue-100' : ' bg-red-100'}
            `}>
                {complete
                    ? <IoCheckboxOutline size={30} />
                    : <IoSquareOutline size={30} />
                }
            </div>
            <div className='text-center sm:text-left'>
                {description}
            </div>
        </div>
    </div>
  )
}
