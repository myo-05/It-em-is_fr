const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

let token = localStorage.getItem("access")

/* 헤더 푸터 가져오기 */
fetch("./header-footer.html")
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        document.querySelector("header").innerHTML = data;
    });

// 모든 게시글 가져오기
async function getPostings() {
    const response = await fetch(`${backend_base_url}/postings/`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("--불러오기 실패--")
    }
}

// url의 게시글 id 받아오기
async function getPost(postingId) {
    const response = await fetch(`${backend_base_url}/postings/${postingId}/`, {
        method: 'GET',
        // credentials: "include",
        headers: {
            //"application/json; charset=utf-8"
            'Authorization': `Bearer ${token}`,
        },
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

// 게시글 삭제하기
async function deletePost(postingId) {
    // 글을 작성한 유저가 맞으면 confirm 글 삭제할건지 확인후 삭제
    // 글 작성한 유저가 아니면 alert 삭제할 권한이 없습니다 
    const dlt = confirm("글을 삭제하시겠습니까?")
    console.log(dlt);
    // 확인버튼
    if (dlt == true) {
        // 삭제
        const response = await fetch(`${backend_base_url}/postings/${postingId}/`, {
            method: 'DELETE',
            // credentials: "include",
            headers: {
                //"application/json; charset=utf-8"
                'Authorization': `Bearer ${token}`,
            },
        }
        )
        // 작성한 유저가 맞음
        if (response.status == 204) {
            // response_json = await response.json()
            alert("게시글을 삭제했습니다.")
            window.location.replace(`${frontend_base_url}/static/index.html`)
            // return response_json
        }
        // 작성한 유저가 아님
        else {
            alert("삭제할 권한이 없습니다")
            // alert(response.status)
            // consol.log(response.status)
            location.reload()
        }
    }
    // 취소버튼
    else {
        alert("삭제를 취소합니다.")
        // location.href = location.href;
        // alert(response.status)
        // consol.log(response.status)
        location.reload()
    }
    console.log(postingId)
}




// 댓글 불러오기
async function getComments(postingId) {
    const response = await fetch(`${backend_base_url}/postings/${postingId}/comment/`, {
        method: 'GET',
        // credentials: "include",
        headers: {
            //"application/json; charset=utf-8"
            'Authorization': `Bearer ${token}`,
        },
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

async function postComment(postingId, newComment) {


    const response = await fetch(`${backend_base_url}/postings/${postingId}/comment/`, {
        // mode: 'no-cors',
        method: 'POST',
        // credentials: "include",
        headers: {
            'Content-Type': "application/json",      //"application/json; charset=utf-8"
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            "comment": newComment,
        })
    }
    )
    console.log(response)
    console.log(typeof response)

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}
