// Your code here.
let draggedItem = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('mousedown', (e) => {
        draggedItem = item;

        // Calculate offset from mouse position to top-left corner of the item
        offsetX = e.clientX - draggedItem.getBoundingClientRect().left;
        offsetY = e.clientY - draggedItem.getBoundingClientRect().top;

        // Add dragging styles
        draggedItem.style.position = 'absolute';
        draggedItem.style.zIndex = 1000;

        // Attach event listeners for mousemove and mouseup
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});

function onMouseMove(e) {
    if (draggedItem) {
        const container = document.querySelector('.items');
        const containerRect = container.getBoundingClientRect();

        // Calculate new position of the dragged item
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Ensure the item stays within container boundaries
        newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - draggedItem.offsetWidth));
        newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - draggedItem.offsetHeight));

        // Update position
        draggedItem.style.left = `${newX - containerRect.left}px`;
        draggedItem.style.top = `${newY - containerRect.top}px`;
    }
}

function onMouseUp() {
    if (draggedItem) {
        // Reset z-index after drag ends
        draggedItem.style.zIndex = '';
        draggedItem = null;

        // Remove event listeners to prevent memory leaks
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}
