document.addEventListener("DOMContentLoaded", () => {
    const macroForm = document.getElementById("macro-form");
    const actionType = document.getElementById("action-type");
    const coordinatesGroup = document.getElementById("coordinates-group");
    const textGroup = document.getElementById("text-group");
    const waitGroup = document.getElementById("wait-group");
    const macroOutput = document.getElementById("macro-output");
    const downloadButton = document.getElementById("download-macro");

    let actions = [];

    actionType.addEventListener("change", () => {
        const value = actionType.value;
        coordinatesGroup.style.display = value === "click" ? "block" : "none";
        textGroup.style.display = value === "type" ? "block" : "none";
        waitGroup.style.display = value === "wait" ? "block" : "none";
    });

    document.getElementById("add-action").addEventListener("click", () => {
        const action = { type: actionType.value };

        if (action.type === "click") {
            action.x = parseInt(document.getElementById("x-coordinate").value);
            action.y = parseInt(document.getElementById("y-coordinate").value);
        } else if (action.type === "type") {
            action.text = document.getElementById("text-input").value;
        } else if (action.type === "wait") {
            action.seconds = parseInt(document.getElementById("wait-time").value);
        }

        actions.push(action);
        macroOutput.textContent = JSON.stringify(actions, null, 2);
    });

    downloadButton.addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(actions, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "macro_script.json";
        a.click();
        URL.revokeObjectURL(url);
    });
});
