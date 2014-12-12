/**
 * Created by eric on 12/10/14.
 */

var landingPage = (function () {

    function highlightCode (code){
        var returnString = "";

        if (code) {
            returnString = "";
            returnString += '<pre class="language-sql">';
            returnString += code;
            returnString += "</pre>";
        }

        return returnString;
    }

    function drawTable (collection){

        var textVal = '<table class="table"><tr><th>Analysis ID</th><th>Tags</th></th><th>Type</th><th>Content</th></tr>';
        var i;

        for (i=0; i<collection["content"].length; i++) {
            textVal += "<tr>";
            textVal += "<td>" + collection["content"][i]["analysis_id"] + "</td>";
            textVal += "<td>" + JSON.stringify(collection["content"][i]["tags"].join(" ")) + "</td>";
            textVal += "<td>" + collection["content"][i]["type"] + "</td>";
            textVal += "<td>" + highlightCode(collection["content"][i]["sql"]) + "</td>";
            textVal += "</tr>";
        }

        textVal += "</table>";
        textVal += '<button id="displeased" onclick="landingPage.submitDispleasure()" class="btn btn-mini">';
        textVal += "Not What I'm looking for";
        textVal += "</button>";


        $("#hello").html(textVal);

    }

    var submitQuery = function () {
        var queryString = $("#searchQuery").val();

        var ajaxSettings = {
            async     :  true,
            dataType  : "json",
            data      :  {"testing123": queryString },
            type      :  "GET"};

        $.ajax("/ajax", ajaxSettings)
            .done(function (collection) {
                var settings = collection;
                drawTable(collection);
            });
    };

    var submitDispleasure = function (){
        var queryString = $("#searchQuery").val();

        var ajaxSettings = {
            async     :  true,
            dataType  : "json",
            data      :  {"testing123": queryString },
            type      :  "POST"};

        $.ajax("/ajax", ajaxSettings)
            .done(function (collection) {
                var settings = collection;
                drawTable(collection);
            });
    };

    return { "submitQuery"       : submitQuery,
             "submitDispleasure" : submitDispleasure};

})();