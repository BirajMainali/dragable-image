const DRAG_AREA = document.querySelector('.drag--area');
const headerElm = document.querySelector('.header');
const BUTTON = document.querySelector('.button');
const INPUT = document.querySelector('input');
const WARNING_ELM = document.querySelector('.not--supported--image');
let FILE;

BUTTON.onclick = () => {
    INPUT.click();
}

INPUT.addEventListener('change', function () {
    FILE = this.files[0];
    DRAG_AREA.classList.add('active');
    DisplayImage();
});

DRAG_AREA.addEventListener('dragover', (e) => {
    e.preventDefault();
    headerElm.textContent = "Release to upload";
    DRAG_AREA.classList.add('active');
});

DRAG_AREA.addEventListener('dragleave', () => {
    headerElm.textContent = "Drag & Drop";
    DRAG_AREA.classList.remove('active');
});

DRAG_AREA.addEventListener('drop', (event) => {
    event.preventDefault();
    FILE = event.dataTransfer.files[0];
    DisplayImage();
});

const DisplayImage = () => {
    const FILE_TYPE = FILE.type;
    const VALID_EXTENSIONS = ['image/jpeg', 'image/jpg', 'image/png'];
    if (VALID_EXTENSIONS.includes(FILE_TYPE)) {
        const FILE_READER = new FileReader();
        FILE_READER.onload = () => {
            const FILE_URL = FILE_READER.result;
            WARNING_ELM.textContent = "";
            DRAG_AREA.innerHTML = `<img src="${FILE_URL}" alt="">`;
        }
        FILE_READER.readAsDataURL(FILE);
    } else {
        WARNING_ELM.textContent = `Type: ${FILE_TYPE} is not supported for now`;
        DRAG_AREA.classList.remove('active');
    }
}