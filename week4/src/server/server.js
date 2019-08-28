let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;


// Boots up the server using http
server.listen(3000, () => {
 console.log('RUN');
});


    app.post('/api/auth', (req, res) => {
        var uname = req.body.username;
        var uemail = req.body.password;
        var urole;
	    var userObj;
        console.log(uname);
        console.log(uemail);
    
        fs.readFile('userdata.json', 'utf8', function(err, data) {
            if (err) {
                console.log(err);
                res.send({
                    'username': '',
                    'success': false
                });
            } else {
                userObj = JSON.parse(data);
                for (let i = 0; i < userObj.length; i++) {
                    if (userObj[i].username == uname) {
                        for (let k = 0; k < userObj.length; k++) {
                            if (userObj[k].password == uemail) {
                                urole = userObj[k].role;
                                res.send({
                                    'username': uname,
								    'email': uemail,
								    'role': urole,
                                    'success': true
                                });
                                console.log(urole);
                                return;
                            }
                        }
                    }
                }
                res.send({
                    'username': password,
                    'success': false
                });
            }
        });
    });


    // Route to manage user registration
app.post('/api/reg', (req, res) => {
	var isUser = 0;
	var regUserObj;
	var regUname = req.body.username;
	var regUemail = req.body.password;
	var regUrole = req.body.role;
	console.log(regUname)

	fs.readFile('userdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			regUserObj = JSON.parse(data);

			for (let i = 0; i < regUserObj.length; i++) {
				if (regUserObj[i].name == regUname || regUserObj[i].password== regUemail) {
					isUser = 1;
				}
			}

			if (isUser > 0) {
				console.log(req.body);
				res.send({
					'username': '',
					'success': false
				});
			} else {
				regUserObj.push({
					'username': regUname,
					'password': regUemail,
					'role': regUrole
				})
				var newdata = JSON.stringify(regUserObj);
				fs.writeFile('userdata.json', newdata, 'utf-8', function(err) {
					if (err) throw err;
					res.send({
						'username': regUname,
						'password': regUemail,
						'role': regUrole,
						'success': true
					});
				});
			}
		}
	});
});
    


app.post('/api/users', (req, res) => {
	fs.readFile('userdata.json', 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var userData = JSON.parse(data);
			res.send({
				userData
			});
		}
	});
});
