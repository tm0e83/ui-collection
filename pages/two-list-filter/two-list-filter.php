<section>
    <div class="headline-row row">
        <div class="columns">
            <h3>Two List Filter</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <?php include 'pages/two-list-filter/partials/two-list-filter-code-example-html-1.php'; ?>
        </div>
    </div>

    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="two-list-filter-tabs">
                <li class="tabs-title is-active"><a href="#two-list-filter-panel1" aria-selected="true">HTML</a></li>
                <li class="tabs-title"><a href="#two-list-filter-panel2" aria-selected="true">JS</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="two-list-filter-tabs">
                <div class="tabs-panel is-active" id="two-list-filter-panel1">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/two-list-filter/partials/two-list-filter-code-example-html-1.php'));?></code></pre>
                </div>
            </div>
            <div class="tabs-content" data-tabs-content="two-list-filter-tabs">
                <div class="tabs-panel" id="two-list-filter-panel2">
                    <pre><code class="javascript"><?php echo replaceBraces(file_get_contents('pages/two-list-filter/partials/two-list-filter-code-example-js-1.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
</section>