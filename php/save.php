<?php
session_start();
$con = mysqli_connect("xxx","xxx","xxx","xxx");
if (!$con) {
  die('Could not connect: ' . mysqli_connect_error());
}

function test_input($con,$data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  $data = mysqli_real_escape_string($con,$data);
  return $data;
}
function savehtml($student,$html,$con) {
    $html = str_replace("'",'"',$html);
    $q = 'UPDATE xxx SET html = ' . "'" . $html . "'" . 'WHERE student="' . $student . '";';
    $result = mysqli_query($con,$q);  
}
function saveeditstatus($student,$edit,$con) {
    if($edit == "True") {
        $edit = 1;
    } else {
        $edit = 0;
    }
    $q = 'UPDATE xxx SET editstatus = ' . "'" . $edit . "'" . 'WHERE student="' . $student . '";';
    $result = mysqli_query($con,$q);  
}
function savecomment($student,$comment,$con) {
    $comment = str_replace("'",'"',$comment);
    $q = 'UPDATE xxx SET comment = ' . "'" . $comment . "'" . 'WHERE student="' . $student . '";';
    $result = mysqli_query($con,$q);  
}
function gethtml($student,$con) {
    $q = 'SELECT * FROM xxx WHERE student="' . $student . '";';
    $result = mysqli_query($con,$q);
    while($row = mysqli_fetch_array($result)) {
        $_SESSION['student']= $row['student'];
        $_SESSION['html']= $row['html'];
        $_SESSION['team']= $row['teammate'];
        $_SESSION['comment']= $row['comment'];
        $_SESSION['score']= $row['score'];
        $_SESSION['status']= $row['status'];
        $_SESSION['editstatus']= $row['editstatus'];
    }
    $_SESSION['html'] = str_replace('<input type="text" id="editBool" value="False" hidden="">','<input type="text" id="editBool" value="True" hidden>',$_SESSION['html']);
    $_SESSION['html'] = str_replace('<input type="text" id="editStat" value="False" hidden="">','<input type="text" id="editStat" value="True" hidden>',$_SESSION['html']);
    $_SESSION['html'] = str_replace('expanded="false">Authors','expanded="true">Authors',$_SESSION['html']);
    $_SESSION['html'] = str_replace('<div class="container" id="mainDiv" style="display: none;">','<div class="container" id="mainDiv" style="display: block;">',$_SESSION['html']);
    $_SESSION['html'] = str_replace('<div class="container footer" id="results" hidden="" style="display: block;">','<div class="container footer" id="results" hidden="" style="display: none;">',$_SESSION['html']);
    $_SESSION['html'] = str_replace('<script type="text/javascript" src="scripts/main.js"></script>','<script type="text/javascript" src="/~runest/ui/t3/scripts/main.js"></script>',$_SESSION['html']);
    $_SESSION['html'] = str_replace('href="#preview" aria-expanded="true">','href="#preview" aria-expanded="false">',$_SESSION['html']);
}
function savedata($student,$teammate,$score,$status,$con) {
    $exist = false;
    $q='SELECT * from xxx;';
    $result = mysqli_query($con,$q);
    while($row = mysqli_fetch_array($result)) {
        if($row['student'] == $student) {
            $exist = true;
        } 
        
    }
    if($exist) {
        $q = 'UPDATE xxx SET teammate = "' . $teammate .'", status = "' . $status . 
        '", score = "' . $score . '" WHERE student="' . $student . '";';
        $result = mysqli_query($con,$q);
    } else {
        $q="INSERT INTO xxx (student, teammate, score, status, created)
            VALUES ('" . $student . "', '" . $teammate . "', '" . $score . "', '" . $status . "', '" . date("Y/m/d") . "');";
        $result = mysqli_query($con,$q);
        if($result) {
            echo "OK";
        } else {
            echo "Error";
        }
    }
}
function getdata($con) {
    $q='SELECT * from xxx ORDER BY convert(score, decimal) DESC;';
    $result = mysqli_query($con,$q);
    while($row = mysqli_fetch_array($result)) {
        echo "<tr><th>" . $row['student'] . " </th><th>" . $row['teammate'] . "</th><th>" . $row['score'] . "</th><th>";
        if ($row['status'] == "passed") {
            echo "<font color='green'>";
        } else {
           echo "<font color='red'>"; 
        }
        echo $row['status'] . "</font></th><th>" . $row['created'] . "</th>";
        if($row['editstatus'] == 0) {
            echo '<th><center><a href="http://dijkstra.cs.ttu.ee/~runest/ui/t3/php/save.php/?studhtml=' .
                $row['student'] . '" class="btn btn-primar">Edit</a>
                    </center></th></tr>';
        } else {
            if($row['status'] == "passed") {
                echo '<th><font color="green"><center>Final</center><font></th>';
            } else {
                echo '<th><font color="red"><center>Final</center><font></th>';
            }
        }
    }
}
$error = false;
if(isset($_GET['student']) && !empty($_GET['student'])) {
    $student = test_input($con,$_GET['student']);
} else {
   $error = true;
}
if(isset($_GET['status'])) {
    $status = test_input($con,$_GET['status']);
} else {
   $error = true;
}
if(isset($_GET['score'])) {
    $score = test_input($con,$_GET['score']);
} else {
   $error = true;
}
if(isset($_GET['teammate']) && !empty($_GET['teammate'])) {
    $teammate = test_input($con,$_GET['teammate']);
} else {
    if(!$error) {
        $teammate = "none";
    } else {
        $error = true;
    } 
}
$getdata = false;
if(isset($_POST{'comment'})) {
    savecomment($_POST['student'],$_POST['comment'],$con);
}
if(isset($_POST{'editstatus'})) {
    saveeditstatus($_POST['student'],$_POST['editstatus'],$con);
}
if(isset($_POST['html'])) {
    if(isset($_POST['studenthtml'])) {
        savehtml($_POST['studenthtml'],$_POST['html'],$con);
    } else {
        echo "No STUD"; 
    }

} else {
    if(isset($_GET['studhtml'])) {
        if(!empty($_GET['studhtml'])) {
           gethtml($_GET['studhtml'],$con);
           if($_SESSION['html'] != "") {
               if($_SESSION['editstatus'] == 0) {
                   if($_SESSION['status'] == "passed") {
                       echo  "<br><font size=5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Student:</b> " . $_SESSION['student'] . " <b>Old score: <font color='green'>" . $_SESSION['score'] . "</font></font></b>";
                   } else {
                       echo  "<br><font size=5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Student:</b> " . $_SESSION['student'] . " <b>Old score: <font color='red'>" . $_SESSION['score'] . "</font></font></b>";
                   }
                   echo $_SESSION['html'];
                   echo '<script>document.getElementById("uniid").value ="' . $_GET['studhtml'] . '";</script>';
                   echo '<script>document.getElementById("teammate").value ="' . $_SESSION['team'] .  '";</script>';
                   echo '<script>document.getElementById("comment").value ="' . $_SESSION['comment'] .  '";</script>';
                   echo '<script>document.getElementById("authorsli").classList.add("active");</script>';
                   echo '<script>document.getElementById("prewli").classList.remove("active");</script>';
                   echo '<script>document.getElementById("preview").classList.remove("active","in");</script>';
                   echo '<script>document.getElementById("uniid").disabled = true;</script>';
                   echo '<script>document.getElementById("projectScore").value = "' . $_SESSION['score'] . '";</script>';
                   echo '<script>document.getElementById("authors").classList.add("active","in");</script>';
               }
           } else {
               echo "No data";
           }
        } else {
            echo 'No student name';
        }
    } else {
        if(!$error) {
            savedata($student,$teammate,$score,$status,$con);
        } else {
            if(isset($_GET['getall'])) {
                echo '
                <html>
                <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">    
                </head>
                <body>
                <center>
                <br><br><button class="btn btn-primary" onclick="back()">Back</button><br><br>
                <table border="1" style="width:50%">
                <tr>
                    <th>Student</th>
                    <th>Teammate</th> 
                    <th>Score</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Edit</th>
                </tr>';
                getdata($con);
                $getdata = true;
            } else {
                echo "No data";
            }
        }
    }
}
?>
<script>
function back() {
    window.open("http://dijkstra.cs.ttu.ee/~runest/ui/t3/", "_self");
}    
</script>
</table>
<?php 
if($getdata) {
    echo '<br><button class="btn btn-primary" onclick="back()">Back</button>';
}?>
</center>
</body>
</html>