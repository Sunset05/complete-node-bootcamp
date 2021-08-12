const fs = require("fs");
const http = require("http");
const url = require("url");

///////////////////////////////////
//Files

//Blocking, synchronous code
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOuput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOuput);
// console.log("File written!");

// Non-clocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//     if(err) return console.log("ERROR!!")

//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
//         console.log(data2);
//         fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
//             console.log(data3);

//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//                 console.log("Your file has been written ")
//             })
//         });
//     });
// });
// console.log("will read file!");

///////////////////////////////////
// SERVER
const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const templateproduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data)

const server = http.createServer((request, response) => {
    
    const {query, pathname} = url.parse(request.url, true)
    
    // Overview page
    if(pathname === "/" || pathname === "/overview") {
        response.writeHead(200, { "Content-Type": 'text/html' });

        const cardsHtml = dataObject.map(element => replaceTemplate(templateCard, element)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        response.end(output);
    
    // Product page
    } else if (pathname === "/product") {
        response.writeHead(200, { "Content-Type": 'text/html' });
        const product = dataObject[query.id]
        const output = replaceTemplate(templateproduct, product)
        response.end(output);

    // API
    } else if (pathname === "/api") {
        response.writeHead(200, { "Content-Type": 'application/json' });
        response.end(data);

    //Not found
    } else {
        response.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world"
        });
        response.end("<h1>Page not found!</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("LISTENING ON port 8000")
});

