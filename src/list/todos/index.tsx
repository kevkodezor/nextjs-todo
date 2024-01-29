'use client'
import { useRouter } from 'next/navigation';
import { Todo } from '@prisma/client';
import { TodoItem } from './items';
import { updateTodo } from '@/helpers/todo';

interface Props {
    data?: Todo[];
}

export const TodoList = ({ data = [] }: Props) => {
  const router = useRouter();

  const onTodo = async (id:string, complete:boolean) => {
    await updateTodo(id, complete);
    router.refresh();
  }

  return (
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {data?.map(todo => (
          <TodoItem key={todo.id} todo={todo} onTodo={onTodo} />
        ))}
      </div>
  )
}
