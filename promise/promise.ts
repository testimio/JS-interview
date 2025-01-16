const delay = (dealay) => {
    // Implement me.
}

(() => {
    const start = new Date();
    console.log(start);

    const end = new Date();
    console.log(end);

    const diff = end.getSeconds() - start.getUTCSeconds();

    if (diff <= 2.9) {
        console.log('Not enough time has passed 😭');
    }
})();
