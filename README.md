# Elektronik Bileşen Stok Yönetim Sistemi

Bu proje, şirket içi kullanım için geliştirilmiş, hem masaüstü hem mobilden erişilebilen bir **PWA (Progressive Web App)** olan Elektronik Bileşen Stok Yönetim Sistemi'nin frontend kısmıdır.

## Teknoloji Yığını

*   **Çerçeve:** React 18 + TypeScript + Vite
*   **Stil ve UI:** Tailwind CSS, shadcn/ui, lucide-react
*   **Yönlendirme:** React Router
*   **Durum ve Veri Yönetimi:** TanStack Query (React Query), React Context API
*   **Form Yönetimi:** react-hook-form, zod
*   **PWA Desteği:** vite-plugin-pwa

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

2.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```

3.  Uygulamaya tarayıcınızdan `http://localhost:5173` adresine giderek erişebilirsiniz.

### Giriş Bilgileri (Mock Data)

Backend entegrasyonu tamamlanana kadar mock (sahte) verilerle çalışmaktadır. Giriş yapmak için aşağıdaki bilgileri kullanabilirsiniz:

*   **Kullanıcı Adı:** `admin` (Şifre alanı boştur veya herhangi bir şey yazabilirsiniz)

## Proje Yapısı

*   `src/api/`: Mock veriler ve API çağrı fonksiyonları (`mockData.ts`, `products.ts`, vb.)
*   `src/components/`:
    *   `layout/`: Sidebar, Header, BottomNav gibi ana yerleşim bileşenleri.
    *   `ui/`: shadcn/ui tabanlı tekrar kullanılabilir atomik bileşenler (Button, Input, vb.)
*   `src/pages/`: Uygulamanın ana ekranları (Dashboard, Category, vb.)
*   `src/types/`: TypeScript arayüz (interface) tanımları.
*   `src/context/`: Genel durum yönetimi (AuthContext).
*   `src/lib/`: Yardımcı fonksiyonlar ve sabitler (`constants.ts`).

## PWA Özellikleri

Proje, çevrimdışı önbellekleme (Service Worker) ve ana ekrana eklenebilme özellikleriyle yapılandırılmıştır. Üretim ortamı için derlendiğinde ( `npm run build` ) bu özellikler aktifleşecektir.
