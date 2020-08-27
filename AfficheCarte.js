// ________________________________________________________________
// Appel de TOUS les produits du catalogue JSON pour les afficher

function AfficheCatalogue(catalogue_JSON) {
    if (catalogue_JSON.length == 0) {throw 'AfficheCarte.js : catalogue_JSON vide'}             // test
    for (let camera in catalogue_JSON) {
        AfficheCarteCameraPetitFormat(catalogue_JSON[camera])
    }
}
// ________________________________________________________________
// Affiche un produit sous forme de carte
function AfficheCarteCameraPetitFormat(camera) {

    let elementDivCol = document.createElement('div')           //  <div class="col-4" style="padding: 10px;">
    elementDivCol.className = 'col-4 carte_padding'

    let elementDivCard = document.createElement('div')          //      <div class="card">
    elementDivCard.className = 'card'
    elementDivCol.appendChild(elementDivCard)

    let elementImg = document.createElement('img')              //          <img class="card-img-top" src="images/logo.png">
    elementImg.className = 'card-img-top'
    elementImg.setAttribute("src", camera['imageUrl']);
    elementDivCard.appendChild(elementImg)

    let elementDivCardBody = document.createElement('div')      //          <div class="card-body">
    elementDivCardBody.className = 'card-body'
    elementDivCard.appendChild(elementDivCardBody)    

    let elementH5 = document.createElement('h5')                //              <h5 class="card-title">Name</h5>
    elementH5.className = 'card-title'
    let nomH5 = document.createTextNode(camera['name'])
    elementH5.appendChild(nomH5)
    elementDivCardBody.appendChild(elementH5)

    let elementPrice = document.createElement('p')              //              <p class="card-text">price</p>
    elementPrice.className = 'card-text'
    let prixEuro = camera['price']/100
    let nomPrice = document.createTextNode(prixEuro + ' €')
    elementPrice.appendChild(nomPrice)
    elementDivCardBody.appendChild(elementPrice)

    let elementLien = document.createElement('a')               //              <a class="stretched-link" href="produit.html?id=123456789"></a>
    elementLien.className = 'stretched-link'
    elementLien.setAttribute('href', "produit.html?id=" + camera['_id'])
    elementDivCardBody.appendChild(elementLien)

    let section = document.querySelector('section')
    section.appendChild(elementDivCol)
}

// ________________________________________________________________
function AfficheCarteCameraGrandFormat(camera) {

    let elementDivCol = document.createElement('div')               //  <div class="col-8 align-self-center">
    elementDivCol.className = 'col'

    let elementDivCard = document.createElement('div')              //      <div class="card">
    elementDivCard.className = 'card'
    elementDivCol.appendChild(elementDivCard)

    let elementImg = document.createElement('img')                  //          <img class="card-img-top" src="images/logo.png">
    elementImg.className = 'card-img-top'
    elementImg.setAttribute("src", camera['imageUrl']);
    elementDivCard.appendChild(elementImg)

    let elementDivCardBody = document.createElement('div')          //          <div class="card-body">
    elementDivCardBody.className = 'card-body'
    elementDivCard.appendChild(elementDivCardBody)    

    let elementH2 = document.createElement('h2')                    //              <h2 class="card-title">Name</h5>
    elementH2.className = 'card-title'
    let nomH2 = document.createTextNode(camera['name'])
    elementH2.appendChild(nomH2)
    elementDivCardBody.appendChild(elementH2)

    let elementH5 = document.createElement('h5')                    //              <h5 class="card-title">Objectif</h5>
    elementH5.className = 'card-title'

    let motif = /.*obj.*/ig
    let menuNb
    if (motif.test(window.location.search)) {
        let motif = /[^.*obj=]$/ig
        menuNb = motif.exec(window.location.search)
        let boutonChoixProduit = document.getElementById('boutonChoixProduit')
        boutonChoixProduit.classList.remove("disabled")
        boutonChoixProduit.innerHTML = 'Enregistrez ce produit dans votre panier'

        let nomH5 = document.createTextNode(camera['lenses'][menuNb])
        elementH5.appendChild(nomH5)
        elementDivCardBody.appendChild(elementH5)
    }

    let elementCommentaire = document.createElement('p')            //              <p class="card-text">description</p>
    elementCommentaire.className = 'card-text'
    let nomCom = document.createTextNode(camera['description'])
    elementCommentaire.appendChild(nomCom)
    elementDivCardBody.appendChild(elementCommentaire)


    let elementPrice = document.createElement('p')                  //              <p class="card-text">price €</p>
    elementPrice.className = 'card-text'
    let prixEuro = camera['price']/100
    let nomPrice = document.createTextNode(prixEuro + ' €')
    elementPrice.appendChild(nomPrice)
    elementDivCardBody.appendChild(elementPrice)

    let section = document.querySelector('section')
    section.appendChild(elementDivCol)
}
// ________________________________________________________________
function AffichePanier(panier, page) {
    
    let boutonEffaceProduit
    let total = 0
    if (panier != null && panier.length > 0) {                                          // test
        for (let index = 0; index < panier.length; index++) {        
            let elementTr = document.createElement('tr')

            let elementTd1 = document.createElement('td')
            let elementId1 = document.createTextNode(panier[index][0])
            elementTd1.appendChild(elementId1)
            elementTr.appendChild(elementTd1)

            let elementTd2 = document.createElement('td')
            let element = document.createTextNode(panier[index][2])
            elementTd2.appendChild(element)
            elementTr.appendChild(elementTd2)

            let elementTd3 = document.createElement('td')
            let prix = panier[index][1] /100 + ' €'
            let elementPrix = document.createTextNode(prix)
            elementTd3.appendChild(elementPrix)
            elementTr.appendChild(elementTd3)

            if (page == 'produit' ) {
                let elementTd4 = document.createElement('td')
                let bouton = document.createElement('button')               //  <div class="col-8 align-self-center">
                bouton.className = 'btn btn-primary interactiveBouton'
                let idBouton = "idBouton" + index
                bouton.id = idBouton
                let textebouton = document.createTextNode("Effacer le produit")
                bouton.appendChild(textebouton)
                elementTd4.appendChild(bouton)
                elementTr.appendChild(elementTd4)                       
            }

            let tbody = document.querySelector('tbody')
            tbody.appendChild(elementTr)
            total += panier[index][1]
        } 
        let texte = document.createTextNode('Prix total : ' + total/100 + ' €')
        let h5 = document.querySelector('h5')
        h5.appendChild(texte)

        var theButtons = document.querySelectorAll('.interactiveBouton')
        for (let i = 0; i < theButtons.length; i++) {
            theButtons[i].addEventListener('click', function () {
                let liste = JSON.parse(localStorage.getItem('panierLocal'))
                if (liste != 0) {
                    liste.splice(theButtons[i].id.substring(8), 1)
                    localStorage.setItem("panierLocal",JSON.stringify(liste))
                    location.reload()
                }
            });
        }
    } else {
        throw 'AfficheCarte.js : panier est vide'                                                 // test
    }
}
// ________________________________________________________________
function CreaMenuOption(produit) {
    if (produit.length == 0) {throw 'AfficheCarte.js : produit vide'}                             // test
    let elementChoix = []
    if (produit['lenses'].length == 0) {throw 'AfficheCarte.js : produit[\'lenses\'] vide'}       // test
    for (let index = 0; index < produit['lenses'].length; index++) {
        elementChoix = document.createElement('a')
        elementChoix.className = 'dropdown-item'
        elementChoix.id = 'menu' + index
        elementChoix.setAttribute('href', 'produit.html' + "?id=" + produit['_id'] + '?obj=' + index)
        elementChoix.appendChild(document.createTextNode(produit['lenses'][index]))

        document.querySelector('.menu_objectif').appendChild(elementChoix)
    }
}
// ________________________________________________________________
function AfficheIdCommande() {
    let id = JSON.parse(localStorage.getItem('confirmation'))
    document.querySelector('h4').innerHTML = id.orderId
}
// ________________________________________________________________
