const CHOICE_STORAGE_BTN_NAME = 'storage-btn';

export default function getCheckedLiblary() {    
  return document.querySelector(`[name=${CHOICE_STORAGE_BTN_NAME}]:checked`)
    .value;
}