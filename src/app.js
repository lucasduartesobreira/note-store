import express from 'express';
import express_graphql from 'express-graphql';

import { note_schema, user_schema } from './graphql-schema.js';
import {
  insertNote,
  updateNoteBody,
  updateNoteTitle,
  getNote,
  getNotes,
  deleteNote,
  deleteAllNotes,
} from './controllers/NoteController.js';

import { deleteUser, createUser } from './controllers/UserController.js';

export default function (database) {
  const root = {
    getNote: getNote(database),
    getNotes: getNotes(database),
    updateNoteBody: updateNoteBody(database),
    updateNoteTitle: updateNoteTitle(database),
    insertNote: insertNote(database),
    deleteNote: deleteNote(database),
    deleteAllNotes: deleteAllNotes(database),
  };

  const note_handler = express_graphql.graphqlHTTP({
    schema: note_schema,
    rootValue: root,
    graphiql: true,
  });

  const user_handler = express_graphql.graphqlHTTP({
    schema: user_schema,
    rootValue: {
      createUser: createUser(database),
      deleteUser: deleteUser(database),
    },
    graphiql: true,
  });

  const app = express();

  app.use('/note', note_handler);
  app.use('/user', user_handler);

  return app;
}
