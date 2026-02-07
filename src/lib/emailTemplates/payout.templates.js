// ✅ Payout Email Templates
import { baseEmailTemplate, createInfoBox, createStatusBadge } from './baseTemplate.js';

/**
 * Template for lender when payout request is created
 */
export const payoutRequestCreatedTemplate = (
  lenderName,
  requestedAmount,
  bookingId,
  commission
) =>
  baseEmailTemplate({
    title: 'PAYOUT REQUEST SUBMITTED',
    subtitle: 'Your payout request is now pending admin approval.',
    content: `
      <p>Hi ${lenderName},</p>
      <p>Your payout request has been successfully submitted and is now pending admin approval.</p>
      <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; color: #999;">Requested Amount</p>
        <p style="font-size: 32px; font-weight: bold; margin: 0; color: #fff;">$${requestedAmount.toFixed(2)}</p>
      </div>
      ${createInfoBox({
        'Booking ID': bookingId,
        'Requested Amount': `$${requestedAmount.toFixed(2)}`,
        'Commission': `${commission}%`,
        'Status': 'Pending',
      })}
      <p><strong>What's Next?</strong> Our admin team will review your request. Once approved, the funds will be transferred to your connected Stripe account. You'll receive a confirmation email when the transfer is complete.</p>
      <p>Thank you for using our platform!</p>
    `,
  });

/**
 * Template for admin when new payout request is received
 */
export const payoutRequestReceivedTemplate = (
  lenderName,
  lenderId,
  requestedAmount,
  bookingId,
  lenderPrice,
  adminsProfit
) =>
  baseEmailTemplate({
    title: 'NEW PAYOUT REQUEST',
    subtitle: 'A new payout request requires your review and approval.',
    content: `
      <p><strong>Action Required:</strong> A new payout request needs your attention.</p>
      ${createInfoBox({
        'Lender Name': lenderName,
        'Lender ID': lenderId,
      })}
      ${createInfoBox({
        'Booking ID': bookingId,
        'Lender Price': `$${lenderPrice.toFixed(2)}`,
        "Admin's Profit": `$${adminsProfit.toFixed(2)}`,
        'Payout Amount': `$${requestedAmount.toFixed(2)}`,
      })}
    `,
    buttonText: 'REVIEW PAYOUT REQUEST',
    buttonUrl: `${process.env.ADMIN_DASHBOARD_URL || '#'}/payouts`,
  });

/**
 * Template for lender when payout is successfully transferred
 */
export const payoutTransferredTemplate = (
  lenderName,
  transferredAmount,
  stripeTransferId,
  bookingId
) =>
  baseEmailTemplate({
    title: 'PAYOUT TRANSFERRED',
    subtitle: 'Great news! Your payout has been approved and transferred.',
    content: `
      <p>Hi ${lenderName},</p>
      <p>Your payout has been approved and transferred to your Stripe account.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Paid ✓', 'success')}
      </div>
      <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; color: #999;">Amount Transferred</p>
        <p style="font-size: 32px; font-weight: bold; margin: 0; color: #fff;">$${transferredAmount.toFixed(2)}</p>
      </div>
      ${createInfoBox({
        'Booking Reference': bookingId,
        'Stripe Transfer ID': stripeTransferId,
        'Transfer Date': new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      })}
      <p><strong>Funds Availability:</strong> The funds should appear in your connected bank account within 2-5 business days, depending on your bank's processing time. You can track this transfer in your Stripe dashboard.</p>
      <p>Thank you for being a valued lender on our platform!</p>
    `,
  });

/**
 * Template for lender and admin when payout transfer fails
 */
export const payoutFailedTemplate = (
  recipientName,
  requestedAmount,
  bookingId,
  errorReason,
  isAdmin = false
) => {
  const reasonsList = Array.isArray(errorReason) 
    ? errorReason.map(err => `• ${err}`).join('<br/>') 
    : errorReason;

  return baseEmailTemplate({
    title: 'PAYOUT TRANSFER FAILED',
    subtitle: isAdmin 
      ? 'A payout transfer has failed and requires your attention.'
      : 'Unfortunately, we were unable to process your payout request.',
    content: `
      <p>Hi ${recipientName},</p>
      <p>${isAdmin ? 'A payout transfer has failed and requires your attention.' : 'Unfortunately, we were unable to process your payout request at this time.'}</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Failed', 'error')}
      </div>
      ${createInfoBox({
        'Requested Amount': `$${requestedAmount.toFixed(2)}`,
        'Booking ID': bookingId,
      })}
      <div class="info-box">
        <p><strong>Reason for Failure:</strong></p>
        <p>${reasonsList}</p>
      </div>
      <p><strong>${isAdmin ? 'Required Actions:' : 'Next Steps:'}</strong></p>
      <p>${isAdmin 
        ? "Please review the lender's Stripe account settings and ensure all requirements are met before attempting the transfer again. Contact the lender if necessary."
        : "Please complete your Stripe onboarding and ensure all account details are correctly set up. Once resolved, you can submit a new payout request. If you need assistance, please contact our support team."
      }</p>
      ${!isAdmin ? '<p>We apologize for the inconvenience and appreciate your patience.</p>' : ''}
    `,
  });
};
