function createList(data1){
    console.log(data1)
    const data2 = data1.esearchresult.idlist
    console.log(data2)
    const data3 = data2.join(",")
    console.log(data3)
    const apiurl2 = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=${data3}&retmode=json&`
    console.log(apiurl2)

    if(document.getElementById("selectAssembly")!== null){
        document.getElementById("selectAssembly").remove()
    }

    fetch(apiurl2)
    .then(resp3 =>{
        return resp3.json()
    })
    .then(data6=>{
        console.log(data6)
        const dataAssembly = data6.result
        delete dataAssembly.uids
        console.log(dataAssembly)
        const dataAssembly1 = Object.values(dataAssembly)

        function sortDate(a,b){
            return new Date(a.asmupdatedate) - new Date(b.asmupdatedate)
        }
        console.log(dataAssembly1.sort(sortDate))

        const uids = data6.result.uids
        const idForm = document.getElementById("idForm")
        const assemblySelect = document.createElement("select")
        assemblySelect.id = `selectAssembly` 
        idForm.appendChild(assemblySelect)
        

        // const assemblySelect = document.getElementById("")
        for(i in uids){
            const uidInt1 = data6.result.uids[i]
            const uidInt = data6.result[uidInt1]
            const label = `UID ${data6.result.uids[i]} Date ${uidInt.asmupdatedate} Assemblyname ${uidInt.assemblyname} Specie ${uidInt.organism}`
            assemblySelect.options[assemblySelect.options.length]= new Option(label, uids[i])
        }

        function handleChange(event){
            const uid1 = event.target.value
            const data7 = data6.result[uid1].submitterorganization
            document.getElementById("dataContainer").innerHTML=data7
        }
        
        assemblySelect.addEventListener("change", handleChange)
    })

}


function fetchdata(){
    const inputText = document.getElementById("inputtext").value 

    const idForm = document.getElementById("idForm")

    const dataContainer = document.getElementById("dataContainer")

    const apiurl1 = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=${inputText}&retmode=json&retmax=10000`

    fetch(apiurl1)
    .then(resp =>{
        return resp.json()
    })
    .then(createList)
}

// how map works
// function returnHello(ab){
// 	return "Hello"+" "+ ab
// }
// const a = ["Aryan", "Manu"]
// const d = [{Name:"Aryan", Age:21},{Name:"Manu", Age:31}]
// const b = a.map(returnHello)
// const c = a.map((abc)=>{
// return "Hello "+ abc
// })
// function returnHey (nameObject){
// 	return "Hey "+ nameObject.Age
// }
// const e = d.map((personObject)=>{
// 	return "Hey "+ personObject.Name
// })
// /* const [aryan, manu] = d
// console.log(aryan)
// const {Name, Age} = aryan; */

// const h = d.map(({Name})=> {
// 	return "Hey "+ Name
// } )
// console.log(h)