const prices = {
    'computer-network service': {
        cs: 700,
        ns: 600,
        graphics: 1200,
        sc: 500
    },
    'computer assembly': {
        cs: 1200,
        ns: 900,
        graphics: 2500,
        sc: 800,
    },
    'network setup': {
        cs: 2000,
        ns:1100,
        graphics:3000,
        sc: 1000,
    },
    'computer cleaning': {
        cs: 3000,
        ns: 1500,
        graphics: 4000,
        sc: 1300,
    }
};

function getFormValues() {

    const serviceTypeElement = document.querySelector('#project-type');

    const csEl = document.querySelector('#computer-service');
    const nsEl = document.querySelector('#network-service');
    const graphicsEl = document.querySelector('#graphics');
    const scEl = document.querySelector('#sites-coding');

    return {
        serviceType: serviceTypeElement.value,
        cs: csEl.checked,
        ns: nsEl.checked,
        graphics: graphicsEl.checked,
        sc: scEl.checked,
    }
}

function calculateWork() {
    const values = getFormValues();
    
    let totalPrice = 0;

    const workTypes = prices[values.serviceType];

    if (values.cs) {
        totalPrice = workTypes.cs;
    }

    if (values.ns) {
        totalPrice = totalPrice + workTypes.ns;
    }

    if (values.graphics) {
        totalPrice = totalPrice + workTypes.graphics;
    }

    if (values.sc) {
        totalPrice = totalPrice + workTypes.sc;
    }

    const totalPriceEl = document.querySelector('#total-price');
    totalPriceEl.textContent = totalPrice;
    console.log(totalPrice);

}

const formEl = document.querySelector('#project-price-form');
const emailModal = document.querySelector('#modal-email');
const successModal = document.querySelector('#modal-success');

formEl.addEventListener('change', calculateWork);
formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    emailModal.classList.add('modal-active');
});

const closebuttons = document.querySelectorAll('.modal-close-btn');

closebuttons.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        emailModal.classList.remove('modal-active');
        successModal.classList.remove('modal-active');

    });

})

const emailContainer = document.querySelector('#email-container');

emailContainer.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.querySelector('#user-email');
    if (emailInput.value) {

        const formData = new FormData(formEl);
        formData.append('email', emailInput.value);
        
  fetch('/', {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
      .then(function () {
        emailModal.classList.remove('modal-active');
        successModal.classList.add('modal-active');
      })
      .catch((error) => alert('failed to send message'))

        return;
    }

    const inputContainer = document.querySelector('#email-input-container');
    inputContainer.classList.add('email-input-container-error');

});
