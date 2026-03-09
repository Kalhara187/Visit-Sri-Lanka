const db = require('../database');

class Booking {
    static create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = `
                    INSERT INTO bookings (user_id, booking_type, item_id, item_name, guests, check_in, check_out, total_price, payment_method, payment_status, special_requests)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    data.userId,
                    data.bookingType,
                    data.itemId,
                    data.itemName,
                    data.guests,
                    data.checkIn,
                    data.checkOut,
                    data.totalPrice,
                    data.paymentMethod,
                    'paid',
                    data.specialRequests || ''
                ];
                const result = await db.run(sql, params);
                const booking = await db.get('SELECT * FROM bookings WHERE id = ?', [result.lastID]);
                resolve(booking);
            } catch (err) {
                reject(err);
            }
        });
    }

    static findByUser(userId) {
        return db.all(
            'SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
    }

    static findAll() {
        return db.all('SELECT * FROM bookings ORDER BY created_at DESC');
    }

    static findById(id) {
        return db.get('SELECT * FROM bookings WHERE id = ?', [id]);
    }

    static cancel(id, userId) {
        return db.run(
            'UPDATE bookings SET status = ? WHERE id = ? AND user_id = ?',
            ['cancelled', id, userId]
        );
    }
}

module.exports = Booking;
