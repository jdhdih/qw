const express = require('express');
const axios = require('axios');
const app = express();

app.get('/stream', async (req, res) => {
    // الرابط الذي اصطدته أنت من تطبيق PCAPdroid
    const targetUrl = "https://planetary.lovetier.bz/beINAR/tracks-v1a1/mono.m3u8?token=YmVJTkFscFsfG5vX2NoZWNrlwfDE3NzQ5OTQ0%3D.354f0c7b70f76e7b66a984c77162f83de26012fe319c478f274356432b61bdae";

    try {
        const response = await axios.get(targetUrl, {
            headers: {
                // المعلومات المستخرجة من جهازك Infinix لضمان عدم الحجب
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; Infinix X6517)',
                'Referer': 'https://lovetier.bz/',
                'Origin': 'https://lovetier.bz',
                'Accept': '*/*'
            },
            responseType: 'stream'
        });

        // إعدادات تشغيل البث المباشر
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("فشل جلب البث، قد يكون الـ Token قد انتهى: " + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`سيرفر البث جاهز على المنفذ ${PORT}`));
