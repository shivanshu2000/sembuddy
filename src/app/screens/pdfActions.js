import { CREATE_PDF, DELETE_PDF, FETCH_PDFS } from './pdfConstants';

export function listenToPdfs(pdfs) {
  return {
    type: FETCH_PDFS,
    payload: pdfs,
  };
}

export function createPdf(pdf) {
  return {
    type: CREATE_PDF,
    payload: pdf,
  };
}

export function deletePdf(pdfId) {
  return {
    type: DELETE_PDF,
    payload: pdfId,
  };
}
