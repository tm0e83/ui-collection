<section>
    <div class="headline-row row">
        <div class="columns">
            <h3>Single Select Dropdown</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <?php include 'pages/single-select-drop/partials/single-select-drop-code-example-html-1.php'; ?>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="single-select-drop-tabs">
                <li class="tabs-title is-active"><a href="#single-select-drop-panel1" aria-selected="true">HTML</a></li>
                <li class="tabs-title"><a href="#single-select-drop-panel2" aria-selected="true">JS</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="single-select-drop-tabs">
                <div class="tabs-panel is-active" id="single-select-drop-panel1">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/single-select-drop/partials/single-select-drop-code-example-html-1.php'));?></code></pre>
                </div>
            </div>
            <div class="tabs-content" data-tabs-content="single-select-drop-tabs">
                <div class="tabs-panel" id="single-select-drop-panel2">
                    <pre><code class="javascript"><?php echo replaceBraces(file_get_contents('pages/single-select-drop/partials/single-select-drop-code-example-js-1.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
</section>