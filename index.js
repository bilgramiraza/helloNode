const express = require('express');
const app = express();

const notes = [
	{
		id: 1,
		content: "HTML is easy",
		importance: true
	},
	{
		id: 2,
		content: "Browser can only Execute JS",
		importance: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		importance: true
	},
];

app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (request, response) => {
	response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server Running and Listening on Port ${PORT}`);
});
