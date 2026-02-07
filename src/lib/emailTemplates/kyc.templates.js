// ✅ KYC Email Templates
import { baseEmailTemplate, createInfoBox, createStatusBadge } from './baseTemplate.js';

export const kycVerifiedTemplate = (userName) =>
  baseEmailTemplate({
    title: 'VERIFICATION SUCCESSFUL',
    subtitle: 'Your identity has been verified!',
    content: `
      <p>Hello ${userName},</p>
      <p>Great news! Your identity verification has been completed successfully. Your account is now fully verified and you can enjoy all features of our platform.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Verified ✓', 'success')}
      </div>
      <p>If you have any questions, please contact our support team.</p>
    `,
  });

export const kycRequiresInputTemplate = (userName, reason) =>
  baseEmailTemplate({
    title: 'ADDITIONAL INFORMATION NEEDED',
    subtitle: 'We need a bit more from you to complete verification.',
    content: `
      <p>Hello ${userName},</p>
      <p>We need some additional information to complete your identity verification. This will only take a few minutes.</p>
      <div class="info-box">
        <p><strong>What to do:</strong> Please log in to your account and resume the verification process.</p>
      </div>
      <p>Please complete this within 7 days to avoid account restrictions.</p>
    `,
    buttonText: 'COMPLETE VERIFICATION',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const kycProcessingTemplate = (userName) =>
  baseEmailTemplate({
    title: 'VERIFICATION IN PROGRESS',
    subtitle: 'We are processing your verification.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your identity verification is currently being processed. This typically takes 1-2 hours. We will notify you as soon as the verification is complete.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Processing', 'info')}
      </div>
      <p>Thank you for your patience!</p>
    `,
  });

export const kycFailedTemplate = (userName, reason) =>
  baseEmailTemplate({
    title: 'VERIFICATION FAILED',
    subtitle: 'Your verification session has expired or was not completed.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your identity verification session has expired or was not completed successfully.</p>
      <div class="info-box">
        <p><strong>Reason:</strong> ${reason || 'Session expired or document verification failed'}</p>
      </div>
      <p>Please try again to complete your identity verification. Log in to your account and start a new verification session.</p>
    `,
    buttonText: 'TRY AGAIN',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const kycInitiatedTemplate = (userName, verificationLink) =>
  baseEmailTemplate({
    title: 'KYC VERIFICATION REQUIRED',
    subtitle: 'Complete your identity verification to unlock all features.',
    content: `
      <p>Hello ${userName},</p>
      <p>To complete your account setup and unlock all features, we need to verify your identity. This is a quick and secure process.</p>
      <p class="text-muted text-small">Or copy this link: ${verificationLink}</p>
      <p>You have 7 days to complete this verification. Thank you!</p>
    `,
    buttonText: 'START VERIFICATION',
    buttonUrl: verificationLink,
  });
