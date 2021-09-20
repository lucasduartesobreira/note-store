import {
  insertNote,
  updateNoteBody,
  updateNoteTitle,
  getNote,
  getUserNotes,
} from './models/User.js';

describe('User', () => {
  describe('Insert', () => {
    test('insert valid', () => {
      let database = new Map();
      database.set(0, { id: 0, notes: new Map() });

      expect(insertNote(database, 0, 'Body test', 'Title test')).toStrictEqual({
        id: 0,
        title: 'Title test',
        body: 'Body test',
      });

      let expected_database = new Map();
      expected_database.set(0, { id: 0, notes: new Map() });
      expected_database
        .get(0)
        .notes.set(0, { id: 0, title: 'Title test', body: 'Body test' });

      expect(database).toStrictEqual(expected_database);
    });
    test('insert invalid user', () => {
      let database = new Map();

      expect(insertNote(database, 0, 'Body test', 'Title test')).toBeNull();

      expect(database).toStrictEqual(new Map());
    });
  });

  describe('Get', () => {
    const setup = () => {
      let database = new Map();
      database.set(0, { id: 0, notes: new Map() });
      database
        .get(0)
        .notes.set(0, { id: 0, body: 'Body test', title: 'Title test' });

      return database;
    };
    test('get a real note', () => {
      let database = setup();

      expect(getNote(database, 0, 0)).toStrictEqual({
        id: 0,
        body: 'Body test',
        title: 'Title test',
      });
    });
    test('try to get a unexistent note', () => {
      let database = setup();

      expect(getNote(database, 0, 1)).toBeNull();
    });
    test('try to get a note from a unexistent user', () => {
      let database = setup();

      expect(getNote(database, 1, 0)).toBeNull();
    });
    test('try to get all notes from a existent user', () => {
      let database = setup();

      let expected_notes = new Map();
      expected_notes.set(0, { id: 0, body: 'Body test', title: 'Title test' });

      expect(getUserNotes(database, 0)).toStrictEqual(expected_notes);
    });

    test('try to get all notes from a unexistent user', () => {
      let database = setup();

      expect(getUserNotes(database, 1)).toBeNull();
    });
  });
});
