document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('iphone-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            if (response.ok) {
                const result = await response.text();
                Toastify({
                    text: result,
                    backgroundColor: "green",
                    duration: 3000,
                }).showToast();
                form.reset(); // Opcional: Limpia el formulario después de enviarlo
            } else {
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            Toastify({
                text: `Error: ${error.message}`,
                backgroundColor: "red",
                duration: 3000,
            }).showToast();
        }
    });
});