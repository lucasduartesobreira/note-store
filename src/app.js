import express from 'express';
import express_graphql from 'express-graphql';

import schema from './graphql-schema.js';
import {
  insertNote,
  updateNoteBody,
  updateNoteTitle,
  getNote,
  getNotes,
} from './controllers/NoteController.js';

export default function (database) {
  const root = {
    note: getNote(database),
    notes: getNotes(database),
    updateNoteBody: updateNoteBody(database),
    updateNoteTitle: updateNoteTitle(database),
    insertNote: insertNote(database),
  };

  const app = express();
  app.use(
    '/graphql',
    express_graphql.graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  );

  return app;
}
