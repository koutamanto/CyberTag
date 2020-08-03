// マップ
let mapElement = new google.maps.Map(
    document.getElementById('map'), {
        center: new google.maps.LatLng("11.111", "11.111"),
        zoom: 18,
        styles: []
    }
)
// 情報表示エリア(?)
let infoElement = document.getElementById('info');
// 既に表示されているマーカー一覧
let displayedMarkers = []
// 5秒ごとに実行されるループ
function getNewMarker() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/getLocation');
    xhr.onload = function () {
        // 応答の整形
        const resp = JSON.parse(xhr.responseText)
        let lat = parseFloat(resp.lat)
        let lng = parseFloat(resp.lng)
        let codename = resp.cname
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
            }).open(marker.getMap(), new_marker)
        })
        // 古い同名のマーカーのマップにNullを設定
        for (let m in displayedMarkers) {
            if (displayedMarkers[m].title == codename) {
                displayedMarkers[m].setMap(null)
            }
        }
        // 古い同名のマーカーをリストから消去
        displayedMarkers = displayedMarkers.filter(marker => marker.title !== codename)
        // 新しいマーカーをリストに追加
        displayedMarkers.push(new_marker)
        // 追加された要素を表示する?
        infoElement.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)} codename:${codename}`;
        infoElement.classList.remove('error');
    }
    xhr.send()
    // 5秒ごとに実行させる
    setTimeout(getNewMarker, 5000)
}
// ループ開始
getNewMarker()
