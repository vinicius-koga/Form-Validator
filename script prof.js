let B7validator = {
   handleSubmit:(e) => {
      e.preventDefault();
      let send = true;

      let inputs = form.querySelectorAll('input');

      B7validator.clearError();
      
      for(let i=0; i<inputs.length; i++){
         let input = inputs[i];
         let check = B7validator.checkInput(input);
         if(check !== true) {
            send = false;
            B7validator.showError(input, check);
            console.log(check);
         }
      }

      if(send){
         form.submit();
      }
   },
   
   checkInput:(input) => {
      let rules = input.getAttribute('data-rules');

      if(rules !== null){
         rules = rules.split('&');

         for(let k in rules){
            let rDetails = rules[k].split('=');
            switch(rDetails[0]){
               case 'required':
                  if(input.value == ''){
                     return 'Preencha este campo'
                  }
               break;
               case 'min':
                  if(input.value.length < rDetails[1]){
                     return 'Quantidade mínima de caracteres: ' + rDetails[1];
                  }
               break;
               case 'email':
                  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if(!regex.test(input.value.toLowerCase())){
                     return 'Digite um email valido'
                  }
               break;
            }
            
         }
      }
      return true;
   },
   
   showError:(input, check) => {
      input.style.borderColor = '#E1CBB1';

      let errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.innerHTML = check;

      input.parentElement.insertBefore(errorElement, input.ElementSibling)
   },

   clearError:() => {
      let inputs = form.querySelectorAll('input');
      for(let i=0; i<inputs.length; i++){
         inputs[i].style = '';
      }

      let errorElements = form.querySelectorAll('.error');
      for(let i=0; i<errorElements.length; i++){
         errorElements[i].remove();
      }
   }
}

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7validator.handleSubmit);

