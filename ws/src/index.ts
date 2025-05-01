import {WebSocket, WebSocketServer} from "ws"
import { checkUser } from "./checkUser";
import "dotenv/config"

import { PrismaClient } from '@prisma/client'

export const prismaClient = new PrismaClient()


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
console.log("PORT", PORT)
const wss = new WebSocketServer({ port: PORT });

interface User {
    ws:  WebSocket,
    rooms: string[],
    userId: string
}

const users : User[] = []


// // 🔹 Keep WebSocket connections alive (Ping Clients every 30 sec)
// setInterval(() => {
//     users.forEach(user => {
//         if (user.ws.readyState === WebSocket.OPEN) {
//             user.ws.ping(); // Send a ping to each client
//         }
//     });
//     console.log("✅ Sent keep-alive pings to WebSocket clients");
// }, 30 * 1000); // Every 30 seconds

wss.on("connection", function connection(ws, request){
    const url = request.url

    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1])
    const token = queryParams.get("token") || ""
    const userId = checkUser(token)

    if (userId === null){
        ws.close()
        return null;
    }


    users.push({
        userId,
        ws,
        rooms: []
    })




    ws.on('error', console.error)




    ws.on('message', async function message(data){
        let parsedData;

        if(typeof data !== "string"){
            parsedData = JSON.parse(data.toString())
        }else{
            parsedData = JSON.parse(data)
        }

        if(parsedData.type === "join_room"){
            const user = users.find(x => x.ws === ws )
            user?.rooms.push(parsedData.roomId)
        }

        if(parsedData.type === "leave_room"){
            const user = users.find(x => x.ws === ws)
            if(!user){
                return;
            }

            user.rooms = user.rooms.filter(x => x !== parsedData.room)
        }

        if(parsedData.type === "draw"){
            const roomId = parsedData.roomId
            const data = parsedData.data

            await prismaClient.shape.create({
                data: {
                    roomId: Number(roomId),
                    data,
                    userId
                }
            })


            users.forEach(user => {
                if(user.rooms.includes(roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({
                        type: "draw",
                        data,
                        roomId
                    }))
                }
            })
 
        }


        if(parsedData.type === "erase"){
            const roomId = parsedData.roomId
            const data = parsedData.data

            await prismaClient.shape.deleteMany({
                where:{
                    data,
                    roomId
                }
            })

            users.forEach(user => {
                if(user.rooms.includes(roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({
                        type: "erase",
                        data,
                        roomId
                    }))
                }
            })
        }

    })

//     // 🔹 Handle Client Pings (Respond to Pong)
//     ws.on("pong", () => {
//         console.log(`✅ Received pong from client`);
//     });
});



// // 🔹 Keep the Render Instance Alive (Self-Pinging every 4 minutes)
// setInterval(async () => {
// try {
//     const url = "https://sketchly2-1ws.onrender.com"; // ✅ Update with your WebSocket URL
//     await fetch(url);
//     console.log(`✅ Pinged ${url} to prevent Render from sleeping`);
// } catch (error) {
//     console.error("❌ Render keep-alive request failed:", error);
// }
// }, 4 * 60 * 1000); // Every 4 minutes
