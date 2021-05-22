const express = require("express");
const noteRoutes = require("./routes/noteRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(noteRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => console.log("Now listening"));
