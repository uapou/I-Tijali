document.addEventListener('DOMContentLoaded', function () {
    const changePasswordForm = document.getElementById('changePasswordForm');
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const changePasswordButton = document.getElementById('changePasswordButton');

    changePasswordButton.addEventListener('click', function () {
        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Retrieve the stored password from localStorage
        const storedPassword = localStorage.getItem('userPassword');

        if (currentPassword === storedPassword && newPassword === confirmPassword) {
            // Here, you should replace this with your password change logic
            // This could involve updating the password in your database or using a service
            // Remember to update your logic to securely store passwords
            alert('Mot de passe changé avec succès.');
            // Redirect to a page or do something else
        } else {
            alert('Erreur : Veuillez vérifier vos informations.');
        }
    });
});