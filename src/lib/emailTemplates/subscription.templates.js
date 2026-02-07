// ✅ Subscription Email Templates
import { baseEmailTemplate, createInfoBox, createStatusBadge } from './baseTemplate.js';

/**
 * Template for lender when subscription is activated (free or paid)
 */
export const subscriptionActivatedTemplate = (
  lenderName,
  planName,
  price,
  currency,
  billingCycle,
  expiryDate,
  features = []
) => {
  const featuresHtml = features.length > 0
    ? `<div class="info-box">
        <p><strong>Plan Features:</strong></p>
        ${features.map(feature => `<p>✓ ${feature}</p>`).join('')}
      </div>`
    : '';

  return baseEmailTemplate({
    title: 'SUBSCRIPTION ACTIVATED',
    subtitle: 'Congratulations! Your subscription is now active.',
    content: `
      <p>Hi ${lenderName},</p>
      <p>Your subscription has been successfully activated. You now have access to all premium features.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge(planName, 'success')}
      </div>
      ${price > 0 
        ? `<div style="background-color: #000; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="font-size: 28px; font-weight: bold; margin: 0; color: #fff;">$${price.toFixed(2)} ${currency}/${billingCycle}</p>
          </div>`
        : `<div style="margin: 20px 0;">${createStatusBadge('FREE PLAN', 'info')}</div>`
      }
      ${createInfoBox({
        'Plan': planName,
        'Billing Cycle': billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1),
        'Start Date': new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        'Expiry Date': expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      })}
      ${featuresHtml}
      <p><strong>What's Included?</strong> Your subscription is now active and you can start enjoying all the premium benefits. Visit your dashboard to explore new features and maximize your presence on Muse Gala.</p>
      <p>Thank you for subscribing to Muse Gala!</p>
    `,
    buttonText: 'GO TO DASHBOARD',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });
};

/**
 * Template for lender when subscription payment is successful (paid plan)
 */
export const subscriptionPaymentConfirmationTemplate = (
  lenderName,
  planName,
  amount,
  currency,
  paymentId,
  invoiceDate
) =>
  baseEmailTemplate({
    title: 'PAYMENT SUCCESSFUL',
    subtitle: 'Thank you for your subscription payment!',
    content: `
      <p>Hi ${lenderName},</p>
      <p>Your subscription payment has been processed successfully.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Paid ✓', 'success')}
      </div>
      <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="font-size: 28px; font-weight: bold; margin: 0; color: #fff;">$${amount.toFixed(2)} ${currency}</p>
      </div>
      ${createInfoBox({
        'Plan': planName,
        'Amount': `$${amount.toFixed(2)} ${currency}`,
        'Payment ID': paymentId,
        'Invoice Date': invoiceDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      })}
      <p><strong>Next Steps:</strong> Your subscription is now active and you have full access to all premium features. You can manage your subscription settings in your account dashboard at any time.</p>
      <p>Thank you for choosing Muse Gala!</p>
    `,
  });

/**
 * Template for lender when subscription payment fails
 */
export const subscriptionPaymentFailedTemplate = (
  lenderName,
  planName,
  amount,
  currency,
  errorReason
) =>
  baseEmailTemplate({
    title: 'PAYMENT FAILED',
    subtitle: 'We were unable to process your subscription payment.',
    content: `
      <p>Hi ${lenderName},</p>
      <p>Unfortunately, we were unable to process your subscription payment. Please review the details below and try again.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Failed', 'error')}
      </div>
      ${createInfoBox({
        'Plan': planName,
        'Amount': `$${amount.toFixed(2)} ${currency}`,
      })}
      <div class="info-box">
        <p><strong>Reason for Failure:</strong></p>
        <p>${errorReason}</p>
        <p class="text-muted text-small">Common reasons: Insufficient funds, expired card, or incorrect details. Please update your payment method and try again.</p>
      </div>
      <p>If you continue to experience issues, please contact our support team for assistance.</p>
      <p class="text-muted text-small">Your subscription will not be active until payment is successful.</p>
    `,
    buttonText: 'RETRY PAYMENT',
    buttonUrl: `${process.env.FRONTEND_URL}/subscription/checkout`,
  });

/**
 * Template for lender when subscription checkout expires
 */
export const subscriptionCheckoutExpiredTemplate = (
  lenderName,
  planName,
  amount,
  currency
) =>
  baseEmailTemplate({
    title: 'CHECKOUT SESSION EXPIRED',
    subtitle: 'Your checkout session has expired.',
    content: `
      <p>Hi ${lenderName},</p>
      <p>Your subscription checkout session has expired. The checkout link is no longer valid, but you can easily start over.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Session Expired', 'pending')}
      </div>
      ${createInfoBox({
        'Plan': planName,
        'Amount': `$${amount.toFixed(2)} ${currency}`,
      })}
      <p><strong>Session Timeout:</strong> Checkout sessions are valid for 24 hours. Your session has expired, but you can create a new one by clicking the button below.</p>
      <p>If you have any questions or need assistance, please reach out to our support team.</p>
    `,
    buttonText: 'CONTINUE TO CHECKOUT',
    buttonUrl: `${process.env.FRONTEND_URL}/subscription/plans`,
  });

/**
 * Template for lender when subscription is refunded
 */
export const subscriptionRefundedTemplate = (
  lenderName,
  planName,
  refundAmount,
  currency,
  refundId
) =>
  baseEmailTemplate({
    title: 'REFUND PROCESSED',
    subtitle: 'Your subscription refund has been processed.',
    content: `
      <p>Hi ${lenderName},</p>
      <p>We've successfully processed a refund for your subscription. The funds will be returned to your original payment method.</p>
      <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; color: #999;">Refund Amount</p>
        <p style="font-size: 28px; font-weight: bold; margin: 0; color: #fff;">$${refundAmount.toFixed(2)} ${currency}</p>
      </div>
      ${createInfoBox({
        'Plan': planName,
        'Refund ID': refundId,
        'Processed Date': new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        'Subscription Status': 'Inactive',
      })}
      <p><strong>Refund Timeline:</strong> Your refund should appear in your bank account within 5-10 business days, depending on your bank's processing time.</p>
      <p>Your subscription has been deactivated. If you'd like to reactivate your subscription later, you can do so anytime from your account settings.</p>
    `,
  });

/**
 * Template for lender when subscription is expiring soon
 */
export const subscriptionExpiringTemplate = (
  lenderName,
  planName,
  daysRemaining,
  expiryDate
) =>
  baseEmailTemplate({
    title: 'SUBSCRIPTION EXPIRING SOON',
    subtitle: "Don't lose access to premium features!",
    content: `
      <p>Hi ${lenderName},</p>
      <p>Your subscription is about to expire! Don't lose access to premium features. Renew your subscription before it's too late.</p>
      <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; color: #999;">Days Remaining</p>
        <p style="font-size: 48px; font-weight: bold; margin: 0; color: #fff;">${daysRemaining}</p>
      </div>
      ${createInfoBox({
        'Plan': planName,
        'Expiry Date': expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        'Status': '⚠️ Expiring',
      })}
      <p><strong>What Happens When Your Subscription Expires?</strong></p>
      <p>You will lose access to premium features. Your listings may become inactive, and you won't be able to process bookings. Renew your subscription now to continue enjoying uninterrupted service.</p>
      <p>If you have any questions or need help with your subscription, please contact our support team.</p>
    `,
    buttonText: 'RENEW SUBSCRIPTION',
    buttonUrl: `${process.env.FRONTEND_URL}/subscription/renew`,
  });
