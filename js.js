
let input_1
let input_2
let input_3
function work() {
    let eryka_waga = 31500
    let table = document.querySelector(".yui-dt-data").getElementsByTagName("tr")//tabelka i elementy
    let result_weigth = 0;
    let temporary = undefined
    let number = 0
    let tmp;
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
                    }else if(tmp2[__].innerHTML.includes('ks')){
                        number = tmp2[__].innerHTML.split('ks')[0]
                        result_weigth += number * temporary
                    }else if(tmp2[__].innerHTML.includes('Stk.')){
                        number = tmp2[__].innerHTML.split('Stk.')[0]
                        result_weigth += number * temporary
                    }
                 
                }else{
                    if(tmp2[__].getElementsByTagName('a')[0].innerHTML.includes('szt.')){
                        tmp = tmp2[__].getElementsByTagName('a')[0].innerHTML
                        number = tmp[__].split('szt.')[0]
                        result_weigth += number * temporary
                    }else if(tmp2[__].getElementsByTagName('a')[0].innerHTML.includes('ks')){
                        tmp = tmp2[__].getElementsByTagName('a')[0].innerHTML
                        number = tmp[__].split('ks')[0]
                        result_weigth += number * temporary
                    }else if(tmp2[__].getElementsByTagName('a')[0].innerHTML.includes('Stk.')){
                        tmp = tmp2[__].getElementsByTagName('a')[0].innerHTML
                        number = tmp[__].split('Stk.')[0]
                        result_weigth += number * temporary
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
            if (input_1 > result_weigth || input_2 > result_weigth || input_3 > result_weigth  ) {
                if(input_1 > eryka_waga || input_2 > eryka_waga || input_3 > eryka_waga){
                    table2[i].getElementsByTagName('tr')[2].style.backgroundColor = 'red'
                }
                table2[i].getElementsByTagName('tr')[2].style.backgroundColor = 'red'
            } else {
                table2[i].getElementsByTagName('tr')[2].style.backgroundColor = 'green'
                if(input_1 > eryka_waga || input_2 > eryka_waga || input_3 > eryka_waga){
                    table2[i].getElementsByTagName('tr')[2].style.backgroundColor = 'red'
                }
            }
        }
    }
}
document.addEventListener('keyup', work)

