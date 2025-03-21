
import nodemailer from 'nodemailer';
import { generateAdminAlertEmail, generateJobEmail, generateThankYouEmail } from './emailtemplate.js';
import { application } from 'express';

export const  sendforuserEmail = async (recipientEmail,job ) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:"tcfproject212@gmail.com",
                pass: "yupv idzv hebn xxhy",
            }

        })

        const emailcontent =generateJobEmail(job)

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: ' New Job Alert ',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}


export const  sendforapplyEmail = async (recipientEmail,application,companyName,internshipTitle,contactEmail ) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:"tcfproject212@gmail.com",
                pass: "yupv idzv hebn xxhy",
            }

        })

        const emailcontent =generateThankYouEmail(application,companyName,internshipTitle,contactEmail)

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: ' Application Confirmation ',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}



export const  sendforapplyEmailforadmin = async (recipientEmail,application,companyName,internshipTitle, ) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:"tcfproject212@gmail.com",
                pass: "yupv idzv hebn xxhy",
            }

        })

        const emailcontent =generateAdminAlertEmail(application,companyName,internshipTitle)

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'New Job Application Alert ',
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}







