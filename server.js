const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.use(express.static(path.join('public')));
app.use(express.static(__dirname));

app.post('/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let userFile = req.files.userFile;

    // Use the mv() method to place the file somewhere on your server
    userFile.mv(__dirname+'/output/newObjFile.obj', function (err) {
        if (err)
            return res.status(500).send(err);
        console.log("File uploaded witht the name newFile.obj**");
        res.redirect("back");
    });
});


app.listen(9000, function () {
    console.log("********App listening on port 9000*********");
})