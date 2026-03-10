const db = require('../database');

class Hotel {
    static create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = `
                    INSERT INTO hotels (owner_id, name, description, location, facilities, contact_details,
                        price_per_night, total_rooms, room_types, status, image_url)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
                `;
                const result = await db.run(sql, [
                    data.ownerId,
                    data.name,
                    data.description || '',
                    data.location,
                    data.facilities || '',
                    data.contactDetails || '',
                    data.pricePerNight || 0,
                    data.totalRooms || 0,
                    data.roomTypes || '',
                    data.imageUrl || ''
                ]);
                const hotel = await db.get('SELECT * FROM hotels WHERE id = ?', [result.lastID]);
                resolve(hotel);
            } catch (err) {
                reject(err);
            }
        });
    }

    static findByOwner(ownerId) {
        return db.all(
            'SELECT * FROM hotels WHERE owner_id = ? ORDER BY created_at DESC',
            [ownerId]
        );
    }

    static findAll() {
        return db.all(`
            SELECT h.*, u.fullName as ownerName, u.email as ownerEmail
            FROM hotels h
            LEFT JOIN users u ON h.owner_id = u.id
            ORDER BY h.created_at DESC
        `);
    }

    static findApproved() {
        return db.all(
            "SELECT * FROM hotels WHERE status = 'approved' ORDER BY created_at DESC"
        );
    }

    static findById(id) {
        return db.get('SELECT * FROM hotels WHERE id = ?', [id]);
    }

    static update(id, ownerId, data) {
        return db.run(`
            UPDATE hotels
            SET name = ?, description = ?, location = ?, facilities = ?, contact_details = ?,
                price_per_night = ?, total_rooms = ?, room_types = ?, image_url = ?
            WHERE id = ? AND owner_id = ?
        `, [
            data.name, data.description, data.location, data.facilities,
            data.contactDetails, data.pricePerNight, data.totalRooms, data.roomTypes,
            data.imageUrl, id, ownerId
        ]);
    }

    static updateStatus(id, status) {
        return db.run('UPDATE hotels SET status = ? WHERE id = ?', [status, id]);
    }

    static delete(id, ownerId) {
        return db.run('DELETE FROM hotels WHERE id = ? AND owner_id = ?', [id, ownerId]);
    }

    static adminDelete(id) {
        return db.run('DELETE FROM hotels WHERE id = ?', [id]);
    }
}

module.exports = Hotel;
