import { buildSchema } from 'graphql';

export default buildSchema(`
    type Query {
        getNote(user_id: String!, note_id: Int!): Note
        getNotes(user_id: String!): [ Note ]
    }

    type Mutation {
        updateNoteTitle(user_id: String!, note_id: Int!, title: String): Note
        updateNoteBody(user_id: String!, note_id: Int!, body: String): Note
        insertNote(user_id: String!, body: String!, title: String!): Note
        deleteNote(user_id: String!, note_id:Int!): String
        deleteAllNotes(user_id: String!): String
    }

    type User {
        id: String
        notes: [Note]
    }

    type Note {
        id: Int
        title: String
        body: String
    }
`);
