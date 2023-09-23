// const BASE_URL='https://apiforlearning.zendvn.com/api/v2/'

const API = axios.create({
    baseURL: 'https://apiforlearning.zendvn.com/api/v2/',

});


const elArticlesLatest = document.getElementById('elArticlesLatest')
const elArticlesPopular = document.getElementById('elArticlesPopular')
const elmainMenu = document.getElementById('mainMenu')
//RENDER ARTIVAL LLASTEST
API.get('articles?limit=3').then((response) => {

    const data = response.data
    const articles = data.data
    let html = ''
    articles.forEach((item) => {
        html += `<li><a href="#"> ${item.title}</a></li>`
    });
    elArticlesLatest.innerHTML = html
}
)

//RENDER ARTIVAL POPULAR
API.get('articles/popular?limit=3').then((res) => {
    const data = res.data
    const articles = data.data
    let html = ''
    articles.forEach((item) => {
        html += `<li><a href="#"> ${item.title}</a></li>`
    });
    elArticlesPopular.innerHTML = html
})

API.get('categories_news').then((res) => {
    console.log(res);
    const data = res.data
    const categories = data.data
    let html = ''
    let htmlOther = ''
    categories.forEach((item, index) => {
        if (index < 3) {
            html += `<li><a href="#"> ${item.name}</a></li>`
        }
        else {
            htmlOther += `<li><a href="#"> ${item.name}</a></li>`
        }

    });
    elmainMenu.innerHTML = html + `
    <li>
    <a href="#">Menu</a>
    <ul>
    ${htmlOther}
    </ul>
    </li>`
})
