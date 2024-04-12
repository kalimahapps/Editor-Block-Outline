/**
 * Returns the root element of the document.
 * If the document is inside an iframe, it returns the root element of the iframe.
 *
 * @returns {HTMLElement} - The root element of the document
 */
const getDocumentRoot = () => {
	const iframeRoot = document.querySelector('iframe.editor-canvas__iframe')?.contentDocument.documentElement;
	return iframeRoot ?? document.documentElement;
}

const getDocumentBody = () => {
	const iframeBody = jQuery('iframe.editor-canvas__iframe').contents().find('body');
	return iframeBody.length ? iframeBody : jQuery('body');
}