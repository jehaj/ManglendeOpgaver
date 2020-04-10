// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var { PythonShell } = require('python-shell');
var pythonFilePath = `${__dirname}/opgavemangler.py`;

var options = {
    mode: 'json',
    encoding: "utf8"
};

function runPythonProcess() {
    PythonShell.run(pythonFilePath, options, function (err, results) {
        if (err) throw err;
        console.log(results);
        updateHTML(results);
    });
}

var tjekBtn = document.querySelector("#tjek-button");

tjekBtn.addEventListener('click', () => {
    console.log("Path: " + __dirname);
    runPythonProcess();
});

function updateHTML(results) {
    var containerElement = document.querySelector("#myCon");
    containerElement.innerHTML = "";

    results[0]['errors'].forEach(element => {
        containerElement.innerHTML += `
        <div class="row my-2">
          <div class="col">
            <div class="alert alert-primary" role="alert">
              <div class="row">
                <div class="col-2">
                  <div class="alert alert-warning mb-0">
                    FEJL
                  </div>
                </div>
                <div class="col-10">
                  ${element}
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    });

    results[0]["results"].forEach(element => {
        containerElement.innerHTML += `
        <div class="row my-2">
          <div class="col">
            <div class="alert alert-primary" role="alert">
              <div class="row">
                <div class="col-5">
                  <div class="alert alert-dark mb-0">
                    ${element[0]}
                  </div>
                </div>
                <div class="col-7">
                  ${element[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    });
}