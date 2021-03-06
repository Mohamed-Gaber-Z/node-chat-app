var socket = io();

function scrollBottom() {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMesssageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMesssageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('disconnected to server');
});

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
  var formatedTime = moment(message.createAt).format('h:mm a');

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createAt: formatedTime
  });

  jQuery('#messages').append(html);
  scrollBottom();
  // var li = jQuery('<li></li>');
  //
  // li.text(`${message.from} ${formatedTime} : ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formatedTime = moment(message.createAt).format('h:mm a');

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createAt: formatedTime
  });

  jQuery('#messages').append(html);
  scrollBottom();
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Current Location</a>')
  //
  // li.text(`${message.from} : ${formatedTime} `);
  // a.attr('href', message.url);
  // li.append(a);
  //
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function() {
      messageTextBox.val('');
  });
});

var locationButton = jQuery('#message-location');
locationButton.on('click', function() {

  if(!navigator.geolocation) {

    return alert('Geolocation not support in your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Send location...');

  navigator.geolocation.getCurrentPosition(function(position) {

    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch data')
  });
});
