# MEGA GRILL – Güncel kaynak kodu

Güncelleme: 22.09.2026

ZIP dosyasını çıkarın. mega-grill klasörünü VS Code ile açın ve Live Server ile çalıştırın.
Alternatif: bu klasörde `python3 -m http.server 8000` çalıştırın ve http://localhost:8000 adresini açın.
Npm install veya build gerekmez. Statik hosting için bu klasörün tüm içeriğini yükleyin.

- index.html: Ana sayfa
- style.css: Tasarım
- app.js: Menü, yorumlar, animasyonlar ve açılış günü
- order.js: Lieferando, Wolt ve Uber Eats seçim penceresi
- menu-data.js: Menü ve fiyatlar
- speisekarte/: Sayfa geçişli tam menü
- assets/: Görseller, menü sayfaları ve PDF

Son değişiklikler: Route starten alt çizgili turuncu hover efekti; yorumlarda duraklatma butonu kaldırıldı, hover sırasında duraklama; sipariş butonları üç platform seçeneği sunar.
Google puanı, yorumlar ve açılış saatleri otomatik güncellenmez. Harita, web fontları ve dış bağlantılar internet gerektirir.

Google yorum kartlarına dört yeni yorum eklendi; toplam yedi yorum gösterilir.
