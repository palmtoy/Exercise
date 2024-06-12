document.getElementById('drag1').ondragstart = event => {
  event.preventDefault();
  window.electron.startDrag('drag-and-drop-1.md');
};

document.getElementById('drag2').ondragstart = event => {
  event.preventDefault();
  window.electron.startDrag('drag-and-drop-2.md');
};

document.getElementById('drag3').ondragstart = event => {
  event.preventDefault();
  window.electron.startDrag('drag-and-drop-3.txt');
};
