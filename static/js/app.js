// マップ
let map = new google.maps.Map(
    document.getElementById('map'), {
        center: new google.maps.LatLng("11.111", "11.111"),
        zoom: 18,
        styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#304a7d"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c6675"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#255763"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
    ]    }
)
// 情報表示エリア(?)
let infoElement = document.getElementById('info')
// 既に表示されているマーカー一覧
let displayedMarkers = []
RoomID = document.cookie.split(';')[0].split('=')[1];

// 5秒ごとに実行されるループ
function getNewMarker() {
    // リクエスト
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/getLocation/'+RoomID);
    xhr.onload = function () {
        // 応答の整形
        const row_resp = JSON.parse(xhr.responseText)
        console.log(row_resp)
        for (resp of row_resp){
            console.log(resp)
            let lat = parseFloat(resp.lat)
            let lng = parseFloat(resp.lng)
            let codename = resp.cname
            console.log("[lat:]"+lat+"[lng:]"+lng+"[codename:]"+codename+"[RoomID:]"+RoomID)
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
                var latLng = new google.maps.LatLng( lat, lng);
                map.setCenter( latLng );
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
            infoElement.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)} codename:${codename} RoomID:${RoomID}`
            infoElement.classList.remove('error')
        }
    }
    xhr.send()
    // 5秒ごとに実行させる
    setTimeout(getNewMarker, 5000)
}
// ループ開始
getNewMarker()
