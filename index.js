document.addEventListener('DOMContentLoaded', function() {
    const clickableItems = document.querySelectorAll('.clickable');

    clickableItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
});