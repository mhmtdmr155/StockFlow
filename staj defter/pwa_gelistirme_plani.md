# ElektromTech PWA (Progressive Web App) StockFlow Sistemi - Ä°leri DÃ¼zey GeliÅŸtirme Yol HaritasÄ± ve AI Prompteri

Bu rapor, StockFlow uygulamasÄ±nÄ± dÃ¼nya standartlarÄ±nda, ultra-profesyonel, offline-first (Ã§evrimdÄ±ÅŸÄ± Ã¶ncelikli) Ã§alÄ±ÅŸan ve kusursuz mobil/masaÃ¼stÃ¼ kullanÄ±cÄ± deneyimi (UX) sunan bir PWA haline getirmek iÃ§in gerekli mimari detaylarÄ±, tasarÄ±m ilkelerini ve baÅŸka bir yapay zekaya (Cursor, Gemini, Claude vb.) doÄŸrudan iletebileceÄŸiniz **Master Prompt (Uzman Talimat Seti)** ÅŸablonunu iÃ§erir.

---

## BÃ–LÃœM 1: PWA MÄ°MARÄ° VE GÃ–RSEL GELÄ°ÅTÄ°RME HARÄ°TASI (ROADMAP)

UygulamanÄ±n "Premium App Store UygulamasÄ±" hissiyatÄ± vermesi iÃ§in 4 ana sÃ¼tunda yapÄ±landÄ±rÄ±lmasÄ± gerekir:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                          ELEKTROMTECH PWA MÄ°MARÄ°SÄ°                              â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ 1. GÃ–RSEL MÃœKEMMELLÄ°K  â”‚ 2. SAÄLAM OFFLINE      â”‚ 3. MOBÄ°L ENTEGRASYON          â”‚
â”‚    (Premium UI/UX)     â”‚    (Ã‡evrimdÄ±ÅŸÄ± YapÄ±)   â”‚    (Native HissiyatÄ±)         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ â€¢ Glassmorphism Kartlarâ”‚ â€¢ Stale-While-         â”‚ â€¢ Custom Kurulum ModalÄ±       â”‚
â”‚ â€¢ Shimmer Efektleri    â”‚   Revalidate (SW)      â”‚ â€¢ Kamera ile Barkod Okuma     â”‚
â”‚ â€¢ HSL Uyumlu Light/Darkâ”‚ â€¢ iOS Safari IndexedDB â”‚ â€¢ Web Push Bildirimleri       â”‚
â”‚ â€¢ iOS Safe Area (Safe) â”‚   Hata ToleransÄ±       â”‚ â€¢ Uygulama KÄ±sayollarÄ± (App)  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### 1. GÃ¶rsel MÃ¼kemmellik (Ã–zellikle Light/White Mod OdaklÄ±)
*   **Renk Paleti (AydÄ±nlÄ±k Mod):** Saf beyaz (`#FFFFFF`) yerine, gÃ¶z yormayan ve derinlik hissi veren hafif mavi-gri tonlarÄ± (`#F8FAFC` veya `#F1F5F9`) arka plan olarak seÃ§ilmelidir. Kartlar, cam efekti (`backdrop-filter: blur(16px)`) ve Ã§ok ince bir sÄ±nÄ±r Ã§izgisiyle (`border: 1px solid rgba(99,102,241,0.08)`) arka plandan ayrÄ±lmalÄ±dÄ±r.
*   **Mikro Animasyonlar:** Butonlara basÄ±ldÄ±ÄŸÄ±nda mobil cihazlardaki "dokunsal geri bildirim" hissini simÃ¼le etmek iÃ§in hafif kÃ¼Ã§Ã¼lme (`scale-95`) ve yaylanma efektleri (`cubic-bezier(0.34, 1.56, 0.64, 1)`) eklenmelidir.
*   **Skeleton (Åablon) YÃ¼kleyiciler:** Veriler yÃ¼klenirken donuk gri kutular yerine, saÄŸa doÄŸru kayan yumuÅŸak bir Ä±ÅŸÄ±k hÃ¼zmesine sahip parÄ±ldayan (shimmer effect) ÅŸablonlar tasarlanmalÄ±dÄ±r.
*   **iOS Safe Area:** EkranÄ±n altÄ±ndaki ve Ã¼stÃ¼ndeki Ã§entiklerin (notch/home indicator) butonlarÄ± veya navigasyonu kapatmamasÄ± iÃ§in CSS'e `padding-bottom: env(safe-area-inset-bottom)` ve `padding-top: env(safe-area-inset-top)` kurallarÄ± tam olarak uygulanmalÄ±dÄ±r.

### 2. Ã‡evrimdÄ±ÅŸÄ± Ã–ncelikli GÃ¼Ã§lÃ¼ AltyapÄ± (Robust Offline-First)
*   **Service Worker Dinamik Ã–nbellekleme:** CSS, JS, logo gibi statik dosyalar iÃ§in **Cache-First** stratejisi uygulanmalÄ±; API Ã§aÄŸrÄ±larÄ± iÃ§in ise **Stale-While-Revalidate** (Ã¶nce hÄ±zlÄ±ca Ã¶nbellekten ver, arka planda API'den gÃ¼ncelleyip ekranÄ± sessizce yenile) stratejisi entegre edilmelidir.
*   **AkÄ±llÄ± Ã‡akÄ±ÅŸma YÃ¶netimi (Conflict Resolution):** Ã‡evrimdÄ±ÅŸÄ± durumdayken stok gÃ¼ncellemesi yapan iki farklÄ± personel online olduÄŸunda oluÅŸabilecek versiyon Ã§akÄ±ÅŸmalarÄ± iÃ§in kullanÄ±cÄ±ya *"Sunucudaki Veri" vs "Sizin Cihazdaki Veri"* ÅŸeklinde seÃ§im sunan temiz bir arayÃ¼z (Modal) tasarlanmalÄ±dÄ±r.

### 3. Cihaz EntegrasyonlarÄ± (Native Features)
*   **Ã–zel Kurulum ArayÃ¼zÃ¼ (In-App Install Prompt):** TarayÄ±cÄ±nÄ±n varsayÄ±lan kurulum uyarÄ±sÄ± yerine, uygulamanÄ±n iÃ§inde beliren, markalÄ± ve yÃ¶nlendirici bir "UygulamayÄ± Telefonunuza YÃ¼kleyin" kartÄ± oluÅŸturulmalÄ±dÄ±r.
*   **Kamera Entegrasyonu (Barkod/QR Tarama):** Arama Ã§ubuÄŸunun yanÄ±na yerleÅŸtirilecek kamera ikonuyla web kamerasÄ± aktif edilmeli, WebRTC kullanarak direnÃ§ veya entegre barkodlarÄ± taranÄ±p saniyeler iÃ§inde Ã¼rÃ¼nÃ¼n detay sayfasÄ± aÃ§Ä±lmalÄ±dÄ±r.
*   **KÄ±sayollar (App Shortcuts):** MasaÃ¼stÃ¼ veya mobil kÄ±sayol simgesine basÄ±lÄ± tutulduÄŸunda aÃ§Ä±lan menÃ¼ye "Yeni ÃœrÃ¼n Ekle", "ÃœrÃ¼n Ara" ve "Bildirimler" gibi hÄ±zlÄ± eriÅŸim linkleri yerleÅŸtirilmelidir.

---

## BÃ–LÃœM 2: BAÅKA BÄ°R AI AGENT'A VERÄ°LECEK MASTER PROMPT (TALÄ°MAT SETÄ°)

*AÅŸaÄŸÄ±daki metni kopyalayÄ±p baÅŸka bir yapay zekaya (Ã¶rneÄŸin Cursor veya geliÅŸmiÅŸ bir LLM) girdiÄŸinizde, projeyi en Ã¼st kalitede derleyecektir:*

```text
AÅŸaÄŸÄ±da teknik detaylarÄ± belirtilen React, Vite, Node.js, Express ve PostgreSQL/Prisma tabanlÄ± "ElektromTech StockFlow" PWA projesini ultra-premium ve en Ã¼st dÃ¼zey kullanÄ±cÄ± deneyimine (UX) sahip olacak ÅŸekilde geliÅŸtireceksin. GeliÅŸtirmeyi yaparken aÅŸaÄŸÄ±daki spesifikasyonlara kelimesi kelimesine uymalÄ±sÄ±n.

### 1. TASARIM VE GÃ–RSEL STANDARTLAR (Ã–zellikle Light/White Mode)
- **Arka Plan ve Kartlar (Light Mode):** Saf beyaz arka plan kullanma. Arka planÄ± yumuÅŸak bir gri-mavi (#F8FAFC) yap. KartlarÄ± saf beyaz (#FFFFFF), kÃ¶ÅŸeleri geniÅŸÃ§e yuvarlatÄ±lmÄ±ÅŸ (rounded-2xl) yap. KartlarÄ±n etrafÄ±na Ã§ok ince, hafif indigo-mor geÃ§iÅŸli yarÄ± saydam bir border ekle (border-slate-200/80 veya border-indigo-500/10). Hafif bir gÃ¶lge efekti ver (shadow-sm, hover durumunda shadow-lg).
- **Glassmorphism:** Modal pencerelerinde, aÃ§Ä±lÄ±r Ã§ekmecelerde (drawers) ve Ã¼st barda (header) cam efekti kullan (bg-white/80, backdrop-blur-xl).
- **Butonlar ve EtkileÅŸimler:** TÃ¼m butonlara hover olduÄŸunda veya tÄ±klandÄ±ÄŸÄ±nda yumuÅŸak geÃ§iÅŸler (transition-all duration-200) ekle. TÄ±klanma anÄ±nda "active:scale-95" ile dokunma hissi ver.
- **YÃ¼kleme AnimasyonlarÄ± (Shimmer Effect):** TÃ¼m Skeleton component'lerine parÄ±ldama animasyonu ver (shimmer animation).
- **Responsive & Safe Area:** Mobil ekranlarda Ã§entik bÃ¶lgesine (notch) ve alt kaydÄ±rma Ã§ubuÄŸuna (Home Indicator) butonlarÄ±n taÅŸmasÄ±nÄ± Ã¶nlemek iÃ§in CSS env(safe-area-inset-...) kurallarÄ±nÄ± kullan.

### 2. KUSURSUZ PWA Ã–ZELLÄ°KLERÄ° VE Ã‡EVRÄ°MDIÅI Ã‡ALIÅMA
- **PWA Kurulum ModalÄ± (Custom Install Prompt):** Uygulama aÃ§Ä±ldÄ±ÄŸÄ±nda eÄŸer cihazda yÃ¼klÃ¼ deÄŸilse, ekranÄ±n altÄ±nda ÅŸÄ±k, kapatÄ±labilir bir "Ana Ekrana Ekle" yÃ¶nlendirme banner'Ä±/modalÄ± gÃ¶ster. 'beforeinstallprompt' event'ini yakalayarak bunu yÃ¶net.
- **Ä°leri DÃ¼zey Senkronizasyon (Sync Queue & Cache):** 
  - `navigator.onLine` deÄŸiÅŸkenine ek olarak, gerÃ§ek internet eriÅŸimini doÄŸrulamak iÃ§in her 10 saniyede bir hafif bir ping (`apiClient.get('/health')`) at.
  - indexedDB (Dexie.js) ile yerel veriyi Ã¶nbelleÄŸe alÄ±rken ve okurken iOS Safari Ã¼zerinde oluÅŸabilecek veritabanÄ± kilitlenme veya kÄ±sÄ±tlama hatalarÄ±nÄ± try-catch bloklarÄ±yla sarmala, hata durumunda uygulamayÄ± kitlemek yerine verileri bellekten (memory fallback) sunmaya devam et.
  - Ä°nternet kesilip tekrar geldiÄŸinde kuyruktaki verileri arka arkaya senkronize ederken kullanÄ±cÄ±ya ekranÄ±n Ã¼stÃ¼nde ÅŸÄ±k bir "Senkronizasyon BaÅŸarÄ±lÄ±" notification'Ä± gÃ¶ster.
- **Uygulama KÄ±sayollarÄ± (App Shortcuts):** `vite.config.ts` PWA manifest ayarlarÄ± altÄ±na kÄ±sayollar (shortcuts) ekle:
  - "/product/new" -> "Yeni ÃœrÃ¼n Ekle"
  - "/search" -> "HÄ±zlÄ± Ara"

### 3. Ä°LERÄ° DÃœZEY MOBÄ°L ENTEGRASYONLAR
- **Barkod / QR Kod Okuyucu (Camera Scanner):** Arama sayfasÄ±na ve Ã¼rÃ¼n formuna kamera ikonu ekle. TÄ±klanÄ±ldÄ±ÄŸÄ±nda ekranÄ±n ortasÄ±nda ÅŸÄ±k bir kamera tarama Ã§erÃ§evesi aÃ§. `html5-qrcode` veya `jsQR` benzeri kÃ¼tÃ¼phaneleri kullanarak kamera akÄ±ÅŸÄ±ndan barkodu Ã§Ã¶z ve eÅŸleÅŸen Ã¼rÃ¼ne otomatik yÃ¶nlendir.
- **DÃ¼ÅŸÃ¼k Stok Bildirim Zili:** Header kÄ±smÄ±na ÅŸÄ±k bir bildirim zili ekle. Stok adedi minimumun altÄ±na dÃ¼ÅŸen Ã¼rÃ¼n sayÄ±sÄ± zil Ã¼zerinde kÄ±rmÄ±zÄ± bir rozet (badge) olarak gÃ¶rÃ¼nsÃ¼n. Zile tÄ±klanÄ±ldÄ±ÄŸÄ±nda saÄŸdan ÅŸÄ±k bir panel aÃ§Ä±larak kritik Ã¼rÃ¼nleri listelesin.
- **Web Push Bildirimleri (Opsiyonel):** Servis Ã§alÄ±ÅŸÄ±rken bir Ã¼rÃ¼nÃ¼n stoÄŸu kritik seviyeye ulaÅŸtÄ±ÄŸÄ±nda, tarayÄ±cÄ± arka planda kapalÄ± olsa dahi native telefon bildirimi (Push Notification) gÃ¶nderecek servis yapÄ±sÄ±nÄ± entegre et.

### 4. DÄ°KKAT EDÄ°LECEK TEKNÄ°K DETAYLAR
- **TypeScript & EsLint:** Kendi kendine kullanÄ±lmayan deÄŸiÅŸkenler (unused variables) veya eksik tip tanÄ±mlamalarÄ± (any tipi zorunlu haller dÄ±ÅŸÄ±nda kullanÄ±lmamalÄ±) yÃ¼zÃ¼nden derleme (build) hatasÄ± oluÅŸturma.
- **React Query Entegrasyonu:** TÃ¼m veri yazma/silme (mutation) iÅŸlemlerinin sonunda 'queryClient.invalidateQueries()' kullanarak arayÃ¼z Ã¶nbelleÄŸini temizle.
```

---

## BÃ–LÃœM 3: STAJ DEFTERÄ° REFERANS NOTU
*Staj defterinizi doldururken bu baÅŸlÄ±ÄŸÄ± ÅŸu ÅŸekilde aktarabilirsiniz:*

> **"PWA Mobil Entegrasyonu ve ArayÃ¼z Optimizasyonu:"** 
> *Depo personelinin el terminalleri ve telefonlarÄ±yla stok sayÄ±mÄ±nÄ± kolaylaÅŸtÄ±rmak amacÄ±yla, geliÅŸtirilen web tabanlÄ± yazÄ±lÄ±m PWA (Progressive Web App) standartlarÄ±na yÃ¼kseltilmiÅŸtir. iOS Safari ve Android Chrome tarayÄ±cÄ±larÄ±nÄ±n yerel kÄ±sÄ±tlamalarÄ± (IndexedDB izin engelleri) analiz edilerek veritabanÄ± okuma/yazma aÅŸamalarÄ±na esnek hata yakalama (try-catch fallbacks) bloklarÄ± yazÄ±lmÄ±ÅŸtÄ±r. AydÄ±nlÄ±k Mod (Light Mode) arayÃ¼zÃ¼, endÃ¼striyel standartlara uygun ÅŸekilde gÃ¶z yormayan HSL renk paletleriyle (saf beyaz yerine lavanta-sky tonlarÄ±) ve cam efekti (Glassmorphism) kullanÄ±larak sÄ±fÄ±rdan revize edilmiÅŸtir.*

---

Bu planÄ± ve promptu kullanarak yapay zekaya dilediÄŸiniz geliÅŸtirmeyi en Ã¼st dÃ¼zey kalitede yaptÄ±rabilirsiniz! Eklemek istediÄŸiniz baÅŸka bir teknik detay var mÄ±?

