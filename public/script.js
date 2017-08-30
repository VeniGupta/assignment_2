console.log("is script file loading");
const RESPONSE_DONE=4;
const STATUS_OK =200;
const TODOS_LIST_ID = "todos_list_div" ;
function add_todo_elements(id, todos_data_json){
    var parent = document.getElementById(id);
    parent.innerText = todos_data_json;
}
function getTodosAJAX(){

var xhr= new XMLHttpRequest(); // object is created
xhr.open( "GET", "/api/todos", true); // definition of object
xhr.onreadystatechange = function()
{
    if( xhr.readyState === RESPONSE_DONE){
        if(xhr.status === STATUS_OK)
        {
            //xhr.response xhr.responsetext
            console.log(xhr.responseText);
            add_todo_elements(TODOS_LIST_ID, xhr.responseText);
        }
    }

}
xhr.send(data=null); // actual request
}
