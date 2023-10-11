const elSearchInput1 = document.getElementById("searchInput1");

elSearchInput1.addEventListener('keyup', function (e) {
    if(e.key === 'Enter') {
        //search
        const keyword = elSearchInput1.value.trim();

        if (keyword) {
            window.location.href = `search.html?keyword=${keyword}`;
        } else {
            alert('Vui lòng nhập từ khóa cần tìm');
            elSearchInput1.value = '';
        }
    }
});