<section>
    <div class="headline-row row">
        <div class="columns">
            <h3>Multi Select Dropdown</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <?php include 'pages/multi-select-dropdown/partials/multi-select-dropdown-code-example-html-1.php'; ?>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="multi-select-dropdown-tabs">
                <li class="tabs-title is-active"><a href="#multi-select-dropdown-panel1" aria-selected="true">HTML</a></li>
                <li class="tabs-title"><a href="#multi-select-dropdown-panel2" aria-selected="true">JS</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="multi-select-dropdown-tabs">
                <div class="tabs-panel is-active" id="multi-select-dropdown-panel1">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/multi-select-dropdown/partials/multi-select-dropdown-code-example-html-1.php'));?></code></pre>
                </div>
            </div>
            <div class="tabs-content" data-tabs-content="multi-select-dropdown-tabs">
                <div class="tabs-panel" id="multi-select-dropdown-panel2">
                    <pre><code class="javascript"><?php echo replaceBraces(file_get_contents('pages/multi-select-dropdown/partials/multi-select-dropdown-code-example-js-1.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
</section>