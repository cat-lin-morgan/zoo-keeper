const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  fetch('/api/animals', {
      //configuring request
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' //got to put a string around the key cuz of the - will make it want to do some math
      },
      body: JSON.stringify(animalObject)
  }).then(response => {
      if (response.ok) {
          console.log('this will return an ok response');
          return response.json();
      }
      alert('Error: ' + response.statusText);
  }).then(postResponse => {
      console.log(postResponse);
      alert('Thank you for adding an animal!');
  });

};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
