const commerceAPI = require('../../api/commerceAPI');
const { Customer } = require('../models/customer');

exports.validateLogin = () => {
    return async (req, res, next) => {
        // Getting customer info - LOGDETAILS
        const LOGDETAILS = await commerceAPI.getCustomerLogin(req.body.email, req.body.password);
        const customerLogged = new Customer(
            LOGDETAILS[0].id,
            LOGDETAILS[0].email,
            LOGDETAILS[0].dtAdd,
            LOGDETAILS[0].fname,
            LOGDETAILS[0].lname
        );
        var findFlag = false;
        if (LOGDETAILS == 'notFound') {
            findFlag = false;
            console.log(LOGDETAILS);
        } else {
            req.session.isLogged = true;
            req.session.profile = customerLogged;
            findFlag = true;
        }
        res.json({ profile: customerLogged, findFlag: findFlag });
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
            if (req.session.profile) {
                console.log(req.session);
            } else {
                req.session.isLogged = false;
                console.log(req.session);
            }
        });
        next();
    };
};
