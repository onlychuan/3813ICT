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
    var u= req.body.username;
    var p = req.body.password;
    
    

    fs.readFile('userdata.json', 'utf8', function(err, data) {
        if (err) throw err;
            console.log(err);
           let uesrArray =JSON.parse(data);
           console.log(uesrArray)
            let i = uesrArray.findIndex(user => ((user.username==u)&&(user.password==p)));
            if (i == -i){ 
                res.send({
                    "username":u,
                    "password":p,
                    "success": false
            });
            }else{
                console.log(uesrArray);
                res.send({"success": true})
            }
               
            
        
        });      
    });