/**
 * Created by jhorak on 19.07.2017.
 */

const Mailjet = require('node-mailjet').connect('eadab661f71d0e73678fc49c59a28454', '91a57323d0b248d640e6c2312786832b');

const BASIC_EMAIL_ADRESS = 'horak.kuba@gmail.com';
const BASIC_EMAIL_NAME = 'Angular Cookbook';

interface IRecipient {
    Email: string;
}

export class Mail {
    FromEmail: string = BASIC_EMAIL_ADRESS;
    FromName: string = BASIC_EMAIL_NAME;
    Subject: string = "";
    ['Text-part']: string = "";
    ["Html-part"]: string = "";
    Recipients: IRecipient[] = [];

    constructor(recipients: IRecipient[], htmlTemplate: string, subject: string){
        this.Subject = subject;
        this.Recipients =recipients;
        this["Html-part"] = htmlTemplate;
    }
}

export function sendMail(mail: Mail, succesCB, errorCB){
    let newRequest = Mailjet
        .post("send")
        .request(JSON.stringify(mail));

    newRequest.then(succesCB).catch(errorCB);
}

