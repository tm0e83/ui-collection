<section>
    <div class="headline-row row">
        <div class="columns">
            <h3>Pretty Radio</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <div class="row">
                <div class="columns shrink">
                    <?php include 'pages/pretty-radio/partials/code-example-1-html.html'; ?>
                </div>
                <div class="columns">
                    <?php include 'pages/pretty-radio/partials/code-example-1-html-2.html'; ?>
                </div>
            </div>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="pretty-radio-tabs1">
                <li class="tabs-title is-active"><a href="#pretty-radio-panel1" aria-selected="true">HTML</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="pretty-radio-tabs1">
                <div class="tabs-panel is-active" id="pretty-radio-panel1">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/pretty-radio/partials/code-example-1-html.html'));?>

<?php echo replaceBraces(file_get_contents('pages/pretty-radio/partials/code-example-1-html-2.html'));?></code></pre>
                </div>
            </div>
        </div>
    </div>

    <br>

    <div class="example-row row">
        <div class="columns">
            <div class="row">
                <div class="columns shrink">
                    <?php include 'pages/pretty-radio/partials/code-example-2-html.html'; ?>
                </div>
                <div class="columns">
                    <?php include 'pages/pretty-radio/partials/code-example-2-html-2.html'; ?>
                </div>
            </div>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="pretty-radio-tabs2">
                <li class="tabs-title is-active"><a href="#pretty-radio-panel2" aria-selected="true">SCSS</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="pretty-radio-tabs2">
                <div class="tabs-panel is-active" id="pretty-radio-panel2">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/pretty-radio/partials/code-example-2-scss.scss'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
</section>