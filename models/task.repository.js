import {Task} from './Task';
import RealmContext from './';
const {useQuery} = RealmContext;

export const getTask = () => {
  const TaskData = useQuery(Task);
  return TaskData;
};
