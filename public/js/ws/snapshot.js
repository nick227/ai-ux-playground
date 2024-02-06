

listenForEvent('updateRemoteSnapshot', async function (detail) {
    const demo = document.querySelector("#demo").cloneNode(true);
    const snapshot = await getSnapshot(demo);
    ws.send(JSON.stringify(snapshot));
});
