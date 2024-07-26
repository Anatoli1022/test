document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('myModal');
  const buttons = document.querySelectorAll('.apply-button');
  const closeBtn = document.querySelector('.close');
  let loanIdValue;

  buttons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const row = btn.closest('tr');
      const loanId = row.getAttribute('data-loan-id');
      loanIdValue = loanId;
      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  const form = document.getElementById('applicationForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const contactInfo = document.getElementById('contactInfo').value;

    const formData = {
      fullName: fullName,
      contactInfo: contactInfo,
      loanId: loanIdValue,
    };

    fetch('http://localhost/test/apply.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        alert('Ваша заявка была успешно подана!');
        modal.style.display = 'none';
        form.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(
          'Произошла ошибка при отправке вашей заявки. Пожалуйста, попробуйте снова.'
        );
      });
  });
});
