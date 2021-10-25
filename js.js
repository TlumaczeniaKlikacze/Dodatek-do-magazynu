
let input_1
let input_2
let input_3

function work() {
    let used
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

    let all = 0;
    let tmp_number = 0;
    let tmp_hold_array = used_inputs_array
    let highestToLowest_array_of_weight = array_weigth.sort((a, b) => b-a);
    let highestToLowest_inputs = used_inputs_array.sort((a, b) => parseInt(b.value)-parseInt(a.value));
    for(let b = 0;b<highestToLowest_inputs.length;b++){
        tmp_number = 0
        used = []
        let tmp = highestToLowest_inputs[b].value
        if(highestToLowest_inputs[b].value > eryka_waga){
            highestToLowest_inputs[b].element.style.backgroundColor = 'red'
        }
        for(let x = 0;x<highestToLowest_array_of_weight.length;x++){
            if(Math.sign((tmp- highestToLowest_array_of_weight[x])) != -1){
                tmp = tmp  - highestToLowest_array_of_weight[x]
                used.push(highestToLowest_array_of_weight[x])
            }

        }
        used.forEach(e=>{
            tmp_number +=e
        })
        if(tmp_number != highestToLowest_inputs[b].value){
            highestToLowest_inputs[b].element.style.backgroundColor = 'red'
        }else{
            highestToLowest_inputs[b].element.style.backgroundColor = 'green'
        }


        for(let n =0; n<used.length;n++){
            if(highestToLowest_array_of_weight.indexOf(used[n])>-1)
            highestToLowest_array_of_weight.splice(highestToLowest_array_of_weight.indexOf(used[n]),1)
        }
        all+=highestToLowest_inputs[b].value
        if(highestToLowest_inputs[b].value > eryka_waga){
            highestToLowest_inputs[b].element.style.backgroundColor = 'red'
        }
    }
    if(all !=result_weigth){
        tmp_hold_array.forEach(e => {
            e.element.style.backgroundColor = 'red'
        });
    }


}
document.addEventListener('keyup', work)

