import { buildSchema } from 'graphql';

export const note_schema = buildSchema(`
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

    type Note {
        id: Int
        title: String
        body: String
    }
`);

export const user_schema = buildSchema(`
    type Query {
        _dummy: String
    }
    type Mutation {
        createUser: User
        deleteUser(user_id: String!): String
    }

    type User {
        id: Int
    }
`);
