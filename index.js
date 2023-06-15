const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
var router = express.Router();
const port = 3000;
app.use(cors());
app.use(express.json());

const mysql = require('mysql');
const { query } = require('express');
const baglanti = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'neyesek'
});

app.get('/rastgeletarif', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/rastgeletarif.html'));
});

//public klasörüne erişim
app.use(express.static(path.join(__dirname, 'public')));

//ana sayfa yönlenmesi

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/index.html'));
});


app.get('/tarifler', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/tarifler.html'));
});
app.get('/urunekle', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/urunekle.html'));
});

app.get('/tarifekle', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/tarifekle.html'));
});

app.get('/giris', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/giris.html'));
});


app.get('/arama', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/arama.html'));
});

app.post('/urunekle', function(req, res) {
    const uruadi = req.body.urunadi;
    const urunkategori = req.body.urunkategori;

    let sql = 'INSERT INTO contents (urun_name, urun_type) VALUES (?, ?)';
    let values = [uruadi, urunkategori];
    baglanti.query(sql, values, function (err, results, fields) {
        if (err) throw err;
        res.status(201).send(results);
    }
    );
});


app.post('/tarifekle', function(req, res) {
    const tarifadi = req.body.tarifadi;
    const tarifaciklama = req.body.yemektarifi;
    const yemekmalzeme = req.body.yemekanamalzeme;
    const yemekkategorisicikti = req.body.yemekkategorisicikti;
    const pisirmekategorisicikti = req.body.pisirmekategorisicikti;
    const yemekzorlukcikti = req.body.yemekzorlukcikti;
    const ulke = req.body.ulke;
    const kullanici = req.body.kullanici;

    let sql = 'INSERT INTO yemek (yemekadi, yemektarifi, yemekmalzeme, yemekkategori, yemekpisirmekategori, yemekzorluk, yemekulke, kullanici) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    let values = [tarifadi, tarifaciklama, yemekmalzeme, yemekkategorisicikti, pisirmekategorisicikti, yemekzorlukcikti, ulke, kullanici];
    baglanti.query(sql, values, function (err, results, fields) {
        if (err) throw err;
        res.status(201).send(results);
    }
    );
});



app.post('/yemekara', function(req, res) {

    const selectedItems = req.body.urunlerliste;
    const secilenurunsayisi = selectedItems.length;
    if (secilenurunsayisi == 2) {
        res.status(201).send("Lütfen bir ürün seçiniz.");
        return;
    }
    for (let i = 0; i < secilenurunsayisi; i++) {

        let sql = "SELECT * FROM yemek WHERE yemekmalzeme LIKE (?)"
        let values = [selectedItems[i]];
        baglanti.query(sql, values, function (err, results, fields) {
            if (err) throw err;
            console.log(results);
            res.status(201).send(results);
        }
        ); 
    } 

});


app.post('/rastgeletarif', function(req, res) {
    const rastgele = req.body.rastgele;
    if (rastgele == 1) {
        let sql = 'SELECT * FROM yemek ORDER BY RAND() LIMIT 1';
        baglanti.query(sql, function (err, results, fields) {
            res.status(202).send(results);
        });
        console.log("Rastgele Tarif");
    }
    else {
        console.log("Hata");
    }
});


app.post('/kullanicitarifleri', function(req, res) {
    let sql = 'SELECT kullanici FROM yemek';
    baglanti.query(sql, function (err, results, fields) {
        res.status(202).send(results);
    });
});

app.post('/kullaniciyagorearat', function(req, res) {
    const kullanici = req.body.kullanici;
    let sql = 'SELECT * FROM yemek WHERE kullanici = ?';
    let values = [kullanici];
    baglanti.query(sql, values, function (err, results, fields) {
        res.status(202).send(results);
    });
});



app.get ('/yemekler', function(req, res) {
    let sql = 'SELECT * FROM yemek';
    baglanti.query(sql, function (err, results, fields) {
        res.status(202).send(results);
    });
});


app.get('/kayitol', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/kayitol.html'));
});

app.get('/bilgilendirme', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/bilgilendirme.html'));
});

app.get('/dropdown', function(req, res) {
    let sql = 'SELECT * FROM contents';
    baglanti.query(sql, function (err, results, fields) {
        res.status(202).send(results);
    });
});


app.post('/register', function(req, res) {
    const ad = req.body.name;
    const kkadi = req.body.nick;
    const sifre = req.body.password;

    let sql = 'SELECT * FROM kullanici WHERE kkadi = ?';
    let values = [kkadi];
    baglanti.query(sql, values, function (err, results, fields) {
        if (err) throw err;
            if (results.length > 0) {
                res.status(202).json({
                    success: false,
                    message: 'Kullanıcı adı kullanımda'
                });
            } else {
                let sql = 'INSERT INTO kullanici (ad, kkadi, sifre) VALUES (?, ?, ?)';
                let values = [ad, kkadi, sifre];
                baglanti.query(sql, values, function (err, results, fields) {
                    if (err) throw err;
                        res.status(201).json({
                            success: true,
                            message: 'Kayıt başarılı'
                        });
                    }
                );
            }
        }
    );
});

app.post('/login', function(req, res) {
    const kkadi = req.body.nick;
    const sifre = req.body.password;

    let sql = 'SELECT * FROM kullanici WHERE kkadi = ? AND sifre = ?';
    let values = [kkadi, sifre];
    baglanti.query(sql, values, function (err, results, fields) {
        if (err) throw err;
            if (results.length > 0) {
                res.status(202).json({
                    success: true,
                    message: 'Giriş başarılı',
                    username: kkadi
                });
            } else {
                res.status(201).json({
                    success: false,
                    message: 'Kullanıcı adı veya şifre hatalı'
                });
            }
        }
    );
});

module.exports = router;

//Port Kontrol

app.listen(port, () => console.log(`Çalıştığı Port : ${port} !`));


