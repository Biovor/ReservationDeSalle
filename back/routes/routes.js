const fs = require('file-system');
const jsonpatch = require('fast-json-patch');

const appRouter = function (app) {

    app.get("/", function (req, res) {
        res.status(200).send({ message: 'Welcome to our  API' });
    });

    app.get("/reservation", function (req, res) {

        const rawdata = fs.readFileSync('rooms.json');
        const resaSalles = JSON.parse(rawdata);
        console.log('Envoi');

        res.status(200).send(resaSalles);
    });

    app.post("/reservation", function (req, res) {

        var document = fs.readFileSync('rooms.json');

        var jsonfille = JSON.parse(document);

        var salleModif = jsonfille.rooms
            .filter(salle =>{
                return req.body.name ? salle.name === req.body.name: true
            });

        var patch = [
            { op: "replace", path: "//name", value: req.body.name},
            { op: "add", path: "//reservedThe", value: req.body.reservedThe },
            { op: "add", path: "//reservationDuration", value: req.body.reservationDuration  }
        ];

        var salleModife = jsonpatch.applyPatch(salleModif, patch).newDocument;

        var salleListe = jsonfille.rooms
            .filter(salle =>{
                return req.body.name ? salle.name !== req.body.name: true
            });

        var newJson = {rooms:[...salleModife, ...salleListe]};


        var data = JSON.stringify(newJson, null,2);

        fs.writeFile('rooms.json', data, (err) => {
            if (err) throw err;

            console.log('reservation saved!');
            res.status(200).send(newJson);
        });

    });
};

module.exports = appRouter;