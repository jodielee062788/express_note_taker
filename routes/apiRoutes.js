const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// GET /api/notes
router.get('/api/notes', (req, res) => {
    try {
        const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
        res.json(notes); // Send the notes as a JSON response
    } catch (error) {
        // Handle errors reading notes from file
        console.error('Error reading notes from file:', error);
        res.status(500).json({ error: 'Could not read notes from file' });
    }
});

// POST /api/notes
router.post('/api/notes', (req, res) => {
    try {
        const newNote = req.body;
        newNote.id = uuidv4(); // Assign a unique ID to the new note
        const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8')); // Read existing notes 
        notes.push(newNote); // Add the new note to the exisiting note
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        // Handle errors writing note to file
        console.error('Error writing note to file:', error);
        res.status(500).json({ error: 'Could not write note to file' });
    }
});

// DELETE /api/notes/:id
router.delete('/api/notes/:id', (req, res) => {
    try {
        const noteId = req.params.id;
        let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8')); // Read existing notes
        notes = notes.filter(note => note.id !== noteId); // Filter out the note with the specified ID
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        // Handle errors deleting note
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Could not delete note' });
    }
});

module.exports = router;
