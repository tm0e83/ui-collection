<section>
    <div class="headline-row row">
        <div class="columns">
            <h3>Pretty Checkboxes</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <p>You can define the background-, font- and checkmark-colors in the settings.</p>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns shrink">
            <?php include 'pages/pretty-checkbox/partials/code-example-1-html.html'; ?>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="pretty-checkbox-tabs">
                <li class="tabs-title is-active"><a href="#pretty-checkbox-panel1" aria-selected="true">HTML</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="pretty-checkbox-tabs">
                <div class="tabs-panel is-active" id="pretty-checkbox-panel1">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/pretty-checkbox/partials/code-example-1-html.html'));?></code></pre>
                </div>
            </div>
        </div>
    </div>

    <br>

    <div class="headline-row row">
        <div class="columns">
            <h3>Pretty Checkboxes</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <p>You can change the colors of certain checkboxes by using the <code>uic-pretty-checkbox()</code> mixin.</p>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns shrink">
            <?php include 'pages/pretty-checkbox/partials/code-example-2-html.html'; ?>
        </div>
        <div class="columns">
            <?php include 'pages/pretty-checkbox/partials/code-example-2-html-2.html'; ?>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="pretty-checkbox-tabs2">
                <li class="tabs-title is-active"><a href="#pretty-checkbox-panel2" aria-selected="true">SCSS</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="pretty-checkbox-tabs2">
                <div class="tabs-panel is-active" id="pretty-checkbox-panel2">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/pretty-checkbox/partials/code-example-2-scss.scss'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
</section>