const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get('keyword');
const elArticles = document.getElementById("articles");
const elCategoryTitle = document.getElementById("category-title");
const elBtnLoadMore = document.getElementById("BtnLoadMore");
const elTopStory = document.getElementById("TopStory");

const API = axios.create({
    baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});
  
dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale("vi");


let currentPage = parseInt(urlParams.get('page'));
if(isNaN(currentPage)) currentPage = 1;


getArticles(currentPage);

elBtnLoadMore.addEventListener('click', function() {
    currentPage++;
    elBtnLoadMore.innerText = 'Loading...';
    elBtnLoadMore.disabled = true;
    getArticles(currentPage);
});

function getArticles(page = 1) {
    API.get(`articles/search?q=${keyword}&limit=4&page=${page}`).then((response) => {
        const articles = response.data.data;
        const total = response.data.meta.total;
       
        let html ='';
        articles.forEach(item => {
            const regex = new RegExp(keyword, 'gi');
            const thumb = item.thumb;
            const title = item.title.replace(regex, (match) => `<mark>${match}</mark>`);
            const publishDate = dayjs(item.publish_date).fromNow();
            const description = item.description.replace(regex, (match) => `<mark>${match}</mark>`);
            
    
            html += `
            <div class="echo-hero-baner">
                <div class="echo-inner-img-ct-1  img-transition-scale">
                    <a href="post-details.html?id=${item.id}"><img src="${thumb}" alt="${title}"></a>
                </div>
                <div class="echo-banner-texting">
                    <h3 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html?id=${item.id}" class="title-hover">${title}</a></h3>
                    <div class="echo-hero-area-titlepost-post-like-comment-share">
                        
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="post-details.html?id=${item.id}"><i class="fa-light fa-clock"></i> ${publishDate}</a>
                            <a href=""><i class="fa-light fa-eye"></i> 3.5k Views</a>
                     </div>
                    <div class="echo-hero-area-like-read-comment-share">
                        <a href="post-details.html?id=${item.id}"><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k Share</a>
                    </div>
                </div>
                <hr>
                <p class="echo-hero-discription">${description}</p>
            </div>
        </div>`;
        });
        elCategoryTitle.innerText = `Tìm thấy ${total} bài viết "${keyword}"`;
        elArticles.innerHTML += html;
        elBtnLoadMore.innerText ='Show More';
        elBtnLoadMore.disabled = false;
    });
};
  
//TOP STORY
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