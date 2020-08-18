var id;
function allowDrop(ev){
    ev.preventDefault();
}

function dragStart(ev){
    id=ev.target.id;
}

function drop(ev){
    ev.target.append(document.getElementById(id));
}
