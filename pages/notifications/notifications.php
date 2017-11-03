<section>
    <div class="headline-row row">
        <div class="columns">
            <h3>Notification Messages</h3>
        </div>
    </div>
    <div class="example-row row">
        <div class="columns">
            <?php include 'pages/notifications/partials/notifications-code-example-html-1.php'; ?>
        </div>
    </div>
    <div class="code-row row">
        <div class="column">
            <ul class="tabs" data-tabs id="notifications-tabs">
                <li class="tabs-title is-active"><a href="#notifications-panel1" aria-selected="true">HTML</a></li>
                <li class="tabs-title"><a href="#notifications-panel2" aria-selected="true">JS</a></li>
            </ul>
            <div class="tabs-content" data-tabs-content="notifications-tabs">
                <div class="tabs-panel is-active" id="notifications-panel1">
                    <pre><code class="html"><?php echo replaceBraces(file_get_contents('pages/notifications/partials/notifications-code-example-html-1.php'));?></code></pre>
                </div>
            </div>
            <div class="tabs-content" data-tabs-content="notifications-tabs">
                <div class="tabs-panel" id="notifications-panel2">
                    <pre><code class="javascript"><?php echo replaceBraces(file_get_contents('pages/notifications/partials/notifications-code-example-js-1.php'));?></code></pre>
                </div>
            </div>
        </div>
    </div>
</section>