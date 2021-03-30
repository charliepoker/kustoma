const showModalBtn = document.getElementById('add-customer');
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

// Form validation
// function validateForm(e) {
//   e.preventDefault();
//   if(firstName.value==""){
//     alert("Please enter")
//   }
// }

// console.log(showOverview);
const customerData = [];
let recentCustomer = [];

// Open and Close add customer form
function showForm() {
  customerForm.style.display = 'flex';
}
function closeForm() {
  customerForm.style.display = 'none';
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

//Add a customer
function addCustomerData() {
  //  e.preventDefault(); // To stop the form from submitting

  form.addEventListener('submit', e => {
    e.preventDefault();
    // if (firstName.value === '') {
    //   firstName.style.border =  "2px solid #e74c3c"

    // }
  });

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

  // push into an empty array
  customerData.push(customer);
  totalCustomers();

  // sort the timestamp
  const customerTimeStamp = customerData.sort(function (x, y) {
    return y.time - x.time;
  });

  // reset the form
  form.reset();
  //store to local storage
  localStorage.setItem('myCustomerlist', JSON.stringify(customerData));

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

  allCustomer();

  // Display top customer
  // function displayTopCustomer() {
  //   let sortedCustomer = [];
  //   const topCustomer = customerData.sort(function (a, b) {
  //     return b.money - a.money;
  //   });
  //   sortedCustomer.push(topCustomer);

  //   console.log(sortedCustomer[0]);
  // }

  // console.log(splicedCustomer);

  // Total Amount of money
  const totalRevenue = customerData.reduce(function (sum, customer) {
    return sum + customer.money;
  }, 0);
  card2.innerHTML = `&#8358 ${totalRevenue}`;

  //Close modal
  closeForm();

  // Display total numbers of  Customers

  function totalCustomers() {
    const numberOfCustomers = customerData.length;
    card1.innerHTML = numberOfCustomers;

    if (numberOfCustomers > 1) {
      card1Paragraph.innerHTML = 'Customers';
    }
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
showOverview.addEventListener('click', displayOverview);
closeFormButton.addEventListener('click', closeForm);
addCustomerBtn.addEventListener('click', addCustomerData);
customerDetailCloseBtn.addEventListener('click', closeDetailModal);
ul.addEventListener('click', toggleDone);
customerOverviewUl.addEventListener('click', toggleDone);
allCustomerbtn.addEventListener('click', allCustomerDisplaying);
