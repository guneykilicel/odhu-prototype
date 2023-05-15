import * as React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import trLocale from 'date-fns/locale/tr';

export default function StaticDateTimePickerTr() {
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [bookedAppointments, setBookedAppointments] = useState([]);

    useEffect(() => {
        // MongoDB'den daha önce alınmış randevuları alın
        fetch('/api/appointments')
            .then((response) => response.json())
            .then((data) => {
                setBookedAppointments(data);
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
            const doctorId = 'doktor_id'; // Doktorun benzersiz kimliği
            const dateTime = selectedDateTime; // Seçilen randevu tarihi ve saati

            // Seçilen tarih ve saat için randevu müsait mi kontrolü yapma
            const isAvailable = checkAvailability(dateTime);
            if (isAvailable) {
                saveAppointment(doctorId, dateTime);
            } else {
                console.log('Seçilen randevu müsait değil');
            }
        }
    };

    const checkAvailability = (dateTime) => {
        // Seçilen tarih ve saat MongoDB'deki randevularla karşılaştırma
        for (const appointment of bookedAppointments) {
            const bookedDateTime = new Date(appointment.dateTime);
            if (dateTime.getTime() === bookedDateTime.getTime()) {
                return false; // Randevu müsait değil
            }
        }
        return true; // Randevu müsait
    };

    const saveAppointment = (doctorId, dateTime) => {
        fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctorId: doctorId,
                dateTime: dateTime,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Randevu kaydedildi:', data);
            })
            .catch((error) => {
                console.error('Hata:', error);
            });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={trLocale}>
            <StaticDateTimePicker
                orientation="landscape"
                minutesStep={60}
                ampm={false}
                showTodayButton
                todayText="Bugün"
                cancelText="İptal"
                okText="Tamam"
                dateRangeIcon="Tarih Aralığı"
                timeIcon="Saat"
                onAccept={handleDateTimeAccept}
                shouldDisableDate={(date) => {
                    // Geçmiş tarihleri devre dışı bırakın
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Bugünün saatini sıfırlayın

                    // Daha önce alınmış randevuların tarihlerini kontrol edin
                    const isBooked = bookedAppointments.some((appointment) => {
                        const bookedDateTime = new Date(appointment.dateTime);
                        return (
                            bookedDateTime.getFullYear() === date.getFullYear() &&
                            bookedDateTime.getMonth() === date.getMonth() &&
                            bookedDateTime.getDate() === date.getDate()
                        );
                    });

                    return date < today || isBooked;
                }}
            />
        </LocalizationProvider>
    );
}

// import * as React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
// import trLocale from 'date-fns/locale/tr';

// export default function StaticDateTimePickerTr() {
//   const handleDateTimeAccept = (date) => {
//     console.log('Seçilen tarih ve saat:', date);
//     // İstediğiniz işlemleri burada gerçekleştirin
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs} locale={trLocale}>
//       <StaticDateTimePicker
//         orientation="landscape"
//         minutesStep={60}
//         ampm={false}
//         showTodayButton
//         todayText="Bugün"
//         cancelText="İptal"
//         okText="Tamam"
//         dateRangeIcon="Tarih Aralığı"
//         timeIcon="Saat"
//         onAccept={handleDateTimeAccept} // Tamam butonuna basıldığında tetiklenecek fonksiyon
//       />
//     </LocalizationProvider>
//   );
// }