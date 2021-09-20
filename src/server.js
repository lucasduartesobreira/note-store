import express from 'express';
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';
const schema = buildSchema(`
    type Query {
        note(user_id: String!, note_id: Int!): Note
        notes(user_id: String!): [ Note ]
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

const root = {
  note: getNote,
  notes: getNotes,
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
