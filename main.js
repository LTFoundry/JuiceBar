console.log("Eureka! We have connectivity!");
getIngredients();

// Get Elements

// Size elements
const sizeChoice = document.getElementById("size");
// Type elements
const drinkType = document.getElementsByName("type");
//const ingredSelect = document.getElementsByClassName();
// Base elements
const milkBase = document.getElementsByName("mBase");
const smoothBase = document.getElementsByName("sBase");
const mBaseDisplay = document.getElementById("milkshakeBase");
const sBaseDisplay = document.getElementById("smoothieBase");
const orderDisplay = document.getElementById("orderDisplay");
const setFav = document.getElementById("setFav");
const orderFav = document.getElementById("orderFav");
const extraSelect = document.getElementById("extrasSelect");
const extraChoice = document.getElementsByName("extras")
const addBtn = document.getElementById("orderAdd");
const currDriDis = document.getElementById("currentDrinkDisplay");
const currOrdDis = document.getElementById("currentOrderDisplay");
const ingredDisplay = document.getElementById("ingredSelect")
const ingredChoice = document.getElementsByName("ingreds")
const placeOrder = document.getElementById("orderPlace");
const displayTotal = document.getElementById("totalCostDisplay");


// Set variables
//Price related variables
let sizePrice = 0;
let extrasCost = 0;
let currentCost = 0;
let totalCost = 0;

//String construction variables
let drinkSize = "Medium";
let drinkTypeString = "";
let drinkIngreds = "";
let drinkExtras = "";
let drinkBase = "";
let currentDrink = "";
let current = "";

//Display variables
let orderDisplayArray = [];
totalClean = false;

//Favourite order Variables
let directory = [];

//Get ingredients variables
let count = 0; //Stops ingredients re-populating if already populated
let reset = false;
// Event Listners
// Size events
sizeChoice.addEventListener("change", setSizePrice);
// // Type events
drinkType.forEach(item => item.addEventListener("change", selectType));
// // Ingredient events
// // Base events
milkBase.forEach(item => item.addEventListener("change", selectBase));
smoothBase.forEach(item => item.addEventListener("change", selectBase));
// // Extras events
extraChoice.forEach(item => item.addEventListener("change", extraAddition));
//Ingredient event
ingredChoice.forEach(item => item.addEventListener("change", ingredAddition));
// // Button events
setFav.addEventListener("click", addFavourite);
window.addEventListener("load", checkDirectory);
orderFav.addEventListener("click", orderFavourite);
// Add Btn events
addBtn.addEventListener("click", addToOrder);
//Place order events
placeOrder.addEventListener("click", orderPlaced);


init();
// Functions
// Easy test function

function testing(){
    console.log("Eureka! We have connectivity!");
}

function init()
{
    //Hides areas of the page tied to user selection
    sBaseDisplay.style.display = "none";
    mBaseDisplay.style.display = "none";
    extraSelect.style.display = "none";
    setSizePrice();
    saveFavBtnChecker()

}

function setSizePrice()
{   
    //Sets size and price of the size upon selection
    let selection = sizeChoice.options[sizeChoice.selectedIndex].value;
    if(selection == "small")
    {
        sizePrice = 2.45;
        drinkSize = "Small";       
    }

    else if(selection == "medium")
    {
        sizePrice = 2.95;
        drinkSize = "Medium"
    }

    else if (selection == "large")
    {
        sizePrice = 3.45;
        drinkSize = "Large";
    }
    currentDrinkDisplay()    
}

function selectType()
{
    // deals with functionality tied to type selection and the display changes
    if (this.value == "smoothie")
    {
        extraSelect.style.display = "none";
        mBaseDisplay.style.display = "none";
        sBaseDisplay.style.display = "block";
        drinkTypeString = "Smoothie";
        //Clears up milkshake selections if user changes to smoothie
        cleanUp(totalClean = false)
    }
    else
    {
        sBaseDisplay.style.display = "none";
        mBaseDisplay.style.display = "block";
        extraSelect.style.display = "block";
        drinkTypeString = "Milkshake"
        //Clears up smoothie section if user changes to milkshake
        cleanUp(totalClean = false)
    }
    saveFavBtnChecker();
    currentDrinkDisplay()   
}

function cleanUp(totalClean)
{ 
    //Resets current drinks variables 
    drinkExtras = "";
    drinkBase = "";
    drinkIngreds = "";
    extrasCost = 0;
    //unchecks tick boxes/radio when not needed anymore
    for (let i = 0; i < extraChoice.length; i++) {
        for (let i = 0; i < milkBase.length; i++) {
            for (let i = 0; i < smoothBase.length; i++) {
                smoothBase[i].checked = false;    
            }
            for (let i = 0; i < ingredChoice.length; i++) {
                ingredChoice[i].checked = false;   
            }
            milkBase[i].checked = false;    
        }
        extraChoice[i].checked = false;   
    }
    //used when add button is used to refresh selection completley
    if(totalClean == true)
    {
        for (let i = 0; i < drinkType.length; i++) {
            drinkType[i].checked = false;
        }
        drinkTypeString = "";
        init();
    }
    if (reset == true) {
        totalCost = 0;
        displayTotal.innerText ="";
        reset = false;
        orderDisplayArray = [];
        currOrdDis.innerText ="";
    }
    saveFavBtnChecker();
    currentDrinkDisplay()  
}

function extraAddition()
{
    //Resets values for string construction
    drinkExtras = "";
    extrasCost = 0;
    //Adds && removes extras cost
    if (this.checked)
    {
        
        drinkExtras = "with extra "
        //Adds names and punctuation to string
        for (let i = 0; i < extraChoice.length; i++) {
            if(extraChoice[i].checked)
            {
                drinkExtras += extraChoice[i].value;
                drinkExtras += ", ";
                extrasCost += 0.5;
            }        
        }   
        currentCost += extrasCost;
        drinkExtras = drinkExtras.substring(0, drinkExtras.length - 2);
        drinkExtras += " and "
    }
    currentDrinkDisplay();
}

function ingredAddition()
{
    //Constructs the ingredients part of the string
    drinkIngreds = "";   
    for (let i = 0; i < ingredChoice.length; i++) {
        if(ingredChoice[i].checked)
        {
            drinkIngreds += ingredChoice[i].value;   
            drinkIngreds += ", ";
        }           
    }    
    drinkIngreds = drinkIngreds.substring(0, drinkIngreds.length - 2);
    saveFavBtnChecker();
    currentDrinkDisplay();  
}

function selectBase()
{
    //selects and adds base to current drink order
    drinkBase = " with a base of " + this.value;
    saveFavBtnChecker();
    currentDrinkDisplay()
}

function addToOrder()
{
    //construct && push current drink string to current order array
    totalCost += currentCost;
    orderDisplayArray.push(current + currentCost);
    currentOrderDisplay()
    //clears variables for new drink  
    cleanUp(totalClean = true); 
    displayTotal.innerText = "Total Price is £" + totalCost.toFixed(2);
}

function currentDrinkDisplay()
{
    //Constructs the current drink string
    currentCost = sizePrice + extrasCost;
    current = drinkSize + " " + drinkTypeString + ": "+ drinkIngreds + " " + drinkExtras + drinkBase + " ";
    currDriDis.innerText = current + currentCost;
    saveFavBtnChecker();
}

function currentOrderDisplay()
{
    //Constructs and displays the current order
    let ordCon = "";
    for (let i = 0; i < orderDisplayArray.length; i++) {
        ordCon += orderDisplayArray[i] + "\n"   
    }
    currOrdDis.innerText = ordCon;
}

function getIngredients()
{
    //Gets ingredidients json content
    fetch("ingredients.json")
        .then(function(response){
            return response.text();})
        .then(function(data){
            processResponse(data);})
        .catch(function(error){
            console.log('Error - ${error}');
        });                
}

function processResponse(responseText)
{
    //Process the ingredients json content
    let ingredients = JSON.parse(responseText);
    populateIngredients(ingredients);
}

function populateIngredients(ingredients)
{
    if(count == 0){
        for (let i = 0; i < 7; i++) {
            //Create check boxes & labels && assign names/values && add to form
            count++;
            let box = document.createElement("input");
            let label = document.createElement("label");
            box.type = "checkbox";
            box.name = "ingreds";
            box.value = ingredients.ingredientsList[i].Value;
            label.innerText = ingredients.ingredientsList[i].DisplayValue;      
            ingredDisplay.appendChild(box);
            ingredDisplay.appendChild(label);
        }
        ingredChoice.forEach(item => item.addEventListener("change", ingredAddition));
    }  
}

function orderPlaced()
{
    //Outputs message and resets form
    let outputMessage = "";
    if (orderDisplayArray.length == 0) {
        outputMessage ="No order to place, please enter a selection"
    }
    else{
        outputMessage = "Your order has been placed and will be with you shortly. \n Thankyou for choosing The Monkey Bar!";
    } 
    currDriDis.innerText = outputMessage;
    reset = true;
    //Resets form after 5 seconds, method found from https://forums.asp.net/t/1397990.aspx?Make+div+disappear+after+10+seconds+
    window.setTimeout("cleanUp(totalClean = true);", 5000);
}

function checkDirectory()
{
    //Checks local storage for a favourite
    if ("directory" in localStorage) {
        directory = JSON.parse(localStorage.getItem("directory"));
    }

    else
    {
        directory = [];  
        orderFav.disabled = true;  }
}

function addFavourite()
{
    //Clears directory and the adds new favourite
    directory = [];
    const favourite = {
        "drink": current,
        "price": currentCost
    };
    localStorage.clear();
    directory.push(favourite);
    localStorage.setItem("directory",JSON.stringify(directory));
    orderFav.disabled = false;

}

function orderFavourite()
{
    //retrieves favourite and adds to order and total cost
    orderDisplayArray.push(directory[0].drink + directory[0].price)
    totalCost += directory[0].price;
    displayTotal.innerText = "Total Price is £" + totalCost.toFixed(2);
    currentOrderDisplay()    
}

function saveFavBtnChecker()
{
    //Checks if correct elements are selected, disable/enable button
    if (drinkTypeString == "" || drinkIngreds == "" || drinkBase == "") {
        setFav.disabled = true;
    }
    else 
    {
        setFav.disabled = false;
        
    }
}
