var x = null;
var $tabslis = null;
var txt = null;
var teammate = $("#teammateDiv");
var clickEvent = ('ontouchstart' in window ? 'touchend' :'click');
var bonusScore = 2;
var addScore = 0;
var baseScore = 0;
var totalScore = 0;
var plagiarism = false;
var solo = true;
var status = "failed";
var filename = "";
var blockanswers = false;
var allokey = false;
var project = false;
var start = true;

//
var author = "None";
var coauthor = "None";

$('#autorsToVisual').click(function(){

  $('#tabs li:eq(1) a').tab('show');

})
function bindoninput() {
    $("#projectScore").keyup(function() {
        //console.log(this.value);
        if(this.value > 20) {
            this.value = 20;
        }
        if(this.value < 0) {
            this.value = 0;
        }
    });
}


function showresults() {
    window.open("php/save.php?getall");
}

$( document ).ready(function() {
    window.setInterval(function(){
        var late = $("#late").val();
        var bonus = parseInt($("#bonus").val());
        var minus = parseInt($("#minus").val());
        if(isNaN(late)) {
            late = 0;
        }
        if (isNaN(bonus)) {
            bonus = 0;
        }
        if (isNaN(minus)) {
            minus = 0;
        }
        //SCORE
        if(project) {
            var prscore = 0;
            if(document.getElementById("projectScore").value == "") {
                prscore = 0;
            } else {
                prscore = parseInt(document.getElementById("projectScore").value);
            }   
            totalScore = prscore + bonus - late - minus;
            //console.log( document.getElementById("projectScore").value );
            //console.log(" Bonus:" + bonus);
        } else {
            totalScore = baseScore + bonus + addScore - late - minus;
        }
        var queue = $("#queue").val(); 
        var sort = $("#sort").val();
        var timedTasks = $("#timedTasks").val();
        var healthLoss = $("#healthLoss").val();
        var gameEnding = $("#gameEnding").val();
        var animations = $("#animations").val();
        
        var audioFeedback = $("#audioFeedback").val();
        var addTimedTasks = $("#addTimedTasks").val();
        var gameLogic = $("#gameLogic").val();
        var dragNdrop = $("#dragNdrop").val();
        var mobile = $("#mobile").val();
        var design = $("#design").val();
        var theme = $("#theme").val();
        var appearance = $("#appearance").val();
        var feedback = $("#feedback").val();
        var lossFeedback = $("#lossFeedback").val();

        if (typeof $("#teammate").val() == "undefined") {
            $("#teammate").val("");
        } else {
            if ($("#teammate").val() != "") {
                solo = false;
            } 
        }
        //NEWWWW
        if(start) {
            try {
                if(document.getElementById("projectScore").value != "" && !project) {
                    ProjectEv();
                }
            }
            catch(err) {}
            start = false;
        }
        if(project) {
            document.getElementById("baseli").classList.add('hidden');
            document.getElementById("addli").classList.add('hidden');
        } else {    
            document.getElementById("baseli").classList.remove('hidden');
            document.getElementById("addli").classList.remove('hidden');
        }
        var buttons = document.getElementsByTagName('button');
        var countbad = 0;
        for (var i = 0; i < buttons.length; i++) {
            if(buttons[i].title == "Choose...") {
                buttons[i].style.borderColor = "red";
                allokey = false;
                countbad++;
            } else {
                if(buttons[i].title != "") {
                    buttons[i].style.borderColor = "green";
                }
            }         
        }
        if(countbad == 0) {
            allokey = true;
        }
        if(document.getElementById("editBool").value == "True") {
           document.getElementById("editBool").value = "False";
           blockanswers = true;
        }
        if(blockanswers) {
            blockanswers = false;
            var buttons = document.getElementsByTagName('button');
            for (var i = 0; i < buttons.length; i++) {
                if(buttons[i].title != "Choose..." && buttons[i].title != "") {
                    //console.log(buttons[i].title);
                    buttons[i].disabled = "True";
                }
            }
        }
        
        if (isNaN(queue)) {
            queue = 0;
        }
        if (isNaN(sort)) {
            sort = 0;
        }
        if (isNaN(timedTasks)) {
            timedTasks = 0;
        }
        if (isNaN(healthLoss)) {
            healthLoss = 0;
        }
        if (isNaN(gameEnding)) {
            gameEnding = 0;
        }
        if (isNaN(animations)) {
            animations = 0;
        }
        
        if (isNaN(audioFeedback)) {
            audioFeedback = 0;
        }
        if (isNaN(addTimedTasks)) {
            addTimedTasks = 0;
        }
        if (isNaN(gameLogic)) {
            gameLogic = 0;
        }
        if (isNaN(dragNdrop)) {
            dragNdrop = 0;
        }
        if (isNaN(mobile)) {
            mobile = 0;
        }
        if (isNaN(design)) {
            design = 0;
        }
        if (isNaN(theme)) {
            theme = 0;
        }
        if (isNaN(appearance)) {
            appearance = 0;
        }
        if (isNaN(feedback)) {
            feedback = 0;
        }
        if (isNaN(lossFeedback)) {
            lossFeedback = 0;
        }
        if (isNaN(late)) {
            late = 0;
        }
        if (isNaN(bonus)) {
            bonus = 0;
        }
        
        if((totalScore >= 10 && baseScore > 5 && !plagiarism) || (totalScore >= 10 && project)) {
            status = "passed";
        }
        else status = "failed";
        if(baseScore > 5 && !plagiarism) {
            document.getElementById("baseScore").style.color = "#009933";
        }
        else {
            document.getElementById("baseScore").style.color = "#b32d00";
            document.getElementById("addScore").style.color = "#b32d00";
            document.getElementById("totalSubPoints").style.color = "#b32d00";
            document.getElementById("totalMainPoints").style.color = "#b32d00";
            document.getElementById("totalAddPoints").style.color = "#b32d00";
            document.getElementById("totalBasePoints").style.color = "#b32d00";
        }
        if((totalScore > 9 && baseScore > 5 && !plagiarism) || totalScore > 9 && project) {
            document.getElementById("totalSubPoints").style.color = "#009933";
            document.getElementById("totalMainPoints").style.color = "#009933";
            document.getElementById("totalBasePoints").style.color = "#009933";
            document.getElementById("totalAddPoints").style.color = "#009933";
            document.getElementById("addScore").style.color = "#009933";
        }
        if(totalScore < 10 || plagiarism) {
            document.getElementById("totalSubPoints").style.color = "#b32d00";
            document.getElementById("totalMainPoints").style.color = "#b32d00";
            document.getElementById("totalAddPoints").style.color = "#b32d00";
            document.getElementById("totalBasePoints").style.color = "#b32d00";
            document.getElementById("addScore").style.color = "#b32d00";
        }

        if(plagiarism) {
            document.getElementById("plagiarismFinal").innerHTML = "was ";
            document.getElementById("plagiarismPreview").innerHTML = "was ";
            document.getElementById("totalSubPoints").style.color = "#b32d00";
            document.getElementById("totalMainPoints").style.color = "#b32d00";
            document.getElementById("totalAddPoints").style.color = "#b32d00";
            document.getElementById("totalBasePoints").style.color = "#b32d00";
            document.getElementById("addScore").style.color = "#b32d00";
            document.getElementById("addScore").style.color = "#b32d00";
            document.getElementById("baseScore").style.color = "#b32d00";
            status = "failed";
        }
        
        if(!plagiarism) {
            document.getElementById("plagiarismFinal").innerHTML = "was not ";
            document.getElementById("plagiarismPreview").innerHTML = "was not ";
        }
        
        if(solo) {
            document.getElementById("finalAuthor").innerHTML = "<b>"+ author + "</b>";
            document.getElementById("authorAmount").innerHTML = "student has ";
            document.getElementById("finalAuthorPreview").innerHTML = "<b>"+ author + "</b>";
            document.getElementById("authorAmountPreview").innerHTML = "student has ";
        }
        if(!solo) {
            if (typeof coauthor == "undefined") {
                coauthor = "None";
            }
            document.getElementById("finalAuthor").innerHTML = "<b>"+ author + "</b> and <b>" + coauthor + "</b>";
            document.getElementById("authorAmount").innerHTML = "students have ";
            document.getElementById("finalAuthorPreview").innerHTML = "<b>"+ author + "</b> and <b>" + coauthor + "</b>";
            document.getElementById("authorAmountPreview").innerHTML = "students have ";
        }
        try {
            document.getElementById("link").innerHTML = "<a href='http://dijkstra.cs.ttu.ee/~" + author + "/ui/t2/'>Link</a>";
            document.getElementById("linkPreview").innerHTML = "<a href='http://dijkstra.cs.ttu.ee/~" + author + "/ui/t2/'>Link</a>";
        } catch(err) { }
        baseScore = parseInt(queue) + parseInt(sort) + parseInt(timedTasks) + parseInt(healthLoss) + parseInt(gameEnding) + parseInt(animations);
        addScore = parseInt(audioFeedback) + parseInt(gameLogic) + parseInt(dragNdrop) + parseInt(mobile) + parseInt(design) + parseInt(theme) + parseInt(appearance) + parseInt(feedback) + parseInt(lossFeedback) + parseInt(addTimedTasks);
        if(baseScore == 8) {
            baseScore += bonusScore;
        }
        //console.log(baseScore);
        document.getElementById("baseScore").innerHTML = baseScore;
        document.getElementById("addScore").innerHTML = addScore;
        document.getElementById("finalResult").innerHTML = status;
        document.getElementById("finalResultPreview").innerHTML = status;
        if(totalScore == 1) {
            document.getElementById("totalEndPoints").innerHTML = totalScore + " point";
            
        }
        if(totalScore == 0 || totalScore > 1) {
            document.getElementById("totalEndPoints").innerHTML = "<b>" + totalScore + "</b> points";
        }
        if(totalScore == 1) {
            document.getElementById("totalEndPointsPreview").innerHTML = totalScore + " point";
            
        }
        if(totalScore == 0 || totalScore > 1) {
            document.getElementById("totalEndPointsPreview").innerHTML = "<b>" + totalScore + "</b> points";
        } 
        document.getElementById("totalSubPoints").innerHTML = totalScore;
        document.getElementById("totalMainPoints").innerHTML = totalScore;
        document.getElementById("totalBasePoints").innerHTML = totalScore;
        document.getElementById("totalAddPoints").innerHTML = totalScore;
        var teambool = false;
        if ($("#teammate").val() == "") {
            coauthor = "None";
            if(!solo) {
                teambool = false;
                document.getElementById("teammate").style.border = "1px solid red";
            }
        } else {
            if(!solo) {
                document.getElementById("teammate").style.border = "1px solid green";
                teambool = true;
            }
            coauthor = $("#teammate").val(); 
        }
        var uniidbool = false;
        if ($("#uniid").val() == "") {
            author = "None";
            coauthor = "None";
            uniidbool = false;
            document.getElementById("uniid").style.border = "1px solid red";
        } else {
            uniidbool = true;
            document.getElementById("uniid").style.border = "1px solid green";
            author = $("#uniid").val(); 
        }
        var projectbool = false;
        if (typeof $("#projectScore").val() != "undefined") {
            if ($("#projectScore").val() == "") {
                projectbool = false;
                document.getElementById("projectScore").style.border = "1px solid red";
            } else {
                 projectbool = true;
                 document.getElementById("projectScore").style.border = "1px solid green";
            }
        }
        //vsegda samaja poslednaja
        if((allokey && uniidbool && solo && !project) || (allokey && uniidbool && !solo && teambool) || (allokey && project && projectbool && solo && uniidbool) || (allokey && project && projectbool && !solo && teambool)) {
            //console.log("ALL: " + allokey + " CountBad: " + countbad);
            //console.log("Uni: " + uniidbool);
            //console.log("Solo: " + solo);
            //console.log("Team: " + teambool);
            //console.log("Project: " + project);
            //console.log("Score: " + projectbool);
            document.getElementById("finish").disabled = false;
        } else {
            if((countbad % 16 == 0 && projectbool && project && !solo && teambool) || (countbad % 16 == 0 && projectbool && project && solo)) {
                document.getElementById("finish").disabled = false; 
            } else {
                document.getElementById("finish").disabled = true; 
            }

        }
    }, 1000);
})

var addTeammateButton = '<div class="col-sm-8 visible" id="addAuthor"><button type="button" class="btn btn-success" id="addAuthorEv" onclick="addAuthorEv()">Add teammate</button></div>';
var addPlagAuthorButton = '<div class="col-sm-8 visible" id="addPlagAuthor"><button type="button" class="btn btn-warning" id="addPlagAuthorEv" onclick="addPlagAuthorEv()">Plagiarism</button></div>';
var removeProject = '<div id="doneasproject"><label for="project" class="col-sm-3 col-form-label"><h4>Score: </h4></label><div class="col-sm-5"><input type="number" id="projectScore" class="form-control" name="quantity" min="0" max="20"><button type="button" class="btn btn-danger" onclick="removeProjectEv()" id="removeProjectEv">Remove</button></div></div>';
var addProject = '<div class="col-sm-10 visible" id="makeProject"><button type="button" class="btn btn-info" id="makeProjectEv" onclick="makeProjectEv()">Done as Project</button></div>';
var removeTeammateButton = '<label for="teammate" class="col-sm-3 col-form-label"><h4>Teammate: </h4></label><div class="col-sm-5"><input type="text" name="teammate" id="teammate" class="form-control" placeholder="eg. mapota"/><button type="button" class="btn btn-danger" onclick="removeAuthorEv()" id="removeAuthorEv">Remove</button></div>';
var removePlagAuthorButton = '<label for="plagFirst" class="col-sm-3 col-form-label"><h4>Description: </h4></label><div class="col-sm-5"><textarea class="form-control" rows="2" id="plagFirst" placeholder="Enter plagiarism description here"></textarea><button type="button" class="btn btn-success" onclick="removePlagAuthorEv()" id="removePlagAuthorEv">Remove</button></div>';

$(function() {
    $('#nextBaseTasks').on('click touch', function (e){
        e.preventDefault();
        if(project) {
            $('#tabs a[href="#submission"]').tab('show');
        } else {
            $('#tabs a[href="#baseTasks"]').tab('show');
        }
    })
    $('#nextAddTasks').on('click touch', function (e){
        e.preventDefault();
        $('#tabs a[href="#addTasks"]').tab('show');
    })
    $('#nextPlagiarism').on('click touch', function (e){
        e.preventDefault();
        $('#tabs a[href="#plagiarism"]').tab('show');
    })
    $('#nextPreview').on('click touch', function (e){
        e.preventDefault();
        $('#tabs a[href="#preview"]').tab('show');
    })
    $('#nextSubmission').on('click touch', function (e){
        e.preventDefault();
        $('#tabs a[href="#submission"]').tab('show');
    })

    $('#nextResults').on('click touch', function (e){
        e.preventDefault();
        $('#tabs a[href="#results"]').tab('show');
    })
    $('#backTeammate').on('click touch', function (e){
        e.preventDefault();
        $('#tabs a[href="#authors"]').tab('show');
    })
    $('#backBaseTasks').on('click touch', function (e){
        e.preventDefault();
        $('#tabs a[href="#baseTasks"]').tab('show');
    })
    $('#backAddTasks').on('click touch', function (e) {
        e.preventDefault();
        if(project) {
            $('#tabs a[href="#authors"]').tab('show');
        } else {
            $('#tabs a[href="#addTasks"]').tab('show');
        }
    })
    $('#backPlagiarism').on('click touch', function (e) {
        e.preventDefault();
        $('#tabs a[href="#plagiarism"]').tab('show');
    })
    $('#backSubmission').on('click touch', function (e) {
        e.preventDefault();
        $('#tabs a[href="#submission"]').tab('show');
    })
})

function removeAuthorEv() {
    //console.log("I am in remove function");
    solo = true;
    $("#addAuthor").show();
    $("#teammateDiv").html(addTeammateButton);
}
function removeProjectEv() {
    project = false;
    $("#makeProject").show();
    $("#projectDiv").html(addProject);
}


function removePlagAuthorEv() {
    $("#addPlagAuthor").show();
    plagiarism = false;
    $("#plagDiv").html(addPlagAuthorButton);
}

function addAuthorEv() {
    $("#addAuthor").hide();
    $("#teammateDiv").append(removeTeammateButton);
    solo = false;
    coauthor = $("#teammate").val();
}
function makeProjectEv() {
    project = true;
    $("#makeProject").hide();
    $("#projectDiv").append(removeProject);
    bindoninput();
}
function ProjectEv() {
    project = true;
    $("#makeProject").hide();
    //$("#projectDiv").append(removeProject);
    bindoninput();
}

function addPlagAuthorEv() {
    plagiarism = true;
    $("#addPlagAuthor").hide();
    $("#plagDiv").append(removePlagAuthorButton);
}

function results() {
    var authorCheck = true;
    if(author == "None") {
        authorCheck = false;
    }
    if(author == "") {
        coauthor = "None";
    } 
    $("#mainDiv").hide();
    //$("#results").style.display = '';
    $("#results").show();
    //console.log(author + " " + coauthor + " " + totalScore + " " + status);
    if(authorCheck) {
        $.get("php/save.php", { student:author, teammate:coauthor, score: totalScore.toString(), status: status}, function(data) {
            //alert("Data: " + data);
            if(!data.includes("OK")) {
                //console.log("ERROR WITH DataBase");
            }
        });comment
        $.post('php/save.php', { studenthtml: author, html: document.documentElement.outerHTML }).done(function(data) {
            //console.log(data);
        });
        //console.log(document.getElementById("comment").value != "");
        if(document.getElementById("comment").value != "") {
            $.post('php/save.php', { student: author, comment: document.getElementById("comment").value }).done(function(data) {
                //alert(data);
            });
        }
        //console.log(document.getElementById("editStat").value);
        if(document.getElementById("editStat").value == "False") {
           $.post('php/save.php', { student: author, editstatus: "False" }).done(function(data) {
                //alert(data);
            });
        } else {
            $.post('php/save.php', { student: author, editstatus: "True" }).done(function(data) {
                //alert(data);
            });
        }
    }
}

