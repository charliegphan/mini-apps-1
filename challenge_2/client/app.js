$(document).ready(() => {
  $('.button').on('click', (event) => {
    let submitText = $('.text-area').val();
    $('.text-area').val('');

    $.post('http://localhost:8080/posty', submitText, (res) => {
      console.log(res);
    })
  });
})