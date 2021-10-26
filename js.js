
let input_1
let input_2
let input_3

function work() {
    let used =[]
    let array_weigth = []
    let used_inputs_array = []
    let eryka_waga = 30000
    let table = document.querySelector(".yui-dt-data").getElementsByTagName("tr")//tabelka i elementy
    let result_weigth = 0;
    let temporary = undefined
    let number = 0
    for (let i = 0; i < table.length; i++) {
        let tmp = document.querySelector(".yui-dt-data").getElementsByTagName("tr")[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('span')
        let tmp2 = document.querySelector(".yui-dt-data").getElementsByTagName("tr")[i].getElementsByTagName('td')[3].getElementsByTagName('div')[0].getElementsByTagName('span')
        for (let _ = 0; _ < tmp.length; _++) {
            if (tmp[_].innerHTML.includes('Waga')) {
                temporary = tmp[_].innerHTML.split(":")[1]
                if (temporary.includes('g'))
                    temporary = temporary.replace('g', "")
                if (temporary.includes('kg'))
                    temporary = temporary.replace('kg', "")
            }
        }
        for (let __ = 0; __ < tmp2.length; __++) {
            if(tmp2[__].className =="orderdlistquantity"){
                if(tmp2[__].getElementsByTagName('a')[0] == undefined){
                    if(tmp2[__].innerHTML.includes('szt.')){
                        number = tmp2[__].innerHTML.split('szt.')[0]
                        result_weigth += number * temporary
                        for(let x = 0;x<number;x++){
                            array_weigth.push(parseInt(temporary))
                        }
                    }else if(tmp2[__].innerHTML.includes('ks')){
                        number = tmp2[__].innerHTML.split('ks')[0]
                        result_weigth += number * temporary
                        for(let x = 0;x<number;x++){
                            array_weigth.push(parseInt(temporary))
                        }
                    }else if(tmp2[__].innerHTML.includes('Stk.')){
                        number = tmp2[__].innerHTML.split('Stk.')[0]
                        result_weigth += number * temporary
                        for(let x = 0;x<number;x++){
                            array_weigth.push(parseInt(temporary))
                        }
                    }
                 
                }else{
                    if(tmp2[__].getElementsByTagName('a')[0].innerHTML.includes('szt.')){
                        tmp = tmp2[__].getElementsByTagName('a')[0].innerHTML
                        number = tmp[__].split('szt.')[0]
                        result_weigth += number * temporary
                        for(let x = 0;x<number;x++){
                            array_weigth.push(parseInt(temporary))
                        }
                    }else if(tmp2[__].getElementsByTagName('a')[0].innerHTML.includes('ks')){
                        tmp = tmp2[__].getElementsByTagName('a')[0].innerHTML
                        number = tmp[__].split('ks')[0]
                        result_weigth += number * temporary
                        for(let x = 0;x<number;x++){
                            array_weigth.push(parseInt(temporary))
                        }
                    }else if(tmp2[__].getElementsByTagName('a')[0].innerHTML.includes('Stk.')){
                        tmp = tmp2[__].getElementsByTagName('a')[0].innerHTML
                        number = tmp[__].split('Stk.')[0]
                        result_weigth += number * temporary
                        for(let x = 0;x<number;x++){
                            array_weigth.push(parseInt(temporary))
                        }
                    }
              
                }
            }
        }
    }


  
    let table2 = document.querySelectorAll('#packagesTable')[0].getElementsByTagName('tbody')
    for (let i = 0; i < table2.length; i++) {
        if (table2[i].getElementsByTagName('tr')[2]?.getElementsByTagName('td')[1]?.getElementsByTagName("div")[0]?.getElementsByTagName('form') != undefined) {
            input_1 = table2[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].getElementsByTagName("div")[0].getElementsByTagName('form')[0].getElementsByTagName('input')[0].value
            input_2 = table2[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].getElementsByTagName("div")[0].getElementsByTagName('form')[0].getElementsByTagName('input')[1].value
            input_3 = table2[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].getElementsByTagName("div")[0].getElementsByTagName('form')[0].getElementsByTagName('input')[2].value
            // used_inputs_array.push(parseInt(input_1))//--> inputy które mamy do policzenia


            used_inputs_array.push({
                value:parseInt(input_1),
                element:table2[i].getElementsByTagName('tr')[2]
            })


        
        }
    }

    let tmp_number = 0;
    let highestToLowest_array_of_weight = array_weigth.sort((a, b) => b-a);
    let tmp_ar=[]
    let highestToLowest_inputs = used_inputs_array.sort((a, b) => parseInt(b.value)-parseInt(a.value));
    for(let b = 0;b<highestToLowest_inputs.length;b++){
     
        tmp_ar =[]
        tmp_number = 0
        let tmp = highestToLowest_inputs[b].value
        for(let x =0;x<highestToLowest_array_of_weight.length;x++){
            if(Math.sign((tmp- highestToLowest_array_of_weight[x])) != -1){
                tmp_ar.push(highestToLowest_array_of_weight[x])
                tmp_number +=highestToLowest_array_of_weight[x]
                tmp = tmp  - highestToLowest_array_of_weight[x]
                }
        }
        used.push({ar:tmp_ar,sum:tmp_number,el:highestToLowest_inputs[b].element})
        tmp_ar = []
        tmp_number = 0;
        tmp = highestToLowest_inputs[b].value
        for(let n =highestToLowest_array_of_weight.length-1;n>0;n--){
            if(Math.sign((tmp- highestToLowest_array_of_weight[n])) != -1){
                tmp_ar.push(highestToLowest_array_of_weight[n])
                tmp_number +=highestToLowest_array_of_weight[n]
                tmp = tmp  - highestToLowest_array_of_weight[n]
                }
        }
        used.push({ar:tmp_ar,sum:tmp_number,el:highestToLowest_inputs[b].element})
    }
   
    highestToLowest_inputs.forEach(e=>{
        e.element.style.backgroundColor = "red"
    })
    let good_values = used.filter(e=>{
        let tmp = highestToLowest_inputs.find(el => e.sum == el.value)
        if(tmp != undefined){
            return e
        }
    })
    good_values = good_values.filter(e=>{
        if(e.ar.length != 0)
        return e
    })
    let ready_val = []//inaczej trzeba to posortować
    for(let q=0;q<highestToLowest_inputs.length;q++){
        let tmp_ = good_values.find(e=>e.sum == highestToLowest_inputs[q].value)
        if(tmp_ != undefined)
        ready_val.push(tmp_)
    }

    //potem na ready value operuje
    for(let a=0;a<highestToLowest_inputs.length;a++){
        for(let g=0;g<ready_val.length;g++){
            if(ready_val[g].sum == highestToLowest_inputs[a].value){
                ready_val[g].el = highestToLowest_inputs[a].element
                break
            }
        }
    }
    let sum =0
    let control_ar = []
    for(let p=0;p<ready_val.length;p++){
        control_ar= control_ar.concat(ready_val[p].ar)
        ready_val[p].el.style.backgroundColor = "green"
        sum+=ready_val[p].sum
        if(ready_val[p].sum >eryka_waga){
            ready_val[p].el.style.backgroundColor = "red"
        }
    }
    console.log(sum)
    console.log(result_weigth)
    console.log(ready_val)
    highestToLowest_inputs = highestToLowest_inputs.filter(e=>{
        return e!= 0
    })
    if(sum !=result_weigth){
        highestToLowest_inputs.forEach(e=>{
            e.element.style.backgroundColor = "red"
        })
    }else if(ready_val.length == highestToLowest_inputs.length){
        highestToLowest_inputs.forEach(e=>{
            e.element.style.backgroundColor = "green"
        })
    }else{
        highestToLowest_inputs.forEach(e=>{
            e.element.style.backgroundColor = "red"
        })
    }
}
document.addEventListener('keyup', work)

