class Newuser{
    constructor(id, firstname, lastname, age, currentlevel, favclub){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.currentlevel = currentlevel;
        this.favclub = favclub;
    }
}

class Tablesetting{
    addingTableData(register){
        let list = document.getElementById('table-data');
        let row = document.createElement('tr'); //creating a tr tag
        row.innerHTML = `       
        <td>${register.id}</td>
        <td>${register.firstname}</td>
        <td>${register.lastname}</td>
        <td>${register.age}</td>
        <td>${register.currentlevel}</td>
        <td>${register.favclub}</td>
        <td><button type = "submit" class="btn btn-danger" id="del">DELETE</button></td>    
        `;      //adding the table data (td) into tr.
        list.appendChild(row);     //pushing the tr and td into the table element with the id:table-data.
    }

    deletingTableData(target){
        if(target.id === 'del'){
            target.parentElement.parentElement.remove();
        }
    }

    clearing (){
        document.getElementById('firstname').value = ' ';
        document.getElementById('lastname').value = ' ';
        document.getElementById('yourage').value = ' ';
        document.getElementById('yourlevel').value = ' ';
        document.getElementById('yourclub').value = ' ';
    }

    notification(response, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(response)); //adding text
        let container = document.querySelector('.formstyle');
        let form = document.querySelector('#dataform');
        container.insertBefore(div, form)
        setTimeout(() =>{
            document.querySelector('.alert').remove()
        }, 3000);
    }
}


function submitOperation(e){
    e.preventDefault();
    const id = Date.now().toString();
    firstname = document.getElementById('firstname').value;
    lastname = document.getElementById('lastname').value;
    age = document.getElementById('yourage').value;
    currentlevel = document.getElementById('yourlevel').value;
    favclub = document.getElementById('yourclub').value; 

    const json = JSON.stringify(new Newuser(id, firstname, lastname, age, currentlevel, favclub));
    let register = JSON.parse(json);
    const tablesetting = new Tablesetting();
    if (firstname === '' || lastname === '' || age === '' || currentlevel === '' || favclub === ''){
        tablesetting.notification('Please fill in the fields', 'error');
    }else{
        tablesetting.addingTableData(register);
        tablesetting.notification('Registration successful..','success');
        tablesetting.clearing();
    }
}

document.getElementById('dataform').addEventListener('submit', submitOperation);


function deleteFunction(e){
    e.preventDefault();
    const tablesetting = new Tablesetting();
    tablesetting.deletingTableData(e.target);
}
document.getElementById('table-data').addEventListener('del', deleteFunction)