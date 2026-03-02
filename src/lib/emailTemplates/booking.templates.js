// ✅ Booking Email Templates
import { baseEmailTemplate, createInfoBox, createStatusBadge } from './baseTemplate.js';

export const bookingCreatedTemplate = (
  userName,
  brandName,
  dressName,
  colour,
  dressSize,
  deliveryMethod,
  rentalDays,
  totalAmount
) =>
  baseEmailTemplate({
    title: 'Your booking is being reviewed',
    subtitle: '',
    content: `
      <p>Hi ${userName},</p>
      <p>Your booking has been received.<br>The lender is reviewing availability and will confirm shortly.</p>
      <h3>Booking details</h3>
      ${createInfoBox({
      'Brand': brandName,
      'Dress': dressName,
      'Colour': colour,
      'Size': dressSize,
      'Delivery method': deliveryMethod,
      'Rental duration': `${rentalDays} days`,
      'Total': `$${totalAmount}`,
    })}
      <p>We’ll be in touch as soon as there’s an update.</p>
      <p>We’ll send you a return link before your due date to confirm return.</p>
      <p>— Muse Gala</p>
    `,
  });

export const bookingConfirmedTemplate = (
  userName,
  brandName,
  dressName,
  colour,
  dressSize,
  deliveryMethod,
  startDate,
  endDate,
  totalAmount,
  bookingId
) =>
  baseEmailTemplate({
    title: 'Booking Confirmation',
    subtitle: 'Your booking has been confirmed by the lender and your rental is now secured.',
    content: `
      <p>Hi ${userName},</p>
      <p>Thank you — your booking has been confirmed by the lender and your rental is now secured.</p>
      <h3>Item Details:</h3>
      ${createInfoBox({
      'Brand': brandName,
      'Style': dressName,
      'Size': dressSize,
      'Colour': colour,
      'Booking ID': bookingId || 'N/A',
      'Rental Period': `${startDate} - ${endDate}`,
      'Total Amount': `$${totalAmount}`,
    })}
      <p>We’ll keep you updated with any important information as your rental approaches. If you need anything in the meantime, feel free to reach out.</p>
      <p>We’ll send you a return link before your due date to confirm return.</p>
      <p>— Muse Gala</p>
    `,
  });

export const labelReadyTemplate = (
  userName,
  brandName,
  dressName,
  colour,
  dressSize,
  trackingInfo
) =>
  baseEmailTemplate({
    title: 'Your dress will be dispatched shortly',
    subtitle: 'Your dress will be dispatched shortly',
    content: `
      <p>Hi ${userName},</p>
      <p>Your shipping label has been created.</p>
      <h3>Dress details</h3>
      ${createInfoBox({
      'Brand': brandName,
      'Dress': dressName,
      'Colour': colour,
      'Size': dressSize,
      'Shipping Info': trackingInfo,
    })}
      <p>Your dress will be dispatched shortly. Tracking will follow.</p>
      <p>— Muse Gala</p>
    `,
  });

export const shippedToCustomerTemplate = (
  userName,
  brandName,
  dressName,
  colour,
  dressSize
) =>
  baseEmailTemplate({
    title: 'Your dress is on its way',
    subtitle: 'Your dress is on its way',
    content: `
      <p>Hi ${userName},</p>
      <p>Your dress has been dispatched.</p>
      <h3>Dress details</h3>
      ${createInfoBox({
      'Brand': brandName,
      'Dress': dressName,
      'Colour': colour,
      'Size': dressSize,
    })}
      <p>Track your delivery <a href="${process.env.FRONTEND_URL || 'https://musegala.com.au'}/account/chats">here</a>.</p>
      <p>— Muse Gala</p>
    `,
  });

export const dressDeliveredTemplate = (
  userName,
  brandName,
  dressName,
  colour,
  dressSize,
  returnDeadline
) =>
  baseEmailTemplate({
    title: 'Your dress has arrived',
    subtitle: 'Your dress has arrived',
    content: `
      <p>Hi ${userName},</p>
      <p>Your dress has arrived.</p>
      <p>We hope it’s everything you were looking for. If anything isn’t quite right, please let us know as soon as possible.</p>
      <h3>Dress details</h3>
      ${createInfoBox({
      'Brand': brandName,
      'Dress': dressName,
      'Colour': colour,
      'Size': dressSize,
      'Return Deadline': returnDeadline,
    })}
      <p>— Muse Gala</p>
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
  brandName,
  dressName,
  colour,
  dressSize
) =>
  baseEmailTemplate({
    title: 'BOOKING CANCELLED',
    subtitle: 'Your booking has been cancelled.',
    content: `
      <p>Hi ${userName},</p>
      <p>Your booking has been cancelled.</p>
      <h3>Booking details</h3>
      ${createInfoBox({
      'Brand': brandName,
      'Dress': dressName,
      'Colour': colour,
      'Size': dressSize,
    })}
      <p>— Muse Gala</p>
    `,
  });

export const bookingRejectedTemplate = (
  userName,
  brandName,
  dressName,
  colour,
  dressSize,
  deliveryMethod
) =>
  baseEmailTemplate({
    title: 'Update on your booking',
    subtitle: 'Update on your booking',
    content: `
      <p>Hi ${userName},</p>
      <p>Unfortunately, this booking couldn’t be confirmed.</p>
      <h3>Booking details</h3>
      ${createInfoBox({
      'Brand': brandName,
      'Dress': dressName,
      'Colour': colour,
      'Size': dressSize,
      'Delivery method': deliveryMethod,
    })}
      <p>Availability can change quickly. If you’d like help finding an alternative or have questions about this booking, our team is happy to assist.</p>
      <p>No charges have been made.</p>
      <p>— Muse Gala</p>
    `,
  });

export const paymentFailedTemplate = (userName, dressName, amount, error) =>
  baseEmailTemplate({
    title: 'PAYMENT FAILED',
    subtitle: 'Payment Failed',
    content: `
      <p>Hi ${userName},</p>
      <p>We were unable to process payment for your booking of <strong>${dressName}</strong>.</p>
      ${createInfoBox({
      'Amount': `$${amount}`,
      'Issue': error,
    })}
      <p>Please update your payment method to keep your booking.</p>
      <p>— Muse Gala</p>
    `,
  });

export const shipmentPreparingTemplate = (userName, dressName, estimatedShipDate) =>
  baseEmailTemplate({
    title: 'PREPARING YOUR SHIPMENT',
    subtitle: 'Preparing Your Shipment',
    content: `
      <p>Hi ${userName},</p>
      <p>We’re getting your dress <strong>${dressName}</strong> ready for shipment.</p>
      ${createInfoBox({
      'Estimated ship date': estimatedShipDate,
    })}
      <p>We’ll notify you once it’s on the way.</p>
      <p>— Muse Gala</p>
    `,
  });
