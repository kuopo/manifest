var k1 = 'keyA';    
var k2 = 'keyB';
var k3 = 'keyC';

var qsTableExist = false;

function dprint(str)
{
    alert(str);
}

function onloadBody()
{
    var sheet = document.createElement('style');
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    
    sheet.innerHTML = "#table_but {width: " + width*0.8 + "px; margin-left: auto; margin-right: auto; text-align: center; } ";
    sheet.innerHTML += "input {font-size: 20px; } ";
    document.head.appendChild(sheet);
 
    // only index.html would insert qs to db
    if (document.title == 'index.html')
        validateDBTable();

    queryString();
}

function validateDBTable()
{
    var successStr = "200:";
    var ret = pigeon.db_query("qsTable", k1.toString());

    if (ret.search(successStr) == -1)
    {
        //dprint('query qstable error ' + ret);

        ret = pigeon.db_init("qsTable");
        if (ret.search("200") == -1)
            alert("init database qsTable Error: " + ret);
        else 
            qsTableExist = true;
    }
    else
    {
        qsTableExist = true;
    }
}

function queryString(name) 
{
    var allVars = window.location.search.substring(1);
    var vars = allVars.split("&");
    var qsFlag = 0;
    
    var str = '<table style="width:75%; border: 2px; border-style: solid; margin-left: auto; margin-right: auto; ">';
    str += '<tr><td colspan="3" style="background-color: #000000; color: #FFFFFF; ">' + document.title + ' Query String</td></tr>';
    for (i = 0; i < vars.length; i++)
    {
        var v = vars[i].split("=");

        if (v[0] == '')
        {
            qsFlag = 0;
            break;
        }
        else
            qsFlag = 1;
        str += '<tr><td style="background-color: #82CAFA;">' + (i+1) + '</td><td>' + v[0] + '</td><td>' + v[1] + '</td></tr>';

        // only index.html would insert qs to db
        if (document.title == 'index.html')
            insertDB(v[0], v[1]);
    }
    
    // no queryString
    if (qsFlag == 0)
    {
        str += '<tr><td colspn="3" style="text-align: center;">No query string!!</td></tr>';
    }    

    str += '</table>';
    document.getElementById('div_qs').innerHTML = str;
}


function resultParser(result, errorStr)
{
    var successStr = "200:";
    
    if (result.search(successStr) == -1)
    {
        dprint(errorStr + " Error: " + result);
        return false;
    }
    else
    {
        index = result.indexOf(successStr);
        ret = result.substring(index+successStr.length, result.length);
        //dprint(errorStr + "-> " + ret);
        return ret;
    }
}

function insertDB(key, value)
{
    var ret;

    ret = pigeon.db_update("qsTable", key.toString(), value.toString());
    if (ret.search("200") == -1)
        alert("insert kv Error: " + ret);
    
    /*
    console.log(value);
    window.sessionStorage[key.toString()] = value.toString();
    */
}

function queryDB(key)
{
    var ret = pigeon.db_query("qsTable", key.toString());
    ret = resultParser(ret, 'query qsTable ' + key.toString() + ' ');
    return ret;

    //return window.sessionStorage[key.toString()];
}

function onclickBut(but)
{
    if (but == 'index')
    {
        if (queryDB(k1))    var v1 = queryDB(k1);
        else                ;   // consider the failed case
        if (queryDB(k2))    var v2 = queryDB(k2);
        else                ;   // consider the failed case
        if (queryDB(k3))    var v3 = queryDB(k3);
        else                ;   // consider the failed case
        
        str = 'index.html?' + k1 + '=' + v1 + '&' + k2 + '=' + v2 + '&' + k3 + '=' + v3; 
    }
    else if (but == 'testPage1')
    {
        if (queryDB(k1))    var v1 = queryDB(k1);
        else                ;   // consider the failed case
        if (queryDB(k2))    var v2 = queryDB(k2);
        else                ;   // consider the failed case
        
        str = 'testPage1.html?' + k1 + '=' + v1 + '&' + k2 + '=' + v2;
    }
    else if (but == 'testPage2')
    {
        if (queryDB(k3))    var v3 = queryDB(k3);
        else                ;   // consider the failed case

        str = 'testPage2.html?' + k3 + '=' + v3;
    }
    else if (but == 'normalPage')
        str = 'normalPage.html';
        
    window.location.href = str;
    
}  