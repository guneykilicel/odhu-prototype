import * as React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import trLocale from 'date-fns/locale/tr';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { isValid } from 'date-fns';

export default function StaticDateTimePickerTr() {
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const { username } = useParams();

    useEffect(() => {
        // MongoDB'den daha önce alınmış randevuları alın
        axios
            .get('/appointments')
            .then((response) => {
                setBookedAppointments(response.data);
            })
            .catch((error) => {
                console.error('Hata:', error);
            });
    }, []);

    const handleDateTimeAccept = (date) => {
        setSelectedDateTime(date);
    };

    const handleAppointmentSubmit = () => {
        // Seçilen randevu tarihini ve saatini MongoDB'ye kaydetmek için gerekli işlemleri yapın
        if (selectedDateTime) {
            const doctorId = username; // Doktorun benzersiz kimliği
            const userId = currentUser;
            const dateTime = selectedDateTime.toISOString(); // Seçilen randevu tarihi ve saati

            // Seçilen tarih ve saat için randevu müsait mi kontrolü yapma
            const isAvailable = checkAvailability(dateTime);
            if (isAvailable) {
                saveAppointment(doctorId, userId, dateTime);
            } else {
                console.log('Seçilen randevu müsait değil');
            }
        }
    };

    const checkAvailability = (dateTime) => {
        for (const appointment of bookedAppointments) {
            const bookedDateTime = new Date(appointment.dateTime);
            if (isValid(bookedDateTime) && dateTime.getTime() === bookedDateTime.getTime()) {
                return false; // Randevu müsait değil
            }
        }
        return true; // Randevu müsait
    };

    const saveAppointment = (doctorId, userId, dateTime) => {
        axios
            .post('/api/appointments', {
                doctorId: doctorId,
                userId: userId,
                dateTime: dateTime,
            })
            .then((response) => {
                console.log('Randevu kaydedildi:', response.data);
                // Randevu kaydedildikten sonra işlemleri gerçekleştirin veya yönlendirme yapın
            })
            .catch((error) => {
                console.error('Hata:', error);
            });
    };

    const isValidDate = (date) => {
        return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={trLocale}>
            <StaticDateTimePicker
                focusedView="day"
                orientation="landscape"
                minutesStep={60}
                ampm={false}
                showTodayButton
                todayText="Bugün"
                cancelText="İptal"
                okText="Tamam"
                dateRangeIcon="Tarih Aralığı"
                timeIcon="Saat"
                value={selectedDateTime}
                onAccept={handleDateTimeAccept}
                // shouldDisableDate={(date) => {
                //     if (!isValidDate(date)) {
                //       return true; // Disable invalid dates
                //     }
                  
                //     const today = new Date();
                //     today.setHours(0, 0, 0, 0);
                  
                //     const isBooked = bookedAppointments.some((appointment) => {
                //       const bookedDateTime = new Date(appointment.dateTime);
                //       return (
                //         bookedDateTime.getFullYear() === date.getFullYear() &&
                //         bookedDateTime.getMonth() === date.getMonth() &&
                //         bookedDateTime.getDate() === date.getDate()
                //       );
                //     });
                  
                //     return date < today || isBooked;
                //   }}
            />
            <button onClick={handleAppointmentSubmit}>Randevuyu Kaydet</button>
        </LocalizationProvider>
    );
}

