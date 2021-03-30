import { CREATE_PDF, DELETE_PDF, FETCH_PDFS } from './pdfConstants.js';

const initialState = {
  pdfs: [],
};

export default function pdfReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_PDF:
      return {
        ...state,
        events: [...state.events, payload],
      };

    case DELETE_PDF:
      return {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== payload)],
      };
    case FETCH_PDFS:
      return {
        ...state,
        pdfs: payload,
      };

    case 'LEFT_COMPONENT':
      return {
        ...state,
        pdfs: [],
      };
    default:
      return { ...state };
  }
}
