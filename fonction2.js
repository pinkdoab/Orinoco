let XHR = new XMLHttpRequest()
let url = "http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061"

XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let camera = JSON.parse(this.responseText)
        console.log(camera);
        let section = document.querySelector('section')
        DessineCarteCamera(section, camera)
    }
}

XHR.open("GET", url, true);
XHR.send();


function DessineCarteCamera(section, camera) {

    /*div class="col align-self-center">
        <div class="card">
            <img class="card-img-top" src="images/logo.png" alt="">
            <div class="card-body">
                <h5 class="card-title">Name</h5>
                <p class="card-text">price</p>
                <a href="#" class="stretched-link"></a>
            </div>
        </div>
    </div>
    */

    let elementDivCol = document.createElement('div')
    elementDivCol.className = 'col-8 align-self-center'

    let elementDivCard = document.createElement('div')
    elementDivCard.className = 'card'

    let elementImg = document.createElement('img')
    elementImg.className = 'card-img-top'
    elementImg.setAttribute("src", camera['imageUrl']);

    let elementDivCardBody = document.createElement('div')
    elementDivCardBody.className = 'card-body'    

    let elementH5 = document.createElement('h5')
    elementH5.className = 'card-title'
    let nomH5 = document.createTextNode(camera['name'])
    elementH5.appendChild(nomH5)

    let elementPrice = document.createElement('p')
    elementPrice.className = 'card-text'
    let nomPrice = document.createTextNode(camera['price'] + '€')
    elementPrice.appendChild(nomPrice)


    elementDivCol.appendChild(elementDivCard)
    elementDivCard.appendChild(elementImg)
    elementDivCard.appendChild(elementDivCardBody)    
    elementDivCardBody.appendChild(elementH5)
    elementDivCardBody.appendChild(elementPrice)

    section.appendChild(elementDivCol)
}