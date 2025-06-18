const imageNames = [
  "Общий вид комплекса Хазрати Имам (внешний двор и минареты)", // 1.jpg
  "Главные входные ворота и фасад (мечеть Хазрати Имам)", // 2.jpg
  "Информационный камень о комплексе Хазрати Имам", // 3.jpg
  "Левая минарета и декоративные элементы на стене", // 4.jpg
  "Основной фасад – центральная входная часть крупным планом", // 5.jpg
  "Вид внутреннего двора – купола и деревянные колонны", // 6.jpg
  "Внутренний двор – панорамный вид под деревянными колоннами", // 7.jpg
  "Центральный вид внутреннего двора – вход и купольная часть", // 8.jpg
  "Внутренний двор – вид в сторону внешних ворот", // 9.jpg
  "Внутренний вид молельного зала – купольный потолок и пол", // 10.jpg
  "Молельный зал с левой стороны – гармония потолка и настенных узоров", // 11.jpg
  "Полный вид молельного зала – панорама из центра", // 12.jpg
  "Под основным куполом – гармония круглого светильника и узоров", // 13.jpg
  "Купольный молельный зал – южная стена и направление михраба", // 14.jpg
  "Центральный михраб и минбар – украшен надписями из Корана", // 15.jpg
  "Настенные украшения – надписи «Аллах», «Мухаммад» и узоры", // 16.jpg
  "Вид сверху центрального купола – голубые узоры и светильник", // 17.jpg
  "Центральный светильник (люстра) – яркий орнамент и резьба", // 18.jpg
  "Узор купола в форме звезды – сложные геометрические орнаменты", // 19.jpg
  "Верхняя центральная часть внутреннего купола – гармония синего и золотого", // 20.jpg
  "Входной зал Хазрати Имама – внутренний вид и декоративная плитка", // 21.jpg
  "Старинная купольная часть – исторический фасад комплекса",  // 22.jpg
  "Магазин сувениров и народных ремёсел – внутренний декор и выставка прикладного искусства",  // 22.jpg
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
