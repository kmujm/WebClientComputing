function decoVideoTag (videoTagId) {    
    const $target = document.createElement('div');
    const $videoTage = document.getElementById(`${videoTagId}`);
    
    const $span = document.createElement('span');
    const textNode = document.createTextNode('영상선택 : ');
    $span.appendChild(textNode);

    const $label = document.createElement('label');
    $label.setAttribute('for', 'file');
    
    $span.appendChild($label);

    $target.appendChild($span);

    const $fileInput = document.createElement('input');
    $fileInput.setAttribute('type', 'file');
    $fileInput.setAttribute('name', 'file');
    $fileInput.setAttribute('value', 'file');

    $target.appendChild($fileInput);

    const $playButton = document.createElement('button');
    $playButton.setAttribute('value', '영상보기');
    $playButton.textContent = '영상보기';

    $target.appendChild($playButton);

    const $pauseButton = document.createElement('button');
    $pauseButton.setAttribute('value', '영상중단');
    $pauseButton.textContent = '영상중단';

    $target.appendChild($pauseButton);
    
    const $parent = $videoTage.parentNode;
    $parent.insertBefore($target, $videoTage);

    $fileInput.addEventListener('change', (e) => {
        $label.innerHTML = $fileInput.files[0].name + '이 선택되었습니다.'; 
        $videoTage.src = $fileInput.files[0].name;
    })

    $playButton.addEventListener('click', (e) => {
        $videoTage.play();
    })

    $pauseButton.addEventListener('click', (e) => {
        $videoTage.pause();
    })
}