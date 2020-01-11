const fetchMessages = async () =>
    // code for local
    // await (await fetch('http://localhost:9000/list-messages')).json();
    // code for production
    await (await fetch('/.netlify/functions/list-messages')).json();

fetchMessages().then(info => {
    messagesList = document.querySelector('#messages-list');

    messagesMeta = document.querySelector('#messages-meta');
    const messagesMetaUl = document.createElement('ul');

    const numberOfMessagesItem = document.createElement('li');
    numberOfMessagesItem.appendChild(document.createTextNode(info.data.length));
    messagesMetaUl.appendChild(numberOfMessagesItem);
    numberOfMessagesItem.insertAdjacentHTML('afterbegin', '<span class="meta__label">Total messages:</span> ');

    messagesMeta.appendChild(messagesMetaUl);

    // part of Total Cost code (1/3)
    let totalCost = 0;

    // part of Failed Messages Count code (1/3)
    let failedMessagesCount = 0;

    info.data.forEach(message => {

        // part of Total Cost code (2/3)
        totalCost -= message.price;

        // part of Failed Messages Count code (2/3)
        if (message.status === 'failed') {
            failedMessagesCount++;
        }

        const messagesListUl = document.createElement('ul');

        const sentItem = document.createElement('li');
        const niceDate = new Date(message.dateSent);
        sentItem.appendChild(document.createTextNode(niceDate));
        messagesListUl.appendChild(sentItem);
        sentItem.insertAdjacentHTML('afterbegin', '<span class="message__label">Sent on:</span> ');

        const bodyItem = document.createElement('li');
        bodyItem.appendChild(document.createTextNode(message.body));
        messagesListUl.appendChild(bodyItem);
        bodyItem.insertAdjacentHTML('afterbegin', '<span class="message__label">Body:</span> ');

        const statusItem = document.createElement('li');
        statusItem.appendChild(document.createTextNode(message.status));
        messagesListUl.appendChild(statusItem);
        statusItem.insertAdjacentHTML('afterbegin', '<span class="message__label">Status:</span> ');

        const recepientItem = document.createElement('li');
        const partlyConcealedRecepient = message.to.substring(9);
        recepientItem.appendChild(document.createTextNode(partlyConcealedRecepient));
        messagesListUl.appendChild(recepientItem);
        recepientItem.insertAdjacentHTML('afterbegin', '<span class="message__label">Recepient:</span> ***')

        const priceItem = document.createElement('li');
        if (message.price === null) {
            // priceItem.appendChild(document.createTextNode('<span class="message__label">Cost:</span> no charge'));
            messagesListUl.appendChild(priceItem);
            priceItem.insertAdjacentHTML('afterbegin', '<span class="message__label">Cost:</span> no charge');
        }
        else {
            const formattedPrice = message.price.substring(1);
            priceItem.appendChild(document.createTextNode(formattedPrice));
            messagesListUl.appendChild(priceItem);
            priceItem.insertAdjacentHTML('afterbegin', '<span class="message__label">Cost:</span> £');
        }

        messagesList.appendChild(messagesListUl);

    });

    // part of Failed Messages Count code (3/3)
    const failedMessagesCountItem = document.createElement('li');
    failedMessagesCountItem.appendChild(document.createTextNode(failedMessagesCount));
    messagesMetaUl.appendChild(failedMessagesCountItem);
    failedMessagesCountItem.insertAdjacentHTML('afterbegin', '<span class="meta__label">Failed messages:</span> ');

    // part of Total Cost code (3/3)
    const totalCostItem = document.createElement('li');
    totalCostItem.appendChild(document.createTextNode(totalCost));
    messagesMetaUl.appendChild(totalCostItem);
    totalCostItem.insertAdjacentHTML('afterbegin', '<span class="meta__label">Total cost:</span> £');

})