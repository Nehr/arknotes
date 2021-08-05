export const setMapList = (state, val) => {
  state.mapList = val;
}

export const toggleHiddenNote = (state, val) => {
  const index = state.hiddenNotes.findIndex(x => x === val);
  if (index > -1) {
    console.log('note is hidden already', index);
    state.hiddenNotes.splice(index, 1);
  } else {
    console.log('hiding note');
    state.hiddenNotes.push(val);
  }
  localStorage.setItem('wsARKnotes', JSON.stringify(state.hiddenNotes));
}

export const setHiddenNotes = (state, val) => {
  console.log('setting hidden notes', val);
  state.hiddenNotes = val;
}
