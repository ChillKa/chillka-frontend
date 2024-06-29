import InfoNavbar from '@components/Navbar/InfoNavbar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { H2, H3, P } from '@components/ui/typography';

const TITLE_OF_CONTENT = [
  {
    name: '服務內容',
    id: 'service-content',
  },
  {
    name: '使用者義務',
    id: 'user-obligations',
  },
  {
    name: '隱私權保護',
    id: 'privacy-protection',
  },
  {
    name: '智慧財產權',
    id: 'intellectual-property',
  },
  {
    name: '免責聲明',
    id: 'disclaimer',
  },
  {
    name: '服務修改與終止',
    id: 'service-modification-termination',
  },
  {
    name: '法律適用及管轄法院',
    id: 'law-jurisdiction',
  },
  {
    name: '其他',
    id: 'miscellaneous',
  },
  {
    name: '聯繫方式',
    id: 'contact',
  },
];

const Page = () => {
  return (
    <div className="mx-auto w-full px-3 pb-48 text-primary xl:max-w-[81rem] xl:px-0">
      <Breadcrumb className="pt-12 xl:px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-primary/70">
              首頁
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-primary">
              服務條款
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex pt-12">
        <InfoNavbar data={TITLE_OF_CONTENT} className="mt-12" />
        <div className="flex-1 space-y-12">
          <div>
            <H2 className="mb-2">服務條款</H2>
            <P>
              歡迎您使用「chillka
              揪咖」網站（以下簡稱「本網站」）。為了保護您的權益，請詳細閱讀以下服務條款。本網站由以下條款規範使用者與本網站之間的權利義務關係。當您使用本網站時，即表示您已閱讀、了解並同意接受這些服務條款的所有內容。如果您不同意這些條款中的任何部分，請立即停止使用本網站。
            </P>
          </div>
          <div>
            <H3 id="service-content" className="mb-2">
              一、服務內容
            </H3>
            <P>
              本網站提供使用者一個互動平台，用於交流、分享資訊及其他服務（以下簡稱「本服務」）。本網站有權隨時修改或終止本服務的全部或任何部分，並無需事先通知使用者。
            </P>
          </div>
          <div>
            <H3 id="user-obligations" className="mb-2">
              二、使用者義務
            </H3>
            <P>
              真實資料：使用者應提供正確、最新及完整的個人資料，並同意即時更新以確保其真實性和完整性。
            </P>
            <P>
              合法使用：使用者不得利用本網站進行任何非法行為或違反公共秩序及善良風俗的行為。
            </P>
            <P>
              帳戶安全：使用者應妥善保管其帳戶和密碼，並對以該帳戶進行的所有行為負完全責任。如果發現帳戶被未經授權使用，應立即通知本網站。
            </P>
          </div>
          <div>
            <H3 id="privacy-protection" className="mb-2">
              三、隱私權保護
            </H3>
            <P>
              我們尊重您的隱私權，並依據《個人資料保護法》及相關法律規定處理您的個人資料。詳細的隱私政策請參閱本網站的隱私權政策。
            </P>
          </div>
          <div>
            <H3 id="intellectual-property" className="mb-2">
              四、智慧財產權
            </H3>
            <P>
              本網站上的所有內容，包括但不限於文字、圖像、標誌、按鈕圖標、軟體及其編排，均屬於本網站或其內容提供者的財產，並受著作權法及其他相關法律的保護。未經本網站或權利人書面授權，使用者不得以任何形式複製、散佈、展示或轉載本網站內容。
            </P>
          </div>
          <div>
            <H3 id="disclaimer" className="mb-2">
              五、免責聲明
            </H3>
            <P>
              本網站對於因使用本服務或無法使用本服務所產生的任何直接、間接、偶然、特殊或衍生的損害，不負任何責任。雖然我們會盡力確保本網站內容的正確性，但不保證其絕對正確、完整及及時。
            </P>
          </div>
          <div>
            <H3 id="service-modification-termination" className="mb-2">
              六、服務修改與終止
            </H3>
            <P>
              本網站保留隨時修改或終止服務的權利，且無需事先通知使用者。修改後的服務條款將公布於本網站上，使用者繼續使用本服務即表示同意並接受修改後的條款。
            </P>
          </div>
          <div>
            <H3 id="law-jurisdiction" className="mb-2">
              七、法律適用及管轄法院
            </H3>
            <P>
              本服務條款的解釋與適用，以及與本服務條款有關的爭議，應依照中華民國法律處理。因本服務條款所生或與本服務條款有關的任何爭議，雙方同意以臺灣臺北地方法院為第一審管轄法院。
            </P>
          </div>
          <div>
            <H3 id="miscellaneous" className="mb-2">
              八、其他
            </H3>
            <P>
              若本服務條款中的任何條款被認定為無效或不可執行，其餘條款仍應具有完全的效力。
            </P>
          </div>
          <div>
            <H3 id="contact" className="mb-2">
              聯繫方式
            </H3>
            <P>如有任何問題，請通過以下方式聯繫我們：</P>
            <P>Email：chillka.offical@gmail.com</P>
            <P>感謝您使用「chillka 揪咖」網站，我們期待為您提供優質的服務。</P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
