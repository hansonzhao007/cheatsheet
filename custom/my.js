$( document ).ready(function() {

    function renderGitment(){
        var gitment = new Gitmint({
            id: window.location.pathname,
            owner: 'hansonzhao007',
            repo: 'cheatsheet',
            oauth: {
                client_secret: '48dc7c1aa2e663a79e994f8cffc90423ea3f5e25',
                client_id: '4fe1228acaf3e7b057de'
            }});
        gitment.render('gitment-container');
    }
    $( ".page-inner" ).append('<div class="comments" id="comments"><div id="gitment-container"></div></div>');

    renderGitment();
});