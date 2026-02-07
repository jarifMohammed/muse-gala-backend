// lib/emailTemplates.js
import { baseEmailTemplate, createInfoBox } from './emailTemplates/baseTemplate.js';

const lenderCredentialsTemplate = (name, email, password) => 
  baseEmailTemplate({
    title: 'WELCOME TO MUSE GALA',
    subtitle: 'Your application has been approved!',
    content: `
      <p>Hello ${name},</p>
      <p>Congratulations! Your lender application has been approved. Here are your login details:</p>
      ${createInfoBox({
        'Email': email,
        'Password': password,
      })}
      <p>Please use the above details to log in and update your profile.</p>
      <p class="text-muted text-small">If you didn't request this, please ignore this email.</p>
    `,
    buttonText: 'LOGIN NOW',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au/login',
  });

export default lenderCredentialsTemplate;