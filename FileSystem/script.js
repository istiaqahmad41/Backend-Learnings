const fs  = require ("fs");

//--->> writeFile(file,data,[,options],callback)
 fs.writeFile("note.txt","welcome to the nodejs!",function(err){
          

     if(err) {console.error(err);}
     else {console.log("done");}
     
}); 

//--->> appendFile(file,data,[,options],callback)
fs.appendFile("note.txt"," Learning backend day by day",function(err){
          

     if(err) {console.error(err);}
     else {console.log("done");}
     
}); 

//--->> appendFile(oldpath,newpath,callback)
 fs.rename("note.txt","new_note.txt",function(err){
          if(err)console.error(err);
          else console.log("name change done!")
}) 

fs.copyFile("new_note.txt",'./copy/copyFile.txt',function(err){
    if(err) console.error(err);
    else console.log("copy file is done!")
});

 fs.unlink("./copy/copyFile.txt",function(err){
    if(err)console.error(err);
    else console.log("unlink done")
})

//delete a folder which has nothing inside of it
fs.rmdir("./emptyFolder",function(err){
    if(err)console.error(err);
    else console.log("deleted")
})


// rm can remove a folder which has other files inside of it
fs.rm("./test",{recursive: true},function(err){
    if(err)console.error(err);
    else console.log("deleted")
})

   
// reading the data inside a file
fs.readFile('note.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

//creating a folder
const folderPath = './myNewFolder'; 

fs.mkdir(folderPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating folder:', err);
  } else {
    console.log('Folder created successfully!');
  }
});

