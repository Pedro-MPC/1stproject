function Customer(type, customer) {
    if (type == 'Login') {
        this.profile = customer;
    }
}

exports.Customer = Customer;
