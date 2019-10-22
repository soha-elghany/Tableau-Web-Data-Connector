(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "name",
            dataType: tableau.dataTypeEnum.string
          }, {
                id: "air_date",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "episode",
                dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "RickandMorty",
            alias: "All Episodes of Rick and Morty",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
      myConnector.getData = function(table, doneCallback) {
          $.getJSON("https://rickandmortyapi.com/api/episode/", function(resp){
            var feat = resp.results;
            console.log(feat)
                var tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "name": feat[i].name,
                    "air_date": feat[i].air_date,
                    "episode": feat[i].episode
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
      }

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Rick and Morty"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
