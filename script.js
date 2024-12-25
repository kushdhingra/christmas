setTimeout(() => {
  document.getElementById("loading-screen").style.display = "none";
}, 2000);
document.querySelectorAll("#window").forEach((windowElement) => {
    const titleBar = windowElement.querySelector("#title-bar");
    const closeButton = windowElement.querySelector("#close-button");
    const minimizeButton = windowElement.querySelector("#minimize-button");
    const maximizeButton = windowElement.querySelector("#maximize-button");
    
    // Store initial dimensions
    const initialWidth = windowElement.style.width;
    const initialHeight = windowElement.style.height;
    closeButton.addEventListener("click", () => {
        if (windowElement.getAttribute("window-id") === "spotify") {
            const iframe = windowElement.querySelector("#content iframe");
            iframe.src = iframe.src;
        }
        windowElement.style.display = "none";
    });
    
    maximizeButton.addEventListener("click", () => {
        windowElement.style.position = "fixed";
        windowElement.style.top = "0";
        windowElement.style.left = "0";
        windowElement.style.right = "0";
        windowElement.style.bottom = "0";
        windowElement.style.width = "100%";
        windowElement.style.height = "100%";
    });

    minimizeButton.addEventListener("click", () => {
        windowElement.style.display = "none";
    });

    windowElement.style.position = "absolute";

    let offsetX = 0, offsetY = 0;
    let isDragging = false;

    titleBar.addEventListener("mousedown", (e) => {
        isDragging = true;
        document.querySelectorAll("#window").forEach((w) => {
            w.style.zIndex = 1;
        });
        windowElement.style.zIndex = 100;

        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
            windowElement.style.width = initialWidth; // Reset width
            windowElement.style.height = initialHeight; // Reset height
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    windowElement.querySelector("#content").addEventListener("mousedown", (e) => {
        e.stopPropagation();
    });
});

function dateandTime() {
    var date = new Date();
    return {
        day: date.toLocaleString('default', { weekday: 'short' }),
        month: date.toLocaleString('default', { month: 'short' }).slice(0, 3),
        date: date.getDate(),
        time: date.toLocaleTimeString(),
    };
}

setInterval(() => {
    var dateandtime = dateandTime();
    document.querySelector("#clock #day").textContent = dateandtime.day;
    document.querySelector("#clock #month").textContent = dateandtime.month;
    document.querySelector("#clock #date").textContent = dateandtime.date;
    document.querySelector("#clock #time").textContent = dateandtime.time;
}, 1000);

function showWindow(id) {
    const windowElement = document.querySelector("[window-id=" + id + "]");
    document.querySelectorAll("#window").forEach((w) => {
        w.style.zIndex = 1;
    });
    windowElement.style.zIndex = 100;
    windowElement.style.display = windowElement.style.display === "none" ? "block" : "none";
}

function showContextMenu(event) {
    if (event.target instanceof HTMLIFrameElement) {
        event = event.target.contentWindow.event;
    }
    document.querySelector("#context-menu").style.display = "block";
    document.querySelector("#context-menu").style.left = event.clientX + "px";
    document.querySelector("#context-menu").style.top = event.clientY + "px";
}

function hideContextMenu() {
    document.querySelector("#context-menu").style.display = "none";
}

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(event) {
        showContextMenu(event);
        event.preventDefault();
    }, false);

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#context-menu')) {
            hideContextMenu();
        }
    }, false);
} else {
    document.attachEvent('oncontextmenu', function(event) {
        showContextMenu(event);
        event.preventDefault();
    });

    document.attachEvent('onclick', function(event) {
        if (!event.target.closest('#context-menu')) {
            hideContextMenu();
        }
    });
}


