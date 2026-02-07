/**
 * Lender Application Email Templates
 * Templates for application submission, approval, and rejection notifications
 */

import { baseEmailTemplate, createInfoBox, createStatusBadge } from './baseTemplate.js';

/**
 * Email sent to admin when a new lender application is submitted
 */
export const newApplicationAdminTemplate = ({ fullName, email, phoneNumber, tempPassword, businessName }) => {
  const content = `
    <div class="content-left">
      <p>A new lender application has been submitted and requires your review.</p>
      
      ${createInfoBox({
        'Applicant Name': fullName || 'N/A',
        'Email': email,
        'Phone': phoneNumber || 'N/A',
        'Business Name': businessName || 'N/A',
        'Temporary Password': tempPassword
      })}

      <p class="text-muted text-small mt-20">Please review and approve/reject the application in the admin panel.</p>
    </div>
  `;

  return baseEmailTemplate({
    title: 'New Lender Application',
    subtitle: 'A new application is awaiting your review',
    content,
    buttonText: 'Review Application',
    buttonUrl: 'https://admin.musegala.com.au/lenders'
  });
};

/**
 * Email sent to applicant confirming their application was received
 */
export const applicationReceivedTemplate = ({ fullName }) => {
  const content = `
    <div class="content-left">
      <p>Dear ${fullName || 'Applicant'},</p>
      
      <p>Thank you for applying to become a lender with Muse Gala! We're excited to review your application.</p>
      
      <div class="info-box">
        <p><strong>What happens next?</strong></p>
        <p>Our team will carefully review your application. This process typically takes 1-3 business days.</p>
        <p>We'll notify you via email once a decision has been made.</p>
      </div>

      <p>If you have any questions in the meantime, please don't hesitate to reach out to our support team.</p>
      
      <p class="text-muted text-small mt-20">Thank you for your interest in joining the Muse Gala community!</p>
    </div>
  `;

  return baseEmailTemplate({
    title: 'Application Received',
    subtitle: 'We have received your lender application',
    content
  });
};

/**
 * Email sent to applicant when their application is approved
 */
export const applicationApprovedTemplate = ({ fullName }) => {
  const content = `
    <div class="content-left">
      <p>Dear ${fullName || 'Applicant'},</p>
      
      <p>Congratulations! 🎉 Your lender application has been <strong>approved</strong>.</p>
      
      ${createStatusBadge('APPROVED', 'success')}
      
      <div class="info-box mt-20">
        <p><strong>Getting Started</strong></p>
        <p>You can now log in to your lender dashboard and start listing your dresses.</p>
        <p>Complete your profile, set up your payment details, and begin your journey with Muse Gala!</p>
      </div>

      <p>We're thrilled to have you as part of our community of fashion-forward lenders.</p>
    </div>
  `;

  return baseEmailTemplate({
    title: 'Welcome to Muse Gala!',
    subtitle: 'Your lender application has been approved',
    content,
    buttonText: 'Go to Dashboard',
    buttonUrl: 'https://musegala.com.au/lender/dashboard'
  });
};

/**
 * Email sent to admin when an application is approved
 */
export const applicationApprovedAdminTemplate = ({ fullName, email, phoneNumber }) => {
  const content = `
    <div class="content-left">
      <p>A lender application has been approved.</p>
      
      ${createInfoBox({
        'Lender Name': fullName || 'N/A',
        'Email': email,
        'Phone': phoneNumber || 'N/A',
        'Status': 'Approved'
      })}

      ${createStatusBadge('APPROVED', 'success')}
    </div>
  `;

  return baseEmailTemplate({
    title: 'Application Approved',
    subtitle: 'A new lender has been added to the platform',
    content
  });
};

/**
 * Email sent to applicant when their application is rejected
 */
export const applicationRejectedTemplate = ({ fullName, rejectionNote }) => {
  const content = `
    <div class="content-left">
      <p>Dear ${fullName || 'Applicant'},</p>
      
      <p>Thank you for your interest in becoming a lender with Muse Gala.</p>
      
      <p>After careful consideration, we regret to inform you that your application has not been approved at this time.</p>
      
      ${createStatusBadge('NOT APPROVED', 'error')}
      
      ${rejectionNote ? `
        <div class="info-box mt-20">
          <p><strong>Feedback:</strong></p>
          <p>${rejectionNote}</p>
        </div>
      ` : ''}

      <p class="mt-20">If you believe this decision was made in error, or if you'd like to reapply in the future with updated information, please feel free to contact our support team.</p>
      
      <p>We appreciate your understanding and wish you all the best.</p>
    </div>
  `;

  return baseEmailTemplate({
    title: 'Application Update',
    subtitle: 'Regarding your lender application',
    content
  });
};
