// ✅ Dispute Email Templates
import { baseEmailTemplate, createInfoBox, createStatusBadge } from './baseTemplate.js';

export const disputeCreatedTemplate = (userName, issueType, bookingId) =>
  baseEmailTemplate({
    title: 'DISPUTE CREATED',
    subtitle: 'Your dispute has been submitted for review.',
    content: `
      <p>Hello ${userName},</p>
      <p>A dispute has been created for your booking. Our team will review this matter and provide updates shortly.</p>
      ${createInfoBox({
        'Issue Type': issueType,
        'Booking ID': bookingId,
        'Status': 'Pending Review',
      })}
      <p>You will receive updates as we progress through the resolution process.</p>
    `,
  });

export const disputeUnderReviewTemplate = (userName, issueType, bookingId) =>
  baseEmailTemplate({
    title: 'DISPUTE UNDER REVIEW',
    subtitle: 'Your dispute is now being actively reviewed.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your dispute has been assigned to our support team and is now under active review. We are analyzing all the evidence you provided.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('In Review', 'info')}
      </div>
      ${createInfoBox({
        'Issue Type': issueType,
        'Booking ID': bookingId,
      })}
      <p>We typically provide a response within 3-5 business days. Thank you for your patience.</p>
    `,
  });

export const disputeMoreInfoNeededTemplate = (userName, reason, bookingId) =>
  baseEmailTemplate({
    title: 'ADDITIONAL INFORMATION NEEDED',
    subtitle: 'We need more information to proceed with your dispute.',
    content: `
      <p>Hello ${userName},</p>
      <p>To proceed with your dispute review, we need some additional information or evidence from you.</p>
      ${createInfoBox({
        'What we need': reason,
        'Booking ID': bookingId,
      })}
      <p>Please log into your account and provide the requested information within 5 business days. Failure to respond may result in case closure.</p>
    `,
    buttonText: 'PROVIDE INFORMATION',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const disputeEscalatedTemplate = (userName, reason, bookingId) =>
  baseEmailTemplate({
    title: 'DISPUTE ESCALATED',
    subtitle: 'Your dispute has been escalated for further review.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your dispute has been escalated to our senior resolution team for further investigation.</p>
      ${createInfoBox({
        'Escalation Reason': reason,
        'Booking ID': bookingId,
        'Status': 'Escalated',
      })}
      <p>A senior team member will contact you shortly to discuss the next steps. We appreciate your cooperation.</p>
    `,
  });

export const disputeResolvedTemplate = (userName, resolution, refundAmount, bookingId) =>
  baseEmailTemplate({
    title: 'DISPUTE RESOLVED',
    subtitle: 'Your dispute has been reviewed and resolved.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your dispute has been reviewed and resolved. Below are the details of the decision.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Resolved ✓', 'success')}
      </div>
      ${createInfoBox({
        'Booking ID': bookingId,
        'Resolution': resolution,
        ...(refundAmount ? { 'Refund Amount': `$${refundAmount}` } : {}),
      })}
      <p>If you have any questions about this decision, please feel free to contact our support team.</p>
    `,
  });

export const refundProcessedTemplate = (userName, refundAmount, bookingId, refundDate) =>
  baseEmailTemplate({
    title: 'REFUND PROCESSED',
    subtitle: 'Your refund has been processed successfully.',
    content: `
      <p>Hello ${userName},</p>
      <p>The refund from your dispute resolution has been processed successfully.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Refunded ✓', 'success')}
      </div>
      ${createInfoBox({
        'Refund Amount': `$${refundAmount}`,
        'Booking ID': bookingId,
        'Processing Date': refundDate,
      })}
      <p>The funds should appear in your account within 3-5 business days depending on your bank. Please check your transaction history if you don't see it.</p>
    `,
  });

export const disputeResponseTemplate = (userName, responderName, responseMessage, bookingId) =>
  baseEmailTemplate({
    title: 'NEW RESPONSE ON YOUR DISPUTE',
    subtitle: 'Someone has responded to your dispute case.',
    content: `
      <p>Hello ${userName},</p>
      <p>${responderName} has added a response to your dispute case.</p>
      ${createInfoBox({
        'From': responderName,
        'Booking ID': bookingId,
      })}
      <div class="info-box">
        <p style="font-style: italic;">"${responseMessage}"</p>
      </div>
      <p>Please log into your account to view the full conversation and respond if needed.</p>
    `,
    buttonText: 'VIEW DISPUTE',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const disputeClosedTemplate = (userName, reason, bookingId) =>
  baseEmailTemplate({
    title: 'DISPUTE CASE CLOSED',
    subtitle: 'Your dispute case has been officially closed.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your dispute case has been officially closed.</p>
      ${createInfoBox({
        'Booking ID': bookingId,
        'Reason': reason,
        'Status': 'Closed',
      })}
      <p>If you believe this case needs to be reopened, please contact our support team within 30 days. Archive of this case will be available in your account history.</p>
    `,
  });
