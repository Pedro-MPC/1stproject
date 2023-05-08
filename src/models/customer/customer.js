const decorators = require('./index');
const commerceAPI = require('../../../api/commerceAPI');

/**
 * Customer with decorated properties
 * @Customer
 */
function defaultCustomer() {
    this.id = decorators.setId;
    this.email = decorators.setEmail;
    this.first_name = decorators.setFirstName;
    this.last_name = decorators.setLastName;
    this.add_date = decorators.setAddDate;
    this.isDev = decorators.setIsDev;
}
async function validateLoginCustomer(type, email, password) {
    const CUSTOMEREMAIL = await commerceAPI.getCustomerLogin(email, password);
    if (CUSTOMEREMAIL[0].email != 'notFound') {
        return CustomerDetails(type, CUSTOMEREMAIL[0].email);
    }
}
async function CustomerDetails(type, email) {
    const CUSTOMER = await commerceAPI.getCustomerInfo(email);
    if (CUSTOMER != 'notFound') {
        const customer = new defaultCustomer();
        switch (type) {
            case 'basic':
                customer.id(CUSTOMER.id);
                customer.email(CUSTOMER.email);
                customer.first_name(CUSTOMER.fname);
                customer.last_name(CUSTOMER.lname);
                customer.isDev(CUSTOMER.isDev);
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const cAddedDateFormated =
                    CUSTOMER.dtAdd.getDate() +
                    '-' +
                    monthNames[CUSTOMER.dtAdd.getMonth()] +
                    '-' +
                    CUSTOMER.dtAdd.getFullYear();
                customer.add_date(cAddedDateFormated);

                console.log(customer);
                return customer;
        }
    } else {
        return 'notFound';
    }
}
exports.Customer = validateLoginCustomer;
exports.CustomerDetails = CustomerDetails;
