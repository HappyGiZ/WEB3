function clickButtonsSequentially(index = 0) {
    const followButtons = document.querySelectorAll("button[title='Follow']");
    
    const followButtonsArray = Array.from(followButtons);

    if (index < followButtonsArray.length) {
        const button = followButtonsArray[index];
        button.click();
        console.log(`Follow ${index + 1} / ${followButtonsArray.length}`);

        setTimeout(() => {
            clickButtonsSequentially(index + 1);
        }, 2000);
    } else {
        console.log('Зафолловили всех полностью.');
        scrollToTop();
    }
}

async function scrollToBottom() {
    let previousHeight = 0;

    while (true) {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 2000));

        const currentHeight = document.body.scrollHeight;
        if (currentHeight === previousHeight) {
            break;
        }
        previousHeight = currentHeight;
    }
    clickButtonsSequentially();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

scrollToBottom();