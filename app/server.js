const app = require('./index');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`IRCTC Demo API running on port ${PORT}`);
});
