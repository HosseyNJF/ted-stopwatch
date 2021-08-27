let state = {
    status: 'stopped',
    secondsPassed: 0,
}

let buttons = {
    action: $('#stopwatch-action-button'),
    reset: $('#stopwatch-reset-button'),
}

let numbers = {
    minutes: $("#stopwatch-minutes"),
    seconds: $("#stopwatch-seconds"),
}

let mainInterval;

let runStopwatch = () => {
    state.secondsPassed = 0;
    resumeStopwatch();
}

let resumeStopwatch = () => {
    mainInterval = setInterval(() => {
        state.secondsPassed ++;
        renderState();
    }, 1000);
    state.status = 'running';
    renderState();
}

let pauseStopwatch = () => {
    clearInterval(mainInterval);
    state.status = 'paused';
    renderState();
}

let resetStopwatch = () => {
    clearInterval(mainInterval);
    state.secondsPassed = 0;
    state.status = 'stopped';
    renderState();
}

let renderState = () => {
    numbers.minutes.html(Math.floor(state.secondsPassed / 60));
    numbers.seconds.html(state.secondsPassed % 60);
    switch (state.status) {
        case 'running':
            buttons.action.find('svg').attr("data-icon", 'pause');
            buttons.reset.css('opacity', 1);
            break;
        case 'paused':
            buttons.action.find('svg').attr("data-icon", 'play');
            buttons.reset.css('opacity', 1);
            break;
        case 'stopped':
            buttons.action.find('svg').attr("data-icon", 'play');
            buttons.reset.css('opacity', 0);
            break;
    }
}

$(document).ready(() => {
    renderState();
    buttons.action.click(() => {
        if (state.status === 'paused')
            resetStopwatch();
        else if (state.status === 'stopped')
            runStopwatch();
        else if (state.status === 'running')
            pauseStopwatch();
    });
    buttons.reset.click(() => {
        if (state.status === 'running')
            resetStopwatch();
    });
});
