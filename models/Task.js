import {Realm} from '@realm/react';

export class Task extends Realm.Object {
  static generate(desc) {
    return {
      _id: Realm.BSON.ObjectId(),
      desc: desc,
      isComplete: false,
    };
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      desc: 'string',
      isComplete: {type: 'bool', default: false},
    },
  };
}
