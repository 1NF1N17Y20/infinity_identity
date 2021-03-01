$(function () {
    function display(bool) {
        if (bool) {
            $("#container").show();
        } else {
            $("#container").hide();
        }
    }

    display(false)

    window.addEventListener('message', function (event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
        if (item.new == true) {
            $("#close").hide();
        } else {
            $("#close").show();
        }
    })

    // if a user selects the cancel button it will close and perform a callback closing the UI.
    $("#close").click(function () {
        $.post('http://core_identity/exit', JSON.stringify({}));
        return
    })

    //when the user clicks on the submit button, it will run
    $("#submit").click(function () {
        let firstname = $("#firstname").val() // Gets the value of the firstname input.
        let lastname = $("#lastname").val() // Gets the value of the lastname input.
        let dob = $("#dob").val() // Gets the value of the dob input.
        let sex = $("#sex").val() // Gets the value of the sex input.
        let height = $("#height").val() // Gets the value of the height input.
        let weight = $("#weight").val() // Gets the value of the weight input.

        //this handles checking the firstname for errors.
        if (firstname.length >= 11) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Firstname needs to be equal/less than 10 characters!"
            }))
            return
        } else if (!firstname) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Please input a firstname!"
            }))
            return
        }
        // this handles checking the lastname input for errors
        if (lastname.length >= 11) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Lastname needs to be equal/less than 10 characters!"
            }))
            return
        } else if (!lastname) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Please input a lastname!"
            }))
            return
        }
        // this handles checking the dob for erros.
        if (dob.length >= 11) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Incorrect format for DOB! 12/34/5678 or 12-34-5678"
            }))
            return
        } else if (!dob) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Please input a date of birth!"
            }))
            return
        }

        if (sex.length >= 11) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Sex needs to be equal/less than 10 characters!"
            }))
            return
        } else if (!sex) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Please input a sex!"
            }))
            return
        }

        if (height.length >= 11) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Incorrect format for height! 12/34/5678 or 12-34-5678"
            }))
            return
        } else if (!height) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Please input a date of birth!"
            }))
            return
        }

        if (weight.length >= 11) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Incorrect format for weight! 12/34/5678 or 12-34-5678"
            }))
            return
        } else if (!weight) {
            $.post("http://core_identity/error", JSON.stringify({
                error: "Please input a date of birth!"
            }))
            return
        }
        // if there are no errors from above, we can send the data back to the original callback and handle it from there
        $.post('http://core_identity/main', JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            dateofbirth: dob,
            dob: dob,
            sex: sex,
            height: height,
            weight: weight
        }));
        return;
    })
})
