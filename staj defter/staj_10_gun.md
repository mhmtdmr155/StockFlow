# STAJ DEFTERÄ°
## ATN YazÄ±lÄ±m â€” YazÄ±lÄ±m StajÄ± (9 Ä°ÅŸ GÃ¼nÃ¼)

---

> **Ã–NERÄ°:** Bu markdown dosyasÄ±nÄ± Word/PDF'e aktarÄ±rken her "---" bÃ¶lÃ¼mÃ¼nÃ¼ yeni sayfaya alÄ±n. FotoÄŸraflar iÃ§in `[FOTOÄRAF: ...]` etiketli yerlere gerÃ§ek ekran gÃ¶rÃ¼ntÃ¼lerinizi ekleyin. Ekran gÃ¶rÃ¼ntÃ¼leri iÃ§in `staj defter/` klasÃ¶rÃ¼ndeki `.png` dosyalarÄ± kullanÄ±labilir.

---

## STAJ BÄ°LGÄ°LERÄ°

| Alan | Bilgi |
|------|-------|
| **StajÄ±n YapÄ±ldÄ±ÄŸÄ± Ä°ÅŸyeri** | ATN YazÄ±lÄ±m ve Teknoloji Ã‡Ã¶zÃ¼mleri |
| **Adres** | [Ä°ÅŸyeri adresi] |
| **Staj TÃ¼rÃ¼** | YazÄ±lÄ±m |
| **Staj BaÅŸlangÄ±Ã§ Tarihi** | [Tarih] |
| **Staj BitiÅŸ Tarihi** | [Tarih] |
| **Staj SÃ¼resi** | 9 Ä°ÅŸ GÃ¼nÃ¼ (Haftada 6 GÃ¼n â€” Pazartesi'den Cumartesi'ye) |
| **Staj Yeri Yetkilisi / DanÄ±ÅŸman** | [Yetkili AdÄ± SoyadÄ±] |
| **YapÄ±lan Ã‡alÄ±ÅŸmanÄ±n NiteliÄŸi** | ATN YazÄ±lÄ±m'Ä±n mÃ¼ÅŸterisi ElektromTech Elektronik firmasÄ± iÃ§in sÄ±fÄ±rdan Tam YÄ±ÄŸÄ±n (Full-Stack) Web TabanlÄ± StockFlow Sistemi GeliÅŸtirilmesi; PostgreSQL veritabanÄ± tasarÄ±mÄ±, Node.js/Express RESTful API, React.js arayÃ¼zÃ¼ ve Bulut OrtamÄ±nda (Vercel & Render/Railway) CanlÄ±ya Alma |

---

## STAJIN Ã–Z BÃ–LÃœMÃœ â€” GENEL EDÄ°NÄ°MLER

### Ä°ÅŸ SaÄŸlÄ±ÄŸÄ± ve GÃ¼venliÄŸi

Staj, ATN YazÄ±lÄ±m'Ä±n ofis ortamÄ±nda haftanÄ±n altÄ± gÃ¼nÃ¼ (Pazartesiâ€“Cumartesi) yÃ¼rÃ¼tÃ¼ldÃ¼. Bu sÃ¼reÃ§te iÅŸ saÄŸlÄ±ÄŸÄ± ve gÃ¼venliÄŸi konusunda en dikkat Ã§ekici nokta, uzun hata ayÄ±klama seanslarÄ±nÄ±n zaman zaman mesai saatlerini aÅŸmasÄ±ydÄ±. Ã‡ok fazla ekran baÅŸÄ±nda vakit geÃ§irildiÄŸinde sÄ±rt aÄŸrÄ±sÄ± ve gÃ¶z yorgunluÄŸunun Ã¼retkenliÄŸi gerÃ§ekten etkilediÄŸini fark ettim; molayÄ± hatÄ±rlamak bile bazen unutuluyordu. Ã‡alÄ±ÅŸma masasÄ±ndaki kablo dÃ¼zeni ve ekipman yerleÅŸimi konusunda da ilk gÃ¼nlerde uyarÄ± aldÄ±m; ofis ortamÄ±nda gÃ¼venli bir Ã§alÄ±ÅŸma alanÄ± oluÅŸturmanÄ±n Ã¶nemsiz bir detay olmadÄ±ÄŸÄ±nÄ± bu sayede kavradÄ±m.

### Hukuki Sorumluluk ve Veri GÃ¼venliÄŸi FarkÄ±ndalÄ±ÄŸÄ±

GeliÅŸtirilen sistem gerÃ§ek bir iÅŸletmenin verilerini iÅŸlediÄŸinden veri gÃ¼venliÄŸi konusunu ciddiye almak gerekti. Ã–rneÄŸin kullanÄ±cÄ± ÅŸifrelerini veritabanÄ±na dÃ¼z metin olarak kaydetmek aklÄ±ma bile gelmiyordu ama bcrypt'in neden gerekli olduÄŸunu uygulamalÄ± olarak gÃ¶rÃ¼nce konunun boyutu netleÅŸti. JWT anahtarlarÄ± ve veritabanÄ± ÅŸifreleri gibi hassas bilgileri kod iÃ§ine yazmamak, bunun yerine `.env` dosyasÄ±yla yÃ¶netmek standart bir pratik; ancak bunu gerÃ§ek bir projede ilk kez uygulayÄ±nca neden Ã¶nemli olduÄŸunu daha iyi anladÄ±m. Git'e `.gitignore` eklemeden Ã¶nce `.env` dosyasÄ±nÄ± neredeyse depoya gÃ¶ndermek Ã¼zereydim â€” o an biraz Ã¼rperdim aÃ§Ä±kÃ§asÄ±. Sistemin kim ne zaman ne iÅŸlem yaptÄ±ÄŸÄ±nÄ± kaydeden bir Audit Log tablosu da tasarladÄ±k; bu detayÄ±n gerÃ§ek bir mÃ¼ÅŸteri projesinde ne kadar kritik olduÄŸu o noktada daha anlamlÄ± geldi.

### Meslek EtiÄŸi, Ä°ÅŸ Disiplini ve Profesyonel DavranÄ±ÅŸ

Staj boyunca en Ã§ok dikkat etmeye Ã§alÄ±ÅŸtÄ±ÄŸÄ±m ÅŸey kodun Ã§alÄ±ÅŸmasÄ±nÄ±n yanÄ± sÄ±ra okunabilir olmasÄ±ydÄ±. DanÄ±ÅŸmanÄ±m koduma baktÄ±ÄŸÄ±nda anlayabilmeli, ileride projeyi devralan biri kaybolmamalÄ±ydÄ±. Yorum satÄ±rÄ± yazmak bazen gereksiz geliyordu ama birkaÃ§ gÃ¼n sonra kendi yazdÄ±ÄŸÄ±m koda baktÄ±ÄŸÄ±mda neden yazdÄ±ÄŸÄ±mÄ± hatÄ±rlayamayÄ±nca bu alÄ±ÅŸkanlÄ±ÄŸÄ±n ne kadar Ã¶nemli olduÄŸunu anladÄ±m.

En zorlandÄ±ÄŸÄ±m konu ise danÄ±ÅŸmanÄ±mÄ±n sÃ¼rekli yeni kategori eklemesi talep etmesiydi. DirenÃ§ Ã§eÅŸitleri (SMD kÄ±lÄ±f tipleri, tolerans serileri, gÃ¼Ã§ sÄ±nÄ±flarÄ±) aslÄ±nda kendi baÅŸÄ±na oldukÃ§a karmaÅŸÄ±k bir alan. Her yeni ekleme hem veritabanÄ±nÄ± hem arayÃ¼zÃ¼ etkileyince iÅŸin iÃ§inden Ã§Ä±kmak giderek gÃ¼Ã§leÅŸti. Gereksinimlerin sabit kalmayacaÄŸÄ±nÄ± teoride biliyordum ama bunu bu kadar yoÄŸun yaÅŸamak farklÄ± bir deneyimdi.

GÃ¼nlÃ¼k deÄŸerlendirme toplantÄ±larÄ±nda hem iyi giden ÅŸeyleri hem de takÄ±ldÄ±ÄŸÄ±m noktalarÄ± aÃ§Ä±kÃ§a paylaÅŸmak baÅŸta biraz tuhaf geldi, ama zamanla bu alÄ±ÅŸkanlÄ±ÄŸÄ±n iÅŸleri kolaylaÅŸtÄ±rdÄ±ÄŸÄ±nÄ± fark ettim.

---

## GÃœNLÃœK Ã‡ALIÅMA KAYITLARI

---

## 1. GÃœN â€” PAZARTESÄ°

**YAPILAN Ä°Å:** MÃ¼ÅŸteri Analizi, Gereksinim ToplantÄ±sÄ± ve ElektromTech Proje KapsamÄ±nÄ±n Belirlenmesi

**TARÄ°H:** [1. GÃ¼n Tarihi]

---

Ä°lk gÃ¼n ATN YazÄ±lÄ±m'da oryantasyon toplantÄ±sÄ±yla baÅŸladÄ± ve bana ElektromTech Elektronik iÃ§in bir StockFlow sistemi geliÅŸtirme projesi verildi. DanÄ±ÅŸmanÄ±mla birlikte ElektromTech'in deposuna gidip yerinde inceleme yaptÄ±k.

Depo yÃ¶neticisi sistemi anlatÄ±rken ÅŸunu gÃ¶rdÃ¼m: her ÅŸey Excel'de yÃ¼rÃ¼yor ama Ã§eÅŸitler o kadar artmÄ±ÅŸ ki artÄ±k yÃ¶netilemez hale gelmiÅŸ. FarklÄ± kÄ±lÄ±f tiplerindeki direnÃ§ler (0603, 0805, 1206 SMD ve THT) aynÄ± tabloya karÄ±ÅŸÄ±k giriliyor, iki personel aynÄ± anda aynÄ± hÃ¼creye yazÄ±yor. Hangi Ã¼rÃ¼nÃ¼n hangi dolap ve Ã§ekmecede olduÄŸunu kimse kesin olarak bilemiyor. DanÄ±ÅŸmanÄ±m ayrÄ±ca ilerleyen dÃ¶nemde yeni direnÃ§ tolerans serileri ve kondansatÃ¶r kategorileri de ekleneceÄŸini sÃ¶yledi â€” kapsamÄ±n ne kadar geniÅŸleyebileceÄŸini ÅŸu an tam kestiremedim ama esnek bir tasarÄ±m ÅŸart olacak.

ToplantÄ±nÄ±n ardÄ±ndan geliÅŸtirme ortamÄ± kurulumuna geÃ§tim. Node.js 20 LTS, PostgreSQL 15, Git ve VS Code kuruldu. Frontend ve Backend iÃ§in ayrÄ± dizinler oluÅŸturdum; bÃ¶ylece her servis baÄŸÄ±msÄ±z olarak Docker konteynerÄ±na alÄ±nabilecekti. Backend'de TypeScript + Express + Prisma kurulumunu tamamladÄ±m, frontend iÃ§in de Vite + React + TypeScript ÅŸablonunu kullandÄ±m ve Tailwind CSS'i ekledim. GÃ¼nÃ¼n sonunda elimde Ã§alÄ±ÅŸan sÄ±fÄ±r satÄ±r uygulama kodu vardÄ± ama ortam hazÄ±rdÄ±. YarÄ±n veritabanÄ± ÅŸemasÄ±yla baÅŸlamam gerekiyor; kategorilerin ne kadar derinleÅŸeceÄŸi konusunda iyi bir tasarÄ±m yapmam ÅŸart.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 1]:** VS Code'da aÃ§Ä±k proje klasÃ¶r yapÄ±sÄ±nÄ±n ekran gÃ¶rÃ¼ntÃ¼sÃ¼ â€” Frontend, Backend, Prisma klasÃ¶rleri ve docker-compose.yml gÃ¶rÃ¼nÃ¼r ÅŸekilde.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## 2. GÃœN â€” SALI

**YAPILAN Ä°Å:** VeritabanÄ± Åema TasarÄ±mÄ±, Prisma ORM ve Ä°lk Kategori AÄŸacÄ±nÄ±n OluÅŸturulmasÄ±

**TARÄ°H:** [2. GÃ¼n Tarihi]

---

Ä°kinci gÃ¼n tamamen veritabanÄ± tasarÄ±mÄ±na ayrÄ±ldÄ±. BeÅŸ ana tablo belirlendi: `User`, `Category`, `Product`, `StockMovement` ve `AuditLog`.

Prisma ORM'i daha Ã¶nce hiÃ§ kullanmamÄ±ÅŸtÄ±m, dolayÄ±sÄ±yla sabahÄ±n bÃ¼yÃ¼k bir kÄ±smÄ± dokÃ¼mantasyon okumakla geÃ§ti. Ä°lk denememde `Category` tablosunu dÃ¼z bir yapÄ±da kurdum â€” her kategorinin Ã¼st kategorisini ayrÄ± bir sÃ¼tunla tutmak yerine baÄŸÄ±msÄ±z satÄ±rlar olarak modelledim. DanÄ±ÅŸmanÄ±ma gÃ¶sterince hiyerarÅŸik navigasyonun bu ÅŸekilde mÃ¼mkÃ¼n olmayacaÄŸÄ±nÄ± sÃ¶yledi. Geri dÃ¶nÃ¼p tablonun kendi kendine iliÅŸki kurmasÄ± (`self-referential`) gerektiÄŸini, `parentId` alanÄ±nÄ±n nullable bir yabancÄ± anahtar olmasÄ± gerektiÄŸini kavrayÄ±nca her ÅŸey oturdu. "Pasif Elemanlar" â†’ "DirenÃ§ler" â†’ "SMD DirenÃ§ler" â†’ "SMD 0603 KÄ±lÄ±f" gibi Ã§ok katmanlÄ± bir yapÄ± mÃ¼mkÃ¼n hale geldi.

Bir direncin "direnÃ§ deÄŸeri", "tolerans" ve "gÃ¼Ã§ sÄ±nÄ±fÄ±" gibi teknik Ã¶zellikleri Ã¼rÃ¼n tÃ¼rÃ¼ne gÃ¶re farklÄ±laÅŸtÄ±ÄŸÄ±ndan `Product` tablosundaki `attributes` alanÄ±nÄ± esnek tutmak gerekti. PostgreSQL'in JSON desteÄŸi burada iÅŸe yaradÄ±; bu sayede ÅŸemayÄ± her yeni Ã¼rÃ¼n tipi iÃ§in deÄŸiÅŸtirmek zorunda kalmadÄ±m.

EÅŸ zamanlÄ± gÃ¼ncelleme sorununa karÅŸÄ± `version` alanÄ± eklendi â€” iki kullanÄ±cÄ± aynÄ± anda gÃ¼ncelleme yaparsa hangisi Ã¶nce basarsa o geÃ§erli olmamalÄ±, ama bunu uygulamayÄ± yarÄ±na veya ilerleyen gÃ¼nlere bÄ±rakacaÄŸÄ±m; ÅŸimdilik altyapÄ± hazÄ±r.

Åema `npx prisma migrate dev --name init` ile uygulandÄ± ve otuzdan fazla direnÃ§ tÃ¼rÃ¼ iÃ§in seed scripti yazÄ±ldÄ±. GÃ¼n biterken danÄ±ÅŸmanÄ±mdan E24 serisi ve kondansatÃ¶r kategorileri iÃ§in de kayÄ±t talebi geldi; bunlarÄ± da ekleyip gÃ¼nÃ¼ kapattÄ±m. YarÄ±n gÃ¼venlik tarafÄ±nÄ± kurmam gerekiyor.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 2]:** Prisma Studio ekran gÃ¶rÃ¼ntÃ¼sÃ¼ â€” Category aÄŸacÄ± ve Product tablolarÄ±nÄ±n verileriyle birlikte gÃ¶rÃ¼nÃ¼mÃ¼.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## 3. GÃœN â€” Ã‡ARÅAMBA

**YAPILAN Ä°Å:** Backend GÃ¼venlik KatmanÄ± â€” JWT, Refresh Token ve Kimlik DoÄŸrulama Sistemi

**TARÄ°H:** [3. GÃ¼n Tarihi]

---

ÃœÃ§Ã¼ncÃ¼ gÃ¼nde arka planda kimlik doÄŸrulama ve yetkilendirme altyapÄ±sÄ± kuruldu.

`auth` modÃ¼lÃ¼ oluÅŸturuldu. KullanÄ±cÄ± kayÄ±t uÃ§ noktasÄ±nda ÅŸifreler bcrypt ile hashlendi. GiriÅŸ baÅŸarÄ±lÄ± olduÄŸunda kÄ±sa Ã¶mÃ¼rlÃ¼ (15 dakika) **Access Token** ve uzun Ã¶mÃ¼rlÃ¼ (7 gÃ¼n) **Refresh Token** Ã¼retildi; Refresh Token HTTP-only cookie ile gÃ¶nderildi.

`authMiddleware` geliÅŸtirildi: korumalÄ± API rotalarÄ±na gelen her isteÄŸi karÅŸÄ±layÄ±p JWT'yi doÄŸruluyor, sÃ¼resi dolmuÅŸsa 401 yanÄ±tÄ± dÃ¶ndÃ¼rÃ¼yor, geÃ§erliyse `userId` ve `role` bilgisini bir sonraki iÅŸleyiciye aktarÄ±yordu.

Bu gÃ¼nde gerÃ§ek bir mÃ¼cadeleye neden olan konu token yenileme (refresh) akÄ±ÅŸÄ±ydÄ±. Ä°lk yaklaÅŸÄ±m olarak yalnÄ±zca Access Token'Ä±n sÃ¼resini uzatmayÄ± denedim â€” Refresh Token mekanizmasÄ±nÄ± atlayarak 15 dakikalÄ±k token Ã¶mrÃ¼nÃ¼ birkaÃ§ saate Ã§ektim. DanÄ±ÅŸmanÄ±ma gÃ¶sterdiÄŸimde bunun gÃ¼venlik aÃ§Ä±sÄ±ndan kabul edilemez olduÄŸunu, token Ã§alÄ±nmasÄ± durumunda saldÄ±rganÄ±n uzun sÃ¼re sisteme eriÅŸebileceÄŸini aÃ§Ä±kladÄ±. Ã‡izim tahtasÄ±nda birlikte konuÅŸtuktan sonra asÄ±l sorunu anladÄ±m: kullanÄ±cÄ± birden fazla sekme aÃ§tÄ±ÄŸÄ±nda hepsi aynÄ± anda refresh isteÄŸi gÃ¶nderiyor, sunucu da birden fazla geÃ§erli token Ã¼retiyordu. Ã‡Ã¶zÃ¼m iÃ§in her refresh isteÄŸinde eski token veritabanÄ±nda "kullanÄ±lmÄ±ÅŸ" olarak iÅŸaretlendi; bÃ¶ylece eski tokenlarÄ±n ikinci kez kabul edilmesi engellendi.

GÃ¼nÃ¼n sonunda gÃ¼venlik mimarisinin kÃ¼Ã§Ã¼k kararlarla bile bÃ¼yÃ¼k fark yarattÄ±ÄŸÄ±nÄ±, ilk aklÄ±ma gelen Ã§Ã¶zÃ¼mÃ¼n her zaman doÄŸru olmadÄ±ÄŸÄ±nÄ± gÃ¶rdÃ¼m. YarÄ±n Ã¼rÃ¼n ve kategori API'lerine geÃ§mek istiyorum; son iki gÃ¼ndÃ¼r yalnÄ±zca altyapÄ± Ã¼zerinde Ã§alÄ±ÅŸtÄ±m, sistemin bir ÅŸeye benzemeye baÅŸlamasÄ± gerekiyor.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 3]:** Postman â€” login isteÄŸinin baÅŸarÄ±lÄ± yanÄ±tÄ±; Access Token ve Set-Cookie baÅŸlÄ±ÄŸÄ± gÃ¶rÃ¼nÃ¼r ÅŸekilde.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## 4. GÃœN â€” PERÅEMBE

**YAPILAN Ä°Å:** ÃœrÃ¼n ve Kategori API'leri, HiyerarÅŸik Kategori Sorgulama ve Performans Optimizasyonu

**TARÄ°H:** [4. GÃ¼n Tarihi]

---

DÃ¶rdÃ¼ncÃ¼ gÃ¼n Ã¼rÃ¼n ve kategori API'lerini yazmaya baÅŸlayalÄ± Ã§ok olmamÄ±ÅŸtÄ± ki danÄ±ÅŸmanÄ±mdan yeni bir mesaj geldi: SMD direnÃ§ kÄ±lÄ±f serisi dÃ¼ÅŸÃ¼ndÃ¼ÄŸÃ¼mden Ã§ok daha geniÅŸ Ã§Ä±kmÄ±ÅŸtÄ±. 0402, 0603, 0805, 1206, 1210, 2010 ve 2512 kÄ±lÄ±f tipleri, her birinin altÄ±nda ayrÄ± tolerans serileri (E12 %5, E24 %1, E96 %0.1). BunlarÄ± ekleyince kategori aÄŸacÄ± Ã§ok daha karmaÅŸÄ±k bir hiyerarÅŸiye dÃ¶nÃ¼ÅŸtÃ¼; birkaÃ§ katmanlÄ± basit bir yapÄ± beklerken otuzdan fazla yaprak dÃ¼ÄŸÃ¼mÃ¼yle karÅŸÄ± karÅŸÄ±ya kaldÄ±m.

Asla beklemediÄŸim bir hatayla karÅŸÄ±laÅŸtÄ±m: "DirenÃ§ler" ana kategorisine tÄ±kladÄ±ÄŸÄ±mda ekran "0 ÃœrÃ¼n" gÃ¶steriyordu. ÃœrÃ¼nler alt kategorilere (SMD 0603 1kÎ© E24 Serisi gibi) kayÄ±tlÄ±ydÄ±; API ise yalnÄ±zca `categoryId = 'direncler_id'` koÅŸuluyla sÄ±ÄŸ bir arama yapÄ±yordu, alt kategorilere hiÃ§ bakmadan. Ä°lk baÅŸta hatayÄ± yanlÄ±ÅŸ anladÄ±ÄŸÄ±mÄ± sandÄ±m, sonra veritabanÄ±na doÄŸrudan sorgu attÄ±m; veri oradaydÄ± ama API bulamayÄ±nca anladÄ±m ki sorun sorgulama mantÄ±ÄŸÄ±nda.

Ã‡Ã¶zÃ¼m olarak `getSubcategoryIds` adlÄ± Ã¶zyinelemeli (recursive) bir yardÄ±mcÄ± fonksiyon yazdÄ±m. Bu fonksiyon tÄ±klanan kategorinin tÃ¼m alt kimliklerini toplayÄ±p bir dizi dÃ¶ndÃ¼rÃ¼yor; Ã¼rÃ¼n sorgusu da `WHERE categoryId IN (...)` komutuyla tÃ¼m alt dallara bakabiliyor hale geldi. Kategoriler yedi-sekiz seviye derine inebileceÄŸinden fonksiyonu da optimize etmek gerekti; aksi halde her tÄ±klamada onlarca veritabanÄ± turu gidecekti.

Ancak bu Ã¶zyinelemeli mantÄ±k JavaScript tarafÄ±nda yapÄ±ldÄ±ÄŸÄ±nda kategori sayÄ±sÄ± arttÄ±kÃ§a API yanÄ±t sÃ¼resini 1.2 saniyenin Ã¼zerine Ã§Ä±kartÄ±yordu. PerformansÄ± kurtarmak iÃ§in Ã¶zyineleme mantÄ±ÄŸÄ±nÄ± PostgreSQL'in **Recursive CTE** (Common Table Expression) sorgu yapÄ±sÄ±yla doÄŸrudan veritabanÄ± tarafÄ±na taÅŸÄ±dÄ±m. Ek olarak kategori yapÄ±sÄ±nÄ± backend belleÄŸinde Ã¶nbelleÄŸe (cache) aldÄ±m. Bu Ã§ift yÃ¶nlÃ¼ optimizasyon sayesinde API yanÄ±t sÃ¼resi 1.2 saniyeden 85 milisaniyeye geriledi.

Bu bÃ¼yÃ¼k performans sorununu Ã§Ã¶zmek gÃ¼nÃ¼n tamamÄ±nÄ± aldÄ± ancak veritabanÄ±na binen yÃ¼kÃ¼ inanÄ±lmaz azalttÄ±. YarÄ±n stok hareketi modÃ¼lÃ¼ne geÃ§meyi planlÄ±yorum.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 4]:** TarayÄ±cÄ± DevTools Network sekmesinde hiyerarÅŸik sorgu optimizasyonu sonrasÄ±ndaki hÄ±zlÄ± API yanÄ±t sÃ¼relerinin ekran gÃ¶rÃ¼ntÃ¼sÃ¼.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## 5. GÃœN â€” CUMA

**YAPILAN Ä°Å:** Stok Hareketi API'si, Optimistic Locking ve Denetim Ä°zi (Audit Log) Sistemi

**TARÄ°H:** [5. GÃ¼n Tarihi]

---

BeÅŸinci gÃ¼n stok hareketi modÃ¼lÃ¼ne geÃ§tim â€” her giriÅŸ ve Ã§Ä±kÄ±ÅŸ iÅŸleminin kimin, ne zaman, kaÃ§ birim yaptÄ±ÄŸÄ±nÄ± kalÄ±cÄ± olarak kaydetmesi gerekiyordu.

Optimistic Locking kavramÄ±nÄ± daha Ã¶nce teoride duymuÅŸtum ama hiÃ§ uygulamaya dÃ¶kmemiÅŸtim. Ä°lk denememde basit bir yaklaÅŸÄ±m denedim: stok gÃ¼ncellemesi yapÄ±lmadan Ã¶nce Ã¼rÃ¼nÃ¼ veritabanÄ±ndan okuyup JavaScript tarafÄ±nda eski ve yeni deÄŸeri karÅŸÄ±laÅŸtÄ±rdÄ±m. Ancak bu yaklaÅŸÄ±m iÅŸe yaramadÄ± â€” iki kullanÄ±cÄ± aynÄ± anda okuma yaptÄ±ÄŸÄ±nda ikisi de deÄŸeri gÃ¼ncel gÃ¶rÃ¼yor, sonrasÄ±nda biri diÄŸerinin gÃ¼ncellemesini fark etmeden Ã¼zerine yazÄ±yordu. Sorunun veritabanÄ± sorgusunun tek bir atomik iÅŸlem iÃ§inde hem kontrol hem gÃ¼ncelleme yapmasÄ± gerektiÄŸini anladÄ±ÄŸÄ±mda doÄŸru Ã§Ã¶zÃ¼me ulaÅŸtÄ±m: `UPDATE products SET stock = ..., version = 6 WHERE id = ... AND version = 5` sorgusu. Bu sorguda `WHERE version = 5` koÅŸulu, araya baÅŸka bir gÃ¼ncelleme girmiÅŸse sÄ±fÄ±r etkilenen satÄ±r dÃ¶ndÃ¼rÃ¼yor; API bu durumu yakalayarak kullanÄ±cÄ±yÄ± "KayÄ±t gÃ¼ncellendi, lÃ¼tfen sayfayÄ± yenileyiniz" uyarÄ±sÄ±yla bilgilendiriyor.

GÃ¼nÃ¼n ikinci yarÄ±sÄ±nda `AuditLog` tablosuna yazan middleware tamamlandÄ±. ÃœrÃ¼n ekleme, silme veya stok gÃ¼ncelleme iÅŸlemlerinden Ã¶nce ve sonra verinin JSON anlÄ±k gÃ¶rÃ¼ntÃ¼sÃ¼ (snapshot) Ã§ekilerek log tablosuna kaydedildi.

DanÄ±ÅŸmanÄ±mla kÄ±sa kapatÄ±ÅŸ toplantÄ±sÄ±nda bugÃ¼nÃ¼ deÄŸerlendirdik. YarÄ±n yeni bir kategori listesi gelecekmiÅŸ; gÃ¶receÄŸiz ne kadar bÃ¼yÃ¼k olacak. Bu akÅŸam biraz yorgunum aÃ§Ä±kÃ§asÄ±, hafta boyunca arka arkaya arka plan konularÄ±yla uÄŸraÅŸtÄ±m. YarÄ±n cumartesi, arayÃ¼z tarafÄ±na geÃ§ip ekranlarÄ± Ã§izmeye baÅŸlayacaÄŸÄ±m.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 5]:** Kod editÃ¶rÃ¼nde Optimistic Locking (`version` kontrolÃ¼) yapan Prisma sorgusunun ve Audit Log middleware kod bloklarÄ±nÄ±n gÃ¶rÃ¼nÃ¼mÃ¼.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## 6. GÃœN â€” CUMARTESÄ°

**YAPILAN Ä°Å:** React ArayÃ¼zÃ¼, Tailwind CSS TasarÄ±m Sistemi, Glassmorphism BileÅŸenleri ve React Query Entegrasyonu

**TARÄ°H:** [6. GÃ¼n Tarihi]

---

AltÄ±ncÄ± gÃ¼n nihayet tamamen frontend'e odaklanmak mÃ¼mkÃ¼n oldu. Depo personeli gÃ¼n boyu bu ekranÄ± kullanacaÄŸÄ±ndan gÃ¶rsel yorgunluÄŸu azaltan, koyu temalÄ± bir tasarÄ±m hedefledim.

Tailwind CSS Ã¼zerinde renk paleti HSL renk modeliyle tanÄ±mlandÄ±. Saf siyah yerine gÃ¶z yormayan `slate-900` arka plan ve `slate-800` kart yÃ¼zeyleri kullanÄ±ldÄ±. "Glassmorphism" (buzlu cam) efektine dayalÄ± `ProductCard` bileÅŸeni yaptÄ±m. `backdrop-filter: blur()` Ã¶zelliÄŸini kullanÄ±rken Safari iÃ§in `-webkit-` Ã¶neki gerektiÄŸini Ã¶ÄŸrendim, aksi halde Safari'de buzlu cam efekti Ã§alÄ±ÅŸmÄ±yordu. `StockBadge`, `AlertBanner`, `LoadingSpinner` ve `ConfirmDialog` bileÅŸenlerini de bitirdim.

React Query kullanÄ±rken bir noktada takÄ±ldÄ±m: Ã¼rÃ¼n silince ya da stok gÃ¼ncelleyince sayfa yenilemeden eski veri Ã§Ä±kmaya devam ediyordu. `useMutation`'Ä±n `onSuccess` callback'ine `queryClient.invalidateQueries` ekleyince sorun Ã§Ã¶zÃ¼ldÃ¼. KÃ¼Ã§Ã¼k ama Ã¶ÄŸretici bir ayrÄ±ntÄ± oldu. BugÃ¼n arayÃ¼zde somut ilerlemeler kaydettim. Pazartesi gÃ¼nÃ¼ (pazar tatilinden sonra) dashboard ve grafik ekranÄ±nÄ± yapmaya baÅŸlayacaÄŸÄ±m.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 6]:** Tasarlanan Glassmorphism kart tasarÄ±mÄ±na sahip modern Ã¼rÃ¼n listesi arayÃ¼zÃ¼nÃ¼n ekran gÃ¶rÃ¼ntÃ¼sÃ¼.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## 7. GÃœN â€” PAZARTESÄ°

**YAPILAN Ä°Å:** Dashboard GeliÅŸtirme, Recharts Grafik Entegrasyonu ve Hata MesajÄ± Ä°yileÅŸtirmesi

**TARÄ°H:** [7. GÃ¼n Tarihi]

---

Yedinci gÃ¼n Dashboardâ€™Ä± bitirmekle geÃ§ti. `DashboardController` stok hareket kayÄ±tlarÄ±nÄ± gruplayarak (`GROUP BY`) Ã¶zet istatistikler Ã¼retiyor; kritik stok eÅŸiÄŸinin altÄ±na dÃ¼ÅŸen Ã¼rÃ¼nler `WHERE stock <= minStockLevel` sorgusuyla belirleniyor.

Frontend'de grafik iÃ§in Ã¶nce `Chart.js` denedim, kurulumu kolaydÄ± ama React entegrasyonu bir wrapper gerektiriyordu ve bileÅŸen yapÄ±sÄ± biraz hantaldÄ±. DanÄ±ÅŸmanÄ±m `Recharts`'Ä± Ã¶nerince geÃ§iÅŸ yaptÄ±m; APIâ€™sÄ±nÄ± Ã¶ÄŸrenmek biraz zaman aldÄ± ama daha React dostu bir yapÄ±sÄ± vardÄ±. Kategori bazlÄ± Ã¼rÃ¼n daÄŸÄ±lÄ±mÄ± iÃ§in bar chart, son 7 gÃ¼nÃ¼n stok hareketleri iÃ§in line chart hazÄ±rlandÄ±.

GÃ¼nÃ¼n sonlarÄ±nda barkod Ã§arpÄ±ÅŸmasÄ± hatasÄ±nÄ± fark ettim: zaten kayÄ±tlÄ± bir Ã¼rÃ¼n tekrar eklenince sistem sadece "ÃœrÃ¼n kaydedilirken hata oluÅŸtu" diyordu. PostgreSQL'Ä±n dÃ¶ndÃ¼rdÃ¼ÄŸÃ¼ `P2002` hata kodunu yakalayarak bunu "Bu barkod sistemde zaten kayÄ±tlÄ±. LÃ¼tfen farklÄ± barkod giriniz." mesajÄ±na Ã§evirdim. KÃ¼Ã§Ã¼k bir deÄŸiÅŸiklik ama depodaki bilgisayara alÄ±ÅŸkÄ±n olmayan birinin sistemi kullanacaÄŸÄ±nÄ± dÃ¼ÅŸÃ¼ndÃ¼m, bu ayrÄ±ntÄ± Ã¶nemli.

YarÄ±n en Ã§ok merak ettiÄŸim ve danÄ±ÅŸmanÄ±mÄ±n Ã§ok Ã¶nem verdiÄŸi Ã§evrimdÄ±ÅŸÄ± Ã§alÄ±ÅŸma (PWA) konusuna baÅŸlayacaÄŸÄ±m.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 7]:** Dashboard ekranÄ±nÄ±n; Recharts grafikleri, kritik stok uyarÄ± kartlarÄ± ve Ã¶zet istatistik paneliyle birlikte genel gÃ¶rÃ¼nÃ¼mÃ¼.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## 8. GÃœN â€” SALI

**YAPILAN Ä°Å:** PWA DÃ¶nÃ¼ÅŸÃ¼mÃ¼, Service Worker ve Ã‡evrimdÄ±ÅŸÄ± Senkronizasyon (Sync Queue) AltyapÄ±sÄ±

**TARÄ°H:** [8. GÃ¼n Tarihi]

---

Sekizinci gÃ¼nde projenin en ileri dÃ¼zey teknik konusu ele alÄ±ndÄ±: uygulamanÄ±n **PWA (Progressive Web App)** standartlarÄ±na yÃ¼kseltilmesi. Bu ihtiyaÃ§, ElektromTech deposundaki internet baÄŸlantÄ±sÄ±nÄ±n zaman zaman koptuÄŸunun gÃ¶zlemlenmesinden kaynaklanÄ±yordu. Personelin baÄŸlantÄ±sÄ±z ortamda stok saymaya ve kayÄ±t girmeye devam edebilmesi ÅŸarttÄ±.

`vite-plugin-pwa` eklentisi kuruldu ve `manifest.json` yapÄ±landÄ±rÄ±ldÄ±. PWA konusu daha Ã¶nce hiÃ§ Ã§alÄ±ÅŸmamÄ±ÅŸ olduÄŸum bir alandÄ±; hangi Ã¶nbellekleme stratejisinin ne zaman kullanÄ±lacaÄŸÄ±nÄ± anlamak iÃ§in Google'Ä±n Workbox dokÃ¼mantasyonunu oldukÃ§a uzun sÃ¼re okudum. Sonunda statik dosyalar iÃ§in **Cache-First**, API istekleri iÃ§in **Stale-While-Revalidate** stratejisinin doÄŸru kombinasyon olduÄŸuna karar verdim.

AsÄ±l zorluÄŸu **Ã§evrimdÄ±ÅŸÄ± iÅŸlem kuyruÄŸu (Sync Queue)** oluÅŸturdu. `Dexie.js` ile tarayÄ±cÄ± iÃ§i `IndexedDB` veritabanÄ± kuruldu. Ä°nternet yokken girilen stok hareketleri `syncQueue` tablosuna yazÄ±ldÄ±; baÄŸlantÄ± dÃ¶ndÃ¼ÄŸÃ¼nde `navigator.onLine` olayÄ± yakalanarak kuyruk arka planda sunucuya iletildi.

TarayÄ±cÄ±lar arasÄ±nda ciddi farklar olduÄŸunu burada keÅŸfettim: Chrome'da her ÅŸey beklendiÄŸi gibi Ã§alÄ±ÅŸÄ±rken iOS Safari'de IndexedDB Ã¶zel gÃ¶z atma modunda tamamen devre dÄ±ÅŸÄ± kalÄ±yor, disk dolduÄŸunda ise sessizce baÅŸarÄ±sÄ±z olabiliyordu. Bunu Ã§Ã¶zmek iÃ§in tÃ¼m yerel veritabanÄ± iÅŸlemlerini `try-catch` bloklarÄ±na aldÄ±m; hata durumunda uygulama verilerini bellekten sunmaya devam etti. Safari testini simÃ¼latÃ¶rle idare ettim. DanÄ±ÅŸmanÄ±m akÅŸam deÄŸerlendirmesinde Ã§evrimdÄ±ÅŸÄ± Ã¶zelliÄŸin Ã§ok Ã¶nemli olduÄŸunu sÃ¶yledi, memnun gÃ¶rÃ¼ndÃ¼. YarÄ±n projenin son gÃ¼nÃ¼, canlÄ±ya alma (deployment) ve genel testler Ã¼zerinde Ã§alÄ±ÅŸacaÄŸÄ±m.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 8]:** TarayÄ±cÄ± DevTools Application sekmesinde Service Worker durumu ve Cache Storage iÃ§eriÄŸinin ekran gÃ¶rÃ¼ntÃ¼sÃ¼.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## 9. GÃœN â€” Ã‡ARÅAMBA

**YAPILAN Ä°Å:** Bulut OrtamÄ±nda CanlÄ±ya Alma (Vercel & Render/Railway Deployment) ve CanlÄ± Sistem Testleri

**TARÄ°H:** [9. GÃ¼n Tarihi]

---

StajÄ±n son gÃ¼nÃ¼nde, geliÅŸtirilen tÃ¼m sistemin yerel bilgisayardan canlÄ± internet ortamÄ±na taÅŸÄ±nmasÄ± (deployment) gerÃ§ekleÅŸtirildi. DanÄ±ÅŸmanÄ±mÄ±n Ã¶nerisi Ã¼zerine, sunucu ve Nginx yÃ¶netimiyle uÄŸraÅŸmak yerine daha hÄ±zlÄ± ve Ã¶lÃ§eklenebilir olan modern bulut platformlarÄ± (PaaS) tercih edildi.

Ä°lk olarak veritabanÄ± canlÄ±ya taÅŸÄ±ndÄ±. **Render** Ã¼zerinden managed bir **PostgreSQL veritabanÄ±** oluÅŸturuldu. VeritabanÄ±nÄ±n oluÅŸturulmasÄ±yla birlikte backend'in baÄŸlanabileceÄŸi dÄ±ÅŸa aÃ§Ä±k bir `DATABASE_URL` adresi elde edildi.

Ä°kinci aÅŸamada, Node.js ile yazÄ±lmÄ±ÅŸ backend projesi canlÄ±ya alÄ±ndÄ±. Koddaki veritabanÄ± ve JWT gibi gizli anahtarlar koddan arÄ±ndÄ±rÄ±larak Render paneli Ã¼zerindeki Ã§evre deÄŸiÅŸkenlerine (`.env`) baÄŸlandÄ±. Sistem ayaÄŸa kalktÄ±ÄŸÄ±nda Prisma otomatik olarak canlÄ± veritabanÄ±na ÅŸemayÄ± uyguladÄ± (`npx prisma db push`) ve baÅŸlangÄ±Ã§ kategorilerini seed etti. Backend yayÄ±na girdi ve dÄ±ÅŸ dÃ¼nyaya aÃ§Ä±k bir API adresi saÄŸladÄ±.

Son aÅŸamada, React arayÃ¼zÃ¼ **Vercel** Ã¼zerinden yayÄ±na alÄ±ndÄ±. Github deposu doÄŸrudan Vercel'e baÄŸlandÄ±. Vercel, projeyi Vite ile otomatik olarak derledi, optimizasyonlarÄ±nÄ± yaptÄ± ve bize **otomatik SSL** sertifikalÄ± bir adres verdi.

TÃ¼m sistem birleÅŸtirildikten sonra telefonumdan ve bilgisayardan canlÄ± URL'lere girerek testler yaptÄ±m. Ä°nterneti kapatÄ±p stok giriÅŸi yaptÄ±m, interneti aÃ§tÄ±ÄŸÄ±mda verilerin Render veritabanÄ±na baÅŸarÄ±yla senkronize olduÄŸunu doÄŸruladÄ±m.

KapanÄ±ÅŸ deÄŸerlendirmesinde danÄ±ÅŸmanÄ±m sistemin ElektromTech'e teslim edileceÄŸini belirtti. Staj boyunca en Ã§ok zorlayan ÅŸeyin teknik problemler deÄŸil, sÃ¼rekli deÄŸiÅŸen iÅŸ gereksinimleri olduÄŸunu sÃ¶yleyince danÄ±ÅŸmanÄ±m bunun gerÃ§ek yazÄ±lÄ±m geliÅŸtirmeden farksÄ±z olduÄŸunu belirtti.

9 gÃ¼nde Ã¶ÄŸrendiklerime bakÄ±nca ÅŸunlar Ã¶ne Ã§Ä±kÄ±yor: TypeScript ile gerÃ§ek bir full-stack proje yÃ¼rÃ¼tmek, JWT gÃ¼venlik mimarisi kurmak, PWA ve Ã§evrimdÄ±ÅŸÄ± Ã§alÄ±ÅŸma konusunu uygulamalÄ± Ã¶ÄŸrenmek ve bulut mimarisinde (Vercel & Render) sÄ±fÄ±rdan deployment adÄ±mlarÄ±nÄ± tamamlamak. GerÃ§ek bir projeyi baÅŸtan sona baÅŸarÄ±yla teslim etmenin gururuyla stajÄ± tamamladÄ±m.

> **[FOTOÄRAF Ã–NERÄ°SÄ° 9]:** Vercel ve Render kontrol panellerinde baÅŸarÄ±lÄ± deployment (canlÄ±ya alÄ±nma) durumlarÄ±nÄ± ve yeÅŸil loglarÄ± gÃ¶steren ekran gÃ¶rÃ¼ntÃ¼sÃ¼.

**Staj Yetkilisinin AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

**Staj YapanÄ±n AdÄ±-SoyadÄ±, Ä°mzasÄ±:** ___________________________

---

## FOTOÄRAF Ã–NERÄ°LERÄ° â€” Ã–ZET TABLOSU

> AÅŸaÄŸÄ±daki fotoÄŸraflarÄ± staj defterinize ekleyerek her gÃ¼nÃ¼n teknik iÃ§eriÄŸini gÃ¶rsel olarak desteklemeniz Ã¶nerilir. `staj defter/` klasÃ¶rÃ¼ndeki mevcut `.png` dosyalarÄ± doÄŸrudan kullanÄ±labilir.

| GÃ¼n | Ã–nerilen FotoÄŸraf | Mevcut Dosya / Kaynak |
|-----|-------------------|-----------------------| 
| 1 | VS Code proje klasÃ¶r yapÄ±sÄ± | Kendi ekran gÃ¶rÃ¼ntÃ¼nÃ¼zÃ¼ alÄ±n |
| 2 | Prisma Studio â€” Category/Product tablosu | Kendi ekran gÃ¶rÃ¼ntÃ¼nÃ¼zÃ¼ alÄ±n |
| 3 | Postman â€” login yanÄ±tÄ± (JWT + Set-Cookie) | Kendi ekran gÃ¶rÃ¼ntÃ¼nÃ¼zÃ¼ alÄ±n |
| 4 | DevTools Network â€” API yanÄ±t sÃ¼resi karÅŸÄ±laÅŸtÄ±rmasÄ± | Kendi ekran gÃ¶rÃ¼ntÃ¼nÃ¼zÃ¼ alÄ±n |
| 5 | Kod EditÃ¶rÃ¼ â€” Optimistic Locking ve middleware kodlarÄ± | Kendi ekran gÃ¶rÃ¼ntÃ¼nÃ¼zÃ¼ alÄ±n |
| 6 | Glassmorphism kart tasarÄ±mlÄ± Ã¼rÃ¼n listesi | `Ekran gÃ¶rÃ¼ntÃ¼sÃ¼ 2026-07-08 105631.png` âœ… |
| 7 | Dashboard istatistik ekranÄ± | `Ekran gÃ¶rÃ¼ntÃ¼sÃ¼ 2026-07-09 143917.png` âœ… |
| 8 | DevTools Application â€” Service Worker & Cache | Kendi ekran gÃ¶rÃ¼ntÃ¼nÃ¼zÃ¼ alÄ±n |
| 9 | Vercel ve Render CanlÄ±ya AlÄ±nma Kontrol Panelleri | Kendi ekran gÃ¶rÃ¼ntÃ¼nÃ¼zÃ¼ alÄ±n |

---

*Staj Defteri TamamlandÄ± â€” ATN YazÄ±lÄ±m, [Tarih]*

