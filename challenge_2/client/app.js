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

const addReport = (lines) => {
  console.log(lines);
  lines.forEach(line => {
    let paddedLine = line.padStart(21, ' ');
    console.log(paddedLine);
    let pNode = $('<p>' + paddedLine + '</p>').css({ 'white-space': 'pre' })


    pNode.text(paddedLine);
    $('.report').append(pNode);
  })
}

