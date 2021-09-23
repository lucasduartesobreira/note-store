import create_app from './app.js';

let database = new Map();
database.set(0, {
  id: 0,
  notes: new Map(),
});

let app = create_app(database);

app.listen(4000, () =>
  console.log(
    'Express listening on port 4000, GraphQL on http://localhost:4000/note and http://localhost:4000/user'
  )
);
