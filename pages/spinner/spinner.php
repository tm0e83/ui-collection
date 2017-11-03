<section>
    <div class="headline-row row">
        <div class="columns">
            <h3>Spinner</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <div class="row">
                <div class="columns">
                    <?php include 'pages/spinner/partials/spinner-code-example-html-1.php'; ?>
                </div>
            </div>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="spinner-tabs1">
                <li class="tabs-title"><a href="#spinner-panel1" aria-selected="true">HTML</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="spinner-tabs1">
                <div class="tabs-panel" id="spinner-panel1">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/spinner/partials/spinner-code-example-html-1.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>

    <br>

    <div class="headline-row row">
        <div class="columns">
            <h4>Spinner Overlay</h4>
            <p>Display the spinner within a layer that covers the entire document.</p>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <div class="row">
                <div class="columns shrink">
                    <?php include 'pages/spinner/partials/spinner-code-example-html-2.php'; ?>
                </div>
            </div>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="spinner-tabs2">
                <li class="tabs-title"><a href="#spinner-panel2" aria-selected="true">HTML</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="spinner-tabs2">
                <div class="tabs-panel" id="spinner-panel2">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/spinner/partials/spinner-code-example-html-2.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>

    <br>

    <div class="headline-row row">
        <div class="columns">
            <h4>Absolute positioned spinner overlay</h4>
            <p>In case you don't want the overlay to cover the whole document but instead to overlay just a certain part of the page (e.g. a form), you can add the <code>data-uic-display-type="absolute"</code> attribute to the <code>.uic-spinner-overlay</code>.</p>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <div class="row">
                <div class="columns shrink">
                    <?php include 'pages/spinner/partials/spinner-code-example-html-3.php'; ?>
                </div>
            </div>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="spinner-tabs3">
                <li class="tabs-title"><a href="#spinner-panel3" aria-selected="true">HTML</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="spinner-tabs3">
                <div class="tabs-panel" id="spinner-panel3">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/spinner/partials/spinner-code-example-html-3.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
</section>