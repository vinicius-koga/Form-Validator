//FORM VALIDATOR
let formFunctions = {
   handleSubmit: (e) => {
      e.preventDefault();
      let inputs = document.querySelectorAll('.text-input');
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
         alert('Agora é com o back-end! :)');
         inputs.forEach(i => i.value = '');
         // form.submit();
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
                  let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (!email.test(input.value.toLowerCase())) {
                     return 'Insira um email válido'
                  }
                  break;
               case 'needSymbol':
                  let needSymbol = /\W|_/;
                  if (!needSymbol.test(input.value.toLowerCase())) {
                     return 'Insira ao menos 1 caractere especial'
                  }
                  break;
               case 'noSpace':
                  if (input.value.indexOf(' ') >= 0) {
                     return 'Não pode conter espaços'
                  }
                  break;
               case 'noSymbol':
                  let noSymbol = /\W|_/;
                  if (noSymbol.test(input.value.toLowerCase())) {
                     return 'Não pode conter símbolos ou espaços'
                  }
                  break;
               case 'noNumber':
                  let noNumber = /[0-9]/;
                  if (noNumber.test(input.value.toLowerCase())) {
                     return 'Não pode conter números'
                  }
                  break;
               case 'name':
                  let name = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
                  if (!name.test(input.value)) {
                     return 'Insira um nome válido'
                  }
                  break;
               case 'needSpace':
                  if (input.value.indexOf(' ') < 0) {
                     return 'Insira seu sobrenome'
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

let form = document.querySelector('.validator');
form.addEventListener('submit', formFunctions.handleSubmit);


