/* ============================================================
   STATE
============================================================ */
const state = {
  lang: 'en',
  scale: 1,
  mode: 'patient',
  patient: {
    name:'Deepika Devi', age:68, gender:'female', village:'Sonapur', district:'Kamrup', state:'Assam',
    contact:'+91 98000 00000', emergency:'Rina Devi (Daughter) · +91 90000 00000',
    severity:'mild', diagnosis:'2024-03-10', conditions:'Hypertension; mild hearing loss', prefLang:'as'
  },
  reminders: [
    {id:'med', label:{en:'Take morning medicine',as:'ৰাতিপুৱাৰ ঔষধ খাওক',bn:'সকালের ওষুধ খান',ne:'बिहानको औषधि खानुहोस्'}, time:'8:00 AM', done:true},
    {id:'water', label:{en:'Drink a glass of water',as:'এগিলাচ পানী খাওক',bn:'এক গ্লাস জল পান করুন',ne:'एक गिलास पानी पिउनुहोस्'}, time:'10:30 AM', done:false},
    {id:'walk', label:{en:'Short walk in the garden',as:'বাগিচাত অলপ খোজ কাঢ়ক',bn:'বাগানে হাঁটুন', ne:'बगैंचामा छोटो हिँडाइ'}, time:'4:00 PM', done:false},
    {id:'appt', label:{en:'Video call with Dr. Rina',as:'ডাঃ ৰিনাৰ সৈতে ভিডিঅ' , bn:'ডাঃ রিনার সাথে ভিডিও কল', ne:'डा. रिनासँग भिडियो कल'}, time:'6:00 PM', done:false},
  ],
  weeklyTasks: [
    {day:'Mon', label:{en:'Physiotherapy session',as:'ফিজিঅ' , bn:'ফিজিওথেরাপি সেশন', ne:'फिजियोथेरापी सत्र'}, done:true},
    {day:'Wed', label:{en:'Family video call',as:'পৰিয়ালৰ সৈতে ভিডিঅ কল',bn:'পরিবারের সাথে ভিডিও কল',ne:'परिवारसँग भिडियो कल'}, done:false},
    {day:'Fri', label:{en:'Visit from community health worker',as:'স্বাস্থ্যকৰ্মীৰ পৰিদৰ্শন',bn:'স্বাস্থ্যকর্মীর পরিদর্শন',ne:'स्वास्थ्यकर्मीको भ्रमण'}, done:false},
    {day:'Sun', label:{en:'Community gathering / temple visit',as:'সামূহিক অনুষ্ঠান',bn:'সামাজিক অনুষ্ঠান',ne:'सामुदायिक भेला'}, done:false},
  ],
  games: {
    memory: {level:1, plays:0, bestMoves:null},
    pattern: {level:1, plays:0, bestLevel:0},
    quiz: {level:1, plays:0, correct:0}
  },
  scores: {total:0, best:{memory:0,pattern:0,quiz:0}, history:[]},
  weeklyEngagement: [3,4,2,5,4,6,3],
  sessionsToday: 0,
  activityLog: []
};
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ============================================================
   I18N  (core keys fully covered in en/as/bn/ne; other NER
   languages cover navigation + headings, falling back to
   English for deeper content)
============================================================ */
const I18N = {
  en:{ tagline:"Cognitive care for NER's elders", modePatient:"Patient", modeProfile:"Profile", modeScores:"Scores", modeCaregiver:"Caregiver", offline:"Offline-ready",
    remindersHead:"Today's reminders", tapDone:"Tap when done", weeklyHead:"This week's tasks", weeklyHint:"Family visits, appointments & more",
    gamesHead:"Cognitive activities", gamesHint:"Choose a level to begin",
    cgOverview:"Patient overview", cgLastSync:"Last synced just now", cgStreak:"Day activity streak", cgSessions:"Sessions today",
    cgCompliance:"Reminder compliance (7d)", cgLevel:"Avg. difficulty level", cgChartHead:"Weekly cognitive engagement",
    cgAlertsHead:"Alerts", cgLogHead:"Recent activity log", logTime:"Time", logActivity:"Activity", logResult:"Result",
    cgDifficultyHead:"Baseline difficulty", easy:"Gentle", hard:"Challenging",
    footerNote:"Smriti Sahay — a prototype cognitive care platform for elderly dementia support across the North Eastern Region. Built for Smart India Hackathon.",
    greet:"Good morning, Deepika",
    gameMemoryTitle:"Memory Match", gameMemoryDesc:"Find matching pairs of familiar objects.",
    gamePatternTitle:"Pattern Recall", gamePatternDesc:"Watch the sequence, then repeat it.",
    gameQuizTitle:"Daily Routine Recall", gameQuizDesc:"Remember the order of your day.",
    level:"Level", close:"Close", moves:"Moves", matches:"Matches", start:"Start", watch:"Watch",
    yourTurn:"Your turn", correct:"Well done!", wrong:"Not quite — try again", nextRound:"Next round",
    playAgain:"Play again", finish:"Finish", question:"Question", of:"of",
    pickLevel:"Choose a level", levelEasyName:"Easy", levelMediumName:"Medium", levelHardName:"Hard",
    levelEasyDesc:"Fewer items, more time to recall", levelMediumDesc:"A balanced everyday challenge", levelHardDesc:"For a sharper daily-life workout",
    pointsEarned:"Points earned",
    profileHead:"Patient profile", profileSub:"Bio-data, diagnosis & demographics",
    profileName:"Full name", profileAge:"Age", profileGender:"Gender", genderF:"Female", genderM:"Male", genderO:"Other",
    profileVillage:"Village / Town", profileDistrict:"District", profileState:"State", profileContact:"Contact number",
    profileEmergency:"Emergency contact", profileSeverity:"Dementia severity", profileDiagnosisDate:"Diagnosis date",
    profilePreferredLang:"Preferred language", profileConditions:"Known conditions / allergies", profileSave:"Save profile", profileSaved:"Saved ✓",
    severityMild:"Mild", severityModerate:"Moderate", severitySevere:"Severe",
    scoresHead:"Scoreboard", scoresHint:"Points build up as activities are completed", totalPoints:"Total points",
    recentScores:"Recent scores", tipsHead:"Tips to improve scores", recommendedHead:"Recommended activities",
    recoMild:"Suggestions for mild-stage dementia", recoModerate:"Suggestions for moderate-stage dementia", recoSevere:"Suggestions for severe-stage dementia",
    yrs:"yrs"
  },
  as:{ tagline:"NER-ৰ বয়োজ্যেষ্ঠসকলৰ বাবে চিন্তামুক্ত যত্ন", modePatient:"ৰোগী", modeProfile:"প্ৰ'ফাইল", modeScores:"স্ক'ৰ", modeCaregiver:"যত্নকাৰী", offline:"অফলাইন-প্ৰস্তুত",
    remindersHead:"আজিৰ কামবোৰ", tapDone:"হ'লে টিপক", weeklyHead:"এই সপ্তাহৰ কাম", weeklyHint:"পৰিয়াল পৰিদৰ্শন, সাক্ষাৎকাৰ আৰু আন",
    gamesHead:"মনৰ খেল", gamesHint:"এটা স্তৰ বাছক",
    cgOverview:"ৰোগীৰ অৱস্থা", cgLastSync:"এতিয়াই আপডেট হ'ল", cgStreak:"ধাৰাবাহিক দিন", cgSessions:"আজিৰ খেল",
    cgCompliance:"পালন হাৰ (৭ দিন)", cgLevel:"গড় স্তৰ", cgChartHead:"সাপ্তাহিক মনৰ কাম",
    cgAlertsHead:"সতৰ্কবাণী", cgLogHead:"শেহতীয়া কাম", logTime:"সময়", logActivity:"কাম", logResult:"ফলাফল",
    cgDifficultyHead:"মূল স্তৰ", easy:"সহজ", hard:"কঠিন",
    footerNote:"স্মৃতি সহায় — উত্তৰ-পূৱ অঞ্চলৰ বয়োজ্যেষ্ঠসকলৰ বাবে এক প্ৰটোটাইপ। Smart India Hackathon-ৰ বাবে সাজিছোঁ।",
    greet:"শুভ ৰাতিপুৱা, দীপিকা",
    gameMemoryTitle:"মিলাই লওক", gameMemoryDesc:"চিনাকি বস্তুৰ যোৰা বিচাৰক।",
    gamePatternTitle:"ধৰণ মনত ৰাখক", gamePatternDesc:"ক্ৰমটো চাওক, তাৰপাছত পুনৰাবৃত্তি কৰক।",
    gameQuizTitle:"দিনটোৰ কাম মনত পেলাওক", gameQuizDesc:"দিনটোৰ ক্ৰম মনত ৰাখক।",
    level:"স্তৰ", close:"বন্ধ কৰক", moves:"চাল", matches:"মিল", start:"আৰম্ভ কৰক", watch:"চাওক",
    yourTurn:"আপোনাৰ পাল", correct:"বহুত ভাল!", wrong:"নহ'ল — আকৌ চেষ্টা কৰক", nextRound:"পিছৰ ৰাউণ্ড",
    playAgain:"আকৌ খেলক", finish:"শেষ", question:"প্ৰশ্ন", of:"ৰ",
    pickLevel:"এটা স্তৰ বাছক", levelEasyName:"সহজ", levelMediumName:"মধ্যম", levelHardName:"কঠিন",
    levelEasyDesc:"কম বস্তু, বেছি সময়", levelMediumDesc:"সমতুল্য প্ৰতিদিনৰ প্ৰত্যাহ্বান", levelHardDesc:"অধিক অনুশীলনৰ বাবে",
    pointsEarned:"পোৱা পইণ্ট",
    profileHead:"ৰোগীৰ প্ৰ'ফাইল", profileSub:"বায়'-ডাটা, ৰোগ নিৰ্ণয় আৰু বিৱৰণ",
    profileName:"সম্পূৰ্ণ নাম", profileAge:"বয়স", profileGender:"লিংগ", genderF:"মহিলা", genderM:"পুৰুষ", genderO:"আন",
    profileVillage:"গাঁও / নগৰ", profileDistrict:"জিলা", profileState:"ৰাজ্য", profileContact:"যোগাযোগ নম্বৰ",
    profileEmergency:"জৰুৰীকালীন যোগাযোগ", profileSeverity:"ডিমেনচিয়াৰ মাত্ৰা", profileDiagnosisDate:"ৰোগ নিৰ্ণয়ৰ তাৰিখ",
    profilePreferredLang:"পছন্দৰ ভাষা", profileConditions:"জ্ঞাত ৰোগ / এলাৰ্জী", profileSave:"প্ৰ'ফাইল ছেভ কৰক", profileSaved:"ছেভ হ'ল ✓",
    severityMild:"লঘু", severityModerate:"মধ্যম", severitySevere:"গুৰুতৰ",
    scoresHead:"স্ক'ৰবৰ্ড", scoresHint:"কাম কৰাৰ লগে লগে পইণ্ট বাঢ়ে", totalPoints:"মুঠ পইণ্ট",
    recentScores:"শেহতীয়া স্ক'ৰ", tipsHead:"স্ক'ৰ বঢ়াবলৈ টিপছ", recommendedHead:"পৰামৰ্শিত কাম",
    recoMild:"লঘু পৰ্যায়ৰ বাবে পৰামৰ্শ", recoModerate:"মধ্যম পৰ্যায়ৰ বাবে পৰামৰ্শ", recoSevere:"গুৰুতৰ পৰ্যায়ৰ বাবে পৰামৰ্শ",
    yrs:"বছৰ"
  },
  bn:{ tagline:"উত্তর-পূর্বের প্রবীণদের জন্য যত্ন", modePatient:"রোগী", modeProfile:"প্রোফাইল", modeScores:"স্কোর", modeCaregiver:"পরিচর্যাকারী", offline:"অফলাইন-প্রস্তুত",
    remindersHead:"আজকের কাজ", tapDone:"হলে চাপুন", weeklyHead:"এই সপ্তাহের কাজ", weeklyHint:"পারিবারিক সাক্ষাৎ, অ্যাপয়েন্টমেন্ট ও আরও",
    gamesHead:"মন-মস্তিষ্কের খেলা", gamesHint:"একটি স্তর বেছে নিন",
    cgOverview:"রোগীর অবস্থা", cgLastSync:"এইমাত্র হালনাগাদ হয়েছে", cgStreak:"টানা দিনের কার্যকলাপ", cgSessions:"আজকের সেশন",
    cgCompliance:"পালনের হার (৭ দিন)", cgLevel:"গড় স্তর", cgChartHead:"সাপ্তাহিক মানসিক কার্যকলাপ",
    cgAlertsHead:"সতর্কতা", cgLogHead:"সাম্প্রতিক কার্যকলাপ", logTime:"সময়", logActivity:"কাজ", logResult:"ফলাফল",
    cgDifficultyHead:"মূল স্তর", easy:"সহজ", hard:"কঠিন",
    footerNote:"স্মৃতি সহায় — উত্তর-পূর্বাঞ্চলের প্রবীণদের জন্য একটি প্রোটোটাইপ। Smart India Hackathon-এর জন্য তৈরি।",
    greet:"শুভ সকাল, দীপিকা",
    gameMemoryTitle:"মিল খুঁজুন", gameMemoryDesc:"পরিচিত বস্তুর জোড়া খুঁজুন।",
    gamePatternTitle:"ধরণ মনে রাখুন", gamePatternDesc:"ক্রমটি দেখুন, তারপর পুনরাবৃত্তি করুন।",
    gameQuizTitle:"দৈনন্দিন রুটিন মনে রাখা", gameQuizDesc:"দিনের ক্রম মনে রাখুন।",
    level:"স্তর", close:"বন্ধ করুন", moves:"চাল", matches:"মিল", start:"শুরু করুন", watch:"দেখুন",
    yourTurn:"আপনার পালা", correct:"চমৎকার!", wrong:"ঠিক হয়নি — আবার চেষ্টা করুন", nextRound:"পরবর্তী রাউন্ড",
    playAgain:"আবার খেলুন", finish:"শেষ", question:"প্রশ্ন", of:"এর",
    pickLevel:"একটি স্তর বেছে নিন", levelEasyName:"সহজ", levelMediumName:"মাঝারি", levelHardName:"কঠিন",
    levelEasyDesc:"কম আইটেম, বেশি সময়", levelMediumDesc:"সুষম দৈনন্দিন চ্যালেঞ্জ", levelHardDesc:"আরও অনুশীলনের জন্য",
    pointsEarned:"অর্জিত পয়েন্ট",
    profileHead:"রোগীর প্রোফাইল", profileSub:"বায়ো-ডেটা, নির্ণয় ও জনতাত্ত্বিক তথ্য",
    profileName:"পুরো নাম", profileAge:"বয়স", profileGender:"লিঙ্গ", genderF:"মহিলা", genderM:"পুরুষ", genderO:"অন্যান্য",
    profileVillage:"গ্রাম / শহর", profileDistrict:"জেলা", profileState:"রাজ্য", profileContact:"যোগাযোগ নম্বর",
    profileEmergency:"জরুরি যোগাযোগ", profileSeverity:"ডিমেনশিয়ার মাত্রা", profileDiagnosisDate:"নির্ণয়ের তারিখ",
    profilePreferredLang:"পছন্দের ভাষা", profileConditions:"জ্ঞাত রোগ / অ্যালার্জি", profileSave:"প্রোফাইল সংরক্ষণ করুন", profileSaved:"সংরক্ষিত ✓",
    severityMild:"মৃদু", severityModerate:"মাঝারি", severitySevere:"গুরুতর",
    scoresHead:"স্কোরবোর্ড", scoresHint:"কাজ করার সাথে সাথে পয়েন্ট বাড়ে", totalPoints:"মোট পয়েন্ট",
    recentScores:"সাম্প্রতিক স্কোর", tipsHead:"স্কোর বাড়ানোর টিপস", recommendedHead:"প্রস্তাবিত কার্যকলাপ",
    recoMild:"মৃদু পর্যায়ের জন্য পরামর্শ", recoModerate:"মাঝারি পর্যায়ের জন্য পরামর্শ", recoSevere:"গুরুতর পর্যায়ের জন্য পরামর্শ",
    yrs:"বছর"
  },
  ne:{ tagline:"पूर्वोत्तरका ज्येष्ठ नागरिकहरूको लागि हेरचाह", modePatient:"बिरामी", modeProfile:"प्रोफाइल", modeScores:"स्कोर", modeCaregiver:"स्याहारकर्ता", offline:"अफलाइन-तयार",
    remindersHead:"आजका सम्झना", tapDone:"भएपछि थिच्नुहोस्", weeklyHead:"यो हप्ताका कामहरू", weeklyHint:"पारिवारिक भेट, अपोइन्टमेन्ट र थप",
    gamesHead:"स्मृति अभ्यासहरू", gamesHint:"एउटा स्तर छान्नुहोस्",
    cgOverview:"बिरामीको अवस्था", cgLastSync:"भर्खरै अद्यावधिक भयो", cgStreak:"लगातार दिनको गतिविधि", cgSessions:"आजका सत्रहरू",
    cgCompliance:"पालना दर (७ दिन)", cgLevel:"औसत स्तर", cgChartHead:"साप्ताहिक स्मृति गतिविधि",
    cgAlertsHead:"सतर्कता", cgLogHead:"हालैको गतिविधि", logTime:"समय", logActivity:"गतिविधि", logResult:"नतिजा",
    cgDifficultyHead:"आधारभूत स्तर", easy:"सजिलो", hard:"चुनौतीपूर्ण",
    footerNote:"स्मृति सहाय — पूर्वोत्तर क्षेत्रका ज्येष्ठ नागरिकहरूको लागि एक प्रोटोटाइप। Smart India Hackathon को लागि निर्मित।",
    greet:"शुभ बिहानी, दीपिका",
    gameMemoryTitle:"जोडा मिलाउनुहोस्", gameMemoryDesc:"चिनजानका वस्तुका जोडा फेला पार्नुहोस्।",
    gamePatternTitle:"ढाँचा सम्झनुहोस्", gamePatternDesc:"क्रम हेर्नुहोस्, त्यसपछि दोहोर्याउनुहोस्।",
    gameQuizTitle:"दैनिक दिनचर्या सम्झना", gameQuizDesc:"दिनको क्रम सम्झनुहोस्।",
    level:"स्तर", close:"बन्द गर्नुहोस्", moves:"चाल", matches:"मिलान", start:"सुरु गर्नुहोस्", watch:"हेर्नुहोस्",
    yourTurn:"तपाईंको पालो", correct:"धेरै राम्रो!", wrong:"मिलेन — फेरि प्रयास गर्नुहोस्", nextRound:"अर्को राउन्ड",
    playAgain:"फेरि खेल्नुहोस्", finish:"समाप्त", question:"प्रश्न", of:"मध्ये",
    pickLevel:"एउटा स्तर छान्नुहोस्", levelEasyName:"सजिलो", levelMediumName:"मध्यम", levelHardName:"गाह्रो",
    levelEasyDesc:"थोरै वस्तु, धेरै समय", levelMediumDesc:"सन्तुलित दैनिक चुनौती", levelHardDesc:"थप अभ्यासको लागि",
    pointsEarned:"प्राप्त अंक",
    profileHead:"बिरामीको प्रोफाइल", profileSub:"बायो-डाटा, निदान र जनसांख्यिकी",
    profileName:"पूरा नाम", profileAge:"उमेर", profileGender:"लिङ्ग", genderF:"महिला", genderM:"पुरुष", genderO:"अन्य",
    profileVillage:"गाउँ / सहर", profileDistrict:"जिल्ला", profileState:"राज्य", profileContact:"सम्पर्क नम्बर",
    profileEmergency:"आपतकालीन सम्पर्क", profileSeverity:"डिमेन्सियाको गम्भीरता", profileDiagnosisDate:"निदान मिति",
    profilePreferredLang:"रुचाइएको भाषा", profileConditions:"थाहा भएका रोग / एलर्जी", profileSave:"प्रोफाइल सुरक्षित गर्नुहोस्", profileSaved:"सुरक्षित ✓",
    severityMild:"हल्का", severityModerate:"मध्यम", severitySevere:"गम्भीर",
    scoresHead:"स्कोरबोर्ड", scoresHint:"गतिविधि पूरा हुँदा अंक थपिन्छ", totalPoints:"कुल अंक",
    recentScores:"हालैका स्कोरहरू", tipsHead:"अंक सुधार्ने सुझावहरू", recommendedHead:"सिफारिस गरिएका गतिविधिहरू",
    recoMild:"हल्का चरणका लागि सुझाव", recoModerate:"मध्यम चरणका लागि सुझाव", recoSevere:"गम्भीर चरणका लागि सुझाव",
    yrs:"वर्ष"
  },
  brx:{ tagline:"NER नि बुरहा-बुरहीफोरनि थाखाय हेरचाह", modePatient:"रोगी", modeProfile:"प्रफाइल", modeScores:"स्कोर", modeCaregiver:"हेरचाहकर्ता", offline:"अफलाइन-तयार",
    remindersHead:"दिनैनि हारि", gamesHead:"मोनथिं फिसायनाय", cgOverview:"रोगीनि आवस्था", scoresHead:"स्कोरबर्ड",
    profileHead:"रोगीनि प्रफाइल", weeklyHead:"बर सप्ताहनि हारि", tapDone:"जायख्लायबो टिप", weeklyHint:"", gamesHint:"", cgLastSync:"", cgStreak:"", cgSessions:"", cgCompliance:"", cgLevel:"", cgChartHead:"", cgAlertsHead:"", cgLogHead:"", logTime:"", logActivity:"", logResult:"", cgDifficultyHead:"", easy:"", hard:"",
    footerNote:"Smriti Sahay — NER नि बुरहा-बुरहीफोरनि थाखाय बानायख'व सा। Smart India Hackathon नि थाखाय बानायख'व सा।"
  },
  kha:{ tagline:"Kynmaw ïa ki rangbah bym NER", modePatient:"Nongshem", modeProfile:"Profile", modeScores:"Scores", modeCaregiver:"Nongkularih", offline:"Long ïa offline",
    remindersHead:"Ki jingpynkynmaw mynta", gamesHead:"Ki khel jingmut", cgOverview:"Jingdon jong nongshem", scoresHead:"Scoreboard",
    profileHead:"Profile jong nongshem", weeklyHead:"Ki kam bad sngi", tapDone:"", weeklyHint:"", gamesHint:"", cgLastSync:"", cgStreak:"", cgSessions:"", cgCompliance:"", cgLevel:"", cgChartHead:"", cgAlertsHead:"", cgLogHead:"", logTime:"", logActivity:"", logResult:"", cgDifficultyHead:"", easy:"", hard:"",
    footerNote:"Smriti Sahay — kylla jingmut para ki rangbah ha North Eastern Region. La thaw ïa u Smart India Hackathon."
  },
  lus:{ tagline:"NER upa te tan enkawlna", modePatient:"Damdawi", modeProfile:"Profile", modeScores:"Score", modeCaregiver:"Enkawltu", offline:"Offline a ṭha",
    remindersHead:"Vawiin hriattirna", gamesHead:"Rilru tibengvar dan", cgOverview:"Damdawi thiltih", scoresHead:"Score dan",
    profileHead:"Damdawi profile", weeklyHead:"Hei chhung hna", tapDone:"", weeklyHint:"", gamesHint:"", cgLastSync:"", cgStreak:"", cgSessions:"", cgCompliance:"", cgLevel:"", cgChartHead:"", cgAlertsHead:"", cgLogHead:"", logTime:"", logActivity:"", logResult:"", cgDifficultyHead:"", easy:"", hard:"",
    footerNote:"Smriti Sahay — North Eastern Region-a upa tar enkawlna prototype. Smart India Hackathon atana siam a ni."
  },
  mni:{ tagline:"মণিপুর অমসুং NER-গী ইপু ইপীশিংগীদমক্তা য়েংশিন্নবা", modePatient:"লায়েংবা", modeProfile:"প্রফাইল", modeScores:"স্কোর", modeCaregiver:"য়েংশিন্নবা", offline:"অফলাইন-তৌরে",
    remindersHead:"ঙসিগী নিংশিংহনবা", gamesHead:"পুক্নিং শেমগৎপগী খেল", cgOverview:"লায়েংবগী থৌদাং", scoresHead:"স্কোরবোর্ড",
    profileHead:"লায়েংবগী প্রফাইল", weeklyHead:"চহি অসিগী থৌদাংশিং", tapDone:"", weeklyHint:"", gamesHint:"", cgLastSync:"", cgStreak:"", cgSessions:"", cgCompliance:"", cgLevel:"", cgChartHead:"", cgAlertsHead:"", cgLogHead:"", logTime:"", logActivity:"", logResult:"", cgDifficultyHead:"", easy:"", hard:"",
    footerNote:"Smriti Sahay — North Eastern Region-গী ইপু ইপীশিংগীদমক্তা prototype অমা। Smart India Hackathon-গীদমক্তা শেমখ্রে।"
  }
};
function t(key){
  const v = I18N[state.lang] && I18N[state.lang][key];
  if(v) return v;
  return I18N.en[key] || key;
}

function applyLanguage(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent = t(el.getAttribute('data-i18n')); });
  document.getElementById('greetText').textContent = t('greet');
  renderReminders();
  renderWeekly();
  renderGames();
  renderProfile();
  renderScores();
  renderCaregiver();
}

/* ============================================================
   HEADER CONTROLS
============================================================ */
document.getElementById('langSelect').addEventListener('change', e=>{ state.lang = e.target.value; applyLanguage(); });
document.getElementById('txtBigger').addEventListener('click', ()=>{ state.scale = Math.min(1.4, state.scale + 0.1); document.documentElement.style.setProperty('--scale', state.scale); });
document.getElementById('txtSmaller').addEventListener('click', ()=>{ state.scale = Math.max(0.85, state.scale - 0.1); document.documentElement.style.setProperty('--scale', state.scale); });

const MODES = ['patient','profile','scores','caregiver'];
document.getElementById('btnPatientMode').addEventListener('click', ()=>switchMode('patient'));
document.getElementById('btnProfileMode').addEventListener('click', ()=>switchMode('profile'));
document.getElementById('btnScoresMode').addEventListener('click', ()=>switchMode('scores'));
document.getElementById('btnCaregiverMode').addEventListener('click', ()=>switchMode('caregiver'));
function switchMode(mode){
  state.mode = mode;
  document.getElementById('patientView').classList.toggle('active', mode==='patient');
  document.getElementById('profileView').classList.toggle('active', mode==='profile');
  document.getElementById('scoresView').classList.toggle('active', mode==='scores');
  document.getElementById('caregiverView').classList.toggle('active', mode==='caregiver');
  document.getElementById('btnPatientMode').classList.toggle('active', mode==='patient');
  document.getElementById('btnProfileMode').classList.toggle('active', mode==='profile');
  document.getElementById('btnScoresMode').classList.toggle('active', mode==='scores');
  document.getElementById('btnCaregiverMode').classList.toggle('active', mode==='caregiver');
  if(mode==='caregiver') renderCaregiver();
  if(mode==='scores') renderScores();
  if(mode==='profile') renderProfile();
}

function tickClock(){
  const now = new Date();
  document.getElementById('clockText').textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById('dateText').textContent = now.toLocaleDateString([], {weekday:'long', year:'numeric', month:'long', day:'numeric'});
}
tickClock(); setInterval(tickClock, 15000);

/* ============================================================
   REMINDERS
============================================================ */
function renderReminders(){
  const list = document.getElementById('remindersList');
  list.innerHTML = '';
  state.reminders.forEach(r=>{
    const div = document.createElement('div');
    div.className = 'reminder' + (r.done ? ' done' : '');
    div.innerHTML = `
      <div class="check"><svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      <div class="info"><div class="label">${r.label[state.lang] || r.label.en}</div><div class="time">${r.time}</div></div>`;
    div.addEventListener('click', ()=>{
      r.done = !r.done;
      renderReminders();
      logActivity(r.label[state.lang]||r.label.en, r.done ? '✓' : '—');
      renderCaregiver();
    });
    list.appendChild(div);
  });
  const badge = document.getElementById('heroSeverityBadge');
  const sevClass = state.patient.severity;
  badge.innerHTML = `<span class="severity-badge ${sevClass}">${t('profileSeverity')}: ${t('severity'+sevClass.charAt(0).toUpperCase()+sevClass.slice(1))}</span>`;
}

/* ============================================================
   WEEKLY TASKS
============================================================ */
function renderWeekly(){
  const list = document.getElementById('weeklyList');
  list.innerHTML = '';
  const todayName = DAY_NAMES[new Date().getDay()];
  state.weeklyTasks.forEach((wt,i)=>{
    const isToday = wt.day === todayName;
    const div = document.createElement('div');
    div.className = 'weekly-item' + (isToday?' today':'') + (wt.done?' done':'');
    div.innerHTML = `
      <div class="weekly-day">${wt.day}</div>
      <div class="wt-label">${wt.label[state.lang] || wt.label.en}</div>
      <div class="wt-check ${wt.done?'done':''}"><svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>`;
    div.querySelector('.wt-check').addEventListener('click', (e)=>{
      e.stopPropagation();
      wt.done = !wt.done;
      renderWeekly();
      logActivity(wt.label[state.lang]||wt.label.en, wt.done?'✓':'—');
      renderCaregiver();
    });
    list.appendChild(div);
  });
}

/* ============================================================
   GAMES GRID
============================================================ */
const GAME_META = [
  {id:'memory', color:'var(--green-tint)', stroke:'var(--green-deep)', titleKey:'gameMemoryTitle', descKey:'gameMemoryDesc',
    icon:`<path d="M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v7H4zM13 14h7v7h-7z"/>`},
  {id:'pattern', color:'var(--amber-tint)', stroke:'var(--amber-deep)', titleKey:'gamePatternTitle', descKey:'gamePatternDesc',
    icon:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>`},
  {id:'quiz', color:'var(--red-tint)', stroke:'var(--red)', titleKey:'gameQuizTitle', descKey:'gameQuizDesc',
    icon:`<rect x="3" y="4" width="18" height="17" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="7" y1="13" x2="12" y2="13"/><line x1="7" y1="17" x2="15" y2="17"/>`}
];
function renderGames(){
  const grid = document.getElementById('gamesGrid');
  grid.innerHTML = '';
  GAME_META.forEach(g=>{
    const gs = state.games[g.id];
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="icon-badge" style="background:${g.color}"><svg viewBox="0 0 24 24" fill="none" stroke="${g.stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${g.icon}</svg></div>
      <h3>${t(g.titleKey)}</h3><p>${t(g.descKey)}</p>
      <span class="lvl">${t('level')} ${gs.level} · ${state.scores.best[g.id]||0} pts</span>`;
    card.addEventListener('click', ()=>openGame(g.id));
    grid.appendChild(card);
  });
}

/* ============================================================
   OVERLAY / MODAL HELPERS
============================================================ */
const overlay = document.getElementById('overlay');
const modalContent = document.getElementById('modalContent');
function closeModal(){ overlay.classList.remove('active'); modalContent.innerHTML=''; }
overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });

function logActivity(activity, result){
  const now = new Date();
  state.activityLog.unshift({time: now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), activity, result});
  state.activityLog = state.activityLog.slice(0,8);
}
function bumpEngagement(){ state.weeklyEngagement[6] = Math.min(9, state.weeklyEngagement[6] + 1); state.sessionsToday++; }
function awardPoints(gameId, points, label){
  points = Math.max(0, Math.round(points));
  state.scores.total += points;
  if(points > (state.scores.best[gameId]||0)) state.scores.best[gameId] = points;
  const now = new Date();
  state.scores.history.unshift({time: now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), activity: label, points});
  state.scores.history = state.scores.history.slice(0,10);
  renderScores();
  return points;
}

/* ---- generic level picker shown before every game ---- */
function showLevelPicker(gameId, titleKey, descKey, startFn){
  modalContent.innerHTML = `
    <div class="modal-head"><h3>${t(titleKey)}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-sub">${t(descKey)}</div>
    <div class="modal-sub" style="font-weight:700; color:var(--ink);">${t('pickLevel')}</div>
    <div class="level-pick">
      <button class="easy" data-lvl="1"><span>1 · ${t('levelEasyName')}<span class="desc">${t('levelEasyDesc')}</span></span></button>
      <button class="medium" data-lvl="2"><span>2 · ${t('levelMediumName')}<span class="desc">${t('levelMediumDesc')}</span></span></button>
      <button class="hard" data-lvl="3"><span>3 · ${t('levelHardName')}<span class="desc">${t('levelHardDesc')}</span></span></button>
    </div>
    <div class="modal-actions"><button class="btn ghost" onclick="closeModal()">${t('close')}</button></div>`;
  overlay.classList.add('active');
  modalContent.querySelectorAll('.level-pick button').forEach(b=>{
    b.addEventListener('click', ()=>{
      const lvl = parseInt(b.dataset.lvl);
      state.games[gameId].level = lvl;
      startFn(lvl);
    });
  });
}
function openGame(id){
  if(id==='memory') showLevelPicker('memory','gameMemoryTitle','gameMemoryDesc', startMemoryGame);
  if(id==='pattern') showLevelPicker('pattern','gamePatternTitle','gamePatternDesc', startPatternGame);
  if(id==='quiz') showLevelPicker('quiz','gameQuizTitle','gameQuizDesc', startQuizGame);
}

/* ============================================================
   GAME 1 — MEMORY MATCH
============================================================ */
const MM_ICONS = ['🍵','🎋','🐘','🦚','🏔️','🌾','🪘','🥁','🧺','🌸','🦋','🔔'];
function startMemoryGame(level){
  const gs = state.games.memory;
  const pairs = level===1?4: level===2?6:8;
  let deck = shuffle([...MM_ICONS.slice(0,pairs), ...MM_ICONS.slice(0,pairs)]).map((sym,i)=>({sym,id:i,flipped:false,matched:false}));
  let firstPick = null, lock = false, moves = 0, matches = 0;

  modalContent.innerHTML = `
    <div class="modal-head"><h3>${t('gameMemoryTitle')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-sub">${t('gameMemoryDesc')} — ${t('level')} ${level}</div>
    <div class="mm-stat-row"><span>${t('moves')}: <b id="mmMoves">0</b></span><span>${t('matches')}: <b id="mmMatches">0</b>/${pairs}</span></div>
    <div class="mm-grid" id="mmGrid"></div>
    <div class="modal-actions"><button class="btn ghost" onclick="closeModal()">${t('close')}</button></div>`;
  overlay.classList.add('active');
  const gridEl = document.getElementById('mmGrid');

  function draw(){
    gridEl.innerHTML='';
    deck.forEach(card=>{
      const el = document.createElement('div');
      el.className = 'mm-card' + (card.flipped?' flipped':'') + (card.matched?' matched':'');
      el.textContent = (card.flipped||card.matched) ? card.sym : '';
      el.addEventListener('click', ()=>pick(card));
      gridEl.appendChild(el);
    });
  }
  function pick(card){
    if(lock || card.flipped || card.matched) return;
    card.flipped = true; draw();
    if(!firstPick){ firstPick = card; return; }
    moves++; document.getElementById('mmMoves').textContent = moves;
    lock = true;
    if(firstPick.sym === card.sym){
      firstPick.matched = card.matched = true; matches++;
      document.getElementById('mmMatches').textContent = matches;
      firstPick = null; lock = false; draw();
      if(matches===pairs) setTimeout(()=>finishMemory(moves), 400);
    } else {
      setTimeout(()=>{ firstPick.flipped=false; card.flipped=false; firstPick=null; lock=false; draw(); }, 700);
    }
  }
  function finishMemory(moves){
    gs.plays++;
    if(gs.bestMoves===null || moves < gs.bestMoves) gs.bestMoves = moves;
    if(moves <= pairs+1 && gs.level<3) gs.level++;
    else if(moves > pairs*2 && gs.level>1) gs.level--;
    bumpEngagement();
    const pts = awardPoints('memory', level*40 - moves*3 + 20, t('gameMemoryTitle'));
    logActivity(t('gameMemoryTitle'), moves+' '+t('moves'));
    renderGames(); renderCaregiver();
    modalContent.querySelector('.modal-sub').innerHTML = t('correct') + `<div class="points-pill">+${pts} ${t('pointsEarned').toLowerCase()}</div>`;
    modalContent.querySelector('.modal-actions').innerHTML = `<button class="btn primary" onclick="showLevelPicker('memory','gameMemoryTitle','gameMemoryDesc',startMemoryGame)">${t('playAgain')}</button><button class="btn ghost" onclick="closeModal()">${t('close')}</button>`;
  }
  draw();
}
function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]); }

/* ============================================================
   GAME 2 — PATTERN RECALL
============================================================ */
const PR_COLORS = ['#3D6B4F','#E0904F','#B24A3B','#6B5F4F'];
function startPatternGame(level){
  const gs = state.games.pattern;
  let seqLen = level===1?3: level===2?4:5;
  let sequence = [], userStep = 0, showing = true;

  modalContent.innerHTML = `
    <div class="modal-head"><h3>${t('gamePatternTitle')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-sub">${t('gamePatternDesc')} — ${t('level')} ${level}</div>
    <div class="pr-status" id="prStatus">${t('watch')}</div>
    <div class="pr-pad" id="prPad">${PR_COLORS.map((c,i)=>`<button data-i="${i}" style="background:${c}"></button>`).join('')}</div>
    <div class="modal-actions"><button class="btn ghost" onclick="closeModal()">${t('close')}</button></div>`;
  overlay.classList.add('active');
  const pad = document.getElementById('prPad');
  const buttons = [...pad.querySelectorAll('button')];
  buttons.forEach(b=>b.addEventListener('click', ()=>{ if(!showing) handlePick(parseInt(b.dataset.i)); }));

  function nextRound(){ sequence = Array.from({length:seqLen}, ()=>Math.floor(Math.random()*4)); playSequence(); }
  function playSequence(){
    showing = true; userStep = 0;
    document.getElementById('prStatus').textContent = t('watch');
    let i = 0;
    const iv = setInterval(()=>{
      buttons.forEach(b=>b.classList.remove('lit'));
      if(i < sequence.length){
        buttons[sequence[i]].classList.add('lit');
        setTimeout(()=>buttons[sequence[i]].classList.remove('lit'), 380);
        i++;
      } else { clearInterval(iv); showing = false; document.getElementById('prStatus').textContent = t('yourTurn'); }
    }, 550);
  }
  function handlePick(i){
    if(i === sequence[userStep]){ userStep++; if(userStep === sequence.length) finishRound(true); }
    else finishRound(false);
  }
  function finishRound(success){
    gs.plays++;
    document.getElementById('prStatus').textContent = success ? t('correct') : t('wrong');
    if(success && gs.level<3) gs.level++;
    if(!success && gs.level>1) gs.level--;
    if(success && seqLen > gs.bestLevel) gs.bestLevel = seqLen;
    bumpEngagement();
    const pts = awardPoints('pattern', success ? (level*25 + seqLen*8) : 5, t('gamePatternTitle'));
    logActivity(t('gamePatternTitle'), success? t('correct') : t('wrong'));
    renderGames(); renderCaregiver();
    const actions = modalContent.querySelector('.modal-actions');
    actions.innerHTML = `<span class="points-pill">+${pts} ${t('pointsEarned').toLowerCase()}</span><button class="btn primary" onclick="showLevelPicker('pattern','gamePatternTitle','gamePatternDesc',startPatternGame)">${t('playAgain')}</button><button class="btn ghost" onclick="closeModal()">${t('close')}</button>`;
  }
  setTimeout(nextRound, 500);
}

/* ============================================================
   GAME 3 — DAILY ROUTINE RECALL
============================================================ */
function buildQuizQuestions(){
  return [
    {q:{en:"What usually comes right after breakfast?",as:"পুৱাৰ আহাৰৰ পিছত সাধাৰণতে কি হয়?",bn:"সকালের নাস্তার পরে সাধারণত কী হয়?",ne:"बिहानको खानापछि सामान्यतया के हुन्छ?"},
     opts:{en:["Morning medicine","Evening walk","Dinner"],as:["ৰাতিপুৱাৰ ঔষধ","গধূলিৰ খোজকঢ়া","নৈশভোজ"],bn:["সকালের ওষুধ","সান্ধ্য হাঁটা","রাতের খাবার"],ne:["बिहानको औषधि","साँझको हिँडाइ","बेलुकाको खाना"]}, correct:0},
    {q:{en:"Which comes first in the day?",as:"দিনটোত প্ৰথমে কি হয়?",bn:"দিনে প্রথমে কী হয়?",ne:"दिनमा पहिले के हुन्छ?"},
     opts:{en:["Hydration reminder","Sleeping at night","Morning medicine"],as:["পানী খোৱাৰ মনত পেলোৱা","ৰাতি টোপনি","ৰাতিপুৱাৰ ঔষধ"],bn:["জল পানের স্মরণ","রাতে ঘুম","সকালের ওষুধ"],ne:["पानी पिउने सम्झना","राति सुत्ने","बिहानको औषधि"]}, correct:2},
    {q:{en:"When is the doctor's video call usually?",as:"ডাক্তৰৰ ভিডিঅ কল সাধাৰণতে কেতিয়া?",bn:"ডাক্তারের ভিডিও কল সাধারণত কখন?",ne:"डाक्टरसँग भिडियो कल सामान्यतया कहिले हुन्छ?"},
     opts:{en:["Early morning","Evening","Midnight"],as:["ৰাতিপুৱাই","গধূলি","মাজনিশা"],bn:["খুব সকালে","সন্ধ্যায়","মধ্যরাতে"],ne:["बिहानै","साँझ","मध्यरात"]}, correct:1},
    {q:{en:"What should you do before the garden walk?",as:"বাগিচালৈ যোৱাৰ আগতে কি কৰিব লাগে?",bn:"বাগানে হাঁটার আগে কী করা উচিত?",ne:"बगैंचा हिँड्नुअघि के गर्नुपर्छ?"},
     opts:{en:["Drink water","Sleep","Watch TV"],as:["পানী খাব লাগে","টোপনি যাব লাগে","টিভি চাব লাগে"],bn:["জল পান করা","ঘুমানো","টিভি দেখা"],ne:["पानी पिउने","सुत्ने","टिभी हेर्ने"]}, correct:0},
    {q:{en:"Which day is the physiotherapy session?",as:"ফিজিঅথেৰাপী কোনদিনা?",bn:"ফিজিওথেরাপি কোন দিন?",ne:"फिजियोथेरापी कुन दिन हो?"},
     opts:{en:["Monday","Saturday","Sunday"],as:["সোমবাৰ","শনিবাৰ","দেওবাৰ"],bn:["সোমবার","শনিবার","রবিবার"],ne:["सोमबार","शनिबार","आइतबार"]}, correct:0},
  ];
}
function startQuizGame(level){
  const gs = state.games.quiz;
  const qCount = level===1?2: level===2?4:5;
  const questions = shuffle(buildQuizQuestions()).slice(0,qCount);
  let idx = 0, correctCount = 0;

  function renderQ(){
    const item = questions[idx];
    const opts = item.opts[state.lang] || item.opts.en;
    modalContent.innerHTML = `
      <div class="modal-head"><h3>${t('gameQuizTitle')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
      <div class="modal-sub">${t('question')} ${idx+1} ${t('of')} ${questions.length} · ${t('level')} ${level}</div>
      <div class="quiz-q">${item.q[state.lang] || item.q.en}</div>
      <div class="quiz-opts" id="quizOpts"></div>
      <div class="modal-actions"><button class="btn ghost" onclick="closeModal()">${t('close')}</button></div>`;
    const optsEl = document.getElementById('quizOpts');
    opts.forEach((label,i)=>{
      const b = document.createElement('button');
      b.className = 'quiz-opt'; b.textContent = label;
      b.addEventListener('click', ()=>{
        [...optsEl.children].forEach(c=>c.disabled=true);
        if(i===item.correct){ b.classList.add('correct'); correctCount++; }
        else{ b.classList.add('wrong'); optsEl.children[item.correct].classList.add('correct'); }
        setTimeout(()=>{ idx++; if(idx < questions.length) renderQ(); else finishQuiz(); }, 900);
      });
      optsEl.appendChild(b);
    });
  }
  function finishQuiz(){
    gs.plays++; gs.correct += correctCount;
    const ratio = correctCount / questions.length;
    if(ratio >= 0.8 && gs.level<3) gs.level++;
    else if(ratio < 0.5 && gs.level>1) gs.level--;
    bumpEngagement();
    const pts = awardPoints('quiz', correctCount * (level*15), t('gameQuizTitle'));
    logActivity(t('gameQuizTitle'), correctCount+'/'+questions.length);
    renderGames(); renderCaregiver();
    modalContent.innerHTML = `
      <div class="modal-head"><h3>${t('gameQuizTitle')}</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
      <div class="modal-sub">${t('finish')}: ${correctCount}/${questions.length}<div class="points-pill">+${pts} ${t('pointsEarned').toLowerCase()}</div></div>
      <div class="modal-actions"><button class="btn primary" onclick="showLevelPicker('quiz','gameQuizTitle','gameQuizDesc',startQuizGame)">${t('playAgain')}</button><button class="btn ghost" onclick="closeModal()">${t('close')}</button></div>`;
  }
  overlay.classList.add('active');
  renderQ();
}

/* ============================================================
   VOICE ASSIST
============================================================ */
const voiceFab = document.getElementById('voiceFab');
voiceFab.addEventListener('click', ()=>{
  if(!('speechSynthesis' in window)){ alert('Voice is not supported in this browser.'); return; }
  if(window.speechSynthesis.speaking){ window.speechSynthesis.cancel(); voiceFab.classList.remove('speaking'); return; }
  const lines = [t('greet'), t('remindersHead')+'.'];
  state.reminders.filter(r=>!r.done).forEach(r=> lines.push((r.label[state.lang]||r.label.en) + ', ' + r.time));
  const utter = new SpeechSynthesisUtterance(lines.join('. '));
  const langMap = {en:'en-IN', as:'en-IN', bn:'bn-IN', ne:'ne-NP', brx:'en-IN', kha:'en-IN', lus:'en-IN', mni:'en-IN'};
  utter.lang = langMap[state.lang] || 'en-IN'; utter.rate = 0.9;
  utter.onstart = ()=>voiceFab.classList.add('speaking');
  utter.onend = ()=>voiceFab.classList.remove('speaking');
  window.speechSynthesis.speak(utter);
});

/* ============================================================
   PROFILE
============================================================ */
const profileFields = ['fName','fAge','fGender','fVillage','fDistrict','fState','fContact','fEmergency','fSeverity','fDiagnosis','fPrefLang','fConditions'];
function loadProfileForm(){
  const p = state.patient;
  document.getElementById('fName').value = p.name;
  document.getElementById('fAge').value = p.age;
  document.getElementById('fGender').value = p.gender;
  document.getElementById('fVillage').value = p.village;
  document.getElementById('fDistrict').value = p.district;
  document.getElementById('fState').value = p.state;
  document.getElementById('fContact').value = p.contact;
  document.getElementById('fEmergency').value = p.emergency;
  document.getElementById('fSeverity').value = p.severity;
  document.getElementById('fDiagnosis').value = p.diagnosis;
  document.getElementById('fPrefLang').value = p.prefLang;
  document.getElementById('fConditions').value = p.conditions;
}
document.getElementById('saveProfileBtn').addEventListener('click', ()=>{
  const p = state.patient;
  p.name = document.getElementById('fName').value || p.name;
  p.age = document.getElementById('fAge').value || p.age;
  p.gender = document.getElementById('fGender').value;
  p.village = document.getElementById('fVillage').value;
  p.district = document.getElementById('fDistrict').value;
  p.state = document.getElementById('fState').value;
  p.contact = document.getElementById('fContact').value;
  p.emergency = document.getElementById('fEmergency').value;
  p.severity = document.getElementById('fSeverity').value;
  p.diagnosis = document.getElementById('fDiagnosis').value;
  p.prefLang = document.getElementById('fPrefLang').value;
  p.conditions = document.getElementById('fConditions').value;
  renderProfile(); renderReminders(); renderCaregiver(); renderScores();
  const toast = document.getElementById('saveToast');
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 1800);
});
function renderProfile(){
  loadProfileForm();
  const p = state.patient;
  document.getElementById('profileAvatarInitial').textContent = (p.name||'?').charAt(0);
  document.getElementById('profileCardName').textContent = p.name;
  document.getElementById('profileCardMeta').textContent = `${p.age} ${t('yrs')} · ${p.village}, ${p.district}, ${p.state}`;
}

/* ============================================================
   SCORES / TIPS / RECOMMENDATIONS
============================================================ */
const TIPS = [
  {en:"Play at the same time each day, ideally in the morning when most alert."},
  {en:"Keep sessions short — 10 to 15 minutes at a time works best."},
  {en:"Start at the Easy level and move up only when it feels comfortable."},
  {en:"Celebrate small wins out loud — encouragement helps recall."},
  {en:"If frustration shows up, pause and try again later rather than pushing on."}
];
const RECOMMENDATIONS = {
  mild:[ {en:"Daily newspaper reading or a simple crossword"}, {en:"Light gardening or helping with simple cooking"}, {en:"Regular social visits with family and neighbours"} ],
  moderate:[ {en:"Looking through family photo albums together"}, {en:"Simple repetitive tasks like folding cloth or sorting objects"}, {en:"Listening to familiar regional music"} ],
  severe:[ {en:"Gentle hand massage with familiar scents"}, {en:"Playing soft, familiar songs from their youth"}, {en:"Short, calm one-on-one conversations in their mother tongue"} ]
};
function renderScores(){
  document.getElementById('totalPointsNum').textContent = state.scores.total;
  const breakdown = document.getElementById('scoreBreakdown');
  breakdown.innerHTML = `
    <div class="score-mini"><div class="n">${state.scores.best.memory||0}</div><div class="l">${t('gameMemoryTitle')}</div></div>
    <div class="score-mini"><div class="n">${state.scores.best.pattern||0}</div><div class="l">${t('gamePatternTitle')}</div></div>
    <div class="score-mini"><div class="n">${state.scores.best.quiz||0}</div><div class="l">${t('gameQuizTitle')}</div></div>`;
  const body = document.getElementById('scoreLogBody');
  body.innerHTML = state.scores.history.length===0
    ? `<tr><td colspan="3" style="color:var(--ink-soft)">No scores yet — play an activity to begin.</td></tr>`
    : state.scores.history.map(h=>`<tr><td>${h.time}</td><td>${h.activity}</td><td>+${h.points}</td></tr>`).join('');

  document.getElementById('tipsList').innerHTML = TIPS.map(tip=>`<div class="tip-item"><span class="tip-dot"></span><span>${tip.en}</span></div>`).join('');

  const sev = state.patient.severity;
  document.getElementById('recoSub').textContent = t('reco'+sev.charAt(0).toUpperCase()+sev.slice(1));
  document.getElementById('recoList').innerHTML = RECOMMENDATIONS[sev].map(r=>`<div class="reco-item"><span class="reco-dot"></span><span>${r.en}</span></div>`).join('');
}

/* ============================================================
   CAREGIVER VIEW
============================================================ */
function renderCaregiver(){
  const p = state.patient;
  document.getElementById('cgAvatarInitial').textContent = (p.name||'?').charAt(0);
  document.getElementById('cgCardName').textContent = p.name;
  document.getElementById('cgCardMeta').textContent = `${p.age} ${t('yrs')} · ${t('severity'+p.severity.charAt(0).toUpperCase()+p.severity.slice(1))} · ${p.village}, ${p.state}`;

  document.getElementById('statSessions').textContent = state.sessionsToday;
  const totalTasks = state.reminders.length;
  const doneCount = state.reminders.filter(r=>r.done).length;
  document.getElementById('statCompliance').textContent = Math.round((doneCount/totalTasks)*100) + '%';
  const avgLevel = ((state.games.memory.level + state.games.pattern.level + state.games.quiz.level) / 3).toFixed(1);
  document.getElementById('statLevel').textContent = avgLevel;

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const chart = document.getElementById('barChart');
  chart.innerHTML = '';
  const max = Math.max(...state.weeklyEngagement, 1);
  state.weeklyEngagement.forEach((v,i)=>{
    const col = document.createElement('div');
    col.className = 'bar-col';
    col.innerHTML = `<div class="bar" style="height:${(v/max*100)}%; background:${i===6?'var(--amber-deep)':'var(--green)'}"></div><div class="bar-day">${days[i]}</div>`;
    chart.appendChild(col);
  });

  const alerts = [];
  const missed = state.reminders.filter(r=>!r.done);
  if(missed.length >= 2) alerts.push({level:'warn', t:'Multiple reminders pending', d: missed.length + ' of ' + totalTasks + " reminders not yet marked done today."});
  if(state.sessionsToday === 0) alerts.push({level:'warn', t:'No cognitive activity yet today', d:p.name + ' has not played any memory games today.'});
  else alerts.push({level:'ok', t:'Cognitive activity logged today', d: state.sessionsToday + ' session(s) completed so far.'});
  if(state.weeklyEngagement[6] >= state.weeklyEngagement[5]) alerts.push({level:'ok', t:'Engagement trending steady', d:"Today's activity is on par with yesterday."});
  document.getElementById('alertsList').innerHTML = alerts.map(a=>`<div class="alert-item"><span class="alert-dot ${a.level}"></span><div><div class="t">${a.t}</div><div class="d">${a.d}</div></div></div>`).join('');

  const logBody = document.getElementById('logBody');
  logBody.innerHTML = state.activityLog.length===0
    ? `<tr><td colspan="3" style="color:var(--ink-soft)">No activity yet today.</td></tr>`
    : state.activityLog.map(l=>`<tr><td>${l.time}</td><td>${l.activity}</td><td>${l.result}</td></tr>`).join('');
}
document.getElementById('difficultySlider').addEventListener('input', e=>{
  const lvl = parseInt(e.target.value);
  Object.values(state.games).forEach(g=> g.level = lvl);
  renderGames(); renderCaregiver();
});

/* ============================================================
   INIT
============================================================ */
applyLanguage();
