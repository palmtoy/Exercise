const form = document.getElementById('form');

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  const filesObj = document.getElementById('files');
  const formData = new FormData();
  for (let i = 0; i < filesObj.files.length; i++) {
    formData.append('files', filesObj.files[i]);
  }
  fetch('http://localhost:3000/upload-files', {
    method: 'POST',
    body: formData,
    headers: {},
  })
    .then(async res => {
      filesObj.value = ''; // reset files input
      console.log(await res.json());
    })
    .catch(err => ('Error occured', err));
}
