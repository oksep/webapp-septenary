'use strict';
import * as nodeMailer from 'nodemailer';
import {Email} from "../config";

class Mailer {

	transporter = null;

	constructor() {
		this.transporter = nodeMailer.createTransport({
			host: 'smtp.exmail.qq.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: Email.USER, // generated ethereal user
				pass: Email.PASSWORD  // generated ethereal password
			}
		});
	}

	sendAdminEmail(option: MailOptions) {
		!option.from && (option.from = `Septenary网络日志 <${Email.USER}>`);
		this.transporter.sendMail(option, (error, info) => {
			if (error) {
				return console.error(error, info);
			}
		});
	}
}

export interface MailOptions {
	from?: string;
	to: string;
	subject: string;
	text: string;
	html: string;
}

export const mailer = new Mailer();