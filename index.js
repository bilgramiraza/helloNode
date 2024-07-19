const express = require('express');
const app = express();

let notes = [
	{
		id: '1',
		content: "HTML is easy",
		importance: true
	},
	{
		id: '2',
		content: "Browser can only Execute JS",
		importance: false
	},
	{
		id: '3',
		content: "GET and POST are the most important methods of HTTP protocol",
		importance: true
	},
];

app.use(express.json());

app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (request, response) => {
	response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
	const id = request.params.id;
	const note = notes.find(n => n.id === id);

	if (!note) {
		response.status(404).end();
	} else {
		response.json(note);
	}
});

app.delete('/api/notes/:id', (request, response) => {
	const id = request.params.id;
	notes = notes.filter(n => n.id !== id);

	response.status(204).end();
});

const generateId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n => Number(n.id)))
		: 0;

	return String(maxId + 1);
};

app.post('/api/notes', (request, response) => {
	const body = request.body;

	if (!body.content)
		return response.status(400).json({
			error: 'content missing'
		});

	const note = {
		id: generateId(),
		content: body.content,
		importance: Boolean(body.important) || false,
	};

	notes = notes.concat(note);
	response.json(note);
});

app.patch('/api/notes/:id', (request, response) => {
	const id = request.params.id;

	const note = notes.find(n => n.id === id);

	if (!note)
		return response.status(400).json({
			error: 'Note not Found'
		});

	note.importance = !note.importance;

	notes = notes.map(n => n.id === id ? note : n);
	response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server Running and Listening on Port ${PORT}`);
});
