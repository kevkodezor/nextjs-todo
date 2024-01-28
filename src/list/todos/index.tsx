import { Todo } from '@prisma/client';
import { TodoItem } from './items';

interface Props {
    data?: Todo[];
}

export const TodoList = ({ data }: Props) => {
  return (
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {data?.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
  )
}
