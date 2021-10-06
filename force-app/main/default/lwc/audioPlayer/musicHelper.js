

function showToast(cmp, inpval) {
    const event = new ShowToastEvent({
        title: 'Get Help',
        message: 'Input val changed.'+ inpval,
    });
    cmp.dispatchEvent(event);
}

export { showToast }