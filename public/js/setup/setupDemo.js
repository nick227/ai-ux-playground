const demoHtml1 = `<div data-node-id="body" style="overflow-y:scroll;height:100%; background: white; width:100%; padding:0;margin:0;">
    <section class="section-row" data-node-id="node02" style="background: darkgray; height: 55%; width: 80%; margin: 2% auto;padding: 2%;border-radius:15px;">
        <div style="height: 49%; width: 100%; margin-bottom:1%; display: flex; justify-content: center; align-items: center;" data-node-id="node03">
            <div data-node-id="node04" style="width: 48%; padding: 0 1%;">
                <h1 style="font-size: 30px; margin: 0;font-family:monospace;" data-node-id="node05">My Cool Website</h1>
                <p style="color: fuchsia;font-size:18px;line-height:1.5;font-family:monospace;" data-node-id="node06">Lorem Adipisicing culpa nisi anim excepteur Lorem occaecat.</p>
            </div>
            <div data-node-id="node07" style="width: 48%; padding: 0 1%;text-align:center;">
                <img src="https://placehold.co/200" style="" data-node-id="node08">
            </div>
        </div>
        <div style="height: 50%; width: 100%; display: flex; justify-content: center; align-items: center;" data-node-id="node09">
            <div data-node-id="node10" style="text-align: center; width: 48%; padding: 0 1%;text-align:center;">
                <img src="https://placehold.co/200x100" style="" data-node-id="node11">
            </div>
            <div data-node-id="node12" style="width: 48%; padding: 0 1%;">
                <h1 style="margin: 0;font-family:monospace;" data-node-id="node13">Contact Info</h1>
                <label for="input1" style="display: block;font-family:monospace;" data-node-id="node14">Name</label>
                <input type="text" id="input1" name="input1" style="width: 100%; margin-bottom: 10px; border:1px solid gray; padding: 3px; border-radius:5px;" data-node-id="node15">
                <label for="input2" style="display: block;font-family:monospace;" data-node-id="node16">Address</label>
                <input type="text" id="input2" name="input2" style="width: 100%; border:1px solid gray; padding: 3px; border-radius:5px;" data-node-id="node17">
            </div>
        </div>
    </section>
</div>
`;

const demoHtml = `<div data-node-id="0" class="subform">
    <section data-node-id="1">
    <div class="row" data-node-id="2">
    <div class="col" style="width:50%;" data-node-id="3">
        <h1 style="font-size: 30px; margin: 0;font-family:monospace;" data-node-id="node05">My Cool Website</h1>
        <p style="color: fuchsia;font-size:18px;line-height:1.5;font-family:monospace;" data-node-id="node06">Lorem Adipisicing culpa nisi anim excepteur Lorem occaecat.</p>
    </div>
    <div class="col" style="width:50%;" data-node-id="4">
        <img src="https://placehold.co/200" style="" data-node-id="node08">
    </div>
    </div>
    <div class="row" data-node-id="5">
        <div class="col" style="width:50%;" data-node-id="6">
            <img src="https://placehold.co/200x100" style="" data-node-id="node11">
        </div>
        <div class="col" style="width:50%;" data-node-id="7">
            <h1 style="margin: 0;font-family:monospace;" data-node-id="node13">Contact Info</h1>
            <label for="input1" style="display: block;font-family:monospace;" data-node-id="node14">Name</label>
            <input type="text" id="input1" name="input1" style="width: 100%; margin-bottom: 10px; border:1px solid gray; padding: 3px; border-radius:5px;" data-node-id="node15">
            <label for="input2" style="display: block;font-family:monospace;" data-node-id="node16">Address</label>
            <input type="text" id="input2" name="input2" style="width: 100%; border:1px solid gray; padding: 3px; border-radius:5px;" data-node-id="node17">
        </div>
    </div>
    </section>
</div>
`;

let demoPreloaderInterval = null;
function setupDemoPreLoader() {
    const messages = ['Solving for Pi...', 'Calculating the meaning of life...', 'Loading the future...', 'Building the past...', 'Creating the present...', 'Loading...'];
    const loader = document.querySelector('.demo-loading');
    const message = loader.querySelector('.message');
    function toggleMessage() {
        const random = Math.random();
        const index = Math.floor(random * messages.length);
        const selectedMessage = messages[index];
        message.innerHTML = selectedMessage;
    }
    toggleMessage();
    demoPreloaderInterval = setInterval(toggleMessage, 1500);
}

function setupDemo() {
    const demoElm = document.querySelector('#demo');
    clearInterval(demoPreloaderInterval);
    demoElm.innerHTML = demoHtml;
}
