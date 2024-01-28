const collectionNames = ['dataSources', 'chatHistory', 'pageHistory', 'styles', 'elements', 'layouts', 'themes', 'palettes', 'forms', 'templates', 'promptTemplates', 'descriptions', 'fields', 'chatGptTransactions', 'fieldLists', 'snapshots', 'dataSources'];

const methods = ['get', 'post', 'put', 'delete'];

const htmlElementTypesEmum = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo',
  'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
  'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed',
  'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend',
  'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup',
  'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's',
  'samp', 'script', 'section', 'options', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub',
  'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead',
  'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'
];

const elementStatesAndMouseEvents = [
  'default', 'active', 'hover', 'focus', 'invalid', 'valid', 'optional', 'disabled', 'checked',
  'visited', 'target', 'enabled', 'read-only', 'read-write', 'required', 'indeterminate', 'in-range',
  'out-of-range', 'lang', 'not', 'nth-child', 'nth-last-child', 'nth-of-type', 'nth-last-of-type',
  'first-child', 'last-child', 'first-of-type', 'last-of-type', 'only-child', 'only-of-type', 'root',
  'empty', 'link', 'any-link', 'local-link', 'scope', 'current', 'past', 'future', 'dir', 'fullscreen',
  'placeholder-shown', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover',
  'mouseout', 'mouseenter', 'mouseleave', 'contextmenu', 'drag', 'dragend', 'dragenter', 'dragexit',
  'dragleave', 'dragover', 'dragstart', 'drop', 'wheel', 'innerText'
];

const arrayToObject = (arr) => Object.fromEntries(arr.map(key => [key, 'string']));
const htmlTagAttributes = ['type', 'class', 'style', 'placeholder', 'min', 'max', 'required', 'checked', 'id', 'name', 'value', 'disabled', 'readonly', 'src', 'alt', 'for', 'href', 'target', 'rel', 'method', 'action', 'enctype', 'autocomplete', 'autofocus', 'multiple', 'colspan', 'rowspan', 'width', 'height', 'accept', 'accept-charset', 'accesskey', 'async', 'autocapitalize', 'charset', 'cite', 'cols', 'contenteditable', 'controls', 'coords', 'datetime', 'defer', 'dir', 'download', 'draggable', 'dropzone', 'form', 'headers', 'hidden', 'high', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loop', 'low', 'manifest', 'media', 'muted', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'poster', 'preload', 'reversed', 'role', 'rows', 'sandbox', 'scope', 'scoped', 'shape', 'sizes', 'span', 'spellcheck', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'tabindex', 'title', 'translate', 'usemap', 'wrap', 'innerHTML'];
const elementStatesAndMouseEventsObject = arrayToObject(elementStatesAndMouseEvents);
const htmlTagAttributesObject = arrayToObject(htmlTagAttributes);

export {
  elementStatesAndMouseEventsObject,
  htmlTagAttributesObject,
  htmlElementTypesEmum,
  collectionNames,
  methods,
  arrayToObject
};