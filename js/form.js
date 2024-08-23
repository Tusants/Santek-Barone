document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('iphone-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                body: new URLSearchParams(formData)
            });

            if (response.ok) {

                Toastify({
                    text: "Formulario enviado con éxito",
                    duration: 3000,
                    backgroundColor: "green",
                    close: true
                }).showToast();
                

                form.reset();
            } else {

                Toastify({
                    text: "Error al enviar el formulario",
                    duration: 3000,
                    backgroundColor: "red",
                    close: true
                }).showToast();
            }
        } catch (error) {
            console.error('Error:', error);

            Toastify({
                text: "Error al enviar el formulario",
                duration: 3000,
                backgroundColor: "red",
                close: true
            }).showToast();
        }
    });
});