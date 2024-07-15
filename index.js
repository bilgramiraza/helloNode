const http = require('http');

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

const app = http.createServer((request, response) => {
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server Running and Listening on Port ${PORT}`);
