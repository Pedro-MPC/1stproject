const commerceAPI = require('../../api/commerceAPI');

exports.validateLogin = () => {
    return async (req, res, next) => {
        // Getting customer info - LOGDETAILS
        const Customer = await commerceAPI.getCustomerLogin(req.body.email, req.body.password);
        console.log(Customer);
        var findFlag = false;
        if (Customer == 'notFound') {
            findFlag = false;
            console.log(Customer);
        } else {
            req.session.regenerate(function (err) {
                if (err) next(err);

                // store user information in session, typically a user id
                req.session.customer = Customer;
                req.session.isLogged = true;
                console.log(req.session);
                findFlag = true;

                // save the session before redirection to ensure page
                // load does not happen before session is saved
            });
        }
        req.session.save(function (err) {
            if (err) return next(err);
            res.json({ customer: Customer, findFlag: findFlag });
        });
    };
};

exports.logout = () => {
    return async (req, res, next) => {
        const LOGOUTMSG = 'Signing out...';
        console.log('BEFORE: ' + req.session);
        req.session.destroy();
        console.log('AFTER: ' + req.session);
        res.json({ response: LOGOUTMSG });
    };
};

exports.checkSession = () => {
    return function (req, res, next) {
        res.on('finish', function () {
            if (req.session.customer) {
                console.log(req.session);
            } else {
                req.session.isLogged = false;
                console.log(req.session);
            }
        });
        next();
    };
};
