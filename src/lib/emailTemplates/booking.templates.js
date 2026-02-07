// ✅ Booking Email Templates
import { baseEmailTemplate, createInfoBox, createStatusBadge } from './baseTemplate.js';

export const bookingCreatedTemplate = (
  userName,
  dressName,
  rentalDays,
  deliveryMethod,
  totalAmount
) =>
  baseEmailTemplate({
    title: 'BOOKING CONFIRMATION',
    subtitle: 'Your booking has been created successfully!',
    content: `
      <p>Hello ${userName},</p>
      <p>Thank you for creating your booking! We're excited to help you get the perfect dress.</p>
      ${createInfoBox({
        'Dress': dressName,
        'Rental Duration': `${rentalDays} days`,
        'Delivery Method': deliveryMethod,
        'Total Amount': `$${totalAmount}`,
        'Status': 'Pending Lender Approval',
      })}
      <p>Your booking is awaiting confirmation from the lender. We'll notify you as soon as they respond.</p>
    `,
  });

export const bookingConfirmedTemplate = (
  userName,
  dressName,
  rentalDays,
  startDate,
  endDate,
  totalAmount
) =>
  baseEmailTemplate({
    title: 'BOOKING ACCEPTED',
    subtitle: 'Great news! Your booking has been confirmed.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your booking has been accepted and confirmed. Payment has been processed successfully.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Confirmed ✓', 'success')}
      </div>
      ${createInfoBox({
        'Dress': dressName,
        'Rental Period': `${startDate} to ${endDate}`,
        'Duration': `${rentalDays} days`,
        'Total Paid': `$${totalAmount}`,
      })}
      <p>The lender is now preparing your dress for shipment. We'll send you tracking information once it's on the way!</p>
    `,
  });

export const bookingRejectedTemplate = (userName, dressName, reason) =>
  baseEmailTemplate({
    title: 'BOOKING REJECTED',
    subtitle: 'Unfortunately, your booking request has been declined.',
    content: `
      <p>Hello ${userName},</p>
      <p>Unfortunately, your booking request has been rejected by the lender.</p>
      ${createInfoBox({
        'Dress': dressName,
        'Reason': reason || 'The dress is no longer available for the requested dates',
      })}
      <p>No charges have been made to your account. Please try booking another dress or contact our support team for assistance.</p>
    `,
    buttonText: 'BROWSE DRESSES',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const paymentFailedTemplate = (
  userName,
  dressName,
  totalAmount,
  reason
) =>
  baseEmailTemplate({
    title: 'PAYMENT FAILED',
    subtitle: 'We were unable to process your payment.',
    content: `
      <p>Hello ${userName},</p>
      <p>We were unable to process the payment for your booking.</p>
      ${createInfoBox({
        'Dress': dressName,
        'Amount': `$${totalAmount}`,
        'Reason': reason || 'Card declined or insufficient funds',
      })}
      <p>Please log in to your account and update your payment method, then try again. Contact support if you need assistance.</p>
    `,
    buttonText: 'UPDATE PAYMENT',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const shipmentPreparingTemplate = (
  userName,
  dressName,
  estimatedShipDate
) =>
  baseEmailTemplate({
    title: 'PREPARING YOUR SHIPMENT',
    subtitle: 'Your dress is being prepared for shipping!',
    content: `
      <p>Hello ${userName},</p>
      <p>Good news! The lender is preparing your dress for shipment.</p>
      ${createInfoBox({
        'Dress': dressName,
        'Estimated Ship Date': estimatedShipDate,
        'Status': 'Preparing Shipment',
      })}
      <p>We'll send you tracking information as soon as the package is on its way. Thank you for your patience!</p>
    `,
  });

export const labelReadyTemplate = (userName, dressName, trackingNumber) =>
  baseEmailTemplate({
    title: 'SHIPPING LABEL READY',
    subtitle: 'Your shipping label has been generated.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your shipping label has been generated. Your dress will be shipped very soon!</p>
      ${createInfoBox({
        'Dress': dressName,
        'Tracking Number': trackingNumber || 'Coming soon',
        'Status': 'Label Ready',
      })}
      <p>Watch for your shipment! You'll receive tracking updates once the package is picked up by the carrier.</p>
    `,
  });

export const shippedToCustomerTemplate = (
  userName,
  dressName,
  trackingNumber,
  trackingUrl
) =>
  baseEmailTemplate({
    title: 'YOUR DRESS IS ON THE WAY',
    subtitle: 'Exciting news! Your dress has been shipped.',
    content: `
      <p>Hello ${userName},</p>
      <p>Exciting news! Your dress has been shipped and is on its way to you.</p>
      ${createInfoBox({
        'Dress': dressName,
        'Tracking Number': trackingNumber,
        'Status': 'Shipped to Customer',
      })}
      <p>Expected delivery time varies depending on your location. Thank you for your patience!</p>
    `,
    buttonText: 'TRACK YOUR SHIPMENT',
    buttonUrl: trackingUrl,
  });

export const dressDeliveredTemplate = (userName, dressName, returnDeadline) =>
  baseEmailTemplate({
    title: 'YOUR DRESS HAS ARRIVED',
    subtitle: 'Your dress has been delivered successfully!',
    content: `
      <p>Hello ${userName},</p>
      <p>Your dress has been delivered successfully! Enjoy wearing it to your special event.</p>
      ${createInfoBox({
        'Dress': dressName,
        'Status': 'Delivered',
        'Return Deadline': returnDeadline,
      })}
      <p><strong>Important:</strong> Please ensure the dress is returned by the deadline to avoid late fees. Inspect the dress upon delivery and report any issues immediately.</p>
    `,
  });

export const returnInitiatedTemplate = (
  userName,
  dressName,
  returnDeadline
) =>
  baseEmailTemplate({
    title: 'RETURN PROCESS INITIATED',
    subtitle: 'Your return request has been initiated.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your return request has been initiated. Here are the next steps:</p>
      ${createInfoBox({
        'Dress': dressName,
        'Return Deadline': returnDeadline,
        'Status': 'Return Initiated',
      })}
      <p>Please package the dress securely and prepare it for return. A prepaid shipping label will be provided for you to print and use.</p>
    `,
  });

export const shippedToLenderTemplate = (
  userName,
  dressName,
  trackingNumber,
  estimatedDelivery
) =>
  baseEmailTemplate({
    title: 'DRESS RETURN SHIPPED',
    subtitle: 'Your dress has been shipped back to the lender.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your dress has been shipped back to the lender. Thank you for renting with us!</p>
      ${createInfoBox({
        'Dress': dressName,
        'Tracking Number': trackingNumber,
        'Estimated Delivery': estimatedDelivery,
        'Status': 'Shipped to Lender',
      })}
      <p>Once the lender confirms receipt and inspection, your refund will be processed (if applicable).</p>
    `,
  });

export const bookingCompletedTemplate = (
  userName,
  dressName,
  rentalDays,
  refundAmount,
  refundStatus
) =>
  baseEmailTemplate({
    title: 'BOOKING COMPLETED',
    subtitle: 'Thank you for choosing Muse Gala!',
    content: `
      <p>Hello ${userName},</p>
      <p>Thank you for choosing Muse Gala! Your booking has been completed successfully.</p>
      <div style="margin: 20px 0;">
        ${createStatusBadge('Completed ✓', 'success')}
      </div>
      ${createInfoBox({
        'Dress': dressName,
        'Rental Duration': `${rentalDays} days`,
        ...(refundAmount ? { 'Refund Amount': `$${refundAmount}` } : {}),
        'Refund Status': refundStatus,
      })}
      <p>We hope you had a wonderful experience. Please consider leaving a review to help other customers.</p>
      <p>We can't wait to see you again for your next special occasion!</p>
    `,
    buttonText: 'LEAVE A REVIEW',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });

export const bookingCancelledTemplate = (
  userName,
  dressName,
  reason,
  refundAmount
) =>
  baseEmailTemplate({
    title: 'BOOKING CANCELLED',
    subtitle: 'Your booking has been cancelled.',
    content: `
      <p>Hello ${userName},</p>
      <p>Your booking has been cancelled.</p>
      ${createInfoBox({
        'Dress': dressName,
        'Reason': reason || 'Booking cancelled',
        'Refund Amount': `$${refundAmount}`,
      })}
      <p>Your refund will be processed within 3-5 business days. If you have any questions, please contact our support team.</p>
    `,
  });
