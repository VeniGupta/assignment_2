/*var StatusENUMS={
    ACTIVE :"ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED: "DELETED"
};
 var todos ={
     1: { title: "Learn Javascript", status: StatusENUMS.ACTIVE },
     2: { title: "GIT tutorial ", status: StatusENUMS.ACTIVE },
     3: { title: "Git Interactive ", status: StatusENUMS.ACTIVE }

 }
 var next_todo_id =4;
 module.exports={
     StatusENUMS: StatusENUMS,
     todos : todos,
     next_todo_id : next_todo_id
 };*/
var StatusEnums={
    ACTIVE:"ACTIVE",
    COMPLETE:"COMPLETE",
    DELETED:"DELETED"
}
var TODOS={
    1:{title:"Learn javascript",status:StatusEnums.ACTIVE},
    2:{title:"Git tutorial",status:StatusEnums.ACTIVE},
    3:{title:"Interactive Git",status:StatusEnums.ACTIVE},
}
var next_todo_id=4;
module.exports={
    StatusEnums:StatusEnums,
    todos:TODOS,
    next_todo_id: next_todo_id
};