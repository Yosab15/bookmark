var bookmarkname = document.getElementById("bookmarkname");
var bookmarkurl = document.getElementById("bookmarkurl");
var patternurl = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}/;
var patternname = /^[a-zA-Z0-9]{3,}$/
var bookmarklist = [];
function addbookmark() {
    if (validbookmarkname() && validbookmarurl()) {
        var repeated = false;
        for (var i = 0; i < bookmarklist.length; i++) {
            if (bookmarklist[i].name.toLowerCase() == bookmarkname.value.toLowerCase()) {
                repeated = true;
                break;
            }
        }
        if (repeated) {
            swal({
                title: "Site Name is already exist, Please enter another name",
                text: "Site name must be unique",
                icon: "error",
                });
            // swal("Site Name is already exist, Please enter another name", "Site name must be unique", "error");
            return;
        }
        
        var bookmark = {
            name: bookmarkname.value,
            url: bookmarkurl.value
        };
        bookmarklist.push(bookmark);
        diaplaybookmark(bookmarklist);
        localStorage.setItem("bookmarklist", JSON.stringify(bookmarklist));
        clearbookmark();
    }
    else {
        console.log("error");
        swal({
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: "Site name must contain at least 3 characters....and Url must be valid",
            icon: "error",
          });
        // swal("Site Name or Url is not valid, Please follow the rules below :",  "Site name must contain at least 3 characters", "error");
    }
}
function diaplaybookmark(list) {
    var cartona = "";
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
        <td>   
            ${i + 1}
        </td>
        <td>   
            ${list[i].name}
        </td>
        <td>   
            <button class="btn btn-warning" onclick='visiturl(${i})'> 
            <i class="fa-solid fa-eye" style="color: #ffffff;"></i> visit</button>
        </td>
        <td>   
            <button class="btn btn-danger" onclick='deletbookmark(${i})'>
            <i class="fa-regular fa-trash-can" style="color: #ffffff;"></i>
              delete</button>
        </td>
    </tr>`

    }
    document.getElementById("tbody").innerHTML = cartona;
}
function clearbookmark() {
    bookmarkname.value = "";
    bookmarkurl.value = "";
}
function deletbookmark(index) {
    bookmarklist.splice(index, 1);
    diaplaybookmark(bookmarklist);
    localStorage.setItem("bookmarklist", JSON.stringify(bookmarklist));
}
function visiturl(index) {
    window.open(bookmarklist[index].url);
}
function validbookmarkname() {
    if (patternname.test(bookmarkname.value)) {
      
        bookmarkname.classList.replace("is-invalid", "is-valid");
        return true;

    }
    else {
      
    
        bookmarkname.classList.add("is-invalid");
    }
}
function validbookmarurl() {
    if (patternurl.test(bookmarkurl.value)) {
        
        bookmarkurl.classList.replace("is-invalid", "is-valid");
        return true;

    }
    else {
        
    
        bookmarkurl.classList.add("is-invalid");
    }
}
