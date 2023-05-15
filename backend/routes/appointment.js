const router = require("express").Router();
const Appointment = require("../models/Appointment");


// POST /api/appointments endpoint'i, randevu kaydetmek için kullanılır
router.post('/', (req, res) => {
    const { doctorId, dateTime } = req.body;

    // Yeni randevu oluştur
    const newAppointment = new Appointment({ doctorId, dateTime });

    // Randevuyu kaydet
    newAppointment.save()
        .then((savedAppointment) => {
            console.log('Randevu kaydedildi:', savedAppointment);
            return res.status(201).json(savedAppointment);
        })
        .catch((err) => {
            console.error('Randevu kaydedilemedi:', err);
            return res.status(500).json({ error: 'Randevu kaydedilemedi.' });
        });

});

// GET /api/appointments endpoint'i, tüm randevuları getirmek için kullanılır
router.get('/', (req, res) => {
    Appointment.find({})
        .then((appointments) => {
            return res.status(200).json(appointments);
        })
        .catch((err) => {
            console.error('Randevular getirilemedi:', err);
            return res.status(500).json({ error: 'Randevular getirilemedi.' });
        });

});

module.exports = router;