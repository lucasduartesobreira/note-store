# note-store

That's a repo to test GraphQL with Express.

It can be somewhat easily adapted to accept a database or even a simple file handler.

Currently, it is a work in progress.

## What it has

Now it's possible to create separated notes containing a body and a title.\
Each is associated with a user.

### Possible requests

/user
```
createUser: User
deleteUser(user_id: String!)
```

/note
```
updateNoteTitle(user_id: String!, note_id: Int!, title: String): Note
updateNoteBody(user_id: String!, note_id: Int!, body: String): Note
insertNote(user_id: String!, body: String!, title: String!): Note
deleteNote(user_id: String!, note_id:Int!): String
deleteAllNotes(user_id: String!): String
```

Types
```
User {
    id: Int
}

Note {
    id: Int
    body: String
    title: String
}
`````

## To do
- [ ] Hashing IDs, so a string gets accepted as ID
- [ ] Create integration tests
- [ ] Change User model to accept any database or file storer
- [ ] Create a system for User authentication
