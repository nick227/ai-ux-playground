const demoHtml = `
<h6 class="toggle" data-target=".sample-area">sample area</h6>
<div class="sample-area" data-node-id="sample-3"
    style="display: flex; align-items: center; width: 100%;border-radius:10px; justify-content: center; background-color: #1E1E1E; color: white;">
    <img data-node-id="sample-4" loading="lazy" src="https://source.unsplash.com/random" alt="Image" style="margin: 10px;width:50%; height: 400px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
    <div data-node-id="sample-16" style="width:50%;">
        <h1 data-node-id="sample-5" style="margin: 10px;">Lorem Ipsum!</h1>
        <p data-node-id="sample-6" style="margin: 10px;">Dolor sit amet consectetur adipisicing elit. Tempora quos
            unde,
            dicta laudantium minus nobis dolore. Nostrum praesentium molestias, vel dolor nulla delectus modi, illo
            recusandae minus, illum tempore blanditiis!</p>
        <div data-node-id="sample-123">
            <label data-node-id="sample-7" for="input1" style="margin: 10px;">Label 1
                <input data-node-id="sample-8" id="input1" type="text" style="margin: 10px;">
            </label>
        </div>
        <div data-node-id="sample-124">
            <label data-node-id="sample-9" for="input2" style="margin: 10px;">Label 2
                <input data-node-id="sample-10" id="input2" type="text" style="margin: 10px;">
            </label>
        </div>
        <div data-node-id="sample-125">
            <label data-node-id="sample-11" for="input3" style="margin: 10px;">Label 3
                <input data-node-id="sample-12" id="input3" type="text" style="margin: 10px;">
            </label>
        </div>
        <div data-node-id="sample-32" style="flex: 2; display: flex; align-items: center;">
            <button data-node-id="sample-13"
                style="margin: 10px;background:darkred;padding:0 10px; border-radius: 5px;">cancel</button>
            <button data-node-id="sample-14"
                style="margin: 10px;background:green;padding:0 10px; border-radius: 5px;">submit</button>
        </div>
    </div>
</div>
`;

function setupDemo(){
    const demoElm = document.querySelector('#demo');
    demoElm.innerHTML = demoHtml;
}