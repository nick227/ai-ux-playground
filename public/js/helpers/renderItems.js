
function createListItem(item, key) {
  const options = getObjectToHtmlMap(item, key);
  const html = createHtmlElement(options);
  html.dataset.id = item._id;
  const closeBtn = createCloseButton(html);
  html.insertBefore(closeBtn, html.firstChild);
  return html;
}

function renderList(list, key) {
  const wrapper = createHtmlElement({ elementType: 'section', className: `${key} wrapper` });
  list.forEach((item) => {
    const html = createListItem(item, key);
    wrapper.appendChild(html);
  });
  document.body.appendChild(wrapper);
}

function addToList(item, key) {
  const list = document.querySelector('.wrapper');
  const html = createListItem(item, key);
  list.insertBefore(html, list.firstChild);
}

function createCloseButton(html) {
  const closeBtn = createHtmlElement({ elementType: 'button', className: 'close', textContent: 'delete' });
  closeBtn.addEventListener('click', async () => {
    handleDeleteButton(html);
  });
  return closeBtn;
}

async function handleDeleteButton(html) {
  const confirmDelete = window.confirm("Delete Template?");
  if (confirmDelete) {
    const id = html.dataset.id;
    const confirmDelete2 = window.confirm("We have no backups it will be gone forever. Are you sure?");
    if (confirmDelete2) {
      await api.delete('api/promptTemplates', { _id: id });
      html.remove();
    };
  }


}

function renderStage(stageData) {
  if (Array.isArray(stageData)) {
    stageData.forEach(data => renderStage(data));
    return;
  }

  const stageContents = createHtmlElement(stageData);
  let stage = document.querySelector('.stage');

  if (stage) {
    stage.prepend(stageContents);
  } else {
    stage = createHtmlElement({ elementType: 'div', className: 'stage' });
    stage.appendChild(stageContents);
    document.body.appendChild(stage);
  }
}


function prependToStage(html) {
  const stage = document.querySelector('.stage');
  stage.prepend(html);
}