const API = axios.create({
    baseURL: "https://apiforlearning.zendvn.com/api/v2/",
  });
  
  dayjs.extend(window.dayjs_plugin_relativeTime);
  dayjs.locale("vi");

  const elMenu = document.getElementById("mainMenu");
  const elCategoryName = document.getElementById("categoryName");
  const elArticlesContent = document.getElementById("articleContent");
  const elPublishDate = document.getElementById("publishDate");
  const elArticleTitle = document.getElementById("articleTitle");
  const elArticleThumb = document.getElementById("articlethumb");
  const elTopStory = document.getElementById("TopStory");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = parseInt(urlParams.get('id'));
  

  //RENDER MENUS

API.get(`categories_news`).then((response) => {
    const data = response.data;
    const categories = data.data;
  
    let htmlMenu = '';
    let htmlMenuOther = '';
    categories.forEach((item, index) => {
      
      if (index < 3) {
        htmlMenu += `
        <li class="menu-item">
        <a href="category-style-2.html?id=${item.id}" class="echo-dropdown-main-element active">${item.name}</a>
        </li>`
      }else{
        htmlMenuOther +=  `
        <li class="nav-item">
        <a href="category-style-2.html?id=${item.id}">${item.name}</a>
        </li>`
      }
      
    });
  
    elMenu.innerHTML =  `
      ${htmlMenu}
      <li class="menu-item echo-has-dropdown" >
        <a href="#" class="echo-dropdown-main-element">Danh mục khác</a>
        <ul class="echo-submenu list-unstyled menu-pages">
          ${htmlMenuOther}
        </ul>
      </li>`;
});

API.get(`articles/${id}`).then((response) => {
  const articles = response.data.data;
  console.log(articles);
  elCategoryName.innerText = articles.category.name;
  elPublishDate.innerText = articles.publish_date;
  elArticleTitle.innerText = articles.title;
  elArticlesContent.innerHTML = articles.content;
  elArticleThumb.src = articles.thumb;
});

API.get(`articles/popular?limit=4`).then((response) => {
  const data = response.data.data;

  let html = '';
  data.forEach(item => {
      html += `
      <div class="echo-top-story">
          <div class="echo-story-picture img-transition-scale">
              <a href="post-details.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
          </div>
          <div class="echo-story-text">
               <h6><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h6>
               <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          </div>
      </div>`;
  });
  elTopStory.innerHTML = html;
});
  