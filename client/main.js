const socket = io.connect('http://192.168.1.16:3000', {'forceNew': true});
socket.on('messages', (data) => {
    render(data);
});

function render(data) {
    var html = data.map((message, index) => {
        return (`
            <div class="message"> 
                <strong>${message.name}</strong> says:
                <span>${message.text}</span>
            </div>
        `);
    }).join(' ');
    let messageContainer = document.getElementById('messages');
    messageContainer.innerHTML =  html;
}

function addMessage(e) {
    var message = {
        name: document.getElementById('name').value,
        text: document.getElementById('text').value
    };
    socket.emit('add-message', message);
    return false;
}