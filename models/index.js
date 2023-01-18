import {createRealmContext} from '@realm/react';
import {Todo} from './Todo';
import {Task} from './Task';

const config = {
  schema: [Todo, Task],
};

const RealmContext = createRealmContext(config);
export default RealmContext;
