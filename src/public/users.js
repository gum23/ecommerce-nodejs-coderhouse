
const deleteUsersInactivty = async () => {
    
    const endPoint = "/api/users";

    try {
        const response = await fetch(endPoint, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        });

        const data = await response.json();
        if (+data.message[0] > 0) {
            sendMail();
        }
        
        alert(data.message);

        location.reload();
    } catch (error) {
        console.log(error);
    }
}

const sendMail = async () => {
    const endPoint = "/api/deleteUsers";

    try {
        await fetch(endPoint, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        });

    } catch (error) {
        console.log(error);
    }
}

//Mostrar u ocultar input radio

document.querySelectorAll('.card').forEach((card, index) => {
    let cardBody = document.getElementById(`cardBody-${index}`);
    let btnRol = document.getElementById(`btn-${index}`);
    cardBody.addEventListener('mouseover', function() {
        btnRol.hidden = false;
    });

    cardBody.addEventListener('mouseout', function() {
        btnRol.hidden = true;
    });
});

//Change rol
const changeRol = async (email, currentRol) => {
    
    try {
        const newRol = currentRol == 'premium' ? 'usuario' : 'premium';

        let data = {
            email: email,
            rol: newRol
        };

        const endPoint = '/api/users/premium'

        const response = await fetch(endPoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const message = await response.json();
        alert(message.message);

        location.reload();
    } catch (error) {
        console.log(error);
    }

}