// ✅ KYC Email Templates
import { baseEmailTemplate, createInfoBox, createStatusBadge } from './baseTemplate.js';

export const kycVerifiedTemplate = (userName) =>
  baseEmailTemplate({
    title: 'VERIFICATION COMPLETE',
    subtitle: 'Verification complete',
    content: `
      <p>Hi ${userName},</p>
      <p>Your identity verification is complete.</p>
      <p>Your account is now fully verified.</p>
    `,
  });

export const kycRequiresInputTemplate = (userName) =>
  baseEmailTemplate({
    title: 'VERIFICATION STILL REQUIRED',
    subtitle: 'Verification still required',
    content: `
      <p>Hi ${userName},</p>
      <p>We need a little more information to complete your verification.</p>
      <p>Please log in to your account to continue.</p>
    `,
    buttonText: 'CONTINUE VERIFICATION',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const kycProcessingTemplate = (userName) =>
  baseEmailTemplate({
    title: 'VERIFICATION IN PROGRESS',
    subtitle: 'Verification in progress',
    content: `
      <p>Hi ${userName},</p>
      <p>Your verification is currently being processed.</p>
      <p>We’ll notify you once it’s complete.</p>
    `,
  });

export const kycFailedTemplate = (userName) =>
  baseEmailTemplate({
    title: 'VERIFICATION INCOMPLETE',
    subtitle: 'Verification incomplete',
    content: `
      <p>Hi ${userName},</p>
      <p>Your verification session was not completed.</p>
      <p>Please start a new verification session to continue.</p>
    `,
    buttonText: 'START NEW SESSION',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const kycInitiatedTemplate = (userName, verificationLink) =>
  baseEmailTemplate({
    title: 'VERIFICATION REQUIRED',
    subtitle: 'Verification required',
    content: `
      <p>Hi ${userName},</p>
      <p>To continue, please complete identity verification.</p>
    `,
    buttonText: 'START VERIFICATION',
    buttonUrl: verificationLink,
  });
