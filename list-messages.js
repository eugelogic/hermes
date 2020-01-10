const fetchMessages = async () =>
    // code for local
    // await (await fetch('http://localhost:9000/list-messages')).json();
    // code for production
    await (await fetch('/.netlify/functions/list-messages')).json();

fetchMessages().then(info => {
    messagesList = document.querySelector('#messages-list');

    info.data.forEach(message => {
        const messageUl = document.createElement('ul');

        const sentItem = document.createElement('li');
        const niceDate = new Date(message.dateSent);
        sentItem.appendChild(document.createTextNode(niceDate));
        messageUl.appendChild(sentItem);
        sentItem.insertAdjacentText('afterbegin', 'Sent on: ');

        const bodyItem = document.createElement('li');
        bodyItem.appendChild(document.createTextNode(message.body));
        messageUl.appendChild(bodyItem);
        bodyItem.insertAdjacentText('afterbegin', 'Body: ');

        const priceItem = document.createElement('li');
        if (message.price === null) {
            priceItem.appendChild(document.createTextNode('Cost: no charge'));
            messageUl.appendChild(priceItem);
        }
        else {
            const formattedPrice = message.price.substring(1);
            priceItem.appendChild(document.createTextNode(formattedPrice));
            messageUl.appendChild(priceItem);
            priceItem.insertAdjacentText('afterbegin', 'Cost: £');
        }

        const statusItem = document.createElement('li');
        statusItem.appendChild(document.createTextNode(message.status));
        messageUl.appendChild(statusItem);
        statusItem.insertAdjacentText('afterbegin', 'Status: ');

        const recepientItem = document.createElement('li');
        const partlyConcealedRecepient = message.to.substring(9);
        recepientItem.appendChild(document.createTextNode(partlyConcealedRecepient));
        messageUl.appendChild(recepientItem);
        recepientItem.insertAdjacentText('afterbegin', 'Recepient number ending: ***')

        messagesList.appendChild(messageUl);
    });
})