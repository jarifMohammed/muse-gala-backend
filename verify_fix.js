import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Booking } from './src/entities/booking/booking.model.js';
import './src/entities/auth/auth.model.js'; // Ensure User model is registered
import './src/entities/admin/Lisitngs/ReviewandMain Site Listing/masterDressModel.js'; // Ensure MasterDress model is registered

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const bookingId = '698e8e6495f5910a20cb3a64';

async function verify() {
    try {
        console.log('Using Mongo URI:', mongoURI);
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected.');

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            console.error('Booking not found');
            process.exit(1);
        }

        console.log('--- Initial Data ---');
        console.log('Status:', booking.deliveryStatus);
        console.log('Token:', booking.returnToken);
        console.log('Reminder Count:', booking.reminderCount);

        console.log('\nStep 1: Resetting to "Delivered"...');
        booking.deliveryStatus = 'Delivered';
        booking.returnToken = undefined;
        booking.reminderCount = 0;
        await booking.save();
        console.log('Reset saved.');

        console.log('\nStep 2: Setting to "Return Due"...');
        booking.deliveryStatus = 'Return Due';
        await booking.save();
        console.log('Update saved.');

        console.log('\nChecking for changes...');
        const updated = await Booking.findById(bookingId);
        console.log('Final Status:', updated.deliveryStatus);
        console.log('Final Token:', updated.returnToken ? 'EXISTS ✓' : 'MISSING ✗');
        console.log('Final Reminder Count:', updated.reminderCount);
        console.log('Final Status History Length:', updated.statusHistory.length);
        console.log('Last History Entry:', updated.statusHistory[updated.statusHistory.length - 1]);

        if (updated.returnToken && updated.deliveryStatus === 'ReturnLinkSent') {
            console.log('\n✅ VERIFICATION PASSED');
        } else {
            console.log('\n❌ VERIFICATION FAILED');
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('VERIFICATION ERROR:', err);
        process.exit(1);
    }
}

verify();
