

function listenForEvent(eventName, callback) {
    document.addEventListener(eventName, function (event) {
        callback(event.detail);
    });
}

function dispatchEvent(eventName, parameters = {}) {
    const event = new CustomEvent(eventName, { parameters });
    document.dispatchEvent(event);
}

listenForEvent('updateRemoteSnapshot', async function (detail) {
    const demo = document.querySelector("#demo").cloneNode(true);
    const snapshot = await getSnapshot(demo);
    ws.send(JSON.stringify(snapshot));
});
