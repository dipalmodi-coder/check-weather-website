const weatherForm = document.querySelector('#weatherForm');
const searchInput = document.querySelector('#searchInput');

const loadingMsg = document.querySelector('#loadingMsg');
const errorMsg = document.querySelector('#errorMsg');
const locationMsg = document.querySelector('#locationMsg');
const forecastMsg = document.querySelector('#forecastMsg');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = '/weather?address=' + searchInput.value;

    // Before fetch, add loading.. msg.
    loadingMsg.textContent = 'Loading.....';
    // Clear errorMsg
    errorMsg.textContent = '';
    locationMsg.textContent = '';
    forecastMsg.textContent = '';

    fetch(url).then((respose) => {
        respose.json().then((data) => {
            if (data.error) {
                loadingMsg.textContent = '';
                errorMsg.textContent = data.error;
                return;
            }

            loadingMsg.textContent = '';
            // Display current foreCast
            locationMsg.textContent = 'Location: ' + data.forecast.location;
            var forecastMsgStr = 'Current temperature is ' + data.forecast.temperature + 'F. It feels like ' + data.forecast.feelslike + 'F. Condition is expected to be ' + data.forecast.condition[0] + '.';
            forecastMsg.textContent = forecastMsgStr;
        });
    });
});

