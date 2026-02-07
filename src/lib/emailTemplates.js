// ✅ ESM
import { baseEmailTemplate, createInfoBox } from './emailTemplates/baseTemplate.js';

const verificationCodeTemplate = (code) => 
  baseEmailTemplate({
    title: 'VERIFICATION CODE',
    subtitle: 'Please use the code below to verify your account.',
    content: `
      <p>Hello,</p>
      <p>Thank you for using our services. Your verification code is:</p>
      <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 32px; font-weight: bold; color: #000; letter-spacing: 4px; margin: 0;">${code}</p>
      </div>
      <p>Please enter this code within 5 minutes to verify your account.</p>
      <p class="text-muted text-small">If you did not request this code, please ignore this email.</p>
    `,
  });

export default verificationCodeTemplate;
