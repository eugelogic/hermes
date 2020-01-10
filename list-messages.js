const fetchMessages = async () =>
                 // use http://localhost:9000/list-messages to test locally
    await (await fetch('.netlify/functions/list-messages')).json();

fetchMessages().then(info => {
    messagesList = document.querySelector('#messages-list');

    info.data.forEach(message => {
        const messageUl = document.createElement('ul');

        const sentItem = document.createElement('li');
        sentItem.appendChild(document.createTextNode(message.dateSent));
        messageUl.appendChild(sentItem);
        sentItem.insertAdjacentText('afterbegin', 'Sent on: ');

        const bodyItem = document.createElement('li');
        bodyItem.appendChild(document.createTextNode(message.body));
        messageUl.appendChild(bodyItem);
        bodyItem.insertAdjacentText('afterbegin', 'Body: ');

        const priceItem = document.createElement('li');
        if (message.price == null) {
            priceItem.appendChild(document.createTextNode('Cost: no charge.'));
            messageUl.appendChild(priceItem);
        }
        else {
            const rowPrice = message.price;
            const formattedPrice = rowPrice.substring(1);
            priceItem.appendChild(document.createTextNode(formattedPrice));
            messageUl.appendChild(priceItem);
            priceItem.insertAdjacentText('afterbegin', 'Cost: £');
        }

        const statusItem = document.createElement('li');
        statusItem.appendChild(document.createTextNode(message.status));
        messageUl.appendChild(statusItem);
        statusItem.insertAdjacentText('afterbegin', 'Status: ');

        const recepientItem = document.createElement('li');
        const rowRecepient = message.to;
        const partlyConcealedRecepient = rowRecepient.substring(9);
        recepientItem.appendChild(document.createTextNode(partlyConcealedRecepient));
        messageUl.appendChild(recepientItem);
        recepientItem.insertAdjacentText('afterbegin', 'Recepient number ending: ***')

        messagesList.appendChild(messageUl);
    });
})