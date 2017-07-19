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
    ["Html-part"]: string = "<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!";
    Recipients: IRecipient[] = [];

    constructor(subject: string, textPart: string, recipients: IRecipient[], htmlTemplate?: string){
        this.Subject = subject;
        this['Text-part'] = textPart;
        this.Recipients =recipients;
        if(htmlTemplate){
            this["Html-part"] = htmlTemplate;
        }
    }
}

export function sendMail(mail: Mail, succesCB, errorCB){
    let newRequest = Mailjet
        .post("send")
        .request(JSON.stringify(mail));

    newRequest.then(succesCB).catch(errorCB);
}

