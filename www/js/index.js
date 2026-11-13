(() => {
    const backCount = document.getElementById('back-count');
    const viewLevel = document.getElementById('view-level');
    const status = document.getElementById('status');
    const runtime = document.getElementById('runtime');
    const resetButton = document.getElementById('reset-button');
    let count = 0;
    let level = 3;

    function render() {
        backCount.textContent = String(count);
        viewLevel.textContent = `${level} / 3`;
    }

    function onBackButton() {
        count += 1;
        level = Math.max(1, level - 1);
        status.textContent = 'Cordova backbutton event received';
        render();
    }

    function onDeviceReady() {
        const platformVersion = cordova.platformVersion || 'unknown';
        runtime.textContent = `cordova-${cordova.platformId} ${platformVersion}`;
        status.textContent = 'Ready — focus the input, then press Back once';
        document.addEventListener('backbutton', onBackButton, false);
    }

    resetButton.addEventListener('click', () => {
        count = 0;
        level = 3;
        status.textContent = 'Reset — focus the input, then press Back once';
        render();
    });

    document.addEventListener('deviceready', onDeviceReady, false);
    render();
})();
