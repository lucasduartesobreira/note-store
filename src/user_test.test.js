import { user } from './models/User.js';

describe('User', () => {
  describe('Notes', () => {
    describe('Insert', () => {
      test('insert valid', () => {
        let database = new Map();
        database.set(0, { id: 0, notes: new Map() });

        expect(
          user.insertNote(database, 0, 'Body test', 'Title test')
        ).toStrictEqual({
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

        expect(user.insertNote(database, 0, 'Body test', 'Title test')).toBeNull();

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

        expect(user.getNote(database, 0, 0)).toStrictEqual({
          id: 0,
          body: 'Body test',
          title: 'Title test',
        });
      });
      test('try to get a unexistent note', () => {
        let database = setup();

        expect(user.getNote(database, 0, 1)).toBeNull();
      });
      test('try to get a note from a unexistent user', () => {
        let database = setup();

        expect(user.getNote(database, 1, 0)).toBeNull();
      });
      test('try to get all notes from a existent user', () => {
        let database = setup();

        let expected_notes = new Map();
        expected_notes.set(0, {
          id: 0,
          body: 'Body test',
          title: 'Title test',
        });

        expect(user.getAllNotes(database, 0)).toStrictEqual(expected_notes);
      });

      test('try to get all notes from a unexistent user', () => {
        let database = setup();

        expect(user.getAllNotes(database, 1)).toBeNull();
      });
    });

    describe('Update', () => {
      const base_note = {
        id: 0,
        body: 'Body test',
        title: 'Title test',
      };
      const setup = () => {
        let database = new Map();
        const b_note = {
          ...base_note,
        };
        database.set(0, { id: 0, notes: new Map() });
        database.get(0).notes.set(0, b_note);

        return database;
      };

      test('update a note title', () => {
        let database = setup();

        const expected_note = {
          ...base_note,
          title: 'Changed title',
        };

        expect(user.updateNoteTitle(database, 0, 0, 'Changed title')).toStrictEqual(
          expected_note
        );

        expect(user.getNote(database, 0, 0)).toStrictEqual(expected_note);
      });

      test('update a note body', () => {
        let database = setup();

        const expected_note = {
          ...base_note,
          body: 'Changed body',
        };
        expect(user.updateNoteBody(database, 0, 0, 'Changed body')).toStrictEqual(
          expected_note
        );

        expect(user.getNote(database, 0, 0)).toStrictEqual(expected_note);
      });

      test('try update a unexistent note', () => {
        let database = setup();
        expect(user.updateNoteBody(database, 0, 1, 'Changed body')).toBeNull();
        expect(user.updateNoteTitle(database, 0, 1, 'Changed title')).toBeNull();

        expect(database).toStrictEqual(setup());
      });

      test('try update a note on a unexistent user', () => {
        let database = setup();

        expect(user.updateNoteBody(database, 1, 0, 'Changed body')).toBeNull();
        expect(user.updateNoteTitle(database, 1, 0, 'Changed title')).toBeNull();

        expect(database).toStrictEqual(setup());
      });
    });

    describe('Delete', () => {
      const setup = () => {
        let database = new Map();
        const base_note = {
          id: 0,
          body: 'Body test',
          title: 'Title test',
        };
        database.set(0, { id: 0, notes: new Map() });
        database.get(0).notes.set(0, base_note);

        return database;
      };
      test('delete a valid note', () => {
        let database = setup();
        expect(user.deleteNote(database, 0, 0)).toStrictEqual('Sucessfully deleted');
        expect(user.getNote(database, 0, 0)).toBeNull();
      });

      test('delete all notes', () => {
        let database = setup();
        expect(user.deleteAllNotes(database, 0)).toBe('Deleted all messages');
        expect(user.getNote(database, 0, 0)).toBeNull();
      });

      test('delete invalid note', () => {
        let database = setup();
        expect(user.deleteNote(database, 0, 1)).toBeNull();
        expect(user.getNote(database, 0, 1)).toBeNull();
      });
      test('delete invalid user', () => {
        let database = setup();
        expect(user.deleteNote(database, 1, 0)).toBeNull();
      });

      test('delete all notes from a invalid user', () => {
        let database = setup();
        expect(user.deleteAllNotes(database, 1, 0)).toBeNull();
      });
    });
  });

  describe('User', () => {
    const setup = () => {
      let database = new Map();
      database.set(0, { id: 0, notes: new Map() });

      return database;
    };
    test('create user', () => {
      let database = setup();
      expect(user.create(database)).toStrictEqual({ id: 1, notes: new Map() });
    });

    test('delete user', () => {
      let database = setup();
      expect(user.remove(database, 0)).toBe('Deleted user');
    });

    test('delete unexistent user', () => {
      let database = setup();
      expect(user.remove(database, 1)).toBeNull();
    });
  });
});