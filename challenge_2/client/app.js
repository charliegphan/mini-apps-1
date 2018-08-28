$(document).ready(() => {
  $('.button').on('click', (event) => {
    let submitText = $('.text-area').val();
    $('.text-area').val('');

    $.post('http://localhost:8080/posty',
      { text: submitText },
      (res, status) => {
        console.log(status);
        console.log(res);
      });
  });
})