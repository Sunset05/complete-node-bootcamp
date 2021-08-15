const fs = require("fs");
const superagent = require("superagent");

//promise takes in executor function that gets called immediately on romise creation
//still uses the callback function, but returns a promise once callback is finished
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      if (error) reject("Could not write the file");
      resolve("success");
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((result) => {
    console.log(result.body.message);

    return writeFilePromise("dog-img.txt", result.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file");
  })
  .catch((error) => {
    console.log(error.message);
  });
