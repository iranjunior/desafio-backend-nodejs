const app = require('./app');
const { port } = require('./Config/vars');

// eslint-disable-next-line no-console
app.listen(port || 3333, () => console.log(`Server running is port: ${port}`));
