import { convertFromHTML, ContentState, convertToRaw } from "draft-js";

export function textToHtml(content) {
  try {
    JSON.parse(content);
    return content;
  } catch (err) {
    const contentHTML = convertFromHTML(content);
    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap
    );
    return JSON.stringify(convertToRaw(state));
  }
}

export function getJsonRTE(state) {
  return JSON.stringify(convertToRaw(state));
}
