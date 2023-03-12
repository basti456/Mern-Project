const http = require("http");
const port = 8081;

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h2>Hey Server started and work here</h2>");
    res.end();
}).listen(port, () => {
    console.log(`Server started at port ${port}`);
});
