const fs = require("fs");
const server = require("http").createServer();

server.on("request", (request, response) => {
  //Solution 1
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   response.end(data);
  // });

  //Solution 2 with Streams
  //send chunks of res.write data to front end, once file is finished res.end
  const readableStream = fs.createReadStream("test-file.txt");
  readableStream.on("data", (chunk) => {
    response.write(chunk);
  });
  readableStream.on("end", () => {
    response.end();
  });
  readableStream.on("error", (error) => {
    console.log(error);
    response.statusCode = 500;
    response.end("File not found!");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening on prot 8000");
});
