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
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('Connected.');

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            console.error('Booking not found');
            process.exit(1);
        }

        console.log('Current status:', booking.deliveryStatus);
        console.log('Current reminderCount:', booking.reminderCount);
        console.log('Current returnToken:', booking.returnToken);

        // Reset status to trigger isModified in pre-save
        console.log('Resetting status to "Delivered"...');
        booking.deliveryStatus = 'Delivered';
        await booking.save();
        console.log('Status reset.');

        // Now set to "Return Due" to trigger the fix
        console.log('Setting status to "Return Due"...');
        booking.deliveryStatus = 'Return Due';
        await booking.save();
        console.log('Status updated.');

        // Wait a bit for post-save hooks (though they are awaited in save() if not parallel)
        // Actually our post-save hook has some async logic that might not be fully awaited by mongoose if not careful,
        // but mongoose awaits post-save middleares.

        const updatedBooking = await Booking.findById(bookingId);
        console.log('--- Verification Results ---');
        console.log('New status:', updatedBooking.deliveryStatus);
        console.log('New reminderCount:', updatedBooking.reminderCount);
        console.log('New returnToken:', updatedBooking.returnToken ? 'GENERATED ✓' : 'MISSING ✗');

        if (updatedBooking.returnToken && updatedBooking.reminderCount > 0) {
            console.log('SUCCESS: Return flow triggered correctly!');
        } else {
            console.log('FAILURE: Return flow DID NOT trigger.');
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error during verification:', err);
        process.exit(1);
    }
}

verify();
