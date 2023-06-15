window.onload = loaded
const urunlerliste = [];
window.addEventListener('input', (e) => {
    if (e.target.value == "" || e.target.value == null || e.target.value.length < 1) {
        $('.autocom-box').hide();
        return;
    }else {
        $('.autocom-box').show();
    }
    
    $(".autocom-item").each((i,el) => $(el).text().toLowerCase().includes(e.target.value) ? $(el).toggle(true) : $(el).toggle(false))
    
});


function UrunEkle() {
    window.location.href = "http://localhost:3000/urunekle";
}

function TarifEkle() {
    window.location.href = "http://localhost:3000/tarifekle";
}

function UrunEkleme() {
    const urunadi = document.getElementById('urunadi').value;
    const urunkategori = document.getElementById("urunkategori").value;
    if (urunkategori == 1) {
        urunkategoricikti = "Hayvansal Gıda"; 
    }
    else if (urunkategori == 2) {
        urunkategoricikti = "sebze";
    }
    else if (urunkategori == 3) {
        urunkategoricikti = "meyve";
    }
    else if (urunkategori == 4) {
        urunkategoricikti = "mutfak malzemeleri";
    }
    else if (urunkategori == 5) {
        urunkategoricikti = "baklagil";
    }

    if (urunadi == "" || urunkategori == "") {
        alert("Lütfen tüm alanları doldurunuz.");
        return;
    }

    alert ("Ürün başarıyla eklendi.");

    $.ajax({
        url: 'http://localhost:3000/urunekle',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            urunadi: urunadi,
            urunkategori: urunkategoricikti
        }),
    });
    document.getElementById('urunadi').value = "";

}

function getTable() {
    $.ajax({
        url: 'http://localhost:3000/dropdown',	
        type: 'GET',
        contentType: 'application/json',	
        data: JSON.stringify({}),				
        success: function(res) {
            $('.autocom-box').html('');
            $.each(res, function (i, v) { 
                let contents = `
                    <div class="autocom-item" data-urun="${v.urun_name}">
                        <span>${v.urun_name} - ${v.urun_type}</span>
                    </div>
                `
                $('.autocom-box').append(contents);
            });
        }
    });
}



function Temizle() {
    document.getElementById('selected-items').innerHTML = "";
    urunlerliste.length = 0;
    //tabloyu gizle
    $('.tarifler').html('');
    
}





function YemekAra() {
    $.ajax({
        url: 'http://localhost:3000/yemekara',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            urunlerliste: urunlerliste
        }),
        success: function(res) {
            console.log(res);

            $('.tarifler').html('');
            $.each(res, function (i, v) {
                let contents = `
                    
                    <table id="listetablo" class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Tarif Adı</th>
                                <th scope="col">Tarif</th>
                                <th scope="col">Ana Malzeme</th>
                                <th scope="col">Kategori</th>
                                <th scope="col">Zorluk</th>
                                <th scope="col">Ülke</th>
                                <th scope="col">Kullanıcı</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${v.yemekadi}</td>
                                <td>${v.yemektarifi}</td>
                                <td>${v.yemekmalzeme}</td>
                                <td>${v.yemekkategori}</td>
                                <td>${v.yemekzorluk}</td>
                                <td>${v.yemekulke}</td>
                                <td>${v.kullanici}</td>
                            </tr>
                        </tbody></table>`
                $('.tarifler').append(contents);
            }
            );
        }
    });
    document.getElementById('selected-items').innerHTML = "";
    urunlerliste.length = 0;
}




$(document).on('click', '.autocom-item', function(){
    
    let product = $(this).data('urun');
    console.log(product);
    urunlerliste.push(product);
    document.getElementById('selected-items').innerHTML += ` <div class="selected-item">${product}</div> `; 
    loaded();
});

function loaded() {
    let session = sessionStorage.getItem('session');
    if (location.href == "http://localhost:3000/urunekle") {
        console.log(sessionStorage.getItem('session_username'));

        if (session == undefined || session == null) {
            window.location.href = "http://localhost:3000/giris";
        }
    }

    if (location.href == "http://localhost:3000/tarifekle") {
        console.log(sessionStorage.getItem('session_username'));

        if (session == undefined || session == null) {
            window.location.href = "http://localhost:3000/giris";
        }
    }

    if (session == "true"){
        $('a[href$="/kayitol"], a[href$="/giris"]').hide();
    }

    $('.autocom-box').hide();
    getTable();
  

}


function TarifEkleme() {
    const tarifadi = document.getElementById('tarifadi').value;
    const yemektarifi = document.getElementById("yemektarifi").value;
    const yemekkategorisi = document.getElementById("yemekkategorisi").value;
    const yemekanamalzeme = document.getElementById("yemekanamalzeme").value;
    const pisirmekategorisi = document.getElementById("pisirmekategorisi").value;
    const yemekzorluk = document.getElementById("yemekzorluk").value;
    const ulke = document.getElementById("ulke").value;
    const kullanici = sessionStorage.getItem('session_username');
    if (yemekkategorisi == 1) {
        yemekkategorisicikti = "Ana Yemek"; 
    }
    else if (yemekkategorisi == 2) {
        yemekkategorisicikti = "Atıştırmalıklar";
    }
    else if (yemekkategorisi == 3) {
        yemekkategorisicikti = "Salatalar";
    }
    else if (yemekkategorisi == 4) {
        yemekkategorisicikti = "Çorbalar";
    }
    else if (yemekkategorisi == 5) {
        yemekkategorisicikti = "Tatlılar";
    }

    if (tarifadi == "" || yemektarifi == "") {
        alert("Lütfen tüm alanları doldurunuz.");
        return;
    }

    if (pisirmekategorisi == 1) {
        pisirmekategorisicikti = "Tava"; 
    }
    else if (pisirmekategorisi == 2) {
        pisirmekategorisicikti = "Fırın";
    }
    else if (pisirmekategorisi == 3) {
        pisirmekategorisicikti = "Mangal";
    }
    else if (pisirmekategorisi == 4) {
        pisirmekategorisicikti = "Airfryer";
    }
    else if (pisirmekategorisi == 5) {
        pisirmekategorisicikti = "Haşlama";
    }

    if (yemekzorluk == 1) {
        yemekzorlukcikti = "Kolay"; 
    }
    else if (yemekzorluk == 2) {
        yemekzorlukcikti = "Orta";
    }
    else if (yemekzorluk == 3) {
        yemekzorlukcikti = "Zor";
    }

    $.ajax({
        url: 'http://localhost:3000/tarifekle',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            tarifadi: tarifadi,
            yemektarifi: yemektarifi,
            yemekanamalzeme: yemekanamalzeme,
            yemekkategorisicikti: yemekkategorisicikti,
            pisirmekategorisicikti: pisirmekategorisicikti,
            yemekzorlukcikti: yemekzorlukcikti,
            ulke: ulke,
            kullanici: kullanici
        }),
        success: function (data) {
            console.log(data);
        }
    });

            



    alert ("Tarif başarıyla eklendi.");

    console.log(tarifadi, yemektarifi,yemekanamalzeme, yemekkategorisicikti, pisirmekategorisicikti,yemekzorlukcikti, ulke);



}

function RastgeleTarif() {
    const rastgele = 1;
    $.ajax({
        url: 'http://localhost:3000/rastgeletarif',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            rastgele: rastgele
        }),
        success: function(res) {
            console.log(res);
            $('.rastgeleTarifler').html('');
            $.each(res, function (i, v) {
                let contents = `
                <tr>
                <th>Yemek Adı</th>
                <th>Tarif Açıklaması</th>
                <th>Ana Malzeme</th>
                <th>Yemek Kategorisi</th>
                <th>Zorluk Derecesi</th>
                <th>Ülke</th>
                <th>Kullanıcı</th>
                </tr>
                    <tr>
                        <td>${v.yemekadi}</td>
                        <td>${v.yemektarifi}</td>
                        <td>${v.yemekmalzeme}</td>
                        <td>${v.yemekkategori}</td>
                        <td>${v.yemekzorluk}</td>
                        <td>${v.yemekulke}</td>
                        <td>${v.kullanici}</td>
                    </tr>
                `
                $('.rastgeleTarifler').append(contents);
            }
            );
        }
    });


}
