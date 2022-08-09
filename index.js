const addTitle = document.getElementById("addTitle");
const addText = document.getElementById("addText");
const addButton = document.getElementById("addNote");
const notesDiv = document.getElementById("notes");
const deletednotesDiv = document.getElementById("deleteNotes");
const deletedArr = [];
showNotes();
deleteNotes();
function addNotes(){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }
    if(addText.value == ''){
        alert("Add your note .. ")
        return;
    }

    const noteObj = {
        title: addTitle.value ,
        note: addText.value,
    }
    addTitle.value = '';
    addText.value = '';
    notes.push(noteObj)
    localStorage.setItem('notes',JSON.stringify(notes));
    showNotes();
}

function showNotes(){
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for(let i = 0; i<notes.length; i++){
        notesHTML += `<div class="note">
                        <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                        <div class="title">${notes[i].title === '' ? 'Note ' : notes[i].title}</div>
                        <div class="text">${notes[i].note}</div>
                    </div>
        `
    }
    notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind){
    let notes = localStorage.getItem('notes');
    let deletenotes = localStorage.getItem('deletenotes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    const deletenoteObj = {
        title: notes[ind].title ,
        note: notes[ind].note,
    }
    deletedArr.push(deletenoteObj);
    localStorage.setItem('deletenotes',JSON.stringify(deletedArr));
    notes.splice(ind,1);
    localStorage.setItem('notes',JSON.stringify(notes));
    showNotes();
    deleteNotes();
}
addButton.addEventListener("click",addNotes );

function filterNotes(){
    let filterHTML = '';
    let searchValue = document.getElementById("uniqueSearch").value;
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for(let i = 0; i<notes.length; i++){
        if(notes[i].title === searchValue){
            filterHTML += `<div class="note">
                        <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                        <div class="title">${notes[i].title === '' ? 'Note ' : notes[i].title}</div>
                        <div class="text">${notes[i].note}</div>
                    </div>
        `
        }
        notesDiv.innerHTML = filterHTML;
    }
}

var search = document.getElementById("search-element");

search.addEventListener("click",filterNotes);



function deleteNotes(){
    let deletednotesHTML = '';
    let deletenotes = localStorage.getItem('deletenotes');
    if(deletenotes === null){
        return;
    }else{
        deletenotes = JSON.parse(deletenotes);
    }
    for(let i = 0; i<deletenotes.length; i++){
        deletednotesHTML += `<div class="deletnote">
                        <div class="title">${deletenotes[i].title}</div>
                        <div class="text">${deletenotes[i].note}</div>
                    </div>
        `
    }
    deletednotesDiv.innerHTML = deletednotesHTML;
}

