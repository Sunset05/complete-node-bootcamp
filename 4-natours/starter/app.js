const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_, response) => {
  response.status(200).json({ message: 'Hello from server', app: 'Natours' });
});

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
