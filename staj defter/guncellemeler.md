# ElektromTech StockFlow Sistemi - KapsamlÄ± GeliÅŸtirme, Mimari ve GÃ¼ncelleme Raporu

Bu dokÃ¼man, ElektromTech firmasÄ± iÃ§in sÄ±fÄ±rdan tasarlanÄ±p geliÅŸtirilen "StockFlow Sistemi" projesinin tÃ¼m sÃ¼reÃ§lerini; veritabanÄ± tasarÄ±mÄ±ndan arka plan (backend) mimarisine, kullanÄ±cÄ± arayÃ¼zÃ¼nden (frontend) sunucu yapÄ±landÄ±rmalarÄ±na (Docker/Nginx) kadar son derece detaylÄ± bir biÃ§imde belgelemek amacÄ±yla staj defteri referansÄ± olarak hazÄ±rlanmÄ±ÅŸtÄ±r.

---

## 1. Projenin AmacÄ± ve Mimari TasarÄ±m (Architecture)
Projenin temel amacÄ±, ÅŸirketin bÃ¼nyesindeki elektronik komponentlerin (direnÃ§ler, kondansatÃ¶rler, entegreler vb.) giriÅŸ/Ã§Ä±kÄ±ÅŸ iÅŸlemlerini anlÄ±k olarak izleyebilmek, azalan stoklar iÃ§in uyarÄ± almak ve tÃ¼m bu sistemi internetin stabil olmadÄ±ÄŸÄ± depo ortamlarÄ±nda bile kesintisiz kullanabilmektir.

**KullanÄ±lan Teknoloji YÄ±ÄŸÄ±nÄ± (Tech Stack):**
*   **Frontend (Ã–n YÃ¼z):** React.js, TypeScript, Vite, Tailwind CSS, React Query, Dexie.js (IndexedDB).
*   **Backend (Arka Plan):** Node.js, Express.js, TypeScript.
*   **Database (VeritabanÄ±) & ORM:** PostgreSQL, Prisma ORM.
*   **AltyapÄ± & DaÄŸÄ±tÄ±m (Deployment):** Docker, Docker Compose, Nginx (Reverse Proxy).

Bu mimari tercih edilmiÅŸtir Ã§Ã¼nkÃ¼ TypeScript uÃ§tan uca tip gÃ¼venliÄŸi (type-safety) saÄŸlarken, React modÃ¼ler bir arayÃ¼z sunar. Prisma ORM, karmaÅŸÄ±k SQL sorgularÄ±nÄ± yÃ¶netmeyi kolaylaÅŸtÄ±rmÄ±ÅŸ ve veritabanÄ± gÃ¶Ã§lerini (migrations) hatasÄ±z hale getirmiÅŸtir.

---

## 2. VeritabanÄ± SÃ¼reÃ§leri ve Prisma ORM (Database)
VeritabanÄ± olarak iliÅŸkisel veri bÃ¼tÃ¼nlÃ¼ÄŸÃ¼nÃ¼ en iyi saÄŸlayan **PostgreSQL** kullanÄ±lmÄ±ÅŸtÄ±r. VeritabanÄ± tablolarÄ± Prisma ÅŸemalarÄ± (`schema.prisma`) ile tasarlanmÄ±ÅŸtÄ±r.

**Tablo YapÄ±larÄ± ve Ä°liÅŸkileri:**
1.  **User Tablosu:** Sistemi kullanacak depo personeli ve yÃ¶neticilerin kimlik bilgilerini (ÅŸifreli ÅŸifreler, roller) tutar.
2.  **Category Tablosu:** Elektronik parÃ§alarÄ± sÄ±nÄ±flandÄ±rmak iÃ§in sÄ±nÄ±rsÄ±z derinlikte alt kategori desteÄŸi sunar (`parentId` ile kendi kendine iliÅŸki kurulmuÅŸtur).
3.  **Product Tablosu:** ÃœrÃ¼nlerin barkodu, stok miktarÄ±, minimum stok seviyesi, dolap lokasyonu ve teknik spesifikasyonlarÄ± JSON formatÄ±nda (`attributes`) saklanÄ±r. AyrÄ±ca eÅŸzamanlÄ± deÄŸiÅŸiklikleri (Race Condition) Ã¶nlemek iÃ§in `version` alanÄ± eklenmiÅŸtir.
4.  **StockMovement Tablosu:** Her stok giriÅŸ ve Ã§Ä±kÄ±ÅŸ iÅŸleminde kimin, ne zaman, hangi Ã¼rÃ¼nÃ¼ ne kadar deÄŸiÅŸtirdiÄŸini loglar. Kesin bir denetim izi (Audit Trail) saÄŸlar.
5.  **AuditLog Tablosu:** Sistemdeki silme, ekleme ve gÃ¼ncelleme iÅŸlemlerinin eski ve yeni verilerini JSON olarak tutan bir log tablosudur.

**YapÄ±lan Ä°ÅŸlemler:**
*   BaÅŸlangÄ±Ã§ verisi (Seed) olarak 40'tan fazla direnÃ§ tÃ¼rÃ¼ (SMD, THT, 0603 KÄ±lÄ±f, 1206 KÄ±lÄ±f) scriptler aracÄ±lÄ±ÄŸÄ±yla otomatik olarak veritabanÄ±na iÅŸlenmiÅŸtir.
*   Prisma Studio aracÄ±lÄ±ÄŸÄ±yla veriler gÃ¶rselleÅŸtirilmiÅŸ ve yÃ¶netilmiÅŸtir.

---

## 3. Arka Plan (Backend) GeliÅŸtirme SÃ¼reÃ§leri
Arka plan sistemi, tamamen RESTful standartlarÄ±na uygun olarak tasarlanmÄ±ÅŸ bir Express.js API'sidir. 

**Kimlik DoÄŸrulama ve GÃ¼venlik:**
*   Sisteme giriÅŸ yapan kullanÄ±cÄ±lara JSON Web Token (JWT) Ã¼retilir. GÃ¼venlik amacÄ±yla Refresh Token mantÄ±ÄŸÄ± kurulmuÅŸtur. 
*   Ã–zel `authMiddleware` yazÄ±larak sisteme yetkisiz eriÅŸimlerin Ã¶nÃ¼ne geÃ§ilmiÅŸtir.

**API KontrolcÃ¼leri (Controllers):**
*   **Product Controller:** ÃœrÃ¼n ekleme, silme, stok eÅŸiÄŸi kontrolÃ¼ ve filtreli arama (kategoriye veya isme gÃ¶re) algoritmalarÄ±nÄ± barÄ±ndÄ±rÄ±r.
*   **Stock Controller:** Optimistic Locking kullanÄ±larak aynÄ± anda iki personelin aynÄ± Ã¼rÃ¼ne stok girmesi engellenmiÅŸtir. Versiyon kontrolÃ¼ sayesinde bir iÅŸlem yapÄ±lÄ±rken diÄŸer personelin ekranÄ± uyarÄ±lÄ±r.
*   **Dashboard Controller:** VeritabanÄ±ndaki on binlerce veriyi iÅŸleyip gruplayarak (group by) ana ekrandaki istatistik grafiklerine besler.

---

## 4. Ã–n YÃ¼z (Frontend) GeliÅŸtirme SÃ¼reÃ§leri
KullanÄ±cÄ± arayÃ¼zÃ¼ son derece modern, "KaranlÄ±k Mod (Dark Mode)" destekli ve mobil cihazlara tam uyumlu (Responsive) olarak React ve Tailwind CSS ile inÅŸa edilmiÅŸtir.

**KullanÄ±cÄ± ArayÃ¼zÃ¼ DetaylarÄ±:**
*   Sistemde bolca "Glassmorphism" (buzlu cam efekti) ve yumuÅŸak animasyonlar (micro-animations) kullanÄ±ldÄ±. Bu durum uygulamanÄ±n bir web sitesinden Ã§ok "Premium" bir mobil uygulama hissiyatÄ± vermesini saÄŸladÄ±.
*   Tablo yerine Ã¶zel "Kart (Card)" tasarÄ±mlarÄ± kullanÄ±larak Ã¼rÃ¼nlerin kondisyonu ve stok uyarÄ±larÄ± gÃ¶rselleÅŸtirildi.
*   Stok giriÅŸi ve Ã§Ä±kÄ±ÅŸÄ± sÄ±rasÄ±nda hatalÄ± tuÅŸlamalarÄ± Ã¶nlemek iÃ§in Ã¶zel Dialog pencereleri oluÅŸturuldu.

---

## 5. Ä°leri DÃ¼zey Ã‡evrimdÄ±ÅŸÄ± Ã‡alÄ±ÅŸma (PWA & Offline-First) SÃ¼reci
Depo ortamlarÄ±nda internet baÄŸlantÄ±sÄ±nÄ±n kopma ihtimaline karÅŸÄ± sistem PWA olarak tasarlandÄ±.
*   **Service Worker:** UygulamanÄ±n Ã§alÄ±ÅŸmasÄ± iÃ§in gereken tÃ¼m kod dosyalarÄ± tarayÄ±cÄ±ya Ã¶nbelleklendi (cachelendi). Ä°nternet kablosu Ã§ekilse bile sistem yÃ¼klenmeye devam eder.
*   **IndexedDB (Dexie.js):** TarayÄ±cÄ± iÃ§inde Ã§alÄ±ÅŸan lokal bir veritabanÄ± kuruldu. Sunucudan alÄ±nan veriler buraya kopyalandÄ±.
*   **Senkronizasyon KuyruÄŸu (Sync Queue):** Ä°nternet yokken yapÄ±lan tÃ¼m iÅŸlemler (yeni Ã¼rÃ¼n ekleme, stok dÃ¼ÅŸme) yerel olarak yapÄ±lÄ±yor ve IndexedDB'ye kaydediliyor. Ä°nternet baÄŸlantÄ±sÄ± saÄŸlandÄ±ÄŸÄ±nda `syncQueue` isimli liste arka planda teker teker taranÄ±p ana sunucuya (PostgreSQL'e) aktarÄ±lÄ±yor.

---

## 6. GeliÅŸtirme SÃ¼recinde KarÅŸÄ±laÅŸÄ±lan Kritik Hatalar ve Ã‡Ã¶zÃ¼mleri

AÅŸaÄŸÄ±da, proje geliÅŸtirilirken yaÅŸanan, sistemi kilitleyen kritik hatalar ve bunlarÄ±n mÃ¼hendislik yaklaÅŸÄ±mÄ±yla nasÄ±l Ã§Ã¶zÃ¼ldÃ¼ÄŸÃ¼ raporlanmÄ±ÅŸtÄ±r:

### Hata 1: "405 Method Not Allowed" ve Nginx Proxy Sorunu
*   **Sorun:** Konteyner mimarisinde frontend portundan (`localhost:3000`) backend'e veri yazÄ±lmaya (POST) Ã§alÄ±ÅŸÄ±ldÄ±ÄŸÄ±nda, statik dosya sunucusu bunu reddediyordu.
*   **Ã‡Ã¶zÃ¼m:** Docker Compose iÃ§ine `Nginx` (Ters Proxy / Reverse Proxy) entegre edildi. `nginx.conf` dosyasÄ±na Ã¶zel yÃ¶nlendirme (proxy_pass) komutlarÄ± eklendi. Gelen `/api/` etiketli tÃ¼m istekler frontend sunucusunu by-pass ederek doÄŸrudan backend konteynerine iletildi.

### Hata 2: HiyerarÅŸik Veri KaybÄ± (DirenÃ§lerin Ana Kategoride Gizlenmesi)
*   **Sorun:** YÃ¼zlerce direnÃ§ "0603 KÄ±lÄ±f" ve "1206 KÄ±lÄ±f" gibi alt kategorilere eklenmesine raÄŸmen, ana menÃ¼den genel "DirenÃ§ler" kategorisine basÄ±ldÄ±ÄŸÄ±nda ekranda "0 ÃœrÃ¼n" hatasÄ± veriyordu.
*   **Ã‡Ã¶zÃ¼m:** Backend Ã¼rÃ¼n listeleme API'si yeniden yazÄ±ldÄ±. TÄ±klanan kategorinin bir `parentId`'si varsa, Prisma Ã¼zerinden tÃ¼m alt kÄ±rÄ±lÄ±mlar hesaplatÄ±larak (Recursive Query mantÄ±ÄŸÄ±) dizi haline getirildi ve `IN` komutu ile alt dallardaki tÃ¼m Ã¼rÃ¼nlerin ana ekrana sÃ¼zÃ¼lmesi saÄŸlandÄ±.

### Hata 3: React Query Ã–nbellek (Cache) GÃ¼ncelleme Gecikmesi
*   **Sorun:** ÃœrÃ¼n silindiÄŸinde veya stoku 100'den 50'ye dÃ¼ÅŸÃ¼rÃ¼ldÃ¼ÄŸÃ¼nde, sayfa manuel olarak yenilenene (F5) kadar ekran eski sayÄ±larÄ± gÃ¶steriyordu.
*   **Ã‡Ã¶zÃ¼m:** React-Query'nin `useMutation` hook'larÄ±nÄ±n iÃ§ine `onSuccess: () => queryClient.invalidateQueries()` komutu eklendi. VeritabanÄ±na yazma iÅŸlemi bittiÄŸi milisaniye iÃ§erisinde, ilgili tÃ¼m frontend bileÅŸenlerinin sessizce (ekran kÄ±rpÄ±ÅŸmadan) verilerini yeniden Ã§ekmesi saÄŸlandÄ±.

### Hata 4: SoyutlanmÄ±ÅŸ (AnlamsÄ±z) Hata MesajlarÄ±
*   **Sorun:** Barkodu (ÃœrÃ¼n kodu) veritabanÄ±nda halihazÄ±rda var olan bir Ã¼rÃ¼n tekrar girilmeye Ã§alÄ±ÅŸÄ±ldÄ±ÄŸÄ±nda, sistem "ÃœrÃ¼n kaydedilirken hata" gibi genel bir hata atÄ±yordu.
*   **Ã‡Ã¶zÃ¼m:** Frontend'deki Axios ve yerel DB hata bloklarÄ± (Catch) ayrÄ±ÅŸtÄ±rÄ±ldÄ±. Sistemden dÃ¶nen `error.message` doÄŸrudan UI uyarÄ±larÄ±na (Alert) baÄŸlandÄ± ve kullanÄ±cÄ± "Bu kod zaten kullanÄ±mda" ÅŸeklinde spesifik olarak uyarÄ±lmaya baÅŸlandÄ±.

---

## 7. KullanÄ±cÄ± Deneyimi (UI/UX) GÃ¼ncellemeleri
MÃ¼ÅŸteri (kullanÄ±cÄ±) geri bildirimlerine istinaden aÅŸaÄŸÄ±daki revizyonlar yapÄ±lmÄ±ÅŸtÄ±r:
1.  **GÃ¶rsel KarmaÅŸanÄ±n Ã–nlenmesi:** Dashboard Ã¼zerindeki bÃ¼yÃ¼k kategori kartlarÄ±nda yazan "0 ÃœrÃ¼n", "1 ÃœrÃ¼n" gibi iÅŸlevsiz sayaÃ§ metinleri, React bileÅŸen kodlarÄ±ndan silinerek arayÃ¼z sadeleÅŸtirildi.
2.  **Responsive KÄ±rÄ±lmalarÄ±n Ã–nlenmesi:** Ekran penceresi kÃ¼Ã§Ã¼ltÃ¼ldÃ¼ÄŸÃ¼nde Ã¼st Ã¼ste binen giriÅŸ ve Ã§Ä±kÄ±ÅŸ butonlarÄ±, Tailwind grid/flex yapÄ±landÄ±rmalarÄ±yla dinamik hale getirildi.

## 8. CanlÄ±ya Alma ve Docker YÃ¶netimi
TÃ¼m sistem `docker-compose.yml` dosyasÄ± iÃ§erisinde tek bir komutla ayaÄŸa kalkacak dÃ¼zeye getirilmiÅŸtir. 
*   **Build SÃ¼reci:** Her bir servis (frontend, backend) kendi `Dockerfile` dosyasÄ±nda `node:20-alpine` gibi en hafif ve gÃ¼venli iÅŸletim sistemi tabanlarÄ±nda derlenmiÅŸtir.
*   **Veri KalÄ±cÄ±lÄ±ÄŸÄ±:** VeritabanÄ±ndaki Ã¼rÃ¼nler docker kapatÄ±lÄ±p aÃ§Ä±ldÄ±ÄŸÄ±nda silinmesin diye `volumes` baÄŸlamalarÄ± (Persistent Volumes) oluÅŸturulmuÅŸ, elektrik kesintilerinde bile verinin uÃ§masÄ± engellenmiÅŸtir.

