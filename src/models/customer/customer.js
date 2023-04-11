const decorators = require('./index');
const commerceAPI = require('../../../api/commerceAPI');

function defaultCustomer() {
    this.email = decorators.setEmail;
    this.first_name = decorators.setFirstName;
    this.last_name = decorators.setLastName;
}

async function Customer(type, email, password) {
    const CUSTOMER = await commerceAPI.getCustomerLogin(email, password);
    if (CUSTOMER != 'notFound') {
        const customer = new defaultCustomer();
        switch (type) {
            case 'basic':
                customer.email(CUSTOMER.email);
                customer.first_name(CUSTOMER.fname);
                customer.last_name(CUSTOMER.lname);
                console.log('CUSTOMER: ' + customer);
                return customer;
        }
    } else {
        return 'notFound';
    }
}

exports.Customer = Customer;
