const form = document.getElementById('form');

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  const files = document.getElementById('files');
  const formData = new FormData();
  for (let i = 0; i < files.files.length; i++) {
    formData.append('files', files.files[i]);
  }
  fetch('http://localhost:3000/upload-files', {
    method: 'POST',
    body: formData,
    headers: {},
  })
    .then(res => {
      files.value = '';
      console.log(res);
    })
    .catch(err => ('Error occured', err));
}
