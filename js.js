


const fun = ()=>{
    //pobieramy tabele
let eryka_waga = 31500
let table = document.querySelector(".yui-dt-data").getElementsByTagName("tr")//tabelka i elementy
let result_weigth =0;
let temporary = undefined
let number = 0
for(let i=0 ;i<table.length;i++){
    // console.log(document.querySelector(".yui-dt-data").getElementsByTagName("tr")[i])
    // console.log(document.querySelector(".yui-dt-data").getElementsByTagName("tr")[i].getElementsByTagName('td'))

    let tmp = document.querySelector(".yui-dt-data").getElementsByTagName("tr")[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('span')
    let tmp2 = document.querySelector(".yui-dt-data").getElementsByTagName("tr")[i].getElementsByTagName('td')[3].getElementsByTagName('div')[0].getElementsByTagName('span')
    for(let _=0; _<tmp.length;_++){
        if(tmp[_].innerHTML.includes('Waga')){
            temporary = tmp[_].innerHTML.split(":")[1]
            if(temporary.includes('g'))
            temporary = temporary.replace('g',"")
            if(temporary.includes('kg'))
            temporary = temporary.replace('kg',"")

            console.log(temporary) //--> mamy wage
        }
    }
    console.log(tmp2.length)
    for(let __ = 0 ;__<tmp2.length;__++){
        if(tmp2[__].innerHTML.includes('szt.')){
            number = tmp2[__].innerHTML.split('szt.')[0]
            result_weigth += number *temporary
        }
    }
}
console.log(result_weigth)

let table2 = document.querySelector("#packagesTable").getElementsByTagName("tr")
console.log(table2.length)
let input_1 = undefined
let input_2 = undefined
for(let j=0;j<table2.length;j++){
    if(table2[j].className == ""){
        for(let z=0;z<table2[j].getElementsByTagName('td').length;z++){
            if(table2[j].getElementsByTagName('td')[z].className == "text "){
                if(table2[j].getElementsByTagName('td')[z].getElementsByTagName('div')[1] != undefined){
                    input_1 = table2[j].getElementsByTagName('td')[z].getElementsByTagName('div')[1].getElementsByTagName('form')[0].getElementsByTagName('input')[0].value
                    input_2 = table2[j].getElementsByTagName('td')[z].getElementsByTagName('div')[1].getElementsByTagName('form')[0].getElementsByTagName('input')[2].value
                    /*tutaj reszte logigiigigigigigigigiig
                    */
         
                    if(input_1 >eryka_waga || input_2 > eryka_waga|| input_1>result_weigth||input_2>result_weigth){
                      table2[j].getElementsByTagName('td')[z].style.backgroundColor="red"
                    }else{
                       table2[j].getElementsByTagName('td')[z].style.backgroundColor="green"
                    }
                }
                

            }
        }
    }
 
}
}

document.addEventListener('click',()=>{
    fun()
    })