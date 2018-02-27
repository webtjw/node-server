(function () {
  // sidebar
  $('#sidebar').on('click', '.sub-nav', function () {
    var $this = $(this),
      changeStatus = $this.attr('data-expand') === 'true' ? 'false' : 'true';

    $this.attr('data-expand', changeStatus);
  })
})()