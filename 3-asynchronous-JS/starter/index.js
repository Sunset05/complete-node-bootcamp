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

const getDogPic = async () => {
  try{
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
  
    const result1Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const result2Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const result3Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([result1Promise, result2Promise, result3Promise])
    const images = all.map(promise => promise.body.message)
    console.log(images)
  
    await writeFilePromise("dog-img.txt", images.join('\n'));
    console.log('Random dog image saved to file.')
  } catch(error){
    console.log(error);

    throw(error);
  }
  return '2: Ready'
}

(async () => {
  try {
    console.log('1: will get dog pics!')
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!')
  } catch (error) {
    console.log('ERROR')
  }
})();

// console.log('1: Will get dog pics!')
// getDogPic()
// .then(string => {
//   console.log(string);
//   console.log('3: Done getting dog pics!')
// })
// .catch(error => {
//   console.log(error)
// });

/*
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
*/