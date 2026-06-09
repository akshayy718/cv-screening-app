sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (ControllerExtension, MessageToast, MessageBox) {
    "use strict";

    return ControllerExtension.extend(
        "cv.screening.candidates.uploadController", {

        onUploadCV: function () {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".pdf,.docx,.txt";
            document.body.appendChild(input);
            input.addEventListener("change", (e) => {
                this._handleFileSelect(e);
                document.body.removeChild(input);
            });
            input.click();
        },

        _handleFileSelect: function (event) {
            const file = event.target.files[0];
            if (!file) return;

            MessageToast.show("Reading: " + file.name);

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result.split(',')[1];
                this._uploadToBackend(file.name, base64);
            };
            reader.readAsDataURL(file);
        },

        _uploadToBackend: function (fileName, fileContent) {
            const sPath = this.base.getView()
                .getBindingContext().getPath();
            const candidateId = sPath.match(
                /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
            )?.[0];

            if (!candidateId) {
                MessageBox.error("Save the candidate first!");
                return;
            }

            MessageToast.show("Uploading to AI...");

            fetch("/odata/v4/candidate/uploadCV", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    candidateId: candidateId,
                    fileName: fileName,
                    fileContent: fileContent
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    MessageBox.error("Failed: " + data.error.message);
                } else {
                    MessageToast.show("Done! AI processed the CV!");
                    this.base.getView()
                        .getBindingContext().refresh();
                }
            })
            .catch(err => {
                MessageBox.error("Error: " + err.message);
            });
        }
    });
});