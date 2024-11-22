document.addEventListener("DOMContentLoaded", () => {
    const actionType = document.getElementById("action-type");
    const clickOptions = document.getElementById("click-options");
    const typeOptions = document.getElementById("type-options");
    const waitOptions = document.getElementById("wait-options");
    const macroOutput = document.getElementById("macro-output");
    const addActionButton = document.getElementById("add-action");
    const downloadButton = document.getElementById("download-macro");

    let actions = [];

    // アクションタイプに応じてフォームを切り替える
    actionType.addEventListener("change", () => {
        clickOptions.style.display = "none";
        typeOptions.style.display = "none";
        waitOptions.style.display = "none";

        if (actionType.value === "click") clickOptions.style.display = "block";
        if (actionType.value === "type") typeOptions.style.display = "block";
        if (actionType.value === "wait") waitOptions.style.display = "block";
    });

    // アクションを追加
    addActionButton.addEventListener("click", () => {
        let action = { type: actionType.value };

        if (action.type === "click") {
            action.x = parseInt(document.getElementById("x-coordinate").value) || 0;
            action.y = parseInt(document.getElementById("y-coordinate").value) || 0;
        } else if (action.type === "type") {
            action.text = document.getElementById("text-input").value || "";
        } else if (action.type === "wait") {
            action.seconds = parseInt(document.getElementById("wait-time").value) || 0;
        }

        actions.push(action);
        macroOutput.textContent = JSON.stringify(actions, null, 2);
    });

    // JSONをダウンロード
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
