$(document).ready(() => {
  $('.button').on('click', (event) => {
    let submitText = $('.text-area').val();
    $('.text-area').val('');

    $.post('http://localhost:8080/posty',
      { text: submitText },
      (res) => {
        addReport(JSON.parse(res));
      });
  });
})

addReport = (lines) => {
  console.log(lines);
  lines.forEach(line => {
    let pNode = $('<p></p>');
    pNode.text(line);
    // console.log($('.report'));
    $('.report').append(pNode);
  })
}

