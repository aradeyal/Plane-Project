/*מנהל את כל התקשורת בין הפרונט אנד למסד נתונים*/
import http, { IncomingMessage, ServerResponse } from 'http';
import mongoose from 'mongoose';
import { Plane } from './plane';
import dotenv from "dotenv";



const PORT = 3001;
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("mongoose connected");
    })
    .catch((err) => {
        console.error("mongoose failed to connect\nerr:", err);
        // TODO: stop here
    });



const server = http.createServer(async (req: IncomingMessage, res:ServerResponse) => {
    if (!req.url || !req.method) return;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }


    if (req.url === "/planes" && req.method === 'GET') {
        try {
            const planes = await Plane.find();
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(planes));
        } catch (err) {
            res.writeHead(500);
            res.end('error fetching planes');
        }
        return;
    }

    if (req.url === "/planes" && req.method === 'POST') {
        let body = '';
        req.on('data', data => (body += data));
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const newPlane = new Plane(data);
                const saved = await newPlane.save();
                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify(saved));
            } catch (err) {
                res.writeHead(400);
                res.end('Invalid Data');
            }
        });
        return;
    }

    res.writeHead(404); 
    res.end('not found');
});


server.listen(PORT, () => {
    console.log("server active on http://localhost:${PORT}")
});

