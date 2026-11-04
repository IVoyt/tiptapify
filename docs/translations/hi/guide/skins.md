# स्किन {#skins}

**स्किन** एडिटर के बाहरी स्वरूप का एक रूप है: टूलबार, उसके बटन और समूह, बबल मेन्यू, ड्रॉपडाउन मेन्यू, डायलॉग, कंटेंट के चारों ओर का फ़्रेम, और चित्र चयन का आवरण। `skin` prop इसे चुनता है:

```vue
<Tiptapify skin="pastel" />
```

एक स्किन दो चीज़ों से बनती है: **टोकन** (CSS वेरिएबल के रूप में रंग और आकार) और **आकृति** (संरचनात्मक रूपांतर जिन्हें टोकन व्यक्त नहीं कर सकता)। दो बिल्ट-इन स्किन हैं `default` — क्लासिक रूप, उभरे हुए बटन समूहों वाला उभरा टूलबार — और `pastel`, शांत रूप। कस्टम स्किन भी पहले दर्जे की हैं: `registerSkin()` और इनलाइन स्किन ऑब्जेक्ट बिल्कुल उसी तंत्र से हल होते हैं, और बिल्ट-इन स्किन भी पंजीकृत स्किन हैं, कोई विशेष मामला नहीं।

## शब्दावली: स्किन बनाम Vuetify थीम {#terminology-skin-vs-vuetify-theme}

- **skin** — एडिटर के बाहरी स्वरूप के एक रूप के लिए उपयोगकर्ता-सामने का शब्द: टोकन + आकार। prop `skin` है, टाइप `TiptapifySkin*` हैं, रजिस्ट्री `registerSkin()` है, रूट क्लास `tiptapify-skin-{name}` है।
- **theme** — Vuetify की लाइट/डार्क थीम के लिए आरक्षित। Tiptapify कंपोनेंट अपने `theme` props को Vuetify की मौजूदा थीम के नाम से भरते हैं; स्किन प्रणाली उन्हें कभी नहीं छूती।

ये साथ काम करते हैं: ज़्यादातर बिल्ट-इन टोकन रंग Vuetify थीम वेरिएबल (`rgb(var(--v-theme-surface))`, …) का संदर्भ देते हैं, इसलिए स्किन अपने-आप लाइट/डार्क का अनुसरण करती हैं। क्लासिक कॉलम में निश्चित-डार्क सेल — रीसाइज़ हैंडल (`rgba(0, 0, 0, .5/.8)`), सादी चित्र रूपरेखा, बबल की छाया, और मेन्यू/डायलॉग की एलिवेशन छायाएँ — जानबूझकर हैं: क्लासिक स्वरूप दोनों थीम में तटस्थ गहरा आवरण रंगता है, और मापा गया आधार उन्हें बाँधे रखता है। कस्टम स्किन थीम वेरिएबल का संदर्भ खुलकर दे सकती है — टोकन तालिका देखें।

## अवधारणा {#concept}

### टोकन {#tokens}

टोकन `--tf-*` नाम की एक CSS कस्टम प्रॉपर्टी है। कैटलॉग कुंजी CSS प्रत्यय का camelCase रूप है: `toolbarBg` → `--tf-toolbar-bg`, `dialogTitleSize` → `--tf-dialog-title-size`। मान साधारण स्ट्रिंग हैं — रंग, पूरे बॉर्डर शॉर्टहैंड, छायाएँ, पैडिंग, त्रिज्याएँ।

लाइब्रेरी का हर स्किन नियम **एक बार** मौजूद है, और अपना टोकन उस फ़ॉलबैक के साथ पढ़ता है जो क्लासिक (आधार) मान के बराबर है:

```css
.tiptapify-toolbar-group {
  border-radius: var(--tf-group-radius, 4px);
}
```

रिज़ॉल्व की गई स्किन केवल अपने **ओवरराइड** को वेरिएबल के रूप में जारी करती है; CSS फ़ॉलबैक आधार को संभालते हैं। वेरिएबल एडिटर रूट पर लगते हैं — और चूँकि मेन्यू और डायलॉग उससे बाहर टेलीपोर्ट हो जाते हैं, हर मेन्यू के `SkinScope` रैपर पर और खुद डायलॉग कार्ड पर भी, ताकि टोकन हर सतह का अनुसरण करें।

### आकार (Shape) {#shape}

छह फ़्लैग तय करते हैं कि कौन से नियम-समूह लागू हों; टोकन उन्हें रंगते हैं:

| फ़्लैग | मान | यह क्या बदलता है |
|---|---|---|
| `toolbar` | `raised` · `flat` | VToolbar एलिवेशन + भीतर कोई बारीक रेखा नहीं, बनाम सपाट रंगत वाली पट्टी |
| `groups` | `box` · `flat` | टूलबार सेक्शन उभरे **VBtnGroup** बॉक्स के रूप में (0.3.2 मार्कअप: जुड़े हुए बटन, समूह टोकन बॉक्स को रंगते हैं) बनाम साधारण flex div पंक्तियाँ |
| `buttons` | `vuetify` · `quiet` | मूल Vuetify बटन बनाम तटस्थ दबी हुई स्थिति वाले घोस्ट बटन |
| `bubble` | `card` · `flat` | संगतता के लिए रखा गया: बबल मेन्यू दोनों आकारों में आइकन बटनों की टोकन-रंगी एक पंक्ति हैं (उनके बटन `buttons` का अनुसरण करते हैं) |
| `dialog` | `classic` · `soft` | शीर्षक के नीचे विभाजक, उभरा बंद बटन बनाम नरम कार्ड, टेक्स्ट वाला बंद बटन |
| `menu` | `vuetify` · `soft` | ड्रॉपडाउन मेन्यू: Vuetify सूची बनाम हल्का पैडिंग वाला कार्ड |

रिज़ॉल्व किया गया आकार एडिटर रूट पर छह `.tiptapify-shape-{flag}-{value}` क्लास के रूप में एन्कोड होता है, और कस्टम टूलबार कंपोनेंट के लिए [`useTiptapifyConfig()`](/hi/api/types#usetiptapifyconfig) पर `shape: ComputedRef<ResolvedShape>` के रूप में उपलब्ध है।

### Extends {#extends}

स्किन पहले क्लासिक आधार के ऊपर रिज़ॉल्व होती है, फिर उसकी `extends` श्रृंखला जड़ से शुरू करके, फिर उसके अपने सदस्य:

```
classic (base tokens + classic shape) → extends chain → own colors/metrics/flags
```

गायब कड़ियाँ अब तक जमा हुई श्रृंखला पर रिज़ॉल्व होती हैं (डेव चेतावनी के साथ); चक्र क्लासिक पर रिज़ॉल्व होता है (डेव चेतावनी के साथ)। पंजीकृत स्किन नाम से संदर्भित होती है; इनलाइन स्किन ऑब्जेक्ट किसी पंजीकृत नाम को `extends` कर सकता है और ग्लोबल रजिस्ट्री में कभी नहीं जाता — कस्टम स्किन एडिटरों के बीच कभी लीक नहीं होतीं। अज्ञात टोकन कुंजियाँ डेव चेतावनी के साथ अनदेखी की जाती हैं।

तीनों रूपों के लाइव डेमो [स्किन उदाहरण पेज](/hi/examples/skins) पर हैं।

## टोकन कैटलॉग {#token-catalog}

नीचे की तालिकाएँ **v1 अनुबंध** हैं: कैटलॉग कुंजियाँ (`TiptapifySkinColors` / `TiptapifySkinMetrics`) वे नाम हैं जिन्हें आप सेट कर सकते हैं। क्लासिक सेल CSS फ़ॉलबैक हैं — वह मान जो कोई स्किन टोकन को ओवरराइड न करे तब आधार नियम रंगते हैं।

### टूलबार / पट्टी {#toolbar-bar}

| टोकन | CSS वेरिएबल | क्लासिक | पैस्टल |
|---|---|---|---|
| `toolbarBg` | `--tf-toolbar-bg` | `rgb(var(--v-theme-surface))` | `rgba(var(--v-theme-on-surface), 0.03)` |
| `toolbarBorderBottom` | `--tf-toolbar-border-bottom` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `toolbarFg` | `--tf-toolbar-fg` | `inherit` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |

### आइटम / समूह / विभाजक {#items-groups-dividers}

| टोकन | CSS वेरिएबल | क्लासिक | पैस्टल |
|---|---|---|---|
| `itemsPadding` | `--tf-items-padding` | `12px 16px` | `6px 8px` |
| `itemsGap` | `--tf-items-gap` | `normal` [¹](#items-gap-note) | `6px` |
| `itemsRowGap` | `--tf-items-row-gap` | `5px` | `4px` |
| `groupGap` | `--tf-group-gap` | `0px` | `2px` |
| `groupHeight` | `--tf-group-height` | `32px` | `auto` |
| `groupBg` | `--tf-group-bg` | `rgb(var(--v-theme-surface))` | `transparent` |
| `groupRadius` | `--tf-group-radius` | `4px` | `0px` |
| `groupShadow` | `--tf-group-shadow` | Vuetify एलिवेशन 2 [²](#shadow-cells) | `none` |
| `dividerWidth` | `--tf-divider-width` | `0px` (स्पेसर: margin `0 4px`) | `1px` |
| `dividerHeight` | `--tf-divider-height` | `0px` | `20px` |
| `dividerColor` | `--tf-divider-color` | `transparent` | `rgba(var(--v-border-color), var(--v-border-opacity))` |

<a id="items-gap-note"></a>¹ मापा गया क्लासिक सेल `normal` है — Vuetify का मूल flex मान, जो CSS फ़ॉलबैक में होता है। कैटलॉग का आधार मान `0px` स्किन ओवरराइड के लिए उसकी बराबर स्पष्ट लंबाई है।

<a id="shadow-cells"></a>² जिन सेलों में "Vuetify एलिवेशन *n*" लिखा है वे वर्णनात्मक हैं: ठीक तिहरी-छाया स्ट्रिंग कमिट की गई बेसलाइन फ़िक्स्चर (`src/skins/__fixtures__/skin-baseline.json`) में मापा गया मान है और वही CSS फ़ॉलबैक है। `groupShadow` के लिए वह **एलिवेशन 2** है (`0 3px 1px -2px …, 0 2px 2px 0 …, 0 1px 5px 0 …`) — `groups: 'box'` के तहत सेक्शन एक VBtnGroup (`elevation="4"`) है, और टोकन नियम समूह की अपनी एलिवेशन के ऊपर इसी तिहरी से बॉक्स को रंगता है: एलिवेशन बॉक्स की है, जुड़े हुए चाइल्ड बटन कोई नहीं रखते।

### बटन {#buttons}

ये टोकन **केवल `buttons: 'quiet'` के तहत** उपयोग होते हैं — [पहुँच](#reachability) देखें।

| टोकन | CSS वेरिएबल | quiet मान (classic: मूल Vuetify) |
|---|---|---|
| `buttonFg` | `--tf-button-fg` | `rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))` |
| `buttonHoverBg` | `--tf-button-hover-bg` | `rgba(var(--v-theme-on-surface), 0.07)` |
| `buttonHoverFg` | `--tf-button-hover-fg` | `rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))` |
| `buttonActiveBg` | `--tf-button-active-bg` | `rgba(var(--v-theme-on-surface), 0.1)` |
| `buttonActiveHoverBg` | `--tf-button-active-hover-bg` | `rgba(var(--v-theme-on-surface), 0.14)` |
| `buttonRadius` | `--tf-button-radius` | `6px` |

### बबल मेन्यू (चयन, खाली पंक्ति, चित्र) {#bubble-menus-selection-empty-line-image}

| टोकन | CSS वेरिएबल | क्लासिक | पैस्टल |
|---|---|---|---|
| `bubbleBg` | `--tf-bubble-bg` | `rgb(var(--v-theme-surface))` | वही |
| `bubbleBorder` | `--tf-bubble-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `bubbleShadow` | `--tf-bubble-shadow` | `0 4px 14px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)` | `0 6px 20px rgba(0, 0, 0, 0.12)` |
| `bubbleRadius` | `--tf-bubble-radius` | `6px` | `10px` |
| `bubblePadding` | `--tf-bubble-padding` | `4px` | वही |
| `bubbleGap` | `--tf-bubble-gap` | `2px` | वही |

### ड्रॉपडाउन मेन्यू {#dropdown-menus}

| टोकन | CSS वेरिएबल | क्लासिक | पैस्टल |
|---|---|---|---|
| `menuListPadding` | `--tf-menu-list-padding` | `8px 0px` | `4px` |
| `menuRadius` | `--tf-menu-radius` | `4px` | `8px` |
| `menuBorder` | `--tf-menu-border` | `none` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))` |
| `menuShadow` | `--tf-menu-shadow` | Vuetify एलिवेशन 8 [²](#shadow-cells) | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| `menuItemRadius` | `--tf-menu-item-radius` | `0px` | `6px` |
| `menuItemPadding` | `--tf-menu-item-padding` | Vuetify [³](#menu-classic-note) | `4px 8px` |
| `menuItemMinHeight` | `--tf-menu-item-min-height` | Vuetify [³](#menu-classic-note) | `34px` |
| `menuItemActiveBg` | `--tf-menu-item-active-bg` | Vuetify [³](#menu-classic-note) | `rgba(var(--v-theme-on-surface), 0.06)` |

<a id="menu-classic-note"></a>³ क्लासिक मेन्यू का **सूची** बॉक्स (त्रिज्या, छाया, सूची पैडिंग) आज एक स्किन नियम है — `SkinScope` टोकन रैपर Vuetify के अपने चाइल्ड नियम और सूची के बीच बैठता है, इसलिए लाइब्रेरी उन पिक्सेल को ऊपर के टोकन पढ़ने वाले स्किन नियमों के रूप में बहाल करती है। **आइटम** के पिक्सेल मूल Vuetify के रहते हैं (फ़िक्स्चर वहाँ Vuetify के डिफ़ॉल्ट मापता है): `menu: 'vuetify'` रहते चारों आइटम टोकन निष्क्रिय हैं।

### डायलॉग {#dialogs}

| टोकन | CSS वेरिएबल | क्लासिक | पैस्टल |
|---|---|---|---|
| `dialogShadow` | `--tf-dialog-shadow` | VCard एलिवेशन [²](#shadow-cells) | `0 20px 48px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)` |
| `dialogRadius` | `--tf-dialog-radius` | `4px` (VCard) | `12px` |
| `dialogHeaderPadding` | `--tf-dialog-header-padding` | `8px 16px` | `16px 12px 12px 20px` |
| `dialogContentPadding` | `--tf-dialog-content-padding` | `16px 24px 24px` | `4px 20px` |
| `dialogActionsPadding` | `--tf-dialog-actions-padding` | `8px` | `16px 20px 20px` |
| `dialogTitleSize` | `--tf-dialog-title-size` | `1.25rem` | `1.125rem` |
| `dialogTitleWeight` | `--tf-dialog-title-weight` | `400` | `600` |
| `dialogFieldRadius` | `--tf-dialog-field-radius` | फ़ील्ड का डिफ़ॉल्ट (`4px`) | `8px` (आउटलाइन वाला) |
| `dialogActionBtnMinHeight` | `--tf-dialog-action-btn-min-height` | Vuetify (`auto`) | `38px` |
| `dialogActionBtnRadius` | `--tf-dialog-action-btn-radius` | Vuetify (`4px`) | `8px` |
| `dialogGridGap` | `--tf-dialog-grid-gap` | `24px` | `16px` |

### फ़्रेम (एडिटर की बॉर्डर रैपर) {#frame-editor-border-wrapper}

| टोकन | CSS वेरिएबल | क्लासिक | पैस्टल |
|---|---|---|---|
| `frameBorder` | `--tf-frame-border` | `1px solid rgba(var(--v-border-color), var(--v-border-opacity))`, ऊपरी किनारा नहीं | पूरी बॉर्डर |
| `frameBg` | `--tf-frame-bg` | `transparent` | `rgb(var(--v-theme-surface))` |
| `frameShadow` | `--tf-frame-shadow` | `none` | `0 1px 2px rgba(0, 0, 0, 0.05)` |

सपाट टूलबार आकार में फ़्रेम हर तरफ़ का एक अंतर भी रंगता है (ऊपरी किनारा, और निचला किनारा 1.6× बॉर्डर अपारदर्शिता पर)। वह अंतर आकार का है, टोकन का नहीं: वह टोकन से पहुँच योग्य नहीं है।

### चित्र और रीसाइज़ हैंडल {#images-and-resize-handles}

| टोकन | CSS वेरिएबल | क्लासिक | पैस्टल |
|---|---|---|---|
| `imageRadius` | `--tf-image-radius` | `0.125rem` | `4px` |
| `imageBg` | `--tf-image-bg` | `transparent` | `rgba(var(--v-theme-on-surface), 0.04)` |
| `imageOutline` | `--tf-image-outline` | `1px solid rgba(0, 0, 0, 0.25)` (चयनित) | `2px solid rgb(var(--v-theme-primary))` |
| `imageOutlineHover` | `--tf-image-outline-hover` | `transparent` | `rgba(var(--v-theme-primary), 0.35)` |
| `handleBg` | `--tf-handle-bg` | `rgba(0, 0, 0, 0.5)` | `rgb(var(--v-theme-primary))` |
| `handleBgHover` | `--tf-handle-bg-hover` | `rgba(0, 0, 0, 0.8)` (होवर) | `rgb(var(--v-theme-primary))` |
| `handleBorder` | `--tf-handle-border` | `none` | `2px solid rgb(var(--v-theme-surface))` |
| `handleShadow` | `--tf-handle-shadow` | `none` | `0 0 0 1px rgba(0, 0, 0, 0.15)` |
| `handleRadius` | `--tf-handle-radius` | `2px` | `50%` |

चित्र टूलबार `buttons` फ़्लैग का अनुसरण करता है: quiet आकार में उसे quiet सतह मिलती है — उसकी 2px/4px स्पेसिंग चित्र-मेन्यू फ़ॉलबैक के साथ `--tf-bubble-gap` / `--tf-bubble-padding` पढ़ती है; चित्र-टूलबार का कोई समर्पित टोकन नहीं है।

### कैटलॉग में नहीं (निकास-द्वार का क्षेत्र) {#not-in-the-catalog-escape-hatch-territory}

डिज़ाइन अवलोकन में नामित कुछ आयामों का v1 में कोई कैटलॉग टोकन नहीं है: **टूलबार की ऊँचाई, फ़्रेम की चौड़ाई, फ़्रेम की त्रिज्या, बटन की चौड़ाई, बटन की पैडिंग, डायलॉग की चौड़ाई**। ऊपर की कैटलॉग तालिकाएँ अनुबंध हैं; इन पिक्सेल के लिए [निकास-द्वार](#escape-hatch-the-root-class) खोलें और स्थिर क्लासों को सीधे स्टाइल करें।

## पहुँच (Reachability) {#reachability}

अनुबंध, एक बार कहा गया और ऊपर के हर समूह द्वारा निभाया गया:

> टोकन किसी सतह को तभी रंगता है जब आकार उस सतह को सक्रिय करे; मूल Vuetify दृश्य Vuetify थीम रंगों से स्टाइल होते हैं।

हर समूह के लिए:

- **टूलबार, फ़्रेम, चित्र/हैंडल आवरण** — हर आकार में सक्रिय; टोकन उन्हें रंगते हैं, क्लासिक सेल वह मूल रूप हैं जिस पर टोकन लौट आते हैं।
- **समूह बॉक्स** (`groupBg`, `groupRadius`, `groupHeight`, `groupShadow`) — `groups: 'box'` के तहत सेक्शन VBtnGroup है (0.3.2 संरचना: बटन जुड़ते हैं, बॉक्स एलिवेशन रखता है); बॉक्स नियम उसे समूह टोकन से रंगते हैं, और `--tf-group-height` 32px का अनुबंध `!important` के साथ बनाए रखता है (Vuetify का घनत्व नियम उससे लड़ता है, जैसा 0.3.2 में था)। `groups: 'flat'` के तहत सेक्शन साधारण div पंक्तियाँ हैं (पारदर्शी, बिना छाया, त्रिज्या 0 आकार का आधार है)।
- **विभाजक की बारीक रेखाएँ** (`dividerWidth/Height/Color`) — दिखने वाली बारीक रेखा `groups: 'flat'` की सुविधा है; बॉक्स आकार में विभाजक शून्य-आकार का स्पेसर है (आधार नियम से `margin: 0 4px`)।
- **आइटम पैडिंग/गैप** — सघन `6px 8px` पंक्ति सपाट पट्टी (`toolbar: 'flat'`) पर निर्भर है, समूह गैप सपाट सेक्शन (`groups: 'flat'`) पर; उभरी पट्टी क्लासिक मीट्रिक रखती है।
- **बटन** (`buttonFg`, `buttonHover*`, `buttonActive*`, `buttonRadius`) — `buttons: 'vuetify'` के तहत निष्क्रिय: मूल Vuetify बटन अपनी स्थितियाँ खुद रंगते हैं। उन्हें Vuetify थीम रंगों (`primary`, `surface`, …) से स्टाइल करें — क्लासिक आकार जानबूझकर उन्हें विरासत में लेते हैं।
- **मेन्यू आइटम मीट्रिक** (`menuItemRadius/Padding/MinHeight/ActiveBg`) — `menu: 'vuetify'` के तहत निष्क्रिय; वे आइटम पिक्सेल Vuetify के हैं। मेन्यू **सूची** बॉक्स (त्रिज्या/छाया/पैडिंग) दोनों आकारों में स्किन द्वारा रंगा जाता है ([मेन्यू नोट](#menu-classic-note) देखें)।
- **डायलॉग का नरम आवरण** (`dialogActionBtn*`, `dialogFieldRadius`, नरम पैडिंग, गायब विभाजक) — `dialog: 'soft'` के तहत रंगा जाता है; `dialog: 'classic'` के तहत डायलॉग क्लासिक पैडिंग वाला VCard है।
- **बबल आवरण** — चयन, खाली-पंक्ति और चित्र मेन्यू दोनों आकारों में आइकन बटनों की एक पंक्ति हैं, जिन्हें बबल टोकन रंगते हैं; `bubble` अब उनका मार्कअप नहीं बदलता।

कैटलॉग के आधार के बराबर ओवरराइड **जारी नहीं किया जाता** — गैर-क्लासिक आकार के तहत आकार का अपना आधार CSS फ़ॉलबैक से रंगता है, इसलिए क्लासिक मान "बहाल करना" (जैसे `buttons: 'quiet'` के तहत `buttonActiveBg` को वापस `rgb(var(--v-theme-primary))` पर सेट करना) चुपचाप कुछ नहीं करता। गैर-क्लासिक आकार के तहत क्लासिक जैसा मान लागू करने के लिए ऐसा ओवरराइड सेट करें जो कैटलॉग के आधार से अलग हो — `rgba(var(--v-theme-primary), 1)` जैसा समतुल्य लिटरल बिल्कुल वैसा ही रंगता है और इस छोड़ने से बच जाता है।

टोकन जानबूझकर मूल पथों में नहीं जोड़े गए हैं — यही `default` को क्लासिक स्वरूप से पिक्सेल-समान रखता है, जबकि सब कुछ कैटलॉग से होकर गुज़रता है।

## रेसिपी {#recipes}

### pastel को बढ़ाएँ {#extend-pastel}

शांत आकार विरासत में लें और कुछ सतहों को दोबारा रंगें। पंजीकृत नाम किसी भी एडिटर पर काम करते हैं:

```ts
// main.ts — call once, before any editor mounts
import { registerSkin } from 'tiptapify'

registerSkin('mint', {
  extends: 'pastel',
  colors: {
    toolbarBg: 'rgba(0, 128, 0, 0.05)',   // mint tint over the pastel wash
    handleBg: 'rgb(0, 100, 0)',           // deep green handles
    handleBgHover: 'rgb(0, 128, 0)',
    imageOutline: '2px solid rgb(0, 100, 0)',
    imageOutlineHover: 'rgba(0, 100, 0, 0.35)',
  },
})
```

```vue
<Tiptapify skin="mint" />
```

आकार (flat/quiet/soft) pastel से आता है; अछूते टोकन pastel के मान रखते हैं — quiet बटन की रंगत तटस्थ रहती है, केवल वही बदलता है जिसे आप ओवरराइड करें। यह वही स्किन है जो [उदाहरण पेज](/hi/examples/skins#custom-mint) पर लाइव रेंडर होती है।

### default को बढ़ाएँ {#extend-default}

क्लासिक संरचना रखें, रंग-रोगन ट्यून करें:

```ts
registerSkin('paper', {
  extends: 'default',
  colors: { toolbarBg: 'rgb(var(--v-theme-background))' },
  metrics: { groupRadius: '8px', itemsPadding: '10px 14px' },
})
```

`extends: 'default'` निहित जड़ है, इसलिए कुंजी छोड़ी जा सकती है: `{ toolbar: 'flat', … }` भी क्लासिक से शुरू होता है।

### पूरी तरह कस्टम {#full-custom}

न `extends`, न पंजीकरण: ऑब्जेक्ट को `skin` prop में दें और आकार फ़्लैग व टोकन खुलकर सेट करें। `name` रूट क्लास पर आपका अपना लेबल लगाता है (नीचे देखें); उसके बिना वह `tiptapify-skin-inline` होता है।

```vue
<script setup lang="ts">
import { defineSkin } from 'tiptapify'

const slate = defineSkin({
  name: 'slate',
  toolbar: 'flat',
  groups: 'flat',
  buttons: 'quiet',
  bubble: 'flat',
  dialog: 'soft',
  menu: 'soft',
  colors: { toolbarBg: 'rgb(30, 41, 59)', toolbarFg: 'rgb(226, 232, 240)' },
  metrics: { buttonRadius: '8px' },
})
</script>

<template>
  <Tiptapify :skin="slate" />
</template>
```

`defineSkin` टाइप वाली const परिभाषाओं के लिए पहचान सहायक है (यह किसी रजिस्ट्री में नहीं जाता)। आकार फ़्लैग अलग-अलग सेट किए जा सकते हैं — जो फ़्लैग आप छोड़ते हैं वह क्लासिक रहता है।

## निकास-द्वार: रूट क्लास {#escape-hatch-the-root-class}

हर एडिटर रूट पर `tiptapify-skin-{name}` लगता है (बिना नाम वाले इनलाइन ऑब्जेक्ट के लिए `tiptapify-skin-inline`)। लाइब्रेरी **किसी भी नियम को स्किन नाम पर आधारित नहीं करती** — यह क्लास आपकी है:

```css
/* Style the frame of one skin, dimensions the catalog does not cover */
.tiptapify-skin-mint .tiptapify-frame {
  max-width: 720px;
  margin-inline: auto;
}
```

जिन स्थिर हुक के विरुद्ध आप लिख सकते हैं:

| क्लास | कहाँ |
|---|---|
| `tiptapify-skin-{name}` | एडिटर रूट |
| `tiptapify-shape-{flag}-{value}` ×6 | एडिटर रूट — रिज़ॉल्व किया गया आकार |
| `tiptapify-toolbar` · `tiptapify-toolbar-items` · `tiptapify-toolbar-group` · `menu-divider` | टूलबार और उसके सेक्शन |
| `tiptapify-quiet-buttons` | `buttons: 'quiet'` के तहत टूलबार और बबल रूट |
| `tiptapify-bubble-row` · `tiptapify-bubble-divider` | हर बबल मेन्यू की पंक्ति और उसके समूहों के बीच की बारीक रेखा |
| `tiptapify-bubble-menu` · `floating-menu` · `tiptapify-image-menu` | चयन, खाली-पंक्ति और चित्र मेन्यू की पंक्तियाँ |
| `tiptapify-btn--active` | बबल मेन्यू का दबा हुआ बटन (सक्रिय मार्क, चित्र का फ़्लोट) |
| `tiptapify-menu` · `tiptapify-menu--soft` | ड्रॉपडाउन ओवरले की सामग्री, नरम मेन्यू नियमों का वाहक |
| `tiptapify-skin-scope` | टेलीपोर्ट किए गए मेन्यू के भीतर टोकन स्कोप div |
| `tiptapify-dialog` · `tiptapify-dialog--soft` | डायलॉग कार्ड और उसका नरम वाहक |
| `tiptapify-frame` | एडिटर की बॉर्डर रैपर |

**उपभोक्ता-थीम से बचाव।** स्किन परत ऐसी एडमिन थीम से बचने के लिए बनी है जो Vuetify के आंतरिक हिस्सों में पैडिंग जोड़ती और उन्हें दोबारा रंगती हैं: नियम आकार/वाहक क्लास पर निर्भर रहते हैं, विशिष्टता के लिए दोहरी क्लास (`.v-list.v-list`, `.v-btn.v-btn.v-btn`) उपयोग करते हैं, और `!important` केवल वहीं रखते हैं जहाँ आधार कमिट के एडमिन-थीम मामले ने उसे ज़रूरी साबित किया (menu.css का बचाव-समूह)। वे परंपराएँ जो आपके अपने ओवरराइड को उसी युद्धक्षेत्र में काम करते रखती हैं:

- अपना CSS `.tiptapify-skin-{name}` (या किसी आकार क्लास) के तहत स्कोप करें — खाली Vuetify आंतरिक हिस्सों पर कभी नहीं;
- कैटलॉग के आयामों के लिए टोकन (`--tf-*`) को और बाकी के लिए क्लास को प्राथमिकता दें;
- Vuetify कंपोनेंट ओवरराइड करते समय दोहराव का मिलान करें (अकेली `.v-list-item` स्किन नियमों से हार जाती है)।

## विज़ुअल अनुबंध (योगदानकर्ता नोट) {#visual-contract-contributor-note}

बिल्ट-इन स्किन की गणना की गई शैलियाँ बेसलाइन फ़िक्स्चर `src/skins/__fixtures__/skin-baseline.json` (13 सेक्शन × लाइट/डार्क) से बँधी हैं: CSS परत तब पूरी मानी जाती है जब मापा गया मैट्रिक्स उससे मेल खाए। फ़िक्स्चर के लिए पढ़ने के नोट:

- होवर/सक्रिय आयाम पेज से ज़बरदस्ती नहीं लगाए जा सकते, इसलिए रिकॉर्डिंग हर होवर सेलेक्टर के लिए **पहले मिले CSSOM नियम का घोषणा टेक्स्ट** पढ़ती है और उसे स्किन रूट के भीतर एक प्रोब एलिमेंट (`resolved` फ़ील्ड) से रिज़ॉल्व करती है — यह जीतने वाले नियम का अनुबंध है, लाइव `:hover` स्नैपशॉट नहीं।
- `_meta.selectors.menu` `SkinScope` से पहले का सेलेक्टर टेक्स्ट दर्ज करता है। फ़िक्स्चर जमा हुआ है (मानक मान), इसलिए फ़ील्ड जानबूझकर पुराना है; रिकॉर्डिंग बंडल मौजूदा सेलेक्टर को पिन करता है।
- फ़िक्स्चर अपने स्वीकृत बदलाव `_meta.notes` में रखता है: `groups: 'box'` के तहत VBtnGroup मार्कअप की 2026-10-18 की बहाली ने क्लासिक `groupBtn`/`buttonsActive` चाइल्ड-बटन फ़ील्ड फिर से मापे (जुड़े हुए कोने, एलिवेशन बॉक्स की)। Pastel फ़ील्ड अछूते हैं — जानबूझकर किया गया दृश्य बदलाव केवल प्रभावित क्लासिक सेल अपडेट करता है, एक नोट दर्ज करता है, और CHANGELOG की एक पंक्ति के साथ जाता है।

## यह भी देखें {#see-also}

- [स्किन उदाहरण](/hi/examples/skins) — क्लासिक, pastel और कस्टम mint स्किन, लाइव।
- [`skin` prop](/hi/api/props#skin) · [स्किन टाइप](/hi/api/types#tiptapifyskin) · [`registerSkin` / `defineSkin`](/hi/api/types#tiptapifyskininput)।
