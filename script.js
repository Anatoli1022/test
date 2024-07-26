document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('myModal');
    const btns = document.querySelectorAll('.apply-btn');
    const closeBtn = document.querySelector('.close');

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    const form = document.getElementById('applicationForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const contactInfo = document.getElementById('contactInfo').value;
        console.log('Full Name:', fullName);
        console.log('Contact Info:', contactInfo);
        modal.style.display = 'none';
       
    });
});
