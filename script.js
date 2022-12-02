//FORM VALIDATOR
let formFunctions = {
   handleSubmit: (e) => {
      e.preventDefault();
      let inputs = document.querySelectorAll('.b7validator input');
      let send = true;

      formFunctions.clearError();

      for (let i = 0; i < inputs.length; i++) {
         let input = inputs[i];
         let check = formFunctions.checkInput(input);
         if (check !== true) {
            send = false;
            formFunctions.showError(input, check);
         }
      }

      if (send) {
         alert('Formulário enviado!')
         form.submit();
      }
   },
   checkInput: (input) => {
      let rules = input.getAttribute('data-rules');
      if (rules !== null) {
         rules = rules.split('&');
         for (let i in rules) {
            let rule = rules[i].split('=');
            switch (rule[0]) {
               case 'required':
                  if (input.value == '') {
                     return 'Preencha este campo'
                  }
                  break;
               case 'min':
                  if (input.value.length < rule[1]) {
                     return 'Quantidade minima de caracteres: ' + rule[1];
                  }
                  break;
               case 'max':
                  if (input.value.length > rule[1]) {
                     return 'Quantidade máxima de caracteres: ' + rule[1];
                  }
                  break;
               case 'email':
                  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (!regex.test(input.value.toLowerCase())) {
                     return 'Digite um email válido'
                  }
                  break;
            }
         }
      }
      return true;
   },
   showError: (input, error) => {
      input.style.borderColor = '#e1cbb1';

      let errorDiv = document.createElement('div');
      errorDiv.classList.add('error');
      errorDiv.innerHTML = error;

      input.parentElement.appendChild(errorDiv);
   },
   clearError: () => {
      let inputs = form.querySelectorAll('input');
      for (let i = 0; i < inputs.length; i++) {
         inputs[i].style = '';
      }

      let errorDiv = form.querySelectorAll('.error');
      for (let i = 0; i < errorDiv.length; i++) {
         errorDiv[i].remove();
      }
   }
}

let form = document.querySelector('.b7validator');
form.addEventListener('submit', formFunctions.handleSubmit);



//INFO BUTTON
document.querySelector('.info').addEventListener('click', () => {
   let info = document.querySelector('.info');
   let infoBox = document.querySelector('.infoBox');

   if (infoBox.style.display === 'none') {
      info.style.borderRadius = '8px 8px 0px 0px';
      info.innerHTML = 'X';
      infoBox.style.display = 'block';
      setTimeout(() => {
         infoBox.style.opacity = '1';
      })
   } else if (infoBox.style.display === 'block') {
      info.style.borderRadius = '8px';
      infoBox.style.opacity = '0';
      info.innerText = '?';
      setTimeout(() => {
         infoBox.style.display = 'none';
      }, 200)
   }
})

document.addEventListener('click', (e) => {
   let info = document.querySelector('.info');
   let infoBox = document.querySelector('.infoBox');

   if (e.target.classList.contains('tg')) return;

   info.style.borderRadius = '8px';
   infoBox.style.opacity = '0';
   info.innerText = '?';
   setTimeout(() => {
      infoBox.style.display = 'none';
   }, 200);
})