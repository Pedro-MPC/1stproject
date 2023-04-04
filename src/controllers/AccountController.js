const commerceAPI = require('../../api/commerceAPI');

exports.validateLogin = () => {
    return async (req, res, next) => {
        // Getting customer data
        const Customer = await commerceAPI.getCustomerLogin(req.body.email, req.body.password);
        var findFlag = false;
        if (Customer == 'notFound') {
            findFlag = false;
        } else {
            req.session.regenerate(function (err) {
                if (err) next(err);
                // store user information in session
                req.session.customer = Customer;
                req.session.isLogged = true;
                //Flag user sucessfully logged in
                findFlag = true;
                // save the session before redirection to ensure page
                // load does not happen before session is saved
            });
        }
        //Saving new session
        req.session.save(function (err) {
            if (err) return next(err);
            res.json({ customer: Customer, findFlag: findFlag });
        });
    };
};

exports.checkEmailExist = () => {
    return async (req, res, next) => {
        // Getting customer data
        const checkEmailExist = await commerceAPI.checkEmailExist(req.body.email);
        const regSuccess = false;
        if (checkEmailExist == 'emailAlreadyRegistered') {
            res.json({ msg: 'Email já registado', regSuccess: regSuccess });
        } else {
            next();
        }
    };
};

exports.registerCustomer = () => {
    return async (req, res, next) => {
        // Getting customer data
        const registerData = await commerceAPI.registerCustomer(
            req.body.email,
            req.body.password,
            req.body.fname,
            req.body.lname
        );
        const regSuccess = true;
        if (registerData == 'customerInserted') {
            res.json({ msg: 'Registado com sucesso!', regSuccess: regSuccess });
        }
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
                console.log('Logged ID: ' + req.session.id);
            } else {
                req.session.isLogged = false;
                console.log('Not Logged ID: ' + req.session.id);
            }
        });
        next();
    };
};
