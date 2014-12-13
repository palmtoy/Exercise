var launcher = require('browser-launcher');

launcher(function (err, launch) {
    if (err) return console.error(err);

    console.log('# available browsers:');
    console.dir(launch.browsers);

    var opts = {
        headless : true,
        // browser : 'safari'
        browser : 'chrome'
    };
    launch('https://www.google.com', opts, function (err, ps) {
        if (err) return console.error(err);
    });

});

