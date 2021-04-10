const showModalBtn = document.getElementById('add-customer');
const showModalBtnMobile = document.querySelector('.add-customers-mobile');
const showOverview = document.querySelector('.see-overview');
const customerForm = document.querySelector('.customer-form');
const closeFormButton = document.getElementById('close-form');
const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const state = document.getElementById('state');
const project = document.getElementById('project');
const money = document.getElementById('money');
const addCustomerBtn = document.getElementById('add-customer-btn');
const viewBtn = document.querySelectorAll('.view-btn');
const customerDetail = document.querySelector('.customer-detail');
const customerDetailCloseBtn = document.querySelector('.customer-detail-close');
const ul = document.getElementById('dynamic-list');
const card1 = document.querySelector('.card-1 h1');
const card2 = document.querySelector('.card-2 h1');
const card3 = document.querySelector('.card-3 ul');
const card1Paragraph = document.querySelector('.card-1 p');
const customerDesc = document.querySelector('.customer-description');
const allCustomerbtn = document.querySelector('.all-customers button');
const allCustomerList = document.querySelector('.customer-list-container ');
const customerOverview = document.querySelector('.customer-overview');
const customerOverviewUl = document.querySelector('.all-customer-dynamic-list');
const topCustomerUl = document.querySelector('.top-customer-dynamic-list');

const customerData = [];
let recentCustomer = [];

window.onload = () => {
  if (customerData.length === 0) {
    showForm();
  } else {
    closeForm();
  }
};

// Open and Close add customer form
function showForm() {
  customerForm.style.display = 'flex';
  setTimeout(() => {
    customerForm.style.transform = 'scale(1)';
    customerForm.style.opacity = '1';
  }, 200);
}
function closeForm() {
  customerForm.style.opacity = '0';
  customerForm.style.transform = 'scale(.85)';
  setTimeout(() => {
    customerForm.style.display = 'none';
  }, 500);
}
// Close customer detail modal
function closeDetailModal() {
  customerDetail.style.display = 'none';
}

// Show overview
function displayOverview() {
  customerOverview.style.display = 'block';
  allCustomerList.style.display = 'none';
}

function validation() {}

//Add a customer
function addCustomerData(e) {
  e.preventDefault(); // To stop the form from submitting

  //First name validation
  if (firstName.value === '') {
    firstName.nextElementSibling.textContent = 'Firstname is required';
    return;
  } else if (!/^[A-Z]+$/i.test(firstName.value)) {
    firstName.nextElementSibling.textContent = 'Use only letters';
    return;
  } else {
    firstName.nextElementSibling.textContent = '';
  }

  //Last name validation
  if (lastName.value === '') {
    lastName.nextElementSibling.textContent = 'lastname is required';
    return;
  } else if (!/^[A-Z]+$/i.test(lastName.value)) {
    lastName.nextElementSibling.textContent = 'Use only letters';
    return;
  } else {
    firstName.nextElementSibling.textContent = '';
  }
  // Email validation
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.value === '') {
    email.nextElementSibling.textContent = 'email is required';
    return;
  } else if (!re.test(String(email.value).toLowerCase())) {
    email.nextElementSibling.textContent = 'xyz@email.com';
    return;
  }
  // Phone number validation
  if (phoneNumber.value === '') {
    phone.nextElementSibling.textContent = 'phone number is required';
    return;
  }
  // Location validation
  if (state.value === '--Select State--') {
    state.nextElementSibling.textContent = 'location is required';
    return;
  }
  // Project validation
  if (project.value === '--Select Project--') {
    project.nextElementSibling.textContent = 'project is required';
    return;
  }
  // Money validation
  if (money.value === '') {
    money.nextElementSibling.textContent = 'amount is required';
    return;
  }

  //generate unique customer userID
  let customerId = `KM${customerData.length}R`;
  // To get the unix timestamp
  const now = Math.round(new Date().getTime() / 1000);

  let customer = {
    id: customerId,
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    phone: phoneNumber.value,
    state: state.value,
    project: project.value,
    money: money.value * 1,
    time: now,
  };

  addRecentCustomers();
  closeForm();

  // push into an empty array
  customerData.push(customer);
  totalCustomers();

  // reset the form
  form.reset();

  allCustomer();

  // Total Amount of money
  const totalRevenue = customerData.reduce(function (sum, customer) {
    return sum + customer.money;
  }, 0);
  card2.innerHTML = `&#8358 ${totalRevenue}`;

  //Close modal
  closeForm();

  //store to local storage
  localStorage.setItem('myCustomerlist', JSON.stringify(customerData));

  displayTopCustomer();
}

// display allcustomer
function allCustomer() {
  customerOverviewUl.innerHTML = null;
  customerData.forEach(customer => {
    // let customerId = `KM${customerData.length}R`;
    customerOverviewUl.innerHTML = `<li class ="list-container">
                <p>${customer.id}</p>
                <p>${customer.firstname} ${customer.lastname}</p>
                <p>${customer.phone}</p>
                <p>${customer.email}</p>
                <button class ="view-btn">view</button>
              </li> 
              ${customerOverviewUl.innerHTML}`;

    // customerOverviewUl.insertAdjacentHTML('beforeend', li);
  });
}

// Display total numbers of  Customers

function totalCustomers() {
  const numberOfCustomers = customerData.length;
  card1.innerHTML = numberOfCustomers;

  if (numberOfCustomers > 1) {
    card1Paragraph.innerHTML = 'Customers';
  }
}

// All customer overview
function allCustomerDisplaying() {
  allCustomerList.style.display = 'block';
  customerOverview.style.display = 'none';
}

function addRecentCustomers() {
  let customerId = `KM${customerData.length}R`;

  const li = `<li id=${customerId} class ="list-container">
                <p>${customerId}</p>
                <p>${firstName.value} ${lastName.value}</p>
                <p>${phoneNumber.value}</p>
                <p>${email.value}</p>
                <button class ="view-btn">view</button>
              </li>`;

  recentCustomer.push(li);

  ul.insertAdjacentHTML('afterbegin', li);

  let allChilderen = Array.from(ul.children);

  allChilderen.forEach((child, index) => {
    if (index > 3) {
      child.style.display = 'none';
    }
  });
}

// Display top customer
function displayTopCustomer() {
  let sortedCustomer = [];
  const topCustomer = customerData.sort(function (a, b) {
    return b.money - a.money;
  });
  sortedCustomer.push(...topCustomer);

  topCustomerUl.innerHTML = '';
  sortedCustomer.forEach((customer, index) => {
    const joinName = customer.firstname.concat(customer.lastname);
    const nameSplit = joinName.split('');
    let bgColor;

    if (nameSplit.length > 13) {
      customer.lastname = '...';
    }

    if (index === 0) {
      bgColor = 'green';
    } else if (index === 1) {
      bgColor = 'orange';
    } else {
      bgColor = 'red';
    }

    const template = `<li>

                <p class="card3-name"><span class="highlight" style="background:${bgColor}"></span>${customer.firstname} ${customer.lastname}</p>
                <p class="card3-location"> &#8358 ${customer.money}</p>
              </li>`;

    topCustomerUl.insertAdjacentHTML('beforeend', template);
  });

  let allChilderen = Array.from(topCustomerUl.children);

  allChilderen.forEach((child, index) => {
    if (index > 2) {
      child.style.display = 'none';
    }
  });
}

// Event delegation methods to show customer details

function toggleDone(e) {
  console.log('heyy');

  if (e.target.matches('.view-btn')) {
    const customerID = e.target.parentElement.id;

    customerDesc.innerHTML = '';

    customerData.forEach(customer => {
      if (customerID === customer.id) {
        let template = `<div class="customer-detail-number">
    <h2>${customer.id}</h2>
  </div>
  <div class="customer-data">
    <div class="customer-name customer">
      <p>Name </p>
      <p>${customer.firstname} ${customer.lastname}</p>
    </div>
    <hr>
    <div class="customer-email customer">
      <p>Email</p>
      <p>${customer.email}</p>
    </div>
    <hr>
    <div class="customer-mobile-number customer">
      <p>Mobile Number</p>
      <p>${customer.phone}</p>
    </div>
    <hr>
    <div class="customer-location customer">
      <p>Location</p>
      <p>${customer.state}</p>
    </div>
    <hr>
    <div class="customer-project customer">
      <p>Project</p>
      <p>${customer.project}</p>
    </div>
    <hr>
    <div class="customer-amount-paid customer">
      <p>Money paid</p>
      <p>&#8358 ${customer.money}</p>
    </div>

  </div>`;

        customerDesc.insertAdjacentHTML('beforeend', template);
      }
    });
    customerDetail.style.display = 'flex';
  }
}

//Event Handlers
showModalBtn.addEventListener('click', showForm);
showModalBtnMobile.addEventListener('click', showForm);
showOverview.addEventListener('click', displayOverview);
closeFormButton.addEventListener('click', closeForm);
addCustomerBtn.addEventListener('click', addCustomerData);
customerDetailCloseBtn.addEventListener('click', closeDetailModal);
ul.addEventListener('click', toggleDone);
customerOverviewUl.addEventListener('click', toggleDone);
allCustomerbtn.addEventListener('click', allCustomerDisplaying);
