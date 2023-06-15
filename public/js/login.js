function Login(){
    let nick = $('#nickname').val();
    let password = $('#pass').val();

    if (nick == ""){
        $('#nickname').addClass('is-danger');
        return;
    }else if (password == ""){
        $('#nickname').removeClass('is-danger');
        $('#pass').addClass('is-danger');
        return;
    }else{
        $('#nickname, #pass').removeClass('is-danger');
        
        $.ajax({
            url: 'http://localhost:3000/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                nick: nick,
                password: password
            }),
            success: function(res) {
                if (res.success) {
                    alert(res.message);
                    window.location.href = 'http://localhost:3000';
                    sessionStorage.setItem('session', 'true');
                    sessionStorage.setItem('session_username', res.username);
                }else {
                    alert(res.message);
                }
            },
        })
    }
}
