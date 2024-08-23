import nodemailer from 'nodemailer';
import {NextResponse } from 'next/server';
import test from 'node:test';

export const POST = async (req) => {
    const { to, subject, text, html } = req.body;


    var smtpConfig = {
        host: 'smtp-mail.outlook.com', //process.env.SMTP_HOST,
        port: 587,
        secure: false, // use SSL
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
       tls: {
        ciphers:'SSLv3'
    }
    };
    console.log(smtpConfig);
    const transporter = nodemailer.createTransport(smtpConfig);
    

    try {
       
        const info = await transporter.sendMail({
            from: to,
            to: 'abc@gmail.com>',
            subject : subject, 
            text : text, 
            html : '<p> Subject : '+subject+' </p> <p> Text : '+text+' </p>', 
        });
        console.log(info);
        console.log('Message sent: %s', info.messageId);
        return NextResponse.json({ success: true, messageId: "Sucess : email was sent" });
    } catch (error) {
        console.error('Error sending email:', error);
        NextResponse.status(500).json({ success: false, error: error.message });
    }
};
