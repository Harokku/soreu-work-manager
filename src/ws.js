// Websocket management for the client with heartbeat and reconnection

import WebsocketHeartbeatJs from "websocket-heartbeat-js";
import issues from "./store/issueStore";

// Create a new websocket connection and return it
export const ws = new WebsocketHeartbeatJs({
    url: `${import.meta.env.VITE_BACKEND_WS}/ws`,
    pingMsg: "ping",
    reconnectTimeout: 15000,
});

// When the websocket is opened, log it
ws.onopen = (e) => {
    console.log("Websocket connected");
    if (issues.status !== "unresolved") {
        issues.refetch();
    }
};

// On websocket reconnect, refetch the issues
ws.onreconnect = (() => {
    console.log("Websocket reconnecting");
});

// On websocket close, log it
ws.onclose = ((e) => {
    console.log("Websocket closed");
});

// On websocket error, log it
ws.onerror = ((e) => {
    console.error("Websocket error");
    console.info(e);
});

// On websocket message, log it
ws.onmessage = ((e) => {
    if (e.data === "pong") {
        console.log("Websocket pong");
        return
    } // <-- heartbeat

    if (e.data === 'close') {
        ws.close()
        return;
    } // <-- close connection

    // try to parse json
    try {
        const obj = JSON.parse(e.data);
        switch (obj?.operation) {
            case "Issue created":
                console.info(`received new ${obj?.id}:\t ${obj?.operation}`);
                issues.addIssue(obj.data);
                break
            case "Issue closed":
                console.info(`received new ${obj?.id}:\t ${obj?.operation}`);
                issues.close(obj.data.id);
                break
            case "Detail created":
                console.info(`received new ${obj?.id}:\t ${obj?.operation}`);
                issues.addDetail(obj.data);
                break
            default:
                console.info(`received unknown event`);
        }
    } catch (e) {
    }
})