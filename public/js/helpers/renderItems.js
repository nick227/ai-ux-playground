
function createListItem(item, key) {
  const options = getObjectToHtmlMap(item, key);
  const html = createHtmlElement(options);
  html.dataset.id = item._id;
  const deleteBtn = createDeleteButton(html, item);
  html.insertBefore(deleteBtn, html.firstChild);
  const copyBtn = createCopyButton(html);
  html.insertBefore(copyBtn, html.firstChild);
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

function createDeleteButton(html, item) {
  const deleteBtn = createHtmlElement({ elementType: 'button', className: 'delete', textContent: 'delete' });
  deleteBtn.addEventListener('click', async () => {
    handleDeleteButton(html, item);
  });
  return deleteBtn;
}

function createCopyButton(html) {
  const copyBtn = createHtmlElement({ elementType: 'button', className: 'copy', textContent: 'copy' });
  copyBtn.addEventListener('click', async () => {
    handleAddToClipboardButton(html);
  });
  return copyBtn;
}

function handleAddToClipboardButton(html) {
  const pre = html.querySelector('pre');
  console.log(pre.textContent)
  navigator.clipboard.writeText(pre.textContent);
}

async function handleDeleteButton(html, item) {
  const confirmDelete = window.confirm(`Delete template: ${item.type}?`);
  if (confirmDelete) {
    const id = html.dataset.id;
    const confirmDelete2 = window.confirm("There is no backup. This will be gone forever. Are you sure?");
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