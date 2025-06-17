const imageNames = [
  "Hazrati Imom Majmuasining Umumiy Ko‘rinishi (Tashqi hovli va minoralar)", // 1.jpg
  "Asosiy Kirish Darvozasi va Bosh Fasadi (Hazrati Imom Masjidi)  ", // 2.jpg
  "Hazrati Imom Majmuasi To‘g‘risidagi Ma’lumotnoma Toshi", // 3.jpg
  "Chap Tomon Minorasi va Devordagi Bezash Detallari", // 4.jpg
  "Asosiy Fasad – Markaziy Kirish Qismi Yaqindan", // 5.jpg
  "Ichki Hovli Ko‘rinishi – Gumbazlar va Yog‘och Ustunlar", // 6.jpg
  "Ichki Hovli – Yog‘och Ustunlar Ostida Panoramali Ko‘rinish", // 7.jpg
  "Ichki Hovlining Markaziy Ko‘rinishi – Kirish va Gumbazli Qism", // 8.jpg
  " Ichki Hovli – Tashqi Darvozaga Qaragan Tomon", // 9.jpg
  "Namozxona Ichki Ko‘rinishi – Gumbazli Shift va Zamin", // 10.jpg
  "Tarixiy idishlar xonasi", // 11.jpg
  "Hovli ichki tomondan", // 12.jpg
  "Yodgorlik xonasi", // 13.jpg
  "Orqa hovli", // 14.jpg
  "Ichki eshiklar va bezaklar", // 15.jpg
  "San’at ko‘rgazmasi", // 16.jpg
  "Ko‘rkam mehmonxona", // 17.jpg
  "Yozgi ayvon", // 18.jpg
  "Kutubxona eshigi", // 19.jpg
  "Kutubxona xonasi", // 20.jpg
  "Uy qurollari xonasi", // 21.jpg
  "Klassik dam olish xonasi"  // 22.jpg
];

const scenes = {};
for (let i = 1; i <= 22; i++) {
  const img = `${i}.jpg`;
  scenes[img] = {
    pitch: 0,
    yaw: 0,
    hfov: 110,
    hotSpots: [],
    title: imageNames[i - 1]
  };

  if (i > 1) {
    scenes[img].hotSpots.push({
      pitch: 0,
      yaw: -30,
      type: 'scene',
      text: '⬅ Orqaga',
      sceneId: `${i - 1}.jpg`,
      cssClass: 'custom-hotspot visible-hotspot'
    });
  }

  if (i < 22) {
    scenes[img].hotSpots.push({
      pitch: 0,
      yaw: 30,
      type: 'scene',
      text: 'Keyingi ➡',
      sceneId: `${i + 1}.jpg`,
      cssClass: 'custom-hotspot visible-hotspot'
    });
  }
}

// Custom hotspot for 1.jpg (kirish markazi)
scenes['1.jpg'].hotSpots.push({
  pitch: 0,
  yaw: 12,
  type: 'scene',
  text: 'Ichkariga kirish',
  sceneId: '2.jpg',
  cssClass: 'custom-hotspot visible-hotspot'
});

const viewer = pannellum.viewer('panorama', {
  default: {
    firstScene: '1.jpg',
    sceneFadeDuration: 1000,
    autoLoad: true,
    autoRotate: 2,
    showControls: false,
  },
  scenes: Object.fromEntries(
    Object.entries(scenes).map(([img, data]) => [
      img,
      {
        type: 'equirectangular',
        panorama: img,
        ...data,
      },
    ])
  ),
});

const imageList = document.getElementById('image-list');
Object.keys(scenes).forEach((img, i) => {
  const li = document.createElement('li');
  li.textContent = imageNames[i];
  li.addEventListener('click', () => viewer.loadScene(img));
  imageList.appendChild(li);
});

let currentIndex = 1;

function goToScene(index) {
  if (index >= 1 && index <= 22) {
    currentIndex = index;
    viewer.loadScene(`${currentIndex}.jpg`);
  }
}

document.getElementById('prevBtn').addEventListener('click', () => {
  goToScene(currentIndex - 1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  goToScene(currentIndex + 1);
});

viewer.on('scenechange', (sceneId) => {
  currentIndex = parseInt(sceneId);
});
