// @flow
const input = {
  id: 1,
  time: '08 Jan 019',
  title: '柯P',
  description: '台北市長柯文哲在PTT上別稱',
  tags: [''],
};

const Edit = (state = input, action) => {
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case 'EDIT_CARD': {
      return {
        ...state,
        id: action.edit.id,
        time: action.edit.time,
        title: action.edit.title,
        description: action.edit.description,
        tags: action.edit.tags,
      };
      /* return state.map(card =>
        card.id === action.id ? { ...card, cardprops: action.cardprops } : card,
      ); */
    }
    case 'CLEAR_CARD':
      return {
        ...state,
        time: '',
        title: '',
        description: '',
        tags: [''],
      };
    case 'EDIT_TIME':
      return {
        ...state,
        time: action.time,
      };
    case 'EDIT_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'EDIT_ABOUT':
      return {
        ...state,
        description: action.about,
      };
    case 'EDIT_TAG':
      return {
        ...state,
        tags: action.tag.split(' '),
      };
    default:
      return state;
  }
};

export default Edit;
