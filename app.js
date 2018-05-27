var express  = require('express');

var http = require('http');

var app = express();

var bodyParser = require('body-parser');


var fs = require('fs');
const iconv = require('iconv-lite');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var exec = require('child_process').exec,
    child;

app.get('/keyboard',function(req,res){
    var data = {
        'type': 'buttons',
        'buttons':['308관']
    };
    
    res.json(data);
});

app.post('/message',function(req,res){
    
    var msg = req.body.content;
    console.log('전달받은 메세지: '+msg);
    var send = {};
    child = exec("D:\\Javascript_Projects\\haksik\\info308.jar", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
        else{
            var temp = fs.readFileSync('./haksik/information.txt',null);
            var btemp = fs.readFileSync('./haksik/binformation.txt',null);
            var ltemp = fs.readFileSync('./haksik/linformation.txt',null);
            var dtemp = fs.readFileSync('./haksik/dinformation.txt',null);
            
    var data = iconv.decode(temp,'EUC-KR');
    var bdata = iconv.decode(btemp,'EUC-KR');
    var ldata = iconv.decode(ltemp,'EUC-KR');
    var ddata = iconv.decode(dtemp,'EUC-KR');
            
    console.log(data);
    switch(msg){
        case '308관':
            send = {
                'message': {
                    
                    'text' : '메뉴를 선택해 주세요!'
                },
                keyboard:{
                    'type' : 'buttons',
                    'buttons' : ['전체', '조식', '중식', '석식']
                }
                
            }
            break;
        case '전체':
            send = {
                'message': {
                    
                    'text' : data+'맛있는 식사 하세요~(하하)'
                },
                keyboard: {
                'type': 'buttons',
                    'buttons':['308관']
                }
            }
            break;
        case '조식':
            send = {
                'message': {
                    
                    'text' : bdata+'맛있는 식사 하세요~(하하)'
                },
                keyboard: {
                'type': 'buttons',
                    'buttons':['308관']
                }
            }
            break;
        case '중식':
            send = {
                'message': {
                    
                    'text' : ldata+'맛있는 식사 하세요~(하하)'
                },
                keyboard: {
                'type': 'buttons',
                    'buttons':['308관']
                }
            }
            break;
        case '석식':
            send = {
                'message': {
                    
                    'text' : ddata+'맛있는 식사 하세요~(하하)'
                },
                keyboard: {
                'type': 'buttons',
                    'buttons':['308관']
                }
            }
            break;
    }
    res.json(send);
        }
});
    
});

http.createServer(app).listen(9090,function(){
    console.log('서버 실행중..');
});