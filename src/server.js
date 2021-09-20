import express from 'express';
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';

import {
  insertNote,
  updateNoteBody,
  updateNoteTitle,
  getNote,
  getNotes,
} from './controllers/NoteController.js';

const schema = buildSchema(`
    type Query {
        note(user_id: String!, note_id: Int!): Note
        notes(user_id: String!): [ Note ]
    }

    type Mutation {
        updateNoteTitle(user_id: String!, note_id: Int!, title: String): Note
        updateNoteBody(user_id: String!, note_id: Int!, body: String): Note
        insertNote(user_id: String!, body: String!, title: String!): Note
    }

    type User {
        user: String
        notes: [Note]
    }

    type Note {
        id: Int
        title: String
        body: String
    }
`);

const root = {
  note: getNote,
  notes: getNotes,
  updateNoteBody,
  updateNoteTitle,
  insertNote,
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

app.listen(4000, () =>
  console.log(
    'Express listening on port 4000, GraphQL on http://localhost:4000/graphql'
  )
);
