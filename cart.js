console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicCartSection(ob,amount)
{
    let cartContainer = document.getElementById('cartContainer')

    let boxContainerDiv = document.createElement('div')
    boxContainerDiv.id = 'boxContainer'

    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    // let h3Text = document.createTextNode(ob.name + '×' + 1)
    let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: Rs' + ob.price)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    // console.log(boxContainerDiv);
    let totalContainerDiv = document.createElement('div')
    totalContainerDiv.id = 'totalContainer'

    let totalDiv = document.createElement('div')
    totalDiv.id = 'total'
    totalContainerDiv.appendChild(totalDiv)

    let totalh2 = document.createElement('h2')
    let h2Text = document.createTextNode('Total Amount')
    totalh2.appendChild(h2Text)
    totalDiv.appendChild(totalh2)

    let totalh4 = document.createElement('h4')
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'
    totalDiv.appendChild(buttonDiv)

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)
  
    let buttonLink = document.createElement('a')
    buttonLink.href = '/orderPlaced.html?'
    buttonTag.appendChild(buttonLink)

    buttonText = document.createTextNode('Place Order')
    buttonTag.onclick = function()
    {
        console.log("clicked")
    }

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)

    return cartContainer
}

//dynamicCartSection()

// console.log(dynamicCartSection());

let httpRequest = new XMLHttpRequest()
let totalAmount = 0
httpRequest.onreadystatechange = function()
{
    if(this.readyState === 4)
    {
        if(this.status == 200)
        {
            // console.log('call successful');
            contentTitle = JSON.parse(this.responseText)

            let counter = Number(document.cookie.split(',')[1].split('=')[1])
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

            let item = document.cookie.split(',')[0].split('=')[1].split(" ")
            console.log(counter)
            console.log(item)

            let i;
            let totalAmount = 0

            for(i=1; i<=counter; i++)
            {
                totalAmount += Number(contentTitle[item[i-1]-1].price)
                dynamicCartSection(contentTitle[item[i-1]-1],totalAmount)
            }                  
        }
    }
        else
        {
            console.log('call failed!');
        }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
httpRequest.send()





