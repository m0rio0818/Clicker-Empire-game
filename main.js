const config = {
    yourname : document.getElementById("yourname"),
    initial: document.getElementById("initialPage"),
    main: document.getElementById("mainPage"),
}
// 要素を非表示にする。
function displayNone(ele){
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

// 要素を表示する。
function displayBlock(ele){    
    ele.classList.add("d-block");
    ele.classList.remove("d-none");
}

class Item{
    constructor(shortName, name, img, maxPurchase, price, get, count=0){
        this.shortName = shortName;
        this.name = name;
        this.img = img;
        this.maxPurchase = maxPurchase;
        this.price = price;
        this.get = get;
        this.count = count;
    }

    purchase(num){
        this.count += num
    }
}
class BurgerItem{
    constructor(shortName, name, img, maxPurchase, price, get, count=0){
        this.shortName = shortName;
        this.name = name;
        this.img = img;
        this.maxPurchase = maxPurchase;
        this.price = price;
        this.get = get;
        this.count = count;
    }

    purchase(num){
        this.count += num
    }
}

class Burger{
    constructor(count, price){
        this.count = count;
        this.price = price;
    }
    countUp(){
        this.count += 1;
    }
    priceUp(num){
        this.price += (25 * num);
    }
}

class User{
    constructor(name, age, days, yen, earnpersecond){
        this.name = name;
        this.age = age;
        this.days = days;
        this.yen = yen;
        this.earnpersecond = earnpersecond;
    }

    clickBurger(burger){
        this.yen += burger.price;
    }

    countupdays(){
        this.days +=1;
    }

    calculateAge(){;
        if (this.days % 365 == 0 && this.days != 0) this.age += 1;
    }

    buy(price){
        this.yen -= price;
    }

    getpersecond(){
        this.yen += this.earnpersecond;
    }
}

let moneyMachineList = [
    new BurgerItem("FlipMachine", "Flip machine", "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png", 500, 15000, 25),
    new Item("ETFStock", "ETF Stock", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", Infinity, 300000, 0.1),
    new Item("ETFBonds", "ETF Bonds", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", Infinity, 3000000, 0.07),
    new Item("lemonadeStand", "Lemonade Stand", "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png", 1000, 30000, 30),
    new Item("IceCreamTruck", "Ice Cream Truck", "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png", 500, 100000, 120),
    new Item("House", "House", "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png", 100, 20000000, 32000),
    new Item("TownHouse", "Town House", "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png", 100, 40000000, 64000),
    new Item("Mansion", "Mansion", "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png", 20, 250000000, 500000),
    new Item("IndustrialSpace", "industrial Space", "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png", 10, 1000000000, 2200000),
    new Item("HotelSkyscraper", "Hotel Skyscraper", "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png", 5, 10000000000, 25000000),
    new Item("BulletspeedskyRailway", "Bullet-Speed Sky Railway", "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png", 1, 10000000000000, 30000000000), 
]

function makeJsonString(name= null, age=20, days=0, yen=50000, earnpersecond = 0, burgerNum=0, burgerPrice=25, itemList=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]){
    const jsonString = `
        [ 
            {
                "name": "${name}",
                "age" : ${age},
                "days": ${days},
                "yen" : ${yen},
                "earnpersecond": ${earnpersecond}
            },
            {
                "burgernum": ${burgerNum},
                "burgerprice": ${burgerPrice}
            },
            {
                "itemList": {
                    "FlipMachine": ${itemList[0]},
                    "ETFStock": ${itemList[1]},
                    "ETFBonds": ${itemList[2]},
                    "lemonadeStand": ${itemList[3]},
                    "IceCreamTruck": ${itemList[4]},
                    "House": ${itemList[5]},
                    "TownHouse": ${itemList[6]},
                    "Mansion": ${itemList[7]},
                    "IndustrialSpace": ${itemList[8]},
                    "HotelSkyscraper": ${itemList[9]},
                    "BulletspeedskyRailway": ${itemList[10]}
                }
            }
        ]
    `
    return jsonString;
}

function updateItemcount(moneymachinelist, list){
   for (let i=0; i<moneymachinelist.length; i++){
    moneymachinelist[i].count  = list[i];
   }
}

function switchToMainPage(list){
    displayNone(config.initial);
    displayBlock(config.main);
    let humberger = list[0];
    let user = list[1];
    let itemcountList = list[2];
    config.main.append(mainPage(humberger, user, itemcountList));
}

function newLogic(){
    if (!config.yourname.value){
        alert("Please Input your name!");
    }
    if(localStorage.getItem(config.yourname.value)){
        alert("this name has alerady exist, please login");
    }
    else {
        let name = config.yourname.value;
        let jsonString = makeJsonString(name)
        localStorage.setItem(name, jsonString);
        let initialData = makeInitialization(jsonString);
        switchToMainPage(initialData);
    }
}

function loginLogic(){
    if (!config.yourname.value){
        alert("input your name!");
    }
    else {
        let name = config.yourname.value;
        let dataString = localStorage.getItem(name);
        let initialData = makeInitialization(dataString);
        if(!dataString){
            alert("There is no data");
        }
        else {
            switchToMainPage(initialData);
        }
    }
}

// newButton押下時
let newButton = document.getElementById("newGame");
newButton.addEventListener("click", function(){
    newLogic();
})

// loginbutton押下時
let login = document.getElementById("login");
login.onclick = function(){
    loginLogic();
}


function makeInitialization(jsonString){
    let jsonEncoded = JSON.parse(jsonString);
    let userInfoString = jsonEncoded[0];
    let humbergerString = jsonEncoded[1];
    let itemcounts = jsonEncoded[2]["itemList"];

    let itemcountsList = [];
    for (let i in itemcounts){
        itemcountsList.push(itemcounts[i]);
    }

    let userinfo = new User(userInfoString.name, userInfoString.age, userInfoString.days, userInfoString.yen, userInfoString.earnpersecond);
    let humburger = new Burger(humbergerString.burgernum, humbergerString.burgerprice);
    return [humburger, userinfo, itemcountsList];
}

function mainPage(humberger, user, itemcountList){
    // 日にちを1秒ごとに増やす
    let timer = setInterval(function(){
        // 日付カウント、年齢計算、1秒あたりにいくら稼ぐか
        user.countupdays();
        user.calculateAge();
        user.getpersecond();
        updateDays(container, user);
        updateBurgerandDeposit(humberger, user);
    }, 1000);
    updateItemcount(moneyMachineList, itemcountList);

    let container = document.createElement("div");
    let totalContainer = document.createElement("div");
    totalContainer.classList.add("d-flex", "vh-100", "justify-content-center", "p-md-5", "pb-5");
    
    let bgBlueBox = document.createElement("div");
    bgBlueBox.classList.add("bg-navy", "p-2", "d-flex", "col-md-11", "col-lg-10");
    
    totalContainer.append(bgBlueBox);
    
    let burger = makeburgerCon(humberger);
    let userInfo = makeuserInfoCard(user);
    let userBuyItemList = makeItemListInfo(humberger, user, moneyMachineList);
    let backsaveBtn = saveRestartButton();
    
    // ここからMainPageの枠(leftCon, rightCon)作成
    // leftCon
    let burgerCon = document.createElement("div");
    burgerCon.classList.add("bg-dark","col-4", "p-2");
    burgerCon.append(burger);
    
    // rightCon (右のuser情報、ItemListのすべて)
    let rightBox = document.createElement("div");
    rightBox.classList.add("col-8");
    
    // user情報Con
    let userInfoCon = document.createElement("div");
    userInfoCon.classList.add("bg-dark");
    userInfoCon.append(userInfo);
    
    // ItemListCon
    let userBuyItemCon = document.createElement("div");
    userBuyItemCon.classList.add("bg-dark", "mt-1", "eleBox");
    userBuyItemCon.setAttribute("id", "displayItems");
    userBuyItemCon.append(userBuyItemList);
    
    // reset,saveボタン
    let backSaveCon = document.createElement("div");
    backSaveCon.append(backsaveBtn);
    rightBox.append(userInfoCon, userBuyItemCon, backSaveCon);
    bgBlueBox.append(burgerCon, rightBox);
    container.append(totalContainer);

    let resetBtn = container.querySelector("#reset");
    resetBtn.addEventListener("click", ()=>{
        clearInterval(timer)
        let jsonString = makeJsonString(user.name);
        config.main.innerHTML = "";
        let list = makeInitialization(jsonString);
        let humberger = list[0];
        let newuser = list[1];
        let itemcountList = list[2];
        config.main.append(mainPage(humberger, newuser, itemcountList));
    })

    let saveBtn = container.querySelector("#save");
    saveBtn.addEventListener("click", () => {
        clearInterval(timer);
        let itemNumList = getNumList(moneyMachineList);
        let resJsonString = makeJsonString(user.name, user.age, user.days, user.yen, user.earnpersecond, humberger.count, humberger.price, itemNumList);
        alert("Saved your data. Please put the same name when you login.");
        localStorage.setItem(user.name, resJsonString);
        displayNone(config.main);
        config.main.innerHTML = "";
        displayBlock(config.initial);
    })
    
    let burgerItem = container.querySelectorAll(".burgerImg")[0];
    burgerItem.addEventListener("click", function(){
        // バーガーの数を増やす。
        humberger.countUp();
        // 1クリックで n円獲得　-> 貯金の数も増やす。
        user.clickBurger(humberger);
        // トップ画面の更新。
        updateBurgerandDeposit(humberger, user)
    });

    return container;
}


function getNumList(list){
    let ans = [];
    for (let i=0; i<list.length; i++){
        ans.push(list[i].count);
    }
    return ans;
}

function updateBurgerandDeposit(humberger, user){
    let burgerprice = document.getElementById("clickPrice");
    let buregerNum = document.getElementById("burgerN");
    let usermoney = document.getElementById("useryen");
    burgerprice.innerHTML = "one click $" + humberger.price;
    usermoney.innerHTML = "¥ " + user.yen
    buregerNum.innerHTML = humberger.count+ " Burgers";
}

function updateDays(container, user){
    let daysPosition = container.querySelectorAll("#days")[0];
    let agePosition = container.querySelectorAll("#age")[0];
    daysPosition.innerHTML = user.days + " days";
    agePosition.innerHTML = user.age + " years old";
}

function makeburgerCon(burger){
    let container = document.createElement("div");
    let htmlString = `
    <div class="cardStyle" id="humbegerInfo">
        <h5 id="burgerN">${burger.count} Burgers</h5>
        <p id="clickPrice">one click $${burger.price}</p>
        </div>
        <div class="d-flex justify-content-center py-5">
            <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="burgerImg hover p-2" id="burger">
        </div>
    </div>
    `
    container.innerHTML = htmlString;
    return container;
}

function makeuserInfoCard(userInfo){
    let container = document.createElement("div");
    let htmlString = `
    <div class="bg-dark" id="userInfo">
        <div class="d-flex flex-wrap">
            <div class="p-1 col-lg-6 col-12">
                <div class="userCard">
                    <p id="name">${userInfo.name}</p>
                </div>
            </div>
            <div class="p-1 col-lg-6 col-12">
                <div class="userCard">
                    <p id="age">${userInfo.age} years old</p>
                </div>
            </div>
            <div class="p-1 col-lg-6 col-12">
                <div class="userCard">
                    <p id="days">${userInfo.days} days</p>
                </div>
            </div>
            <div class="p-1 col-lg-6 col-12">
                <div class="userCard">
                    <p id="useryen">¥ ${userInfo.yen}</p>
                </div>
            </div>
        </div>
    </div>
    `
    container.innerHTML = htmlString;
    
    return container;
}

function makeItemListInfo(humburger, user, list){
   let container = document.createElement("div");
   let htmlString = `<div class="p-2 eleBox height80">`;

   for (let i=0; i<list.length; i++){
        htmlString += `
        <div class="itemInfo d-sm-flex align-items-center mb-1">
            <div class="d-sm-block d-none p-1 col-sm-3">
                <img src="${list[i].img}"  class="imgStyle p-2">
            </div>
            <div class="col-sm-9">
                <div class="d-flex justify-content-between">
                    <h5>${list[i].name}</h5>
                    <h5>${list[i].count}</h5>
                </div>
                <div class="d-flex justify-content-between">
                    <p>¥${list[i].price}</p>`
        htmlString += i == 0 ? `<p class="text-success">¥${list[i].get} /click</p>`:`<p class="text-success">¥${list[i].get} /sec</p>`
        htmlString += `
                </div>
            </div>
        </div>
        `
    }
    htmlString+=  "</div>";

    container.innerHTML = htmlString; 
    clicktodetailItem(container, humburger, user);
    return container;
}


function clicktodetailItem(container, humberger, user){
    let itemLists = container.querySelectorAll(".itemInfo");
    for (let i=0; i<itemLists.length; i++){
        itemLists[i].addEventListener("click", ()=>{
            let displayItemsData = document.getElementById("displayItems");
            displayItemsData.innerHTML = "";
            displayItemsData.append(detailOfItem(i));
            calculateTotal(moneyMachineList[i]);
            
            // backBtn
            let backBtn = document.getElementById("backBtn");
            backBtn.addEventListener("click", ()=>{
            backtoItemList(humberger, user, moneyMachineList);
            })
            
            // nextBtn            
            let nextBtn = document.getElementById("nextBtn");
            nextBtn.addEventListener("click", ()=>{
                // 数がmax以上にならないようにする.
                let buyNum = document.getElementById("buyNum").value;
                let totalPurchasePrice = +buyNum * moneyMachineList[i].price;
                if (totalPurchasePrice < 0){
                    alert("Invalid Number");
                    backtoItemList(humberger, user, moneyMachineList);
                }
                else if (user.yen < totalPurchasePrice){
                    alert("You don't have enough money.");
                    backtoItemList(humberger, user, moneyMachineList);
                }
                //数がトータル購入個数を超えていた場合、戻る。
                else if (+moneyMachineList[i].count+ +buyNum > moneyMachineList[i].maxPurchase){
                    alert("You can't buy over maximam Num. you can buy :" + +moneyMachineList[i].maxPurchase + " now you try to buy " + (+moneyMachineList[i].count + +buyNum));
                    backtoItemList(humberger, user, moneyMachineList);
                }
                // ここで、数の更新を行う。
                else{
                    // FlipMachineの場合は、humbegerのoneclickの値段変更
                    if(i==0){
                        humberger.priceUp(+buyNum);
                        user.buy(totalPurchasePrice);
                        moneyMachineList[i].purchase(+buyNum);
                        updateBurgerandDeposit(humberger, user)
                        backtoItemList(humberger, user, moneyMachineList);
                    }
                    else{
                        // それ以外は、残高変更。購入したものの個数、earnYen / timeを増やす。
                        user.buy(totalPurchasePrice);
                        moneyMachineList[i].purchase(+buyNum);
                        user.earnpersecond += (moneyMachineList[i].get * +buyNum)
                        updateBurgerandDeposit(humberger, user)
                        backtoItemList(humberger, user, moneyMachineList);
                    }
                }
            })
        })
    }
}

function backtoItemList(humberger, user, moneyMachineList){
    let displayItemsData = document.getElementById("displayItems");
    displayItemsData.innerHTML = "";
    displayItemsData.append(makeItemListInfo(humberger, user, moneyMachineList));
}

function saveRestartButton(){
    let container = document.createElement("div");
    container.innerHTML = `

    <div class="d-flex justify-content-end mt-2">
        <div class="border p-2 mr-2 hover" id="reset">
            <i class="fas fa-undo fa-2x text-white"></i>
        </div>
        <div class="border p-2 hover" id="save">
            <i class="fas fa-save fa-2x text-white"></i>
        </div>
    </div>
    `;
    return container;
}


// クリックした際に詳細を出す機能
function detailOfItem(i){
    let item = moneyMachineList[i];
    let container = document.createElement("div");
    htmlString = `
    <div class="p-2">
        <div class="col-12 selectItem p-3">
            <div class="d-flex justify-content-between">
                <div class="col-7">
                    <h3 class="mb-3">${item.name}</h3>
                    <p class="mb-2">Max purchases: ${item.maxPurchase}</p>
                    <p class="mb-2">Price: ${item.price}</p>`

    htmlString+= i == 0 ? `<p class="mb-2">Get ¥ ${item.get}/ click</p>` : `<p class="mb-2">Get ¥ ${item.get}/ sec</p>`
    htmlString+= `</div>
                <div class="col-5">
                    <img src=${item.img} class="imgSet">
                </div>
            </div>
            <div>
                <p class="mb-2">How many would you like to buy?</p>
                    <input type="number" class="col form-control" placeholder="0" id="buyNum">
                <p class="text-right" id="totalPrice">total : ¥ 0</p>
            </div>
            <div class="form-row pt-3">
                <div class="col">
                    <button class="btn btn-outline-primary bg-white col hover" id="backBtn">Go Back</button>
                </div>
                <div class="col">
                    <button class="btn btn-primary col hover" id="nextBtn">Purchaese</button>
                </div>                                                   
            </div>
        </div>
    </div>            
    ` 
    container.innerHTML = htmlString;
    return container;
}

function calculateTotal(item){
    let totalPrice = document.getElementById("totalPrice");
    let buyNum = document.getElementById("buyNum");
    buyNum.addEventListener("input", function(){
        if (+buyNum.value >= 0){
            totalPrice.innerHTML = "total : ¥" + +buyNum.value * item.price
        } 
    })
}