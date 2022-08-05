// JSON 檔案網址
//const url = "https://shannon945.github.io/farm_produce/data.json";
const url = "data.json";
const productsList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const search = document.querySelector(".seach-group");
const searchData = document.querySelector(".seach-group input");
const select = document.querySelector(".sort-select");
const sortAdvanced = document.querySelector(".js-sort-advanced");

let data = [];
let filterData = [];
let typeKind = "";

/** 步驟一 **/
function getData(){
//打開註解，透過底下 axios.get 撈取 url 資料
//透過 console.log 觀看是否正確撈取資料
//將撈取回來的資料賦予在變數 data 上
 axios.get(url)
   .then(function (response) {
     //console.log(response.data);
     data = response.data;
   });
}

getData();
//console.log(data);

function renderData(showData) {
  let str="";
  showData.forEach((item)=>{
    str += `<tr>
        <td>${item.作物名稱}</td>
        <td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
      </tr>`;
  })
  productsList.innerHTML = str;  
}

//篩選資料
buttonGroup.addEventListener("click", (e)=>{  
  typeKind = e.target.getAttribute("data-type");  
  const btnTypes = document.querySelectorAll('.btn-type');
  for(const btnType of btnTypes)
  {
    //console.log(btnType.getAttribute("data-type"));
    if (btnType.getAttribute("data-type") == typeKind)
    {
      btnType.classList.add("active");     
    }else{
      btnType.classList.remove("active");
    }
  }
  select.value ="排序篩選";
  searchData.value ="";
  if (typeKind =="N04" || typeKind =="N05" || typeKind =="N06") {
    SearchFilterData(typeKind, searchData.value);
    //renderData(filterData);
  }
  
});

//搜尋資料
search.addEventListener("click",(e)=>{
    
  let inputValue = searchData.value;

  if (e.target.nodeName === "BUTTON") {
    if (searchData.value =="") {
      alert("請輸入作物名稱!");
      return;
    }

    if (typeKind == "" ){
      alert("請請輸入並搜尋想比價的作物名稱^＿^");
      return;
    }
    SearchFilterData(typeKind, inputValue)
    select.value ="依交易量排序";
    selectChange("交易量","up");
  }
});


function SearchFilterData(typeKind, inputValue){  
  if (typeKind =="N04" || typeKind =="N05" || typeKind =="N06"){
    filterData = data.filter((item)=>{
      return item.種類代碼 == typeKind;
    });
    if (inputValue != ""){
      filterData = filterData.filter((item) => {       
          return item.作物名稱.match(inputValue);
      });
    }
  }else{
    if (inputValue != ""){
      filterData = data.filter((item) => {
        //回傳 .match 符合的匹配結果
          return item.作物名稱.match(inputValue);
      });
    }
  }
  renderData(filterData);
}

//排序資料
select.addEventListener("change", (e)=>{
  //console.log(e.target.value);
  switch (e.target.value) {
    case "依上價排序":
      selectChange("上價","up");
      break;
    case "依中價排序":
      selectChange("中價","up");
      break;
    case "依下價排序":
      selectChange("下價","up");
      break;
    case "依平均價排序":
      selectChange("平均價","up");
      break;
    case "依交易量排序":
      selectChange("交易量","up");
      break;      
    default:
      console.log(e.target.value);
      console.log("Nothing");
      break;
  }

});

//sort function
function selectChange(dataField, sortCaret)
{
  //console.log(filterData);
  if (sortCaret =="up"){
    filterData.sort(function(a, b){
      return b[dataField] - a[dataField];
    });
  }else {
    filterData.sort(function(a, b){
      return a[dataField] - b[dataField];
    });
  }  
  select.value =`依${dataField}排序`;
  renderData(filterData);  
}


//進階排序
sortAdvanced.addEventListener("click", (e)=>{
  //console.log(e.target.nodeName);
  if (e.target.nodeName =="I")
  { 
    let sortPrice = e.target.getAttribute("data-price");
    let sortCaret = e.target.getAttribute("data-sort");
    //console.log(`${sortPrice}--${sortCaret}`);
    selectChange(sortPrice, sortCaret)
  }

});

