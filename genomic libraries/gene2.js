//defines the function createlist
function createList(data1){
    console.log(data1)
    //creates a variable that contains list of all the ids from the fetch that has taken place
    const data2 = data1.esearchresult.idlist
    console.log(data2)
    //jois all the ids by separating them with a ',' into a list
    const data3 = data2.join(",")
    console.log(data3)
    //creates a variable for the url which takes all the id list and to get the data o those ids
    const apiurl2 = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=${data3}&retmode=json&`
    console.log(apiurl2)

    //an if statement which removes any element with the id selectassembly
    if(document.getElementById("selectAssembly")!== null){
        document.getElementById("selectAssembly").remove()
    }

    //fetches data from the url listed above to get a promise
    fetch(apiurl2)
    //takes the json data recieved and converts them into a readable format
    .then(resp3 =>{
        return resp3.json()
    })
    .then(data6=>{
        console.log(data6)
        //takes the readable data and creates a copy of the results section
        const dataAssembly = { ...data6.result}
        //deletes the uids element of the list
        delete dataAssembly.uids
        console.log(dataAssembly)
        //converts the object to an array
        const dataAssembly1 = Object.values(dataAssembly)

        //fucntion to arrange dataes in descending order.. 
        function sortDate(a,b){
            return new Date(a.asmupdatedate) - new Date(b.asmupdatedate)
        }
        //variable to sort data
        const dataAssembly2 = dataAssembly1.sort(sortDate)
        //variable to contain uids of from array where curly braces select uid from array and make a separate array.. function defined in map function
        const uids = dataAssembly2.map(({uid})=> (uid))
        console.log(uids)

        console.log(data6)
        //get div idform
        const idForm = document.getElementById("idForm")
        //creates the select element
        const assemblySelect = document.createElement("select")
        //assigns id selectassembly to the select list
        assemblySelect.id = `selectAssembly` 
        //appends the list to div
        idForm.appendChild(assemblySelect)
        

        // const assemblySelect = document.getElementById("")
        //for function to insert the ids list in the sleect list
        for(i in uids){
            //variable to sleect the id used
            const uidInt1 = uids[i]
            //varaible to access list
            const uidInt = data6.result[uidInt1]
            //variable that contains all the info needed in a line. text wortten usin`` and ${}
            const label = `UID ${uids[i]} Date ${uidInt.asmupdatedate} Assemblyname ${uidInt.assemblyname} Specie ${uidInt.organism}`
            //assisns the label and value to the sleect element and cretaes object
            assemblySelect.options[assemblySelect.options.length]= new Option(label, uids[i])
        }

        dataAssembly2.forEach( (uidInt) => {
            console.log(uidInt)
            console.log(`UID ${uidInt.uid} Date ${uidInt.asmupdatedate} Assemblyname ${uidInt.assemblyname} Specie ${uidInt.organism}`)
        }
        )

        //function defined for eventlistener to add the new data needed based on changes made to the list
        function handleChange(event){
            //sleects value of my sleect list
            const uid1 = event.target.value
            //variable that contains the data needed to be displayed
            const data7 = data6.result[uid1].submitterorganization
            //displays data in html
            document.getElementById("dataContainer").innerHTML=data7
        }
        //adds event listener where every change leads to function defined
        assemblySelect.addEventListener("change", handleChange)
    })

}

//defines the function fetchdata which is activated by the on click button in html
function fetchdata(){
    //creates a variable which contains the input text inserted by the user in the textbox in html
    const inputText = document.getElementById("inputtext").value 

    //creates the div into a variable to be used later
    const idForm = document.getElementById("idForm")

    //creates variable of the dic where i want the data to be shown
    const dataContainer = document.getElementById("dataContainer")

    //defines the variable which would contain the url used to fetch the list of ids of genome asseblies and their data. input text written is used to insert an text which maybe written
    const apiurl1 = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=${inputText}&retmode=json&retmax=10000`

    //fetch function which sends a request to the url listed and fetches a promise
    fetch(apiurl1)
    //then function which takes the promise gotten back and converts it from a json to a readable format
    .then(resp =>{
        return resp.json()
    })
    //proceeds to use function createlist on the promise 
    .then(createList)
}

