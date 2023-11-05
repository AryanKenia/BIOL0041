function show(event){
    console.log(event)
    console.log(event.target)
    console.log(document.getElementById("test"))
}


const test = document.getElementById("test")
test.addEventListener("change",show)