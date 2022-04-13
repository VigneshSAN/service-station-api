import { Injectable } from '@nestjs/common';

const accountSid = 'ACf7c493325444c5248af27fda0eef7b85';
const authToken = '63acc72a94bd6facc58b6ff3d36b9b75';
const client = require('twilio')(accountSid, authToken);

@Injectable()
export class NotificationService {


    constructor() {

    }

    sendWhatsappMessage(whatsapp_number: string, message: string) {
        client.messages
            .create({
                body: message,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+91' + whatsapp_number
            })
            .then(message => console.log(message.sid))
            .done();
    }

    sendSMS(whatsapp_number: string, message: string) {
        client.messages
            .create({
                body: message,
                from: '+15017122661',
                to: '+91' + whatsapp_number
            })
            .then(message => console.log(message.sid))
            .done();
    }
}
