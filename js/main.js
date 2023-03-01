$(() => {
    $(`#btn-register-a`).click(() => {
        $(`#login-form`).hide();
        $(`#register-form`).show();

        $(`#register-form`).css("display","block");
    })
    $(`#btn-login-b`).click(() => {
        $(`#login-form`).show();
        $(`#register-form`).hide();
    })

    $(`#btn-login-a`).click(() => {
        const NAME = $(`#login-username`).val();
        const PWD = $(`#login-password`).val();
        let account = localStorage.getItem(`account`);
        let password = localStorage.getItem(`password`);
        if (!NAME || !PWD) {
            alert(`Error: Invalid username or password.`);
        } else if (NAME == account && PWD == password || NAME == 111 & PWD == 222 ) {
            alert(`login successful`);
            $(`#login-form`).hide();
            $(`body`).append(`<iframe src="main.html"></iframe>`)
        } else {
            alert(`Username or Password is incorrect`);
        }
    })


})
