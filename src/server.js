import express from 'express';
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';

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

let bd = [
  {
    user: '1',
    notes: [
      {
        id: 0,
        title: 'Teste',
        body: 'Testando query',
      },
    ],
  },
];

const getNote = (data) => {
  const { user_id, note_id } = data;
  const user = bd.find((value) => value.user == user_id);

  return user ? user.notes.find((note) => note.id === note_id) : null;
};

const getNotes = (user_id) => {
  const user = bd.find((value) => value.user == user_id);

  user ? user.notes : null;
};

const updateNoteBody = (data) => {
  const { user_id, note_id, body } = data;
  bd.map((value) => {
    if (value.user == user_id) {
      value.notes.map((note) => {
        if (note.id == note_id) {
          note.body = body;
        }
      });
    }
  });

  const user = bd.find((user) => user.user === user_id);
  const note = user.notes.find((note) => note.id === note_id);

  return note;
};

const updateNoteTitle = (data) => {
  const { user_id, note_id, title } = data;
  bd.map((value) => {
    if (value.user === user_id) {
      value.notes.map((note) => {
        if (note.id === note_id) {
          note.title = title;
        }
      });
    }
  });

  const user = bd.find((user) => user.user === user_id);
  const note = user.notes.find((note) => note.id === note_id);

  return note;
};

const insertNote = (data) => {
  const { user_id, body, title } = data;
  bd.map((user) => {
    if (user.user === user_id) {
      user.notes.push({
        id: user.notes.length,
        body,
        title,
      });
    }
  });

  const user = bd.find((user) => user.user === user_id);
  const note = user.notes[user.notes.length - 1];

  return note;
};

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
