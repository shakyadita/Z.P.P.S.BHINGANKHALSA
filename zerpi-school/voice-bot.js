/**
 * ============================================================================
 * SCHOOL VOICE ASSISTANT - INTERACTIVE VOICE & CHAT BOT
 * Z.P.P.S. Bhingankhalsa
 * Voice-enabled Assistant in English (with Marathi support)
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. KNOWLEDGE BASE (English Primary & Marathi Support)
  const BOT_KNOWLEDGE = [
    {
      id: 'timing',
      keywords_en: ['time', 'timing', 'timings', 'hours', 'open', 'close', 'schedule', 'holiday', 'sunday', 'saturday', 'when does school start', 'closing time'],
      keywords_mr: ['वेळ', 'कधी भरते', 'कधी सुटते', 'शाळेची वेळ', 'सुट्टी', 'रविवार', 'शनिवार', 'तासिका', 'टाइम'],
      answer_en: 'School timings are from 10:00 AM to 5:00 PM, Monday through Saturday. The school is closed on Sundays and official government holidays.',
      answer_mr: 'शाळेची वेळ सोमवार ते शनिवार सकाळी १०:०० ते संध्याकाळी ५:०० अशी आहे. दर रविवारी आणि शासकीय सुट्टीच्या दिवशी शाळा बंद असते.'
    },
    {
      id: 'admission',
      keywords_en: ['admission', 'admissions', 'enroll', 'enrollment', 'register', 'fees', 'fee', 'cost', 'documents', 'free', 'process', 'how to join'],
      keywords_mr: ['प्रवेश', 'ऍडमिशन', 'दाखला', 'कागदपत्रे', 'कागदपत्र', 'नाव नोंदणी', 'फी', 'मोफत', 'वयोमर्यादा'],
      answer_en: 'Education at Z.P.P.S. Bhingankhalsa is 100% free under the Right to Education (RTE)! Required documents: Child\'s Birth Certificate, Aadhaar Card, and passport-size photographs. Please visit the school office during school hours (10 AM to 5 PM) to enroll.',
      answer_mr: 'झेड.पी. प्राथमिक शाळा भिंगाण खालसा येथे शिक्षण पूर्णपणे मोफत आहे! प्रवेशासाठी विद्यार्थ्याचे आधार कार्ड, जन्म दाखला व पालकांचे छायाचित्र आवश्यक आहे. अधिक माहितीसाठी शाळेत संपर्क साधावा.'
    },
    {
      id: 'teachers',
      keywords_en: ['teacher', 'teachers', 'staff', 'faculty', 'headmistress', 'principal', 'bhujbal', 'lokhande', 'sir', 'madam', 'who teaches'],
      keywords_mr: ['शिक्षक', 'सर', 'मॅडम', 'मुख्याध्यापक', 'मुख्याध्यापिका', 'लोखंडे', 'भुजबळ', 'गुरुजी', 'कर्मचारी'],
      answer_en: 'Our dedicated teachers are Headmistress Mrs. Lokhande Sunita and Teacher Mr. Bhujbal. They bring loving mentorship, modern digital teaching methods, and personal attention to each student.',
      answer_mr: 'आमच्या शाळेत मुख्याध्यापिका सौ. लोखंडे सुनीता आणि शिक्षक श्री. भुजबळ सर अत्यंत आपुलकीने आणि तळमळीने विद्यार्थ्यांना शिकवतात.'
    },
    {
      id: 'meal',
      keywords_en: ['meal', 'meals', 'food', 'lunch', 'mid-day meal', 'midday', 'nutrition', 'poshan', 'diet', 'eat', 'kitchen', 'hot meal'],
      keywords_mr: ['जेवण', 'पोषण आहार', 'माध्यान्ह भोजन', 'खिचडी', 'दुपारचे जेवण', 'खाणे', 'अन्न', 'पोषण'],
      answer_en: 'Fresh, hot, and nutritious Mid-Day Meals are served free of charge every school day. Children practice proper 7-step handwashing with soap, recite a meal prayer, and enjoy healthy dal, rice, and fresh vegetables often harvested directly from our school organic garden.',
      answer_mr: 'शाळेत दररोज विद्यार्थ्यांना गरमागरम आणि पौष्टिक शालेय पोषण आहार (Mid-Day Meal) मोफत दिला जातो. स्वच्छ हात धुऊन एकत्र प्रार्थना करून विद्यार्थी भोजनाचा आनंद घेतात.'
    },
    {
      id: 'smartboard',
      keywords_en: ['smart board', 'computer', 'computers', 'digital', 'screen', 'tech', 'technology', 'multimedia', 'laptop', 'typing'],
      keywords_mr: ['स्मार्ट बोर्ड', 'डिजिटल', 'टीव्ही', 'संगणक', 'कॉम्प्युटर', 'स्क्रीन', 'तंत्रज्ञान', 'स्मार्ट क्लास'],
      answer_en: 'Our campus is equipped with an Interactive Smart Board and digital computing facilities. Guided by Mr. Bhujbal, students practice bilingual English & Marathi typing, interactive math games, and watch animated science lessons.',
      answer_mr: 'शाळेत आधुनिक इंटरअॅक्टिव्ह स्मार्ट बोर्ड आणि संगणक उपलब्ध आहेत! श्री. भुजबळ सर विद्यार्थ्यांकडून टायपिंग आणि डिजिटल अभ्यासाचा सराव करून घेतात.'
    },
    {
      id: 'activities',
      keywords_en: ['sports', 'ground', 'games', 'kabaddi', 'kho-kho', 'dance', 'dancing', 'lezim', 'singing', 'music', 'craft', 'crafts', 'art', 'activities', 'curriculum', 'extracurricular'],
      keywords_mr: ['खेळ', 'मैदान', 'कबड्डी', 'खो-खो', 'लेझीम', 'नृत्य', 'गाणी', 'हस्तकला', 'चित्रकला', 'उपक्रम', 'मातीकाम'],
      answer_en: 'Our students excel in sports like Kabaddi, Kho-Kho, and sprint drills; synchronized Lezim drills and folk dance; morning choral singing; clay sculpting; and hands-on science toys made from recyclables. They perform proudly at the Annual Gathering!',
      answer_mr: 'आमचे विद्यार्थी कबड्डी, खो-खो, लेझीम, लोकनृत्य, सुस्वर गायन, आणि हस्तकला-मातीकामात अत्यंत निष्णात आहेत!'
    },
    {
      id: 'garden',
      keywords_en: ['garden', 'nature', 'tree', 'trees', 'plants', 'vegetable', 'botany', 'eco', 'green', 'environment', 'kitchen garden'],
      keywords_mr: ['बाग', 'निसर्ग', 'वृक्षारोपण', 'झाडे', 'फुलझाडे', 'भाजीपाला', 'पर्यावरण'],
      answer_en: 'We cultivate an organic kitchen and flower garden tended lovingly by the students themselves. Children plant seeds, water flowers, and harvest healthy greens while learning hands-on environmental science.',
      answer_mr: 'शाळेत मुलांनी स्वतः फुलवलेली सुंदर पोषण बाग आहे. विद्यार्थी स्वतः झाडांची काळजी घेतात आणि सेंद्रिय शेती शिकतात.'
    },
    {
      id: 'standards',
      keywords_en: ['class', 'classes', 'standard', 'standards', 'grades', 'grade', '1 to 4', 'primary', 'which standards', 'levels'],
      keywords_mr: ['इयत्ता', 'वर्ग', 'पहिली', 'दुसरी', 'तिसरी', 'चौथी', 'कोणते वर्ग'],
      answer_en: 'Z.P.P.S. Bhingankhalsa provides schooling for Standards 1 through 4 (Ages 6 to 10). The medium of instruction is Marathi with strong foundational English vocabulary and conversational skills.',
      answer_mr: 'आमच्या शाळेत इयत्ता पहिली ते चौथीपर्यंत दर्जेदार शिक्षण दिले जाते.'
    },
    {
      id: 'location',
      keywords_en: ['address', 'location', 'where', 'village', 'route', 'ahilyanagar', 'ahmednagar', 'bhingan', 'karjat', 'contact', 'how to reach'],
      keywords_mr: ['पत्ता', 'कुठे आहे', 'गाव', 'भिंगाण', 'तालुका', 'जिल्हा', 'अहिल्यानगर', 'नगर', 'मार्ग'],
      answer_en: 'Our school is located in Village Bhingan Khalsa, Taluka Karjat, District Ahilyanagar (Ahmednagar), Maharashtra. We have a peaceful, tree-lined, secure rural campus.',
      answer_mr: 'शाळेचा पत्ता: जि. प. प्राथमिक शाळा, भिंगाण खालसा, तालुका कर्जत, जिल्हा अहिल्यानगर (अहमदनगर), महाराष्ट्र.'
    },
    {
      id: 'facilities',
      keywords_en: ['facilities', 'facility', 'toilet', 'toilets', 'water', 'drinking water', 'handwash', 'ramp', 'building', 'safety', 'hygiene'],
      keywords_mr: ['सुविधा', 'हात धुणे', 'पाणी', 'रॅम्प', 'शौचालय', 'स्वच्छता', 'इमारत'],
      answer_en: 'Facilities include clean filtered drinking water, a dedicated multi-tap handwashing station, separate clean restrooms for boys and girls, and a barrier-free access ramp for easy accessibility.',
      answer_mr: 'शाळेत स्वच्छ पिण्याचे पाणी, हात धुण्याची जागा, स्वतंत्र स्वच्छतागृहे आणि रॅम्प सुविधा उपलब्ध आहे.'
    },
    {
      id: 'greeting',
      keywords_en: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'],
      keywords_mr: ['नमस्कार', 'हॅलो', 'हाय', 'सुप्रभात'],
      answer_en: 'Hello! A warm welcome to Z.P.P.S. Bhingankhalsa Voice Assistant. How can I help you today?',
      answer_mr: 'सस्नेह नमस्कार! मी झेड.पी. प्राथमिक शाळा भिंगाण खालसाचा व्हॉईस सहाय्यक आहे. मी तुम्हाला कशी मदत करू?'
    },
    {
      id: 'thanks',
      keywords_en: ['thank you', 'thanks', 'great', 'awesome', 'nice', 'helpful'],
      keywords_mr: ['धन्यवाद', 'थँक्यू', 'आभार', 'छान'],
      answer_en: 'You\'re very welcome! We are always delighted to help. Please feel free to ask any other questions, or come visit our campus!',
      answer_mr: 'आपले मनःपूर्वक स्वागत आहे! काही शंका असल्यास नक्की विचारा.'
    }
  ];

  // Fallbacks
  const FALLBACK_EN = 'I\'m sorry, I don\'t have specific details on that question. Please visit our school between 10:00 AM and 5:00 PM to speak with Headmistress Mrs. Lokhande or Teacher Mr. Bhujbal, or tap one of the suggested topics below.';
  const FALLBACK_MR = 'माफ करा, या प्रश्नाबद्दल मला पूर्ण माहिती नाही. कृपया शाळेत सकाळी १० ते ५ या वेळेत मुख्याध्यापिका सौ. लोखंडे मॅडम किंवा भुजबळ सर यांच्याशी संपर्क साधा.';

  // State: Default to English ('en')
  let currentLang = 'en';
  let isVoiceMuted = false;
  let isListening = false;
  let recognition = null;

  // 2. SPEECH RECOGNITION SETUP
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSpeechSupported = !!SpeechRecognition;

  function initSpeechRecognition() {
    if (!isSpeechSupported) return null;
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      isListening = true;
      updateListeningUI(true);
    };

    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && transcript.trim()) {
        handleUserMessage(transcript);
      }
    };

    rec.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      isListening = false;
      updateListeningUI(false);
      if (event.error === 'not-allowed') {
        const msg = currentLang === 'en'
          ? 'Microphone permission was denied. Please allow microphone access or type your question below.'
          : 'मायक्रोफोन परवानगी नाकारली गेली आहे. कृपया परवानगी द्या किंवा टाईप करा.';
        addMessage('bot', msg, false);
      }
    };

    rec.onend = () => {
      isListening = false;
      updateListeningUI(false);
    };

    return rec;
  }

  // 3. TEXT-TO-SPEECH (TTS)
  function speakResponse(text) {
    if (isVoiceMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop prior speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'en' ? 'en-IN' : 'mr-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick best available voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length) {
      if (currentLang === 'en') {
        const enInVoice = voices.find(v => v.lang === 'en-IN' || (v.lang && v.lang.includes('India') && v.lang.startsWith('en')));
        const enUsVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB' || v.lang.startsWith('en'));
        if (enInVoice) utterance.voice = enInVoice;
        else if (enUsVoice) utterance.voice = enUsVoice;
      } else {
        const mrVoice = voices.find(v => v.lang && (v.lang.startsWith('mr') || v.lang.includes('Marathi')));
        const hiVoice = voices.find(v => v.lang && v.lang.startsWith('hi'));
        if (mrVoice) utterance.voice = mrVoice;
        else if (hiVoice) utterance.voice = hiVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  }

  // 4. KNOWLEDGE MATCHER
  function matchAnswer(userInput) {
    const text = userInput.toLowerCase().trim();
    let bestMatch = null;
    let highestScore = 0;

    BOT_KNOWLEDGE.forEach(item => {
      const keywords = currentLang === 'en' ? item.keywords_en : item.keywords_mr;
      let score = 0;

      keywords.forEach(kw => {
        const kwLower = kw.toLowerCase();
        if (text.includes(kwLower)) {
          score += kwLower.length >= 4 ? 3 : 2;
        }
      });

      // Also check cross-language keywords
      const altKeywords = currentLang === 'en' ? item.keywords_mr : item.keywords_en;
      altKeywords.forEach(kw => {
        if (text.includes(kw.toLowerCase())) {
          score += 1.5;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch && highestScore > 0) {
      return currentLang === 'en' ? bestMatch.answer_en : bestMatch.answer_mr;
    }
    return currentLang === 'en' ? FALLBACK_EN : FALLBACK_MR;
  }

  // 5. INJECT DOM ELEMENTS
  function createWidgetDOM() {
    // Child-Drawn Robot Launcher
    const launcher = document.createElement('div');
    launcher.className = 'child-robot-launcher';
    launcher.id = 'schoolBotLauncher';
    launcher.setAttribute('role', 'button');
    launcher.setAttribute('tabindex', '0');
    launcher.setAttribute('aria-label', 'Click to activate voice assistant');
    launcher.innerHTML = `
      <div class="child-robot-bubble" aria-hidden="true">
        <span>Hi! Talk to me 🎙️</span>
      </div>
      <div class="child-robot-svg-wrap">
        <svg viewBox="0 0 100 110" class="child-robot-svg" aria-hidden="true">
          <!-- Antenna Stem & Glowing Bulb -->
          <path d="M 50 25 Q 47 17 50 12 Q 53 7 50 5" fill="none" stroke="#082d45" stroke-width="3.5" stroke-linecap="round"/>
          <circle class="robot-antenna-bulb" cx="50" cy="5" r="5" fill="#ffdc79" stroke="#082d45" stroke-width="2.5"/>

          <!-- Side Ear Bolts -->
          <rect x="18" y="34" width="7" height="12" rx="3.5" fill="#348fc5" stroke="#082d45" stroke-width="2.5"/>
          <rect x="75" y="34" width="7" height="12" rx="3.5" fill="#348fc5" stroke="#082d45" stroke-width="2.5"/>

          <!-- Head (Hand-drawn rounded box) -->
          <rect x="24" y="24" width="52" height="36" rx="9" fill="#ffdc79" stroke="#082d45" stroke-width="3.5"/>

          <!-- Big Cute Eyes (with blink animation) -->
          <g class="robot-eyes">
            <circle cx="39" cy="38" r="6.5" fill="#ffffff" stroke="#082d45" stroke-width="2.5"/>
            <circle cx="40" cy="38" r="3" fill="#082d45"/>
            <circle cx="41.5" cy="36.5" r="1.3" fill="#ffffff"/>

            <circle cx="61" cy="38" r="6.5" fill="#ffffff" stroke="#082d45" stroke-width="2.5"/>
            <circle cx="60" cy="38" r="3" fill="#082d45"/>
            <circle cx="61.5" cy="36.5" r="1.3" fill="#ffffff"/>
          </g>

          <!-- Rosy Cheeks -->
          <ellipse cx="32" cy="46" rx="3.5" ry="2" fill="#ff8ba7" opacity="0.85"/>
          <ellipse cx="68" cy="46" rx="3.5" ry="2" fill="#ff8ba7" opacity="0.85"/>

          <!-- Happy Smile Curve -->
          <path d="M 40 48 Q 50 56 60 48" fill="none" stroke="#082d45" stroke-width="3" stroke-linecap="round"/>

          <!-- Neck -->
          <rect x="45" y="60" width="10" height="4" fill="#348fc5" stroke="#082d45" stroke-width="2"/>

          <!-- Body / Chest -->
          <rect x="28" y="64" width="44" height="29" rx="7" fill="#ddf2fa" stroke="#082d45" stroke-width="3.5"/>

          <!-- Heart & Dials drawn on chest -->
          <path d="M 39 72 C 39 69 34 69 34 72 C 34 75 39 78 39 79 C 39 78 44 75 44 72 C 44 69 39 69 39 72 Z" fill="#ef4444" stroke="#082d45" stroke-width="1.5"/>
          <circle cx="52" cy="73" r="3" fill="#ffdc79" stroke="#082d45" stroke-width="1.5"/>
          <circle cx="60" cy="73" r="3" fill="#1cb5be" stroke="#082d45" stroke-width="1.5"/>
          <line x1="47" y1="82" x2="62" y2="82" stroke="#082d45" stroke-width="2" stroke-linecap="round"/>
          <line x1="47" y1="86" x2="57" y2="86" stroke="#082d45" stroke-width="2" stroke-linecap="round"/>

          <!-- Left Arm -->
          <path d="M 28 68 Q 16 73 20 84" fill="none" stroke="#082d45" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="21" cy="85" r="3.5" fill="#348fc5" stroke="#082d45" stroke-width="2"/>

          <!-- Right Arm (Waving Hello) -->
          <g class="robot-waving-arm">
            <path d="M 72 68 Q 84 62 86 50" fill="none" stroke="#082d45" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="86" cy="49" r="3.5" fill="#348fc5" stroke="#082d45" stroke-width="2"/>
          </g>

          <!-- Little Feet -->
          <rect x="36" y="93" width="10" height="9" rx="3" fill="#348fc5" stroke="#082d45" stroke-width="2.5"/>
          <rect x="54" y="93" width="10" height="9" rx="3" fill="#348fc5" stroke="#082d45" stroke-width="2.5"/>
        </svg>
      </div>
    `;

    // Chat Window
    const win = document.createElement('div');
    win.className = 'school-bot-window';
    win.id = 'schoolBotWindow';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'School Voice Assistant');
    win.innerHTML = `
      <!-- Header -->
      <div class="bot-header">
        <div class="bot-header-left">
          <div class="bot-avatar">
            <img src="assets/school-logo.png" alt="School Emblem">
            <span class="bot-status-dot" title="Online"></span>
          </div>
          <div class="bot-header-info">
            <h4>Voice Assistant</h4>
            <p>Z.P.P.S. Bhingankhalsa · Online</p>
          </div>
        </div>
        <div class="bot-header-controls">
          <div class="bot-lang-switch" role="group" aria-label="Choose Language">
            <button class="bot-lang-btn is-active" id="botLangEn" type="button">ENG</button>
            <button class="bot-lang-btn" id="botLangMr" type="button">मराठी</button>
          </div>
          <button class="bot-control-btn" id="botVoiceMuteBtn" type="button" aria-label="Toggle voice sound" title="Mute/Unmute Voice">
            🔊
          </button>
          <button class="bot-control-btn" id="botMinimizeBtn" type="button" aria-label="Minimize Assistant" title="Minimize">
            —
          </button>
          <button class="bot-control-btn" id="botCloseBtn" type="button" aria-label="Close Assistant" title="Close">
            ✕
          </button>
        </div>
      </div>

      <!-- Listening wave banner -->
      <div class="bot-listening-strip" id="botListeningStrip">
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="bot-wave-anim">
            <span class="bot-wave-bar"></span>
            <span class="bot-wave-bar"></span>
            <span class="bot-wave-bar"></span>
            <span class="bot-wave-bar"></span>
          </div>
          <span id="botListeningStatusText">Listening... speak now</span>
        </div>
        <button class="bot-stop-mic-btn" id="botStopMicBtn" type="button">Stop</button>
      </div>

      <!-- Messages Body -->
      <div class="bot-body" id="botMsgBody">
        <!-- Messages will be injected here -->
      </div>

      <!-- Quick Question Pills -->
      <div style="padding: 0 14px 8px; background: #f7fbfe;" id="botQuickPillsWrap">
        <div class="bot-quick-pills" id="botQuickPills">
          <!-- Pills will be rendered based on language -->
        </div>
      </div>

      <!-- Footer / Input -->
      <form class="bot-footer" id="botInputForm">
        <input class="bot-input-field" id="botInputField" type="text" placeholder="Type your question or click the mic to speak..." autocomplete="off">
        <button class="bot-action-icon-btn bot-mic-btn" id="botMicActionBtn" type="button" aria-label="Voice input with microphone" title="Click to speak">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </button>
        <button class="bot-action-icon-btn bot-send-btn" type="submit" aria-label="Send question">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(win);
  }

  // 6. UI HELPERS
  function addMessage(sender, text, shouldSpeak = true) {
    const body = document.getElementById('botMsgBody');
    if (!body) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isUser = sender === 'user';

    const msgEl = document.createElement('div');
    msgEl.className = `bot-msg ${isUser ? 'is-user' : 'is-bot'}`;

    const avatarHtml = isUser
      ? `<div class="bot-msg-avatar">You</div>`
      : `<div class="bot-msg-avatar">Z.P.</div>`;

    const replayBtnHtml = !isUser && !isVoiceMuted
      ? `<button class="bot-speak-replay-btn" type="button" data-text="${encodeURIComponent(text)}" title="Listen again">
           🔊 ${currentLang === 'en' ? 'Listen' : 'ऐका'}
         </button>`
      : '';

    msgEl.innerHTML = `
      ${avatarHtml}
      <div class="bot-msg-content">
        <div class="bot-msg-text">${text}</div>
        ${replayBtnHtml}
        <div class="bot-msg-time">${timeStr}</div>
      </div>
    `;

    body.appendChild(msgEl);
    body.scrollTop = body.scrollHeight;

    if (!isUser && shouldSpeak) {
      speakResponse(text);
    }
  }

  function renderQuickPills() {
    const container = document.getElementById('botQuickPills');
    if (!container) return;

    const pills_en = [
      'What are the school timings?',
      'How to get admission?',
      'Who are the teachers?',
      'Mid-Day Meal details?',
      'Smart Board & tech?',
      'Sports & activities?'
    ];

    const pills_mr = [
      'शाळेची वेळ काय आहे?',
      'प्रवेश कसा घ्यावा?',
      'शिक्षक कोण आहेत?',
      'शालेय पोषण आहार?',
      'स्मार्ट बोर्ड व संगणक',
      'खेळ आणि उपक्रम'
    ];

    const list = currentLang === 'en' ? pills_en : pills_mr;
    container.innerHTML = list.map(p => `
      <button class="bot-quick-pill" type="button" data-q="${p}">${p}</button>
    `).join('');
  }

  function renderWelcomeMessage() {
    const body = document.getElementById('botMsgBody');
    if (!body) return;
    body.innerHTML = ''; // clear

    const welcome = currentLang === 'en'
      ? 'Hello! Welcome to Z.P.P.S. Bhingankhalsa. 🎙️\nI am your School Voice Assistant. Click the microphone to speak, or type any question below!'
      : 'सस्नेह नमस्कार! मी झेड.पी. प्राथमिक शाळा भिंगाण खालसाचा व्हॉईस सहाय्यक आहे. 🎙️\nमायक्रोफोनवर क्लिक करून बोला किंवा प्रश्न टाइप करा!';

    addMessage('bot', welcome, false);
    renderQuickPills();
  }

  function updateListeningUI(active) {
    const strip = document.getElementById('botListeningStrip');
    const micBtn = document.getElementById('botMicActionBtn');
    const statusText = document.getElementById('botListeningStatusText');

    if (strip) {
      strip.classList.toggle('is-active', active);
    }
    if (micBtn) {
      micBtn.classList.toggle('is-recording', active);
    }
    if (statusText) {
      statusText.textContent = currentLang === 'en' ? 'Listening... speak now' : 'ऐकत आहे... बोला';
    }
  }

  function toggleVoiceMute() {
    isVoiceMuted = !isVoiceMuted;
    const btn = document.getElementById('botVoiceMuteBtn');
    if (btn) {
      btn.textContent = isVoiceMuted ? '🔇' : '🔊';
      btn.title = isVoiceMuted ? 'Unmute voice' : 'Mute voice';
    }
    if (isVoiceMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function handleUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    addMessage('user', trimmed, false);

    // Stop speech recognition if listening
    if (recognition && isListening) {
      try { recognition.stop(); } catch (e) {}
    }

    // Bot response
    setTimeout(() => {
      const answer = matchAnswer(trimmed);
      addMessage('bot', answer, true);
    }, 350);
  }

  // 7. EVENT ATTACHMENTS
  function initEvents() {
    const launcher = document.getElementById('schoolBotLauncher');
    const win = document.getElementById('schoolBotWindow');
    const closeBtn = document.getElementById('botCloseBtn');
    const minimizeBtn = document.getElementById('botMinimizeBtn');
    const form = document.getElementById('botInputForm');
    const input = document.getElementById('botInputField');
    const micBtn = document.getElementById('botMicActionBtn');
    const stopMicBtn = document.getElementById('botStopMicBtn');
    const muteBtn = document.getElementById('botVoiceMuteBtn');
    const langEn = document.getElementById('botLangEn');
    const langMr = document.getElementById('botLangMr');
    const body = document.getElementById('botMsgBody');
    const pillsWrap = document.getElementById('botQuickPills');

    function toggleAssistant() {
      const isOpen = win.classList.toggle('is-open');
      if (isOpen) {
        input.focus();
      } else {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        if (recognition && isListening) recognition.stop();
      }
    }

    function closeAssistant() {
      win.classList.remove('is-open');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (recognition && isListening) recognition.stop();
    }

    // Toggle on robot click
    launcher.addEventListener('click', toggleAssistant);
    launcher.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAssistant();
      }
    });

    // Minimize & close buttons
    if (minimizeBtn) minimizeBtn.addEventListener('click', closeAssistant);
    closeBtn.addEventListener('click', closeAssistant);

    // Mute toggle
    muteBtn.addEventListener('click', toggleVoiceMute);

    // Language switch
    langEn.addEventListener('click', () => {
      if (currentLang === 'en') return;
      currentLang = 'en';
      langEn.classList.add('is-active');
      langMr.classList.remove('is-active');
      input.placeholder = 'Type your question or click the mic to speak...';
      if (recognition) recognition.lang = 'en-IN';
      renderWelcomeMessage();
    });

    langMr.addEventListener('click', () => {
      if (currentLang === 'mr') return;
      currentLang = 'mr';
      langMr.classList.add('is-active');
      langEn.classList.remove('is-active');
      input.placeholder = 'प्रश्न टाइप करा किंवा माइक दाबा...';
      if (recognition) recognition.lang = 'mr-IN';
      renderWelcomeMessage();
    });

    // Send text
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value;
      input.value = '';
      handleUserMessage(val);
    });

    // Mic action
    recognition = initSpeechRecognition();
    if (recognition) recognition.lang = 'en-IN';

    micBtn.addEventListener('click', () => {
      if (!isSpeechSupported) {
        alert(currentLang === 'en'
          ? 'Voice input is not supported in your current browser. Please type your question.'
          : 'तुमच्या ब्राउझरमध्ये व्हॉईस समर्थित नाही. कृपया टाइप करा.');
        return;
      }

      if (isListening) {
        recognition.stop();
      } else {
        recognition.lang = currentLang === 'en' ? 'en-IN' : 'mr-IN';
        try {
          recognition.start();
        } catch (err) {
          console.warn('Recognition start error:', err);
        }
      }
    });

    stopMicBtn.addEventListener('click', () => {
      if (recognition && isListening) recognition.stop();
    });

    // Replay voice click
    body.addEventListener('click', (e) => {
      const btn = e.target.closest('.bot-speak-replay-btn');
      if (btn) {
        const text = decodeURIComponent(btn.dataset.text || '');
        if (text) speakResponse(text);
      }
    });

    // Quick pills click
    pillsWrap.addEventListener('click', (e) => {
      const pill = e.target.closest('.bot-quick-pill');
      if (pill) {
        const q = pill.dataset.q;
        if (q) handleUserMessage(q);
      }
    });

    // Preload speech synthesis voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  // 8. INITIALIZE ON DOM READY
  function init() {
    createWidgetDOM();
    initEvents();
    renderWelcomeMessage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
