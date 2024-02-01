'use client'
import { useRouter } from 'next/navigation';
import { Todo } from '@prisma/client';
import { TodoItem } from './items';
import { updateTodo } from '@/helpers/todo';
import { updateTodoServer } from '@/actions'; // This function exce with server actions

interface Props {
    data?: Todo[];
}

export const TodoList = ({ data = [] }: Props) => {
  const router = useRouter();

  // This function use API REST
  const onTodo = async (id:string, complete:boolean) => {
    await updateTodo(id, complete);
    router.refresh();
  }

  return (
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {data?.map(todo => (
          <TodoItem key={todo.id} todo={todo} onTodo={updateTodoServer} />
        ))}
      </div>
  )
}
