window.onload = loaded
function Yemekler() {
    $.ajax({
        url: 'http://localhost:3000/yemekler',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(res) {
            console.log(res);
            $('.tarifler').html('');
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
                $('.tarifler').append(contents);
            });
        }
    });
}



function loaded() {
    Yemekler();

    $('.autocom-box').hide();
    kullanici();

}

window.addEventListener('input', (e) => {
    if (e.target.value == "" || e.target.value == null || e.target.value.length < 1) {
        $('.autocom-box').hide();
        return;
    }else {
        $('.autocom-box').show();
    }
    
    $(".autocom-item").each((i,el) => $(el).text().toLowerCase().includes(e.target.value) ? $(el).toggle(true) : $(el).toggle(false))
   

});

function kullanici() {
    $.ajax({
        url: 'http://localhost:3000/kullanicitarifleri',	
        type: 'POST',
        contentType: 'application/json',	
        data: JSON.stringify({}),				
        success: function(res) {
            $('.autocom-box').html('');
            
            $.each(res, function (i, v) {
                var kullaniciadlari = [v.kullanici];
                var benzersizkullanici = new Set(kullaniciadlari);
                var benzersizkullanici2 = Array.from(benzersizkullanici);
                let contents = `
                    <div class="autocom-item" data-urun="${benzersizkullanici2}">
                        <span>${benzersizkullanici2}</span>
                        
                    </div>
                `
                $('.autocom-box').append(contents);
            });
        }
    });
}


window.addEventListener('click', (e) => {
    $('.autocom-box').hide();
    var kullanici = $(e.target).text();
    console.log(kullanici);
    $.ajax({
        url: 'http://localhost:3000/kullaniciyagorearat',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            kullanici: kullanici
        }),
        success: function(res) {
            if (kullanici.length > 15) {
                Yemekler();
            }
            
            $('.tarifler').html('');

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
                $('.tarifler').append(contents);
            });
        }
    });
}
);