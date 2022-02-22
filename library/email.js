const mailService = require("./nodemailer");
exports.sendMail = async (message) => {
	
	const mail = async (emailOptions) => {
            let emailTransporter = await mailService.createTransporter();
            var sending = new Promise((resolve, reject) => {
                emailTransporter.sendMail(emailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                        return { status: 'FAIL' };
                    } else {
                        return { status: 'SUCCESS' };
                    }
                });
    
            });
    
                var sendResponse = await sending;
                return sendResponse;
          };

        mail(message);
}