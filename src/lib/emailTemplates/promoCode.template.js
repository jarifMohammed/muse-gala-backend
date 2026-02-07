// ✅ Promo Code Email Template
import { baseEmailTemplate, createInfoBox } from './baseTemplate.js';

export const promoCodeTemplate = ({ name, code, discountType, discount, expiresAt }) => {
  const expiry = new Date(expiresAt).toLocaleDateString();
  const discountText = discountType === "PERCENTAGE" ? `${discount}%` : `$${discount} AUD (Flat)`;

  return baseEmailTemplate({
    title: 'EXCLUSIVE PROMO CODE',
    subtitle: 'A special offer just for you!',
    content: `
      <p>Hello ${name || "Customer"},</p>
      <p>We are excited to offer you an exclusive promo code!</p>
      <div style="background-color: #000; color: #fff; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0; color: #999;">Promo Code</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 3px; margin: 0; color: #fff;">${code}</p>
      </div>
      ${createInfoBox({
        'Discount': discountText,
        'Expires on': expiry,
      })}
      <p>Use this promo code at checkout and enjoy your savings!</p>
    `,
    buttonText: 'SHOP NOW',
    buttonUrl: process.env.FRONTEND_URL || 'https://musegala.com.au',
  });
};
