async function setupVoice() {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let source = audioContext.createBufferSource();
    let audioData = [];

    ws.binaryType = 'arraybuffer';

    ws.onmessage = function (event) {
        if (typeof event.data === 'string') {
            if (event.data === 'streamEnd') {
                let audioDataBuffer = new Uint8Array(audioData).buffer;
                audioContext.decodeAudioData(audioDataBuffer, function (buffer) {
                    source = audioContext.createBufferSource();
                    source.buffer = buffer;
                    source.connect(audioContext.destination);
                    if (audioContext.state === 'suspended') {
                        audioContext.resume().then(() => {
                            toggleSpeaking(); 
                            source.start(0);
                            source.onended = function() {
                                toggleSpeaking(); 
                            }
                        });
                    } else {
                        toggleSpeaking(); 
                        source.start(0);
                        source.onended = function() {
                            toggleSpeaking(); 
                        }
                    }
                }, function (e) {
                    console.log('Error decoding audio data', e);
                });
            } else {
                if(event.data){
                    popup.push(event.data);
                }
            }
        } else {
            audioData = audioData.concat(Array.from(new Uint8Array(event.data)));
        }
    };

    ws.onclose = function (event) {
        if (event.wasClean) {
            console.log('Connection closed cleanly');
        } else {
            console.log('Connection abruptly closed');
        }
        console.log('Code: ' + event.code + ' reason: ' + event.reason);
    };

    ws.onerror = function (error) {
        console.log(`[error] ${error.message}`);
    };
}

function toggleSpeaking() {
    const avatars = document.querySelectorAll('.chatbot-avatar[src="/images/lucy.png"]');
    const lastAvatar = avatars[avatars.length - 1];
    if (lastAvatar && lastAvatar.src.includes('/images/lucy.png')) {
        lastAvatar.classList.toggle('speaking');
    }
}   