const fs = require("fs");

//Blocking, synchronous code
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOuput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOuput);
// console.log("File written!");

// Non-clocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
    if(err) return console.log("ERROR")

    fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
        console.log(data2);
        fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
            console.log(data3);

            fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Your file has been written ')
            })
        });
    });
});
console.log("will read file!");