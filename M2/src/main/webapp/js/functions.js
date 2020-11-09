function validaFormulario(){
    let nomeObra = document.getElementById("nomeObra");
    let autorObra = document.getElementById("autorObra");
    let anoObra = document.getElementById("anoObra");
    let detalheObra = document.getElementById("detalheObra");
    
    let periodoObra = document.cadastroObra.periodoObra;
    let tipoObra = document.getElementById("tipoObra");
    
    let divError = document.getElementById("messageError");
    
    let retorno = false;
    
    divError.innerHTML = "";
    
    divError.innerHTML+= "<br><lu>";
    
    if(nomeObra.value.length < 6){
        divError.innerHTML+= "<li>O nome da obra deve conter no minimo 6 caracteres</li>";
        retorno = true;
        nomeObra.style.border = "2px solid red";
    }
    
    if(autorObra.value.length < 10){
        divError.innerHTML+= "<li>O nome do autor da obra deve conter no minimo 10 caracteres</li>";
        retorno = true;
        autorObra.style.border = "2px solid red";
    }
    
    if(anoObra.value.length == 0 || isNaN(anoObra.value)){
        divError.innerHTML+= "<li>O ano da obra deve ser um número valido</li>";
        retorno = true;
        anoObra.style.border = "2px solid red";
    }
    
    let checkbox = true;
    
    for(let i=0; i < periodoObra.length; i++){
        if(periodoObra[i].checked){
            checkbox = false;
            break;
        }
    }
    
    if(checkbox){
        divError.innerHTML+= "<li>Selecione um periodo para a obra</li>";
        document.getElementById("ac").style.border = "2px solid red";
        document.getElementById("dc").style.border = "2px solid red";
        retorno = true;
    }
    
    if(tipoObra.options[tipoObra.selectedIndex].value == "null"){
        divError.innerHTML+= "<li>Selecione um tipo para a obra</li>";
        retorno = true;
        tipoObra.style.border = "2px solid red";
    }
    
    divError.innerHTML+= "</lu><br>";
    
    if(retorno)
        return;
    
    cadastraObra();
};


function limpaStyle(){  
    document.getElementById("nomeObra").style.border = "";
    document.getElementById("autorObra").style.border = "";
    document.getElementById("anoObra").style.border = "";
    document.getElementById("detalheObra").style.border = "";
    document.getElementById("tipoObra").style.border = "";
    document.getElementById("ac").style.border = "";
    document.getElementById("dc").style.border = "";
}

function cadastraObra(){
    let nomeObra = document.getElementById("nomeObra");
    let autorObra = document.getElementById("autorObra");
    let anoObra = document.getElementById("anoObra");
    let detalheObra = document.getElementById("detalheObra");
    let periodoObra = document.cadastroObra.periodoObra;
    let tipoObra = document.getElementById("tipoObra");
    
    
    let tr = document.createElement("tr");
    
    let td = document.createElement("td");
    let texto = document.createTextNode(nomeObra.value);
    
    td.appendChild(texto);
    tr.appendChild(td);
    
    td = document.createElement("td");
    texto = document.createTextNode(autorObra.value);
    td.appendChild(texto);
    tr.appendChild(td);
    
    td = document.createElement("td");
    texto = document.createTextNode(anoObra.value);
    td.appendChild(texto);
    tr.appendChild(td);
    
    td = document.createElement("td");
    for(let i=0; i < periodoObra.length; i++){
        if(periodoObra[i].checked){
            if(i == 0){
                texto = document.createTextNode("d.C");
            }else{
                texto = document.createTextNode("a.C");
            }
            break;
        }
    }
    td.appendChild(texto);
    tr.appendChild(td);
    
    td = document.createElement("td");
    texto = document.createTextNode(tipoObra.options[tipoObra.selectedIndex].value);
    td.appendChild(texto);
    tr.appendChild(td);
    
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Excluir";
    deleteButton.addEventListener("click",function(){
        
        if(!window.confirm("Voce deseja deletar esta arte ?"))
            return;
        
        let tr=this.parentElement;
        let index=tr.rowIndex;
        let tBody=tr.parentElement;
        let table=tBody.parentElement;
        table.deleteRow(index);
    });
    
    tr.appendChild(deleteButton);
    
    tr.value = detalheObra.value;
    
    tr.addEventListener("click", function(){
        
        if(document.getElementById(tr.rowIndex.toString()) != null)
            return;
        
        let detalhe = document.createElement("label");
        detalhe.id = tr.rowIndex;
        detalhe.innerHTML = tr.value;
        tr.appendChild(detalhe);
    });

    
    let table = document.getElementById("tabelaArtes");
    table.appendChild(tr);
}