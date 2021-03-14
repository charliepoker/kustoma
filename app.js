const addCustomer = document.getElementById('add-customer');
const customerForm = document.querySelector('.customer-form');
const closeFormButton = document.getElementById('close-form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const state = document.getElementById('state');
const project = document.getElementById('project');
const money = document.getElementById('money');
const addCustomerBtn = document.getElementById('add-customer-btn');
const viewBtn = document.querySelector('.view-btn');
const customerDetail = document.querySelector('.customer-detail');

// Open and Close add customer form
function showForm() {
  customerForm.style.display = 'flex';
}

function closeForm() {
  customerForm.style.display = 'none';
}

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeForm();
  }
});

// creating an array of objects for the customer
let customerArray = [];

function addCustomerData(e) {
  e.preventDefault(); // To stop the form from submitting
  //generate unique customer userID
  let customerId = `KM${customerArray.length}R`;

  let customer = {
    id: customerId,
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    phone: phoneNumber.value,
    state: state.value,
    project: project.value,
    money: money.value,
  };

  // push into an empty array
  customerArray.push(customer);

  // reset the form
  document.querySelector('form').reset();
  //store to local storage
  // localStorage.setItem('myCustomerlist', JSON.stringify(customerArray));

  showCustomer();
}

function showCustomer() {
  const ul = document.getElementById('dynamic-list');
  customerArray.forEach(customer => {
    const li = document.createElement('li');
    li.classList.add('list-container');
    li.innerHTML = `<p>${customer.id}</p>
                <p>${customer.firstname} ${customer.lastname}</p>
                <p>${customer.phone}</p>
                <p>${customer.email}</p>
                <button class= "view-btn">view</button>`;

    ul.appendChild(li);
    closeForm();
  });
}

function viewCustomer() {
  customerDetail.style.display = 'flex';
}

addCustomer.addEventListener('click', showForm);
closeFormButton.addEventListener('click', closeForm);
addCustomerBtn.addEventListener('click', addCustomerData);
// viewBtn.addEventListener('click', viewCustomer);

console.log(viewBtn);
