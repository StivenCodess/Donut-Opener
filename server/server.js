import express from "express";
import dotenv from "dotenv";
dotenv.config();

const IMAGES = JSON.parse(process.env.IMAGES);

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	next();
});

app.get("/api/images", (req, res) => {
	res.json(IMAGES);
});

app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});
