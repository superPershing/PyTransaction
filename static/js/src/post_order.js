$(function () {
  $('#post_order').click(function (event) {
    event.preventDefault()
    var username = localStorage.getItem('username')
    $.ajax({
      url: '/api/v1/basic-info',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'jwt' + ' ' + localStorage.getItem('jwt')
      },
      success: function (response) {
        console.log(response)
        console.log('get success')
        localStorage.setItem('user_id', response['id'])
      }
    }).done(function () {
      var $author = localStorage.getItem('user_id')
      var $title = $('#title').val()
      var $content = $('#content').val()
      var $reward = parseInt($('#reward').val())
      var $contact_mobile = parseInt($('#contact_mobile').val())
      var $status = 200
      var $tag = parseInt($('#tag').val())
      var jsonData = JSON.stringify({
        author: $author,
        title: $title,
        content: $content,
        reward: $reward,
        contact_mobile: $contact_mobile,
        status: $status,
        tag: $tag
      })
      console.log(jsonData)
      $.ajax({
        url: '/api/v1/create-posttag',
        data: jsonData,
        contentType: 'application/json',
        type: 'POST',
        dataType: 'json',
        success: function (msg) {
          console.log(msg)
          console.log('post correctly!!')
        },
        error: function (error_msg) {
          console.log(error_msg)
          console.log('wrong!')
        }
      }).done(function () {
        location.assign('/user_admin')
      })
    })
  })
})
