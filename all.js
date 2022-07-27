// JSON 檔案網址
//const url = "https://shannon945.github.io/farm_produce/data.json";
const url = "data.json";
const productsList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const search = document.querySelector(".seach-group");
const searchData = document.querySelector(".seach-group input");
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

  searchData.value ="";
  if (typeKind =="N04" || typeKind =="N05" || typeKind =="N06") {
    SearchData(typeKind, searchData.value);
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
    SearchData(typeKind, inputValue)
  }
});


function SearchData(typeKind, inputValue){
  let filterData = [];
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

