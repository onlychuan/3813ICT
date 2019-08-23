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
                        
                                res.send({
                                    'success': true
                                });
                                
                                return;
                            }
                        }
                    }
                }
                res.send({
                    'username': uname,
                    'success': false
                });
            }
        });
    });