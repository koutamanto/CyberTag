// マップ
let map = new google.maps.Map(
    document.getElementById('map'), {
        center: new google.maps.LatLng("11.111", "11.111"),
        zoom: 18,
        styles: []
    }
)
// 情報表示エリア(?)
let infoElement = document.getElementById('info')
// 既に表示されているマーカー一覧
let displayedMarkers = []


// 5秒ごとに実行されるループ
async function getNewMarker() {
    // リクエスト
    const req = await fetch('/getLocation')
    const resp = req.json()
    // 応答の整形
    let lat = parseFloat(resp.lat)
    let lng = parseFloat(resp.lng)
    let codename = resp.cname
    // 既にマーカーが存在するか確認
    const displayed_codenames = displayedMarkers.map(marker => marker.title)
    if (!displayed_codenames.includes(codename)) {
        // 新しいマーカーを作成
        const new_marker = new google.maps.Marker({
            map: map,
            position: {
                lat: lat,
                lng: lng
            },
            title: codename
        })
        // 新しいマーカーをタップした際に出る情報欄設定
        google.maps.event.addListener(new_marker, 'click', function () {
            new google.maps.InfoWindow({
                content: codename
            }).open(new_marker.getMap(), new_marker)
        })
        // 新しいマーカーをリストに追加
        displayedMarkers.push(new_marker)
    } else {
        // 古い同名のマーカーに新しい位置を設定
        for (let m in displayedMarkers) {
            if (displayedMarkers[m].title == codename) {
                displayedMarkers[m].setPosition({lat:lat, lng:lng})
            }
        }
    }
    // 追加された要素を表示する?
    infoElement.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)} codename:${codename}`
    infoElement.classList.remove('error')
}
// 5秒ごとに実行するループ開始
setInterval(getNewMarker, 5000)
