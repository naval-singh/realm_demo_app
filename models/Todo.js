import {Realm} from '@realm/react';

export class Todo extends Realm.Object {
  static generate(desc) {
    return {
      _id: Realm.BSON.ObjectId(),
      desc: desc,
    };
  }

  static schema = {
    name: 'Todo',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      desc: 'string',
    },
  };
}
