module.exports = {
    load() {Editor.log("encrypt-tool load");},
    unload() {Editor.log("encrypt-tool unload");},
    messages: {
        showPanel() {
            Editor.Panel.open('encrypt-tool');
        },
        "editor:build-finished": function(t, e) {
            Editor.log("encrypt-tool build-finished");
            let i = (new Date).getTime();
            // Editor.Ipc.sendToPanel("encrypt-tool", "encrypt-tool:onBuildFinished");
        }
    }
};