const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale("vi");

const elMenu = document.getElementById("mainMenu");
const elArticlesTopStory = document.getElementById("articlesTopStory");
const elEchoHeroBaner = document.getElementById("EchoHeroBaner");
const elLatestNews = document.getElementById("articlesLatestNews");
const elArticlesTrending = document.getElementById("articlesTrending");
const elArticlesTrendingLarge = document.getElementById("articlesTrendingLarge");
const elDiscoverCategories = document.getElementById("discoverCategories");
const elFeaturedPostTop = document.getElementById("FeaturedPostTop");
const elFeaturedPostMid = document.getElementById("FeaturedPostMid");
const elFeaturedPostBot = document.getElementById("FeaturedPostBot");
const elArticlesPopularWeek = document.getElementById("articlesPopularWeek");
const elNewPodcasts = document.getElementById("NewPodcasts");
const elArticleVideo = document.getElementById("articleVideo");
const elArticleVideoTopic = document.getElementById("articleVideoTopic");

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

//Echo hero baner

API.get(`articles?limit=5&page=15`).then((response) => {
  const articles = response.data.data;
 
  let htmlBaner = '';
  let htmlTopStory = '';
  let htmlTopic = '';

  articles.forEach((item, index) => {
   if(index === 0) {
    htmlBaner += `
    <div class="echo-hero-banner-main-img img-transition-scale">
            <a href="post-details.html?id=${item.id}"><img class="banner-image-one img-hover"
                src="${item.thumb}"
                alt="${item.title}"/></a>
          </div>
          <h1 class="echo-hero-title text-capitalize font-weight-bold">
            <a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a>
          </h1>
          <hr />
          <p class="echo-hero-discription">
            ${item.description}
          </p>
          <div class="echo-hero-area-titlepost-post-like-comment-share">
            <div class="echo-hero-area-like-read-comment-share">
              <a href="post-details.html?id=${item.id}"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="post-details.html?id=${item.id}"><i class="fa-light fa-eye"></i> 3.5k Views</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="post-details.html?id=${item.id}"><i class="fa-light fa-comment-dots"></i> 05 Comment</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="post-details.html?id=${item.id}"><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k Share</a>
            </div>
          </div>`;
   }else if (index === 1) {
    htmlTopStory += `
    <div class="echo-top-story first">
      <div class="echo-story-picture img-transition-scale">
        <a href="post-details.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
      </div>
      </div>
      <div class="echo-story-text">
        <h4>
          <a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a>
         </h4>
        <div class="echo-trending-post-bottom-icons">
          <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
      </div>
    </div>`;
   }else{
    htmlTopic += `
    <div class="echo-top-story">
      <div class="echo-story-picture img-transition-scale">
        <a href="post-details.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
      </div>
      <div class="echo-story-text">
        <h4>
          <a href="post-details.html?id=${item.id}" class="title-hover"><p class="story-edit-small title-hover">${item.title}</p></a>
        </h4>
        <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
      </div>
    </div>`;
   }
  });
  elEchoHeroBaner.innerHTML = htmlBaner;
  elArticlesTopStory.innerHTML = htmlTopStory + htmlTopic;
});

// LATEST NEWS

API.get(`categories_news/2/articles?limit=8&page=10`).then((response) => {
  const articles = response.data.data;
  
  let htmlLatest = '';
  articles.forEach((item) => {
    htmlLatest += `
    <div class="swiper-slide">
      <div class="echo-latest-news-main-content">
        <div class="echo-latest-news-img img-transition-scale">
          <a href="post-details.html?id=${item.id}">
          <img src="${item.thumb}" alt="${item.title}" class="img-hover">
          </a>
        </div>
        <div class="echo-latest-news-single-title">
          <h5><a href="post-details.html?id=${item.id}" class="text-capitalize title-hover">${item.title}</a></h5>
        </div>
        <div class="echo-latest-news-time-views">
          <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
          
        </div>
      </div>
    </div>`;
  });
  elLatestNews.innerHTML = htmlLatest;
});


//TRENDING

API.get(`articles/popular?limit=5`).then((response) => {
  const articles = response.data.data;
  

  let html = '';
  articles.forEach(item => {
    html += `
    <div class="echo-trending-left-site-post">
      <div class="echo-trending-left-site-post-img img-transition-scale">
        <a href="post-details.html?id=${item.id}">
          <img src="${item.thumb}" alt="${item.title}" class="img-hover">
        </a>
     </div>
     <div class="echo-trending-right-site-post-title">
        <h5><a href="post-details.html?id=${item.id}" class="text-capitalize title-hover">${item.title}</a></h5>
        <div class="echo-trending-post-bottom-icons">
            <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
    </div>
</div>`;
  });
  elArticlesTrending.innerHTML = html;
});

API.get(`articles/popular?limit=2`).then((response) => {
  const articles = response.data.data;

  let html = '';
  articles.forEach(item => {
    html += `<div class="echo-trending-right-site-post">
    <div class="echo-trending-right-site-post-img img-transition-scale">
        <a href="post-details.html?id=${item.id}">
            <img src="${item.thumb}" alt="${item.title}" class="img-hover">
        </a>
    </div>
    <div class="echo-trending-right-site-post-title">
        <h4 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h4>
    </div>
    <div class="echo-trending-right-site-like-comment-share-icons">
        <div class="echo-trending-right-like-comment-content">
          <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
        </div>
        <div class="echo-trending-right-like-comment-content">
          <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
        </div>
        
    </div>
</div>`;
  });
  elArticlesTrendingLarge.innerHTML = html;
});




//FEATURED POST
API.get(`articles?limit=2&limit_case=8&page=7`).then((response) => {
  const data = response.data.data;
  console.log(data);
  let html = '';

  data.forEach((item) => {
   
      html += `
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
      <div class="echo-feature-area-post">
          <div class="echo-feature-area-post-img img-transition-scale">
              <a href="post-details.html?id=${item.id}">
                  <img src="${item.thumb}" alt="${item.title}" class="img-hover">
              </a>
          </div>
          <div class="echo-feature-area-post-hins">
               <h5 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h5>
           </div>
           <hr>
          <div class="echo-feature-area-read-view">
               <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
               <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
          </div>
       </div>
  </div>`;
    

    
  });
  elFeaturedPostTop.innerHTML = html;
});

API.get(`articles/popular?limit=4&limit_case=8`).then(response => {
  const data = response.data.data;

  let html ='';
  data.forEach((item, index) => {
    html += `
    <div class="col-xl-6 col-lg-6 col-md-6">
      <div class="echo-feature-area-option-content">
          <div class="echo-feature-area-option-number">
              <h3>0${index + 1}</h3>
          </div>
          <div class="echo-feature-area-option-content-text">
              <h5 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a>
              </h5>
              <div class="echo-feature-area-option-read-more">
                  <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
              </div>
          </div>
      </div>
  </div>`;
  });
  elFeaturedPostMid.innerHTML = html;
});

API.get(`articles/popular?limit=2&limit_case=8`).then(response => {
  const data = response.data.data;

  let html = '';
  data.forEach(item => {
    html += `
    <div class="col-xl-12">
    <div class="echo-feature-area-last-content">
        <div class="echo-feature-area-last-content-img img-transition-scale">
            <a href="post-details.html?id=${item.id}"> <img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
        </div>
        <div class="echo-feature-area-last-content-text">
            <h3 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h3>
            <div class="echo-feature-area-last-content-read-view">
                <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(item.publish_date).fromNow()} </a>
                <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k
                    Views</a>
            </div>
        </div>
    </div>
</div>`;
  });
  elFeaturedPostBot.innerHTML = html;
});

//POPULAR OF WEEKS

API.get(`articles/popular?limit=3`).then((response) => {
  const data = response.data.data;

  let html = '';
  data.forEach(item => {
    html += `
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
    <div class="echo-popular-area-single-item">
        <div class="echo-popular-area-img img-transition-scale">
            <a href="post-details.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
         </div>
         <div class="echo-popular-area-item-title">
            <h5 class="text-center text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h5>
        </div>
         <div class="echo-popular-area-read-view text-center">
             <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
             <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
         </div>
     </div>
 </div>`;
  });
  elArticlesPopularWeek.innerHTML = html;
});


//NEW PODCASTS

API.get(`articles/popular?limit=4&limit_case=4`).then((response) => {
  const data = response.data.data;
  console.log(data);
  let html = '';

  data.forEach(item => {
    html += `
    <div class="echo-audio-news-home-1-flexing">
      <div class="echo-feature-area-right-site-audio-news">
           <div class="echo-feature-area-right-img">
              <a href="post-details.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}"></a>
          </div>
           <div class="echo-feature-area-right-audio-text">
                <h5 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h5>
           </div>
      </div>
      <hr>`;
  });
  elNewPodcasts.innerHTML = html;
});

//videos//categories_news/2/articles?limit=4&page=5

API.get(`categories_news/2/articles?limit=3&page=5`).then((response) => {
  const data = response.data.data;
  console.log(data);
  let htmlVideo = '';
  let htmlVideoTopics = '';
  data.forEach((item, index) => {
    if(index === 0) {
      htmlVideo += `
      <div class="echo-video-left-site">
        <a href="post-details.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}"></a>
         <div class="echo-video-left-site-text-box">
              <h5><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h5>
            <hr>
            <div class="echo-video-left-site-read-views">
                 <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
                <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
            </div>
        </div>
    </div>`;
    }else  {
      htmlVideoTopics += `
      <div class="echo-video-right-site-content">
        <div class="echo-video-right-site-content-text">
            <h5 class="text-capitalize"><a href="post-details.html?id=${item.id}" class="title-hover text-white">${item.title}</a>
            </h5>
            <hr>
            <a href="post-details.html?id=${item.id}" class="pe-none text-white"><i class="fa-light fa-clock"></i> ${dayjs(item.publish_date).fromNow()}</a>
            <a href="post-details.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a></a>
        </div>
        <div class="echo-video-right-site-content-video">
            <a href="post-details.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}"></a>
        </div>
    </div>`;
    }
  })
  elArticleVideo.innerHTML = htmlVideo;
  elArticleVideoTopic.innerHTML = htmlVideoTopics;
})