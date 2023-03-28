const commerceAPI = require('../../api/commerceAPI');
const session = require('express-session');

exports.validateLogin = () => {
    return async (req, res, next) => {
        // Getting customer info - LOGDETAILS
        const LOGDETAILS = await commerceAPI.getCustomerLogin(req.body.email, req.body.password);
        console.log(LOGDETAILS);
        var findFlag = false;
        if (LOGDETAILS == 'NotFound') {
            findFlag = false;
        } else {
            req.session.isLogged = true;
            req.session.fullname = LOGDETAILS[0].fname + ' ' + LOGDETAILS[0].lname;
            res.json({ response: LOGDETAILS, fullname: req.session.fullname });
            req.session.save();
            findFlag = true;
        }
    };
};

exports.logout = () => {
    return async (req, res, next) => {
        const LOGOUTMSG = 'Signing out...';
        console.log('BEFORE: ' + req.session.fullname);
        req.session.destroy();
        console.log('AFTER: ' + req.session);
        res.json({ response: LOGOUTMSG });
    };
};
