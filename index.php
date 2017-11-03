<?php
    @include 'php/functions.php';

    if(isset($_GET['p'])) {
        $page = $_GET['p'];
        $content = 'pages/' . $_GET['p'] . '/' . $_GET['p'] . '.php';
    } else {
        $page = 'overview';
        $content = 'pages/start.php';
    }
 ?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, user-scalable=no" />
    <title>UI Collection</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.1.2/css/fixedHeader.dataTables.min.css">
    <link rel="stylesheet" href="dist/css/app.css">
</head>
<body id="page-<?php echo $page; ?>">

    <?php include 'partials/main-menu.php' ?>

    <div class="off-canvas-content" data-off-canvas-content>
        <?php
            if($page == 'overview') {
                include 'partials/header.php';
            }
            include $content;
        ?>
    </div>

    <?php include 'partials/footer.php'; ?>

</body>
</html>