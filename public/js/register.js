function Kayit(){
    let name = $('#name').val();
    let nick = $('#nickname').val();
    let password = $('#pass').val();

    if (name == ""){
        $('#name').addClass('is-danger');
        return;
    }else if (nick == ""){
        $('#nickname').addClass('is-danger');
        return;
    }else if (password == ""){
        $('#name, #nickname').removeClass('is-danger');
        $('#pass').addClass('is-danger');
        return;
    }else{
        $('#name, #nickname, #pass').removeClass('is-danger');
        
        $.ajax({
            url: 'http://localhost:3000/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: name,
                nick: nick,
                password: password
            }),
            success: function(res) {
                if (res.success) {
                    alert(res.message);
                    window.location.href = 'http://localhost:3000/giris';
                }else {
                    alert(res.message);
                }
            },
        })
    }
}