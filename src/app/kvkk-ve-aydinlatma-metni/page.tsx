export default function KVKKPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">KVKK Aydınlatma Metni</h1>

      <div className="prose max-w-none">
        <p className="mb-4">
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;)
          uyarınca, Retroia olarak, veri sorumlusu sıfatıyla, kişisel
          verilerinizi aşağıda açıklanan amaçlar kapsamında; hukuka ve dürüstlük
          kurallarına uygun bir şekilde işleyebilecek, kaydedebilecek,
          saklayabilecek, sınıflandırabilecek, güncelleyebilecek ve mevzuatın
          izin verdiği hallerde üçüncü kişilere açıklayabilecek/aktarabileceğiz.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Kişisel Verilerin Toplanması ve İşlenmesi
        </h2>
        <p className="mb-4">
          Kişisel verileriniz, internet sitemizi ziyaret etmeniz,
          hizmetlerimizden yararlanmanız sırasında elektronik ortamda otomatik
          veya otomatik olmayan yollarla toplanmaktadır.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          İşlenen Kişisel Verileriniz
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Kimlik Bilgileri (Ad, soyad)</li>
          <li>İletişim Bilgileri (E-posta adresi, telefon numarası)</li>
          <li>
            İşlem Güvenliği Bilgileri (IP adresi bilgileri, internet sitesi
            giriş-çıkış bilgileri)
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Kişisel Verilerin İşlenme Amaçları
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Size özel emlak önerilerinde bulunabilmek</li>
          <li>Talep ve şikayetlerinizi yönetebilmek</li>
          <li>Yasal yükümlülüklerimizi yerine getirebilmek</li>
          <li>Hizmet kalitemizi artırabilmek</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Kişisel Verilerin Aktarılması
        </h2>
        <p className="mb-4">
          Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi
          doğrultusunda, iş ortaklarımıza, tedarikçilerimize, kanunen yetkili
          kamu kurumlarına ve yetkili özel kişilere KVKK&apos;nın 8. ve 9.
          maddelerinde belirtilen kişisel veri işleme şartları ve amaçları
          çerçevesinde aktarılabilecektir.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Haklarınız</h2>
        <p className="mb-4">
          KVKK&apos;nın 11. maddesi uyarınca sahip olduğunuz haklar şunlardır:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
          <li>
            Kişisel verilerinizin işlenme amacını ve bunların amacına uygun
            kullanılıp kullanılmadığını öğrenme
          </li>
          <li>Kişisel verilerinizin düzeltilmesini veya silinmesini isteme</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">İletişim</h2>
        <p className="mb-4">
          Bu aydınlatma metni kapsamında yer alan hususlara ilişkin detaylı
          bilgi almak için{" "}
          <a href="mailto:info@retroia.com">info@retroia.com</a> adresine
          e-posta gönderebilirsiniz.
        </p>
      </div>
    </div>
  );
}
