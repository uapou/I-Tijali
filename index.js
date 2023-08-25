function validateForm() {
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;

    // Check if the email is a valid non-zero number
    if (/^[1-9][0-9]*$/.test(email)) {
        if (password === "pianotennis") {
            // Store the user's name in localStorage
            localStorage.setItem('userName', email);
            
            // Check if admin login
            if (email === "0") {
                localStorage.setItem('isAdmin', true);
                window.location.href = "admin.html"; // Redirect to admin page
            } else {
                localStorage.setItem('isAdmin', false);
                window.location.href = "main.html"; // Redirect to user page
            }

            return false; // Prevent form submission
        } else {
            alert("Mot de passe incorrect. Veuillez réessayer.");
        }
    } else {
        alert("Email invalide. Veuillez réessayer.");
    }

    return false; // Prevent form submission
}


// Retrieve the user's name from localStorage
const userName = localStorage.getItem('userName');

// Reservation handling code
const maxSlotsPerWeek = 3; // Maximum reservations per user per week
let reservedSlotsData = JSON.parse(localStorage.getItem('reservedSlotsData')) || {};

const availability = JSON.parse(localStorage.getItem('availability')) || Array(7 * 24).fill(true);

const buttons = document.querySelectorAll('.disponible-button');
const timeCells = document.querySelectorAll('.time-cell'); // Update the selector

function countUserReservations(userName) {
    return Object.values(reservedSlotsData).filter(user => user === userName).length;
}

function updateSlot(index, userName) {
    if (countUserReservations(userName) < maxSlotsPerWeek) {
        reservedSlotsData[index] = userName;
        availability[index] = false;

        buttons[index].textContent = userName;
        
        if (userName === reservedSlotsData[index]) {
            buttons[index].classList.add('reserved-button-green');
        } else {
            buttons[index].classList.add('reserved-button');
        }

        localStorage.setItem('availability', JSON.stringify(availability));
        localStorage.setItem('reservedSlotsData', JSON.stringify(reservedSlotsData));

        window.location.reload(); // Reload the page
    } else {
        alert("Vous avez atteint la limite de réservations maximale pour cette semaine.");
    }
}

function cancelReservation(index) {
    if (reservedSlotsData[index] === userName) {
        const isConfirmed = confirm("Êtes-vous sûr de vouloir annuler cette réservation ?");
        if (isConfirmed) {
            reservedSlotsData[index] = null;
            availability[index] = true;

            buttons[index].textContent = '';
            buttons[index].classList.remove('reserved-button');
            buttons[index].classList.remove('reserved-button-green');
            buttons[index].classList.add('disponible-button');

            localStorage.setItem('availability', JSON.stringify(availability));
            localStorage.setItem('reservedSlotsData', JSON.stringify(reservedSlotsData));
            window.location.reload(); // Reload the page
        }
    } else {
        alert("Vous ne pouvez annuler que vos propres réservations.");
    }
}

// Loop through each button
buttons.forEach((button, index) => {
    if (reservedSlotsData[index]) {
        button.textContent = reservedSlotsData[index];

        if (reservedSlotsData[index] === userName) {
            button.classList.add('reserved-button-green');
            button.addEventListener('click', () => cancelReservation(index));
        } else {
            button.classList.add('reserved-button');
        }
    } else {
        button.addEventListener('click', () => {
            if (userName) {
                updateSlot(index, userName);
            } else {
                alert("Veuillez vous connecter d'abord.");
            }
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        const reservationTableBody = document.getElementById('reservationTableBody');
    
        // Retrieve the reservation data from localStorage
        const reservedSlotsData = JSON.parse(localStorage.getItem('reservedSlotsData')) || [];
    
        for (let index = 0; index < reservedSlotsData.length; index++) {
        if (reservedSlotsData[index]) {
            const reservationRow = document.createElement('tr');
            const timeCell = document.createElement('td');
            const userCell = document.createElement('td');
            const actionsCell = document.createElement('td');
            const cancelButton = document.createElement('button');
    
            timeCell.textContent = getTimeFromIndex(index);
            userCell.textContent = reservedSlotsData[index];
            cancelButton.textContent = 'Annuler';
            cancelButton.classList.add('cancel-button');
            cancelButton.addEventListener('click', () => cancelReservation(index));
    
            reservationRow.appendChild(timeCell);
            reservationRow.appendChild(userCell);
            actionsCell.appendChild(cancelButton);
            reservationRow.appendChild(actionsCell);
    
            reservationTableBody.appendChild(reservationRow);
        }
        }
    });
    
    function getTimeFromIndex(index) {
        const hours = Math.floor(index / 2) + 7; // Assuming each slot represents 30 minutes starting from 7:30 AM
        const minutes = (index % 2) * 30;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    function cancelReservation(index) {
        const reservedSlotsData = JSON.parse(localStorage.getItem('reservedSlotsData')) || [];
        
        if (reservedSlotsData[index]) {
        reservedSlotsData[index] = null;
        // Add any other necessary logic here to update availability or other data
    
        localStorage.setItem('reservedSlotsData', JSON.stringify(reservedSlotsData));
        window.location.reload(); // Reload the page to reflect the updated data
        } else {
        alert("Aucune réservation trouvée à cet horaire.");
        }
    }
    document.addEventListener("DOMContentLoaded", function() {
        // Get a reference to the cancel all button
        const cancelAllButton = document.getElementById("cancel-all-button");
      
        // Get all the "disponible-button" elements
        const disponibleButtons = document.querySelectorAll(".disponible-button");
      
        // Add a click event listener to the cancel all button
        cancelAllButton.addEventListener("click", function() {
          // Loop through each disponible button and set its class to "disponible"
          disponibleButtons.forEach(button => {
            button.classList.remove("reserved");
            button.classList.add("disponible");
          });
        });
      });
});
