//defines the function retrievechr
function retrieveChr(data){
    console.log(data)
    
    //creates a variable uid to store the gene id result for the url afterwards
    const uid = data.result.uids[0]
    
    //if statement which says that if the length of uid is 0 which means the id inserted is wrong then raise an alert
    if(data.result.uids.length === 0){
        throw "Gene ID Not Avaliable"
    }
    console.log(uid)
    
    //creates a variable genomicinfo which contains all data till genomic info to save time while accessing chr id etc
    const genomicInfo = data.result[uid].genomicinfo[0]
    
    //if function for if there is no genomic info which means no info on chromosome then raise an alert
    if(data.result[uid].genomicinfo.length === 0){
        throw "Genomic Info Not Avaliable"
    }
    console.log(genomicInfo)
    
    //uses genomic info oath and accesses each cromosome id, start position and end position and puts all of them in a separate variable
    const chraccver = genomicInfo.chraccver
    const chrstart = genomicInfo.chrstart
    const chrstop = genomicInfo.chrstop
    console.log(chraccver)
    
    //defines a variable that uses cromosome id etc in the url link
    const apiUrl2 = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sequences&id=${chraccver}&seq_start=${chrstart}&seq_stop=${chrstop}&rettype=fasta`;
        
    //fetches data from the eq database in url mentioned with the particular chr data and start and end points    
    fetch(apiUrl2)
    //uses the promise created and converts fasta to readable text        
    .then(response2 => {
                return response2.text()
            })
            //uses the text and performs editing
            .then(data3 => {
                console.log(data3)
                // variable created where every line is a different element of an array
                const modData3 = data3.split("\n")
                //slices the array so the first line is removed
                const modData4 = modData3.slice(1)
                //joins the rest of the lines with each elemnt being on a different line
                const modData5 = modData4.join("\n")
                console.log(modData3)
                console.log(modData4)
                //pastes the data in the genedatcontainer div on the html
                document.getElementById("geneDataContainer").innerHTML=modData5
            })
        }
//defines function that converts the json response into readable format
function manageResponse(resp) {
    console.log(resp)
    return resp.json();
}

// defining the function that was mentioned in the button on html
function fetchgenedata() {
    //comment accessing my id from html..document
    const geneId = document.getElementById("inputgene").value;
    //if function to show that if geneid is not numeric then raise an alert.. also return ends the function
    if(isNaN(geneId)){
        alert("Enter Numeric Values Only")
        return
    }
    
    //gets the item genedatacontainer from html into the variable genedatacontainer
    const geneDataContainer = document.getElementById("geneDataContainer");

    // apiurl variable that contains url of my required page, ${}is used to access particular element and here its geneid
    const apiUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=${geneId}&retmode=json`;    

    // sends a request to the url and returns with a promise
    fetch(apiUrl)
    
    // takes the promise and executes function manage response    
    .then(manageResponse)
    
    // takes promise from manageresponse and uses function retrievechr    
    .then(retrieveChr)
    
    //catches any errors that takes place and raises an alert    
    .catch(error => {
            alert(error)
        })
    }