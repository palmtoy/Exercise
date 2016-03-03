var mkdirp = require('mkdirp');

mkdirp('./tmp/foo/bar/baz', function (err) {
	if (err) console.error(err)
	else console.log('pow!')
});

mkdirp('./tmp2/foo/bar/baz', 0700, function (err) {
	if (err) console.error(err)
	else console.log('pow2!')
});


var ret = mkdirp.sync('./tmpsync/foo/bar/baz', 0755);
console.log('ret =', ret); // output: `ret = /home/will/Workspace/GitHub/Exercise/Nodejs/MkdirpTest/tmpsync`


/*

If you run the following cmd:
	`npm install -g mkdirp`

This package also ships with a mkdirp command.

usage: mkdirp [DIR1,DIR2..] {OPTIONS}

Create each supplied directory including any necessary parent directories that don't yet exist.

If the directory already exists, do nothing.

OPTIONS are:
	-m, --mode   If a directory needs to be created, set the mode as an octal permission string.


exp:
	`mkdirp ./tmpcmd/foo/bar/baz -m 755`
	`mkdirp ./tmpcmd/foo/bar/baz -m 0777`

*/

