const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

const url = "https://api.telegram.org/bot";
const bot_token = process.env.BOT_TOKEN;
const chat_id = process.env.CHAT_ID;

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("200 OK");
});

app.post("/send/", (req, res) => {
	const body = req.body;
	const source = req.query["source"] || "unknown";
	res.status(200);
	res.set("Cache-control", `no-store`);
	if (Object.keys(body).length <= 0) {
		res.send("No Data");
	} else {
		data = JSON.stringify(body, null, 2);
		axios
			.post(`${url}${bot_token}/sendMessage`, {
				chat_id: chat_id,
				text: `${source}\n<pre>${data}</pre>`,
				parse_mode: "html",
			})
			.then(() => {
				res.send(data);
			})
			.catch((err) => {
				res.send(err);
			});
	}
});

app.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});
