// This class allows us to "massage" old templating syntaxes into
// syntax the compiler expects.
var TemplatePreprocessor = (function () {
    function TemplatePreprocessor() {
    }
    TemplatePreprocessor.process = function (rootElement) {
        // rename all userActions to events.
        _renameAllAttributes(rootElement, 'js-event', 'js-userAction');

        // translate a root element (div js-type) to a js-view element.
        if (rootElement.tagName == 'js-view') {
            //rootElement = _demoteRootView(rootElement);
        }

        // replace custom elements with js-view tags.
        rootElement = _expandNestedViews(rootElement);

        _ensureChildrenHaveNames(rootElement);

        return rootElement;
    };
    return TemplatePreprocessor;
})();

function _cloneAttributes(dest, source) {
    for (var i = 0; i < source.attributes.length; i++) {
        var attrib = source.attributes[i];

        dest.setAttribute(attrib.name, attrib.value);
    }
}

function _expandNestedViews(element) {
    if (element.tagName != 'js-view' && _isCustomElement(element)) {
        var viewName = _getViewName(element.tagName);
        var newElement = element.ownerDocument.createElement('js-view');

        newElement.attributes = element.attributes;
        newElement.childNodes = element.childNodes;

        if (!newElement.getAttribute('js-type')) {
            newElement.setAttribute('js-type', '../' + viewName + '/' + viewName);
        }

        if (element.parentNode) {
            element.parentNode.replaceChild(newElement, element);
        }
        element = newElement;
    }

    for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];

        if (child.nodeType === child.ELEMENT_NODE) {
            _expandNestedViews(child);
        }
    }

    return element;
}

function _getViewName(tagName) {
    var name = '';
    var upperCase = true;

    for (var i = 0; i < tagName.length; i++) {
        if (tagName[i] == '-') {
            upperCase = true;
        } else {
            name += upperCase ? tagName[i].toUpperCase() : tagName[i].toLowerCase();
            upperCase = false;
        }
    }

    return name;
}

function _isCustomElement(child) {
    return (_knownElements.indexOf(child.tagName) == -1);
}

function _ensureChildrenHaveNames(element) {
    var count = 0;

    _parseChild(element);

    function _parseChild(childElement) {
        for (var i = 0; i < childElement.childNodes.length; i++) {
            var child = childElement.childNodes[i];

            if (child.nodeType === child.ELEMENT_NODE) {
                if (child.tagName == 'js-view') {
                    var name = child.getAttribute('js-name');

                    if (!name) {
                        child.setAttribute('js-name', '_childView' + count++);
                    }
                }

                _parseChild(child);
            }
        }
    }
}

function _demoteRootView(rootElement) {
    var newRoot = rootElement.firstChild;

    for (var i = 0; i < rootElement.attributes.length; i++) {
        var attrib = rootElement.attributes[i];

        if (attrib.name.indexOf('js-') == 0) {
            newRoot.setAttribute(attrib.name, attrib.value);
            rootElement.removeAttribute(attrib.name);
            i--;
        }
    }

    return newRoot;
}

function _renameAllAttributes(element, from, to) {
    if (element.nodeType === element.ELEMENT_NODE) {
        var val = element.getAttribute(from);

        if (val) {
            element.removeAttribute(from);
            element.setAttribute(to, val);
        }

        for (var i = 0; i < element.childNodes.length; i++) {
            _renameAllAttributes(element.childNodes[i], from, to);
        }
    }
}

var _knownElements = [
    'a',
    'abbr',
    'acronym',
    'efines',
    'address',
    'applet',
    'efines',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'basefont',
    'pecifies',
    'bdi',
    'bdo',
    'big',
    'efines',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'efines',
    'cite',
    'code',
    'col',
    'colgroup',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'dir',
    'efines',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'efines',
    'footer',
    'form',
    'frame',
    'efines',
    'frameset',
    'efines',
    'h1',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noframes',
    'efines',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strike',
    'efines',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'tt',
    'efines',
    'u',
    'ul',
    'var',
    'video',
    'wbr'
];

module.exports = TemplatePreprocessor;
