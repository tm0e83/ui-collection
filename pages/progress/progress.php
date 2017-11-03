<section>
    <div class="headline-row row">
        <div class="columns">
            <h3>Progess</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <?php include 'pages/progress/partials/progress-code-example-html-1.php'; ?>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="progress-tabs">
                <li class="tabs-title is-active"><a href="#progress-panel1" aria-selected="true">HTML</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="progress-tabs">
                <div class="tabs-panel is-active" id="progress-panel1">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/progress/partials/progress-code-example-html-1.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="columns"><b>Stack steps on small screens</b></div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <?php include 'pages/progress/partials/progress-code-example-html-2.php'; ?>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="progress-tabs">
                <li class="tabs-title is-active"><a href="#progress-panel2" aria-selected="true">HTML</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="progress-tabs">
                <div class="tabs-panel is-active" id="progress-panel2">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/progress/partials/progress-code-example-html-2.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
</section>