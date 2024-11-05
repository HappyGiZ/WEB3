function clickButtonsSequentially(index = 1, total = null) {
    const followButtons = document.querySelectorAll("button[title='Follow']");

    if (total === null) {
        total = followButtons.length;
    }

    if (followButtons.length > 0) {
        const button = followButtons[0];
        button.click();
        console.log(`Follow ${index} / ${total}`);

        setTimeout(() => {
            clickButtonsSequentially(index + 1, total);
        }, 1000);
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
